<script lang="ts">
  import { colord, extend } from 'colord';
  import a11yPlugin from 'colord/plugins/a11y';
  import Picker from 'svelte-awesome-color-picker/components/Picker.svelte';
  import A11yNotice from 'svelte-awesome-color-picker/components/variant/default/A11yNotice.svelte';
  import A11ySingleNotice from 'svelte-awesome-color-picker/components/variant/default/A11ySingleNotice.svelte';
  import A11ySummary from 'svelte-awesome-color-picker/components/variant/default/A11ySummary.svelte';
  import PickerIndicator from 'svelte-awesome-color-picker/components/variant/default/PickerIndicator.svelte';
  import PickerWrapper from 'svelte-awesome-color-picker/components/variant/default/PickerWrapper.svelte';
  import SliderIndicator from 'svelte-awesome-color-picker/components/variant/default/SliderIndicator.svelte';
  import SliderWrapper from 'svelte-awesome-color-picker/components/variant/default/SliderWrapper.svelte';
  import TextInput from 'svelte-awesome-color-picker/components/variant/default/TextInput.svelte';
  import Alpha from 'svelte-awesome-color-picker/components/Alpha.svelte';
  import Slider from 'svelte-awesome-color-picker/components/Slider.svelte';
  import type {
    A11yColor,
    Components,
  } from 'svelte-awesome-color-picker/type/types';

  import { isHsvEqual, isRgbEqual } from './utils';

  extend([a11yPlugin]);

  export let a11yColors: A11yColor[] = [{ hex: '#ffffff' }];
  export let hex: string;
  export let isOpen: boolean;

  let color = colord(hex);
  let hsv = color.toHsv();
  let rgb = color.toRgb();
  let isDark = color.isDark();

  let oldHex = hex;
  let oldHsv = { ...hsv };
  let oldRgb = { ...rgb };

  const toRight = false;
  const isA11yOpen = false;
  const isA11yClosable = true;
  const a11yGuidelines =
    '<p style="margin: 0; font-size: 12px;">Learn more at <a href="https://webaim.org/articles/contrast/" target="_blank">WebAIM contrast guide</a></p>';

  const components: Components = {
    a11yNotice: A11yNotice,
    a11ySingleNotice: A11ySingleNotice,
    a11ySummary: A11ySummary,
    alphaIndicator: SliderIndicator,
    alphaWrapper: SliderWrapper,
    pickerIndicator: PickerIndicator,
    pickerWrapper: PickerWrapper,
    sliderIndicator: SliderIndicator,
    sliderWrapper: SliderWrapper,
    textInput: TextInput,
  } as unknown as Components;

  function updateColor() {
    let isUpdated = false;

    if (!isHsvEqual(hsv, oldHsv)) {
      if (hsv.a === undefined) hsv.a = 1;
      color = colord(hsv);
      rgb = color.toRgb();
      hex = color.toHex();
      isUpdated = true;
    } else if (!isRgbEqual(rgb, oldRgb)) {
      if (rgb.a === undefined) rgb.a = 1;
      color = colord(rgb);
      hex = color.toHex();
      hsv = color.toHsv();
      isUpdated = true;
    } else if (hex !== oldHex) {
      if (hex.substring(7) === 'ff') hex = hex.substring(0, 7);
      color = colord(hex);
      rgb = color.toRgb();
      hsv = color.toHsv();
      isUpdated = true;
    }

    if (!isUpdated) return;

    isDark = color.isDark();

    oldHsv = { ...hsv };
    oldRgb = { ...rgb };
    oldHex = hex;
  }

  $: if (hex || rgb || hsv) {
    updateColor();
  }
</script>

<dialog
  aria-label="Color Picker"
  class="color-picker-dialog"
  open={isOpen}
>
  <Picker
    {components}
    h={hsv.h}
    bind:s={hsv.s}
    bind:v={hsv.v}
    {toRight}
    {isDark}
    {isOpen}
  />
  <Slider {components} bind:h={hsv.h} {toRight} />
  <Alpha {components} bind:a={hsv.a} {hex} {toRight} {isOpen} />
  <TextInput
    bind:hex
    bind:rgb
    bind:hsv
    isAlpha
    canChangeMode={false}
  />
  <A11yNotice
    {components}
    {color}
    {hex}
    {a11yColors}
    {a11yGuidelines}
    {isA11yClosable}
    {isA11yOpen}
  />
</dialog>

<style lang="scss">
  .color-picker-dialog {
    --picker-width: 220px;

    position: absolute;
    top: 100%;
    left: 50%;
    z-index: var(--popover-z-index);
    width: var(--popover-width);
    margin: 4px 0;
    padding: 8px 4px 4px 8px;
    background-color: var(--color-background);
    border-radius: 8px;
    box-shadow: var(--shadow-medium);
    transform: translateX(-50%);

    :global(.picker-wrapper) {
      border: 1px solid var(--color-text);
    }

    :global(.text-input) {
      :global(.input-container) {
        :global(input) {
          color: var(--color-background);
          background-color: var(--color-text);

          &:focus-visible {
            outline-color: var(--color-secondary);
          }
        }
      }
    }

    :global(.a11y-notice) {
      color: var(--color-text);

      :global(summary) {
        &:hover {
          color: var(--color-secondary);
        }
      }

      :global(.a11y-single-notice) {
        height: unset;
        min-height: 48px;

        :global(.lorem) {
          border-color: var(--color-text);
        }
      }

      :global(a) {
        color: var(--color-secondary);
      }
    }
  }
</style>
