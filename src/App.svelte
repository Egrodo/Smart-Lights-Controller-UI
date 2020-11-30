<script lang="ts">
  import { onMount } from 'svelte';
  import { NearestColorFn } from './stores';
  import sendCommands from './helpers/commandHandler';
  import findNearestColor from './helpers/findNearestColor';
  import CompatibleColors from './constants/CompatibleColors';
  import Router from './components/Router.svelte';
  import type { Pages } from './types';

  document.title = 'Light Control App';
  const initPage: Pages = 'main';

  // Turn on all lights when starting the application so as to sync the realworld with our initial store.
  // Hopefully this will not happen often as the application should run continuously without restarting.
  onMount(() => {
    // Changing the color of lights also turns them on.
    sendCommands('Change all bedroom lights to ivory'); // Ivory -> #FFFFF0

    // Setup the nearest color checker
    $NearestColorFn = findNearestColor.from(CompatibleColors);
  });
</script>

<style>
  @font-face {
    font-family: 'ProductSans';
    font-style: normal;
    font-weight: 400;
    src: url('ProductSans.ttf') format('truetype');
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: ProductSans, Helvetica, sans-serif;

    /* The resolution of the screen that the pi will be rendering to */
    width: 800px;
    height: 480px;
    user-select: none;
  }

  .App {
    height: 100%;
    width: 100%;
  }
</style>

<div class="App">
  <Router {initPage} />
</div>
