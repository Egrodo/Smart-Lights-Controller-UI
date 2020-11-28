<script lang="ts">
  import sendCommand from './helpers/sendCommand';
  import Block from './components/Block.svelte';
  import type { PresetSchema } from './types';

  // Data structure that defines how the UI looks which each preset (array item) being 1/4th of the screen horizontally
  const presets: PresetSchema = [
    {
      type: 'double',
      first: {
        title: 'All Red',
        bgColor: ['#D50000'],
        textColor: '#FFFFFF',

        onClick: () => sendCommand('All Red'),
      },
      second: {
        title: 'All Purple',
        bgColor: ['#9A00FF'],
        textColor: '#FFFFFF',

        onClick: () => sendCommand('All Purple'),
      },
    },
    {
      type: 'single',
      title: 'Lights On',
      bgColor: ['#EFEBD8'],
      textColor: '#414141',
      onClick: () => sendCommand('Lights On'),
    },
    {
      type: 'single',
      title: 'Lights Off',
      bgColor: ['#414141'],
      textColor: '#FFFFFF',
      onClick: () => sendCommand('Lights On'),
    },
    {
      type: 'double',
      first: {
        title: 'Gaming',
        bgColor: ['#D50000', '#9A00FF'],
        textColor: '#FFFFFF',
        onClick: () => sendCommand('Gaming'),
      },
      second: {
        title: 'All Purple',
        bgColor: ['#000000'], // TODO: Define the colors here.
        textColor: '#FFFFFF',
        onClick: () => sendCommand('All Purple'),
      },
    },
  ];
</script>

<style>
  @font-face {
    font-family: 'ProductSans';
    font-style: normal;
    font-weight: 400;
    src: url('ProductSans.ttf') format('truetype');
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: ProductSans, Helvetica, sans-serif;

    /* The resolution of our operating device */
    width: 800px;
    height: 480px;
  }

  .App {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0;
    height: 100%;
    width: 100%;
  }
</style>

<div class="App">
  {#each presets as preset}
    <Block {preset} />
  {/each}
</div>
