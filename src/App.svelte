<script lang="ts">
  import Router from './components/Router.svelte';
  import type { Pages } from './types';

  document.title = 'Light Control App';
  const initPage: Pages = 'main';
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

    /* The resolution of the screen that the pi will be rendering to */
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
  <Router {initPage} />
</div>
