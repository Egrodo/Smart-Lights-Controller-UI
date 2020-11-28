<script lang="ts">
  import Block from './components/Block.svelte';
  import BlockSchema from './constants/BlockSchema';

  // Data structure that defines how the UI looks which each preset (array item) being 1/4th of the screen horizontally
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
  {#each BlockSchema as preset}
    <Block {preset} />
  {/each}
</div>
