<script lang="ts">
  import { IsLoadingLock } from "../stores";
  import Spinner from "../assets/LoaderIcon.svelte";
  import shouldDisplayBlackText from "../helpers/shouldDisplayBlackText";
  import type { Device } from "../types";
  import type { Entities } from '../types';

  export let handleSelect: (device: Entities) => void;
  export let powerToggle: (device: Entities) => Promise<void>;
  export let selected: boolean;
  export let device: Device;

  // Get preset name, current color, on/off status.
  $: device_name = device.name;
  $: device_friendly_name = device.friendlyName;
  $: device_on = device.on;
  $: device_color = device.color;

  let isLoadingLocal = false;

  async function handleOnOff() {
    if ($IsLoadingLock === true) return;
    isLoadingLocal = true;
    $IsLoadingLock = true;
    await powerToggle(device_name);
    $IsLoadingLock = false;
    isLoadingLocal = false;
  }
</script>

<style>
  .DeviceBlock {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border: 1px solid black;
  }

  .topBlock {
    cursor: pointer;
    text-align: center;
    grid-column: span 2;
    background: white;
  }

  .topBlock > h1 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0.5rem 0 0.2rem 0;
  }

  .topBlock > h3 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    color: #6b6b6b;
  }

  .onOffBtn {
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .currColor {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>

<main class="DeviceBlock">
  <div
    class="topBlock"
    on:click={() => handleSelect(device_name)}
    style="background: {selected ? '#FAFFAE' : 'white'}">
    <h1>{device_friendly_name}</h1>
    <h3>{selected ? 'Selected' : 'Select for modification'}</h3>
  </div>
  <div
    class="onOffBtn"
    on:click={handleOnOff}
    style="background: {device_on ? '#0EAD69' : '#F53960'}">
    {#if isLoadingLocal === true}
      <Spinner width="50px" fill="white" />
    {:else}{device_on ? 'On' : 'Off'}{/if}
  </div>
  <div
    class="currColor"
    style="background: rgb({device_color[0]}, {device_color[1]}, {device_color[2]}); color: {shouldDisplayBlackText(device_color) ? 'black' : 'white'}">
    Current Color
  </div>
</main>
