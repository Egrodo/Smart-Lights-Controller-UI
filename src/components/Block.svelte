<script lang="ts">
  import Spinner from '../assets/LoaderIcon.svelte';
  import genBackgroundString from '../helpers/genBackgroundString';
  import commandHandler from '../helpers/commandHandler';
  import type { PresetSchema } from '../types';

  export let preset: PresetSchema;
  export let changePage: (arg: 'main' | 'customize') => void;

  const rows = preset.rows;
  const commmandByTitle = preset.rows.reduce((obj, row) => {
    if (row.commands === undefined) return obj;
    obj[row.title] = row.commands;
    return obj;
  }, {});

  let isLoading = false;
  let loadingBlockName = '';

  async function handleClick({ target }) {
    if (isLoading) return;
    const buttonType = target.getAttribute('data-buttonType');
    if (buttonType === 'command') {
      const title = target.getAttribute('title');
      const command = commmandByTitle[title];
      if (!command) {
        throw new Error('Command not found by title');
      }
      isLoading = true;
      loadingBlockName = title;
      await commandHandler(...command);
      isLoading = false;
    } else if (buttonType === 'navigation') {
      changePage('customize');
    }
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
        {#if loadingBlockName === row.title && isLoading === true}
          <Spinner width="100px" fill={row.textColor} />
        {/if}
      </div>
    </div>
  {/each}
</main>
