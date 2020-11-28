<script lang="ts">
  import type { PresetSingle, PresetDouble } from '../types';

  export let preset: PresetSingle | PresetDouble;
  // TODO: Extract data from preset to construct block
  console.log(preset);
</script>

<style>
  .Block {
    height: 100%;
    width: 100%;
    background-color: black;
  }
</style>

<div class="Block">Block</div>
