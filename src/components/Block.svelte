<script lang="ts">
  import genBackgroundString from '../helpers/genBackgroundString';
  import type { PresetSchema } from '../types';
  export let preset: PresetSchema;

  const hexColors = ['#FFCC00', '#000000']; // Setting as yellow-to-black gradient by default, should be overriden.
  const blockCount = preset.rowCount;

  const rows = preset.rows;
</script>

<style>
  .Main {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: repeat(1fr);
    grid-gap: 0;
  }

  .row {
    cursor: pointer;
    height: 100%;
  }

  .title {
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }
</style>

<main class="Main">
  {#each rows as row}
    <div class="row" style="background: {genBackgroundString(row.bgColors, row.gradientDirection === 'diagonal')}">
      <p class="title" style="color: {row.textColor}">{row.title}</p>
    </div>
  {/each}
</main>
