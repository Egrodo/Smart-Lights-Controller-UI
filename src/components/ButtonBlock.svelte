<script lang="ts">
  import Spinner from '../assets/LoaderIcon.svelte';
  import shouldDisplayBlackText from '../helpers/shouldDisplayBlackText';

  export let bgColor: string = 'rgb(255, 255, 240)';
  export let text: string = 'Button';
  export let customStyle: string = '';

  export let onClick: () => void;

  let amAwaiting = false;

  // For execution of the onClick incase it's a promise that needs awaiting.
  async function onClickWrapper() {
    amAwaiting = true;
    await onClick();
    amAwaiting = false;
  }
</script>

<style>
  .ButtonBlock {
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div
  class="ButtonBlock"
  on:click={onClickWrapper}
  style="background: {bgColor}; color: {shouldDisplayBlackText(bgColor) ? 'black' : 'white'}; {customStyle}">
  {#if amAwaiting === true}
    <Spinner width="50px" fill="white" />
  {:else}{text}{/if}
</div>
