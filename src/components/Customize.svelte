<script lang="ts">
  import { DeviceState, CurrentSelections } from '../stores';

  import sendCommands from '../helpers/sendCommands';
  import DeviceBlock from './DeviceBlock.svelte';
  import ColorPickerBlock from './ColorPickerBlock.svelte';
  import ColorPreviewBlock from './ColorPreviewBlock.svelte';
  import ButtonBlock from './ButtonBlock.svelte';
  import BrightnessBlock from './BrightnessBlock.svelte';

  import type { Device, DeviceState as DeviceStateType, Pages } from '../types';
  import {Entities, Areas} from '../types';
  import { onMount } from 'svelte';

  export let changePage: (newPage: Pages) => void;

  function handleSelect(name: string): void {
    const index = $CurrentSelections.indexOf(name);

    // If it's not in the array, add it.
    if (index === -1) {
      $CurrentSelections = [...$CurrentSelections, name];
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

  async function powerToggle(name: string): Promise<void> {
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
        names: [Areas.Bedroom],
        type: 'area',
        on: false,
      });
    } else {
      await sendCommands({
        names: [Areas.Bedroom],
        type: 'area',
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

  async function submitChanges(): Promise<void> {
    // Apply selectedColor and brightness to CurrentSelections and modify the DeviceState

    if ($CurrentSelections.length === 0) {
      console.log('No devices selected');
      return; // nothing to do
    }

    // TODO: Just checking if the brightness was changed *this* time isn't reliable
    // because it doesn't take into account previous brightness changes. It shouldn't always default to 1.

    if (brightnessChanged) {
      await submitBrightnessChanges();
    }
    if (selectedColorChanged) {
      await submitColorChanges();
    }
  }

  async function submitBrightnessChanges(): Promise<void> {
    const applicableDevices: string[] = [];
    for await (const selectedDevice of $CurrentSelections) {
      applicableDevices.push(selectedDevice);
    }

    // At least one device will always be applicable because of the $CurrentSelections check in submitChanges
    if (applicableDevices.length === 1) {
      await commandHandler(`Set ${applicableDevices[0]} to ${Math.round(brightness)}%`);
    } else {
      let command = 'Set';
      applicableDevices.forEach((device, i) => {
        command += ` ${device}`;
        if (applicableDevices.length - 1 !== i) {
          command += ' and';
        }
      });
      command += ` to ${Math.round(brightness)}%`;
      await commandHandler(command);
    }

    // Update the store
    const deviceStateCopy: DeviceStateType = {
      devicesConnected: $DeviceState.devicesConnected,
      devices: [],
    };

    $DeviceState.devices.forEach((device) => {
      if ($CurrentSelections.includes(device.name)) {
        device.brightness = brightness;
      }
      deviceStateCopy.devices.push(device);
    });

    $DeviceState = deviceStateCopy;
  }

  // Send commands to lights to do the needful
  async function submitColorChanges(): Promise<void> {
    const applicableDevices: string[] = [];
    for await (const selectedDevice of $CurrentSelections) {
      applicableDevices.push(selectedDevice);
    }

    // At least one device will always be applicable because of the $CurrentSelections check in submitChanges
    if (applicableDevices.length === 1) {
      await commandHandler(`Set ${applicableDevices[0]} to ${selectedColor.name}`);
    } else {
      let command = 'Set';
      applicableDevices.forEach((device, i) => {
        command += ` ${device}`;
        if (applicableDevices.length - 1 !== i) {
          command += ' and';
        }
      });
      command += ` to ${selectedColor}`;
      await commandHandler(command);
    }

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
    <ColorPreviewBlock selectedColor={selectedColor} /> 
    <!-- TODO: Handle the unchanged case where you don't want to show a color here yet. -->
    <BrightnessBlock {setBrightness} initialBrightness={brightness} />
    <ButtonBlock
      bgColor="rgb(245, 57, 96)"
      text="Back"
      onClick={goBack}
      customStyle="border-right: 1px solid black" />
    <ButtonBlock bgColor="rgb(14, 173, 105)" text="Submit" onClick={submitChanges} />
  </div>
</main>
