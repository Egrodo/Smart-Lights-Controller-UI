<script lang="ts">
  import shouldDisplayBlackText from '../helpers/shouldDisplayBlackText';

  export let selectedColor: [number, number, number] = [255, 255, 255];

  const [red, green, blue] = selectedColor;
</script>

<style>
  .ColorPreviewBlock {
    height: 100%;
    width: 100%;
    grid-column: span 2;
    border-bottom: 1px solid black;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ColorPreviewBlock > h1 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0.5rem 0 0.2rem 0;
  }
</style>

<div class="ColorPreviewBlock" style="background: rgb({red}, {green}, {blue})}">
  <h1 style="color: {selectedColor && !shouldDisplayBlackText(selectedColor) ? 'white' : 'black'}">
    {selectedColor ? 'Selected Color' : 'Select a Color to Preview'}
  </h1>
</div>
