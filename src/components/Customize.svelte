<script lang="ts">
  import { DeviceState, CurrentSelections, NearestColorFn } from '../stores';
  import commandHandler from '../helpers/commandHandler';
  import delay from '../helpers/delay';

  import DeviceBlock from './DeviceBlock.svelte';
  import ColorPickerBlock from './ColorPickerBlock.svelte';
  import ColorPreviewBlock from './ColorPreviewBlock.svelte';
  import ButtonBlock from './ButtonBlock.svelte';

  import type { Device, NearestColorReturn, DeviceState as DeviceStateType, Pages } from '../types';

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
      await commandHandler(`Turn off ${name}`);
    } else {
      await commandHandler(`Turn on ${name}`);
    }
  }

  // Default to ivory
  let selectedColor: NearestColorReturn = {
    distance: 0,
    name: 'Ivory',
    rgb: {
      r: 255,
      g: 255,
      b: 240,
    },
    value: 'rgb(255, 255, 240)',
  };

  function setSelectedColor(pickedColor: string): void {
    // Find the nearest color to pickedColor in CompatibleColors
    const nearestColor: NearestColorReturn = $NearestColorFn(pickedColor);
    selectedColor = nearestColor;
  }

  // Send commands to lights to do the needful
  async function submitColorChanges(): Promise<void> {
    // Apply selectedColor to CurrentSelections and modify the DeviceState

    if ($CurrentSelections.length === 0) {
      console.log('No devices selected');
      return; // nothing to do
    }

    // Change the color
    for await (const selectedDevice of $CurrentSelections) {
      console.log(`Applying ${selectedColor.name} to ${selectedDevice}`);
      await commandHandler(`Set ${selectedDevice} to ${selectedColor.name}`);
    }

    // Update the store
    const deviceStateCopy: DeviceStateType = {
      devicesConnected: $DeviceState.devicesConnected,
      devices: [],
    };

    $DeviceState.devices.forEach((device) => {
      if ($CurrentSelections.includes(device.name)) {
        device.color = selectedColor.value;
      }
      deviceStateCopy.devices.push(device);
    });

    console.log($DeviceState);
    console.log(deviceStateCopy);
    $DeviceState = deviceStateCopy;
  }
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
    grid-template-rows: 2fr 1fr 1fr;
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
    <ColorPreviewBlock selectedColor={selectedColor.value} />
    <ButtonBlock
      bgColor="rgb(245, 57, 96)"
      text="Back"
      onClick={() => {
        changePage('main');
        clearSelect();
      }}
      customStyle="border-right: 1px solid black" />
    <ButtonBlock bgColor="rgb(14, 173, 105)" text="Submit" onClick={submitColorChanges} />
  </div>
</main>
