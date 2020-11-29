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

{#if page === 'main'}
  {#each BlockSchema as preset}
    <Block {preset} {changePage} />
  {/each}
{:else if page === 'customize'}
  <Customize {changePage} />
{:else}
  <div>Unrecognized page</div>
{/if}
