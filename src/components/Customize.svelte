<script lang="ts">
  import { DeviceState, CurrentSelections } from '../stores';
  import commandHandler from '../helpers/commandHandler';

  import DeviceBlock from './DeviceBlock.svelte';
  import ColorPickerBlock from './ColorPickerBlock.svelte';
  import ColorPreviewBlock from './ColorPreviewBlock.svelte';
  import ButtonBlock from './ButtonBlock.svelte';

  import type { Device, DeviceState as DeviceStateType, Pages } from '../types';

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

  async function powerToggle(name: string): Promise<void> {
    let deviceOn;

    DeviceState.update((prevState) => {
      // If on turn off & vice versa.
      const prevDevices = prevState.devices;
      const relevantDevice = prevDevices.find((dev) => dev.name === name);
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
  }
</style>

<main class="Customize">
  <div class="leftHalf">
    {#each $DeviceState.devices as device}
      <DeviceBlock {device} {handleSelect} {powerToggle} selected={$CurrentSelections.includes(device.name)} />
    {/each}
  </div>
  <div class="rightHalf" />
</main>
