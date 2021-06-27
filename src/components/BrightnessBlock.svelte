<script lang="ts">
  import {  onMount } from 'svelte';
  import shouldDisplayBlackText from '../helpers/shouldDisplayBlackText';

  const MOVER_WIDTH = 5;
  const DARKEST_SLIDER_COLOR = 60;

  export let initialBrightness: number;
  export let setBrightness: Function;

  // Transitions the background color from black to white to represent brightness
  let r = DARKEST_SLIDER_COLOR,
    b = DARKEST_SLIDER_COLOR,
    g = DARKEST_SLIDER_COLOR; // Used to transition from blackgray to white

  let containerRef: HTMLDivElement;
  let moverRef: HTMLSpanElement;

  // To keep track of whether the user is holding mouse/finger down on mover.
  let isMoverActive: boolean = false;
  // Range in pixels (updated dynamically on mount) that the mover can move
  let range = [0, 0];
  // Pixel distance from the left that the mover is currently
  let moverDistance = 0;

  function touchDownOnMover() {
    isMoverActive = true;
    document.addEventListener('touchend', touchUp);
    document.addEventListener('touchmove', onMove);
  }

  function touchUp() {
    isMoverActive = false;
    document.removeEventListener('touchend', touchUp);
    document.removeEventListener('touchmove', onMove);
  }

  // If the user clicks a specific point on the track we should jump to that point
  function clickedTrack(e: TouchEvent) {
    const newDistance = e.touches[0].clientX - containerRef.offsetLeft;
    moverDistance = newDistance;
    updateBgColor((moverDistance / containerRef.offsetWidth) * 100);
    touchDownOnMover();
  }

  function onMove(e: TouchEvent) {
    if (!isMoverActive) return;
    let newDistance = e.touches[0].clientX - containerRef.offsetLeft;
    if (newDistance < range[0] && newDistance !== range[0]) {
      newDistance = range[0];
    } else if (newDistance > range[1] && newDistance !== range[1]) {
      newDistance = range[1];
    }

    const newPercent = (moverDistance / containerRef.offsetWidth);

    // Move the mover
    moverDistance = newDistance;
    updateBgColor(newPercent * 100);
    setBrightness(newPercent);
  }

  function updateBgColor(percent: number) {
    // Calculate the number that is percent between DARKEST_SLIDER_COLOR and the max rgb value, 255.
    const rgbDistance = (percent * (255 - DARKEST_SLIDER_COLOR)) / 100 + DARKEST_SLIDER_COLOR;
    r = rgbDistance;
    g = rgbDistance;
    b = rgbDistance;
  }

  onMount(() => {
    range[1] = containerRef.offsetWidth - MOVER_WIDTH;

    // Handle initialBrightness
    if (initialBrightness < 0 || initialBrightness > 1) {
      console.error('initialBrightness prop passed to BrightnessBlock out of range 0-1');
      initialBrightness = 1;
    }
    // Set the initialBrightness by calculating what pixel value initialBrightness% is of containerRef.offsetWidth

    let initBrigtnessPixels = initialBrightness * containerRef.offsetWidth;
    if (initBrigtnessPixels >= containerRef.offsetWidth - MOVER_WIDTH) initBrigtnessPixels -= MOVER_WIDTH;
    moverDistance = initBrigtnessPixels;
    updateBgColor(initialBrightness * 100);

    return () => {
      document.removeEventListener('touchend', touchUp);
      document.removeEventListener('touchmove', onMove);
    }
  });

</script>

<style>
  .BrightnessBlock {
    height: 100%;
    width: 100%;
    grid-column: span 2;
    border-bottom: 1px solid black;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .BrightnessBlock > h1 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0.5rem 0 0.2rem 0;
  }

  .Mover {
    height: 100%;
    cursor: ew-resize;
    background-color: green;
    position: absolute;
    left: 0;
  }
</style>

<div
  class="BrightnessBlock"
  style="background: rgb({r}, {g}, {b})"
  bind:this={containerRef}
  on:touchstart={clickedTrack}>
  <span
    class="Mover"
    bind:this={moverRef}
    on:touchstart={touchDownOnMover}
    style="width: {MOVER_WIDTH}px; left: {moverDistance}px" />

  <h1 style="color: {!shouldDisplayBlackText([r, g, b]) ? 'white' : 'black'}">Brightness</h1>
</div>
