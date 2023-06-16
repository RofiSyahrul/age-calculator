<script lang="ts">
  import { DEFAULT_COLORS } from '~/config/colors';
  import { colors, isDefaultColors } from '~/stores/colors';
  import type { ColorName } from '~/types/colors';
  import { setStorageValue } from '~/utils/storage';

  let className = '';
  export { className as class };

  const COLOR_NAMES = Object.keys(DEFAULT_COLORS) as ColorName[];

  function handleClick() {
    $colors = { ...DEFAULT_COLORS };
    Promise.all(
      COLOR_NAMES.map(colorName => setStorageValue(colorName, '')),
    );
  }
</script>

<button
  class={className}
  disabled={$isDefaultColors}
  on:click={handleClick}
>
  Reset colors to default
</button>

<style lang="scss">
  button {
    --bg-btn: var(--color-secondary);

    align-self: flex-end;
    width: fit-content;
    max-width: 100%;
    min-height: 40px;
    padding: 0 12px;
    color: var(--color-background);

    &:not(:disabled) {
      box-shadow: var(--shadow-high);
    }
  }
</style>
