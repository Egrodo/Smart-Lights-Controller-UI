<script lang="ts">
  import { DeviceState, CurrentSelections } from '../stores';

  import sendCommands from '../helpers/sendCommands';
  import DeviceBlock from './DeviceBlock.svelte';
  import ColorPickerBlock from './ColorPickerBlock.svelte';
  import ColorPreviewBlock from './ColorPreviewBlock.svelte';
  import ButtonBlock from './ButtonBlock.svelte';
  import BrightnessBlock from './BrightnessBlock.svelte';

  import type { Command, Device, DeviceState as DeviceStateType, Pages } from '../types';
  import type { Entities } from '../types';
  import { onMount } from 'svelte';

  export let changePage: (newPage: Pages) => void;

  function handleSelect(entity: Entities): void {
    const index = $CurrentSelections.indexOf(entity);

    // If it's not in the array, add it.
    if (index === -1) {
      $CurrentSelections = [...$CurrentSelections, entity];
    } else {
      // Otherwise remove it.
      const tempArr = [...$CurrentSelections];
      tempArr.splice(index, 1);
      $CurrentSelections = tempArr;
    }
  }

  function clearSelect(): void {
    $CurrentSelections = [];
  }

  async function powerToggle(name: Entities): Promise<void> {
    let deviceOn;

    DeviceState.update((prevState) => {
      // If on turn off & vice versa.
      const prevDevices = prevState.devices;
      const updatedDevices: Device[] = prevDevices.map((dev) => {
        if (dev.name === name) {
          deviceOn = dev.on;
          dev.on = !dev.on;
        }

        return dev;
      });

      return { ...prevState, devices: updatedDevices };
    });

    if (deviceOn) {
      await sendCommands({
        names: [name],
        type: 'entity',
        on: false,
      });
    } else {
      await sendCommands({
        names: [name],
        type: 'entity',
        on: true,
      });   
    }
  }

  let selectedColor: [number, number, number] = [255, 255, 240]; // Default to ivory.

  let selectedColorChanged: boolean = false;

  let brightness: number = 1;
  // Keeps track of if this attribute has changed since the user last submitted/navigated here
  let brightnessChanged: boolean = false;
  
  function setSelectedColor(red: number, green: number, blue: number): void {
    // Find the nearest color to pickedColor in CompatibleColors
    selectedColor = [red, green, blue];
    selectedColorChanged = true;
  }

  function setBrightness(brightnessPercent: number): void {
    brightness = brightnessPercent;
    brightnessChanged = true;
  }
  // TODO: Just checking if the brightness was changed *this* time isn't reliable
  // because it doesn't take into account previous brightness changes. It shouldn't always default to 1.

  async function submitChanges(): Promise<void> {
    // Apply selectedColor and brightness to CurrentSelections and modify the DeviceState

    if ($CurrentSelections.length === 0) {
      console.log('No devices selected');
      return; // nothing to do
    }

    const applicableDevices: Entities[] = [];
    for (const selectedDevice of $CurrentSelections) {
      applicableDevices.push(selectedDevice);
    }

    // At least one device will always be applicable because of the $CurrentSelections check in submitChanges
    const changes: Command = {
      names: [...applicableDevices],
      type: 'entity',
      on: true,
    };

    if (selectedColorChanged) changes.color = selectedColor;
    if (brightnessChanged) changes.brightness = brightness;

    await sendCommands(changes);
  

    // Update the store
    const deviceStateCopy: DeviceStateType = {
      devicesConnected: $DeviceState.devicesConnected,
      devices: [],
    };

    $DeviceState.devices.forEach((device) => {
      if ($CurrentSelections.includes(device.name)) {
        device.color = selectedColor;
      }
      deviceStateCopy.devices.push(device);
    });

    $DeviceState = deviceStateCopy;
    
  }

  function goBack() {
    changePage('main');
    clearSelect();
  }

  // On mount start a timer that listens for any touches and if none are detected for 60s change back to home page.
  onMount(() => {
    let lastInteracted = Date.now();
    function restartTimer() {
      lastInteracted = Date.now();
    }
    document.addEventListener('touchstart', restartTimer);
    const timer = window.setInterval(() => {
      const currTime = Date.now();
      if ($DeviceState.devices.length === 0) window.location.reload();

      if (currTime - lastInteracted > 60 * 1000) {
        document.removeEventListener('touchstart', restartTimer);
        window.clearInterval(timer);
        goBack();
      }
    }, 5000)
  });
</script>

<style>
  .Customize {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .leftHalf {
    background: black;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  .rightHalf {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 0.5fr 0.5fr 1fr;
  }
</style>

<main class="Customize">
  <div class="leftHalf">
    {#each $DeviceState.devices as device}
      <DeviceBlock {device} {handleSelect} {powerToggle} selected={$CurrentSelections.includes(device.name)} />
    {/each}
  </div>
  <div class="rightHalf">
    <ColorPickerBlock {setSelectedColor} />
    <ColorPreviewBlock selectedColor={selectedColor} hasChanged={selectedColorChanged} /> 
    <BrightnessBlock {setBrightness} initialBrightness={brightness} />
    <ButtonBlock
      bgColor={[245, 57, 96]}
      text="Back"
      onClick={goBack}
      customStyle="border-right: 1px solid black" />
    <ButtonBlock bgColor={[14, 173, 105]} text="Submit" onClick={submitChanges} />
  </div>
</main>
