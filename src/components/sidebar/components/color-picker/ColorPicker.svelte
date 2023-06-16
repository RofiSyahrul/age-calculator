<script lang="ts">
  import blurr from 'svelte-calendar/directives/blurr';
  import type { A11yColor } from 'svelte-awesome-color-picker/type/types';

  import type { ColorName } from '~/types/colors';
  import { colors } from '~/stores/colors';
  import { getStorageValue, setStorageValue } from '~/utils/storage';

  interface RawA11yColor {
    name: ColorName;
    isTextColor?: boolean;
  }

  let className = '';
  export { className as class };
  export let colorName: ColorName = 'background';
  export let description = '';

  let isOpen = false;
  let shouldCancel = false;
  let shouldSave = false;
  let Picker: typeof import('./Picker.svelte').default;

  function closePicker() {
    isOpen = false;
    shouldCancel = true;
  }

  function handleClickTriggerButton() {
    if (isOpen) return closePicker();
    isOpen = true;
  }

  async function handleSave() {
    await setStorageValue(colorName, $colors[colorName]);
    shouldSave = false;
  }

  async function handleCancel() {
    const storageValue = await getStorageValue(colorName);
    $colors[colorName] = storageValue;
    shouldCancel = false;
  }

  $: if (shouldSave) {
    handleSave();
  } else if (shouldCancel) {
    handleCancel();
  }

  const buttonID = `color-picker-trigger__${colorName}`;
  const descriptionID = `color-picker-description__${colorName}`;

  const a11yTextColors: RawA11yColor[] = [
    { name: 'text', isTextColor: true },
    { name: 'secondary', isTextColor: true },
  ];

  const a11yBgColors: RawA11yColor[] = [
    { name: 'background' },
    { name: 'primary' },
  ];

  const a11yColorsMapping: Record<ColorName, RawA11yColor[]> = {
    background: a11yTextColors,
    primary: [...a11yTextColors, { name: 'text' }],
    secondary: a11yBgColors,
    text: [...a11yBgColors, { name: 'primary', isTextColor: true }],
  };

  $: a11yColors = a11yColorsMapping[colorName].map<A11yColor>(
    ({ name, isTextColor }) => ({
      hex: $colors[name],
      reverse: isTextColor,
    }),
  );

  $: if (isOpen && !Picker) {
    import('./Picker.svelte').then(mod => {
      Picker = mod.default;
    });
  }
</script>

<div
  use:blurr
  on:blurr={closePicker}
  class={className}
  class:color-picker={true}
>
  <label class="trigger" for={buttonID} title="Change color here">
    <button
      aria-labelledby={descriptionID}
      id={buttonID}
      style:--bg-btn={`var(--color-${colorName})`}
      on:click={handleClickTriggerButton}
    />
    <div id={descriptionID}>{description}</div>
  </label>

  {#if Picker}
    <svelte:component
      this={Picker}
      {a11yColors}
      bind:isOpen
      bind:shouldCancel
      bind:shouldSave
      bind:hex={$colors[colorName]}
    />
  {/if}
</div>

<style lang="scss">
  .color-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .trigger {
    button {
      width: 20px;
      min-height: 20px;
      border: 1px solid var(--color-text);
      border-radius: 50%;
    }
  }
</style>
