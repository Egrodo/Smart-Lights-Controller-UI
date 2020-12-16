<script lang="ts">
  import Spinner from '../assets/LoaderIcon.svelte';
  import genBackgroundString from '../helpers/genBackgroundString';
  import commandHandler from '../helpers/commandHandler';
  import composeCommands from '../helpers/composeCommands';
  import { DeviceState, IsLoadingLock } from '../stores';
  import type { PresetSchema, PresetCommands, ComposedCommands, Device } from '../types';

  export let preset: PresetSchema;
  export let changePage: (arg: 'main' | 'customize') => void;

  const rows = preset.rows;
  const composedCommands: ComposedCommands = preset.rows.reduce((obj: ComposedCommands, row): ComposedCommands => {
    // Compose the necessary commands for each block.
    if (row.buttonType !== 'command' || row.commands == null) {
      return obj;
    }

    const formattedCommands = composeCommands(row.commands);
    obj[row.title] = { rawCommands: row.commands, formattedCommands };

    return obj;
  }, {});

  let isLoadingLocal = false;
  let loadingBlockName = '';

  async function handleClick({ target }: { target: HTMLDivElement }) {
    if ($IsLoadingLock) return;
    const buttonType = target.getAttribute('data-buttonType');
    if (buttonType === 'command') {
      const title = target.getAttribute('title');
      if (title == null) {
        throw new Error('Block name missing');
      }
      const commands = composedCommands[title];

      if (!commands) {
        throw new Error('Command not found by title');
      }
      isLoadingLocal = true;
      $IsLoadingLock = true;
      loadingBlockName = title;

      await commandHandler(...commands.formattedCommands);
      updateState(commands.rawCommands);
      isLoadingLocal = false;
      $IsLoadingLock = false;
    } else if (buttonType === 'navigation') {
      changePage('customize');
    }
  }

  function updateState(rawCommands: PresetCommands) {
    // Update the state to reflect the changes in colors here
    const newState = $DeviceState;
    const newDevices: Device[] = [];
    newState.devices.forEach((device) => {
      // Is this device modified?
      const modified = rawCommands.find((command) => command.names.includes(device.name));
      if (modified) {
        newDevices.push({
          name: device.name,
          on: modified.on,
          color: modified.color || device.color,
          brightness: device.brightness,
        });
      }
    });
    newState.devices = newDevices;
    $DeviceState = newState;
  }
</script>

<style>
  .Block {
    height: 100%;
    width: 100%;
    display: grid;
    grid-gap: 0;
  }

  .row {
    cursor: pointer;
    height: 100%;
    overflow: hidden;
  }

  .title {
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
  }

  .loaderContainer {
    text-align: center;
  }
</style>

<svelte:options immutable={true} />

<main class="Block" style="grid-template-rows: repeat({preset.rowCount}, 1fr)">
  {#each rows as row}
    <div
      class="row"
      style="background: {genBackgroundString(row.bgColors, row.gradientDirection === 'diagonal')}"
      role="button"
      title={row.title}
      data-buttonType={row.buttonType}
      on:click={handleClick}>
      <p class="title" style="color: {row.textColor}">{row.title}</p>
      <div class="loaderContainer">
        {#if loadingBlockName === row.title && isLoadingLocal === true}
          <Spinner width="100px" fill={row.textColor} />
        {/if}
      </div>
    </div>
  {/each}
</main>
