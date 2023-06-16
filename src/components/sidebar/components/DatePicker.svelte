<script lang="ts">
  import type InlineCalendar from 'svelte-calendar/components/InlineCalendar.svelte';
  import type { ThemeProps } from 'svelte-calendar/components/generic/Theme.svelte';
  import { dark as defaultTheme } from 'svelte-calendar/config/theme';
  import blurr from 'svelte-calendar/directives/blurr';
  import type datepicker from 'svelte-calendar/stores/datepicker';

  import { birthdate } from '~/stores/birthdate';
  import { formatDate } from '~/utils/date';
  import { setStorageValue } from '~/utils/storage';

  let className = '';
  export { className as class };

  let Calendar: typeof InlineCalendar;
  let isOpen = false;
  let calendarStore: ReturnType<(typeof datepicker)['get']>;

  const endDate = new Date();
  const theme: DeepPartial<ThemeProps['defaultTheme']> = {
    calendar: {
      colors: {
        background: {
          highlight: 'var(--color-text)',
          hover: 'var(--color-primary)',
          primary: 'var(--color-background)',
        },
        border: 'transparent',
        text: {
          highlight: 'var(--color-primary)',
          primary: 'var(--color-text)',
        },
      },
      shadow: 'var(--shadow-medium)',
      width: 'var(--popover-width)',
    },
  };

  $: formattedDate = formatDate($birthdate);
  $: if (isOpen && !Calendar) {
    import('svelte-calendar/components/InlineCalendar.svelte').then(
      async component => {
        Calendar = component.default;
      },
    );
  }

  $: if ($calendarStore?.hasChosen && $calendarStore?.selected) {
    isOpen = false;
    $calendarStore.hasChosen = false;
    setStorageValue('dob', $calendarStore.selected);
  }
</script>

<div
  use:blurr
  on:blurr={() => (isOpen = false)}
  class={className}
  class:datepicker={true}
>
  <label class="trigger" title="Change birthdate here">
    Birthdate
    <button on:click={() => (isOpen = !isOpen)}>
      {formattedDate}
    </button>
  </label>
  {#if Calendar}
    <dialog class="calendar" open={isOpen}>
      <svelte:component
        this={Calendar}
        end={endDate}
        {defaultTheme}
        {theme}
        bind:store={calendarStore}
        bind:selected={$birthdate}
      />
    </dialog>
  {/if}
</div>

<style lang="scss">
  .datepicker {
    position: relative;
  }

  .trigger {
    justify-content: space-between;

    button {
      --bg-btn: transparent;

      color: inherit;
    }
  }

  .calendar {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: var(--popover-z-index);
    display: none;
    justify-content: center;
    width: 100%;
    margin-top: 4px;

    &[open] {
      display: flex;
    }

    :global(.grid) {
      border-radius: 8px;

      :global(.controls) {
        border-radius: 8px 8px 0 0;
      }

      :global(a) {
        user-select: none;
      }
    }
  }
</style>
