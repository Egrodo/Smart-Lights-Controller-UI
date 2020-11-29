<script lang="ts">
  import Block from './Block.svelte';
  import Customize from './Customize.svelte';
  import BlockSchema from '../constants/BlockSchema';
  import type { Pages } from '../types';

  export let initPage: Pages;
  let page: Pages = initPage;

  function changePage(newPage: typeof page): void {
    page = newPage;
  }
</script>

<style>
  .Main {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0;
  }
</style>

{#if page === 'main'}
  <main class="Main">
    {#each BlockSchema as preset}
      <Block {preset} {changePage} />
    {/each}
  </main>
{:else if page === 'customize'}
  <Customize {changePage} />
{:else}
  <div>Unrecognized page</div>
{/if}
