<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import throttle from '../helpers/throttle';

  export let setSelectedColor;

  const ColorPickerImgSrc = 'assets/ColorPicker.png';
  const pickerImg = new Image();
  pickerImg.src = ColorPickerImgSrc;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  const debouncedSetSelectedColor = throttle(setSelectedColor, 200);

  const onImageLoad = () => {
    pickerImg.height = canvas.height;
    pickerImg.width = canvas.width;
    // Draw the image to the canvas
    context = canvas.getContext('2d');
    context.drawImage(pickerImg, 0, 0, canvas.width, canvas.height);
  };

  const canvasClickListener = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const imgData = context.getImageData(x, y, 1, 1);
    const red = imgData.data[0];
    const green = imgData.data[1];
    const blue = imgData.data[2];
    debouncedSetSelectedColor(`rgb(${red}, ${green}, ${blue})`);
  };

  const canvasTouchMoveListener = (e: TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    const touch = e.touches[0];

    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;
    const imgData = context.getImageData(x, y, 1, 1);
    const red = imgData.data[0];
    const green = imgData.data[1];
    const blue = imgData.data[2];
    debouncedSetSelectedColor(`rgb(${red}, ${green}, ${blue})`);
  };

  onMount(() => {
    pickerImg.addEventListener('load', onImageLoad);
    canvas.addEventListener('click', canvasClickListener);
    canvas.addEventListener('touchmove', canvasTouchMoveListener);
  });

  onDestroy(() => {
    pickerImg.removeEventListener('load', onImageLoad);
    canvas.removeEventListener('click', canvasClickListener);
    canvas.removeEventListener('touchmove', canvasTouchMoveListener);
  });
</script>

<style>
  .ColorPickerBlock {
    border-bottom: 1px solid black;
    grid-column: span 2;
  }

  canvas {
    height: 100%;
    width: 100%;
    cursor: crosshair;
  }
</style>

<div class="ColorPickerBlock"><canvas bind:this={canvas} /></div>
