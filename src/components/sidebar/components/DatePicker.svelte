<script lang="ts">
  import type InlineCalendar from 'svelte-calendar/components/InlineCalendar.svelte';
  import type { ThemeProps } from 'svelte-calendar/components/generic/Theme.svelte';
  import { dark as defaultTheme } from 'svelte-calendar/config/theme';
  import blurr from 'svelte-calendar/directives/blurr';
  import type datepicker from 'svelte-calendar/stores/datepicker';

  import { birthdate } from '~/stores/birthdate';
  import { formatDate } from '~/utils/date';

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
          hover: 'var(--color-secondary)',
          primary: 'var(--color-background)',
        },
        border: 'transparent',
        text: {
          highlight: 'var(--color-primary)',
          primary: 'var(--color-text)',
        },
      },
      shadow: 'var(--shadow-medium)',
      width: 'var(--picker-width)',
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

  $: if ($calendarStore?.hasChosen) {
    isOpen = false;
    $calendarStore.hasChosen = false;
  }
</script>

<div
  use:blurr
  on:blurr={() => (isOpen = false)}
  class={className}
  class:datepicker={true}
>
  <label class="trigger">
    Birthdate
    <button on:click={() => (isOpen = !isOpen)}>
      {formattedDate}
    </button>
  </label>
  {#if Calendar}
    <div class="calendar" aria-hidden={!isOpen}>
      <svelte:component
        this={Calendar}
        end={endDate}
        {defaultTheme}
        {theme}
        bind:store={calendarStore}
        bind:selected={$birthdate}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  .datepicker {
    position: relative;
  }

  .trigger {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
    color: var(--color-text);
    background-color: var(--color-primary);
    border-radius: 8px;
    box-shadow: var(--shadow-medium);
    cursor: pointer;
    opacity: 0;
    transition-property: opacity;

    button {
      --bg-btn: transparent;

      color: inherit;
    }
  }

  .calendar {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 4px;

    &[aria-hidden='true'] {
      display: none;
    }

    :global(.grid) {
      border-radius: 8px;

      :global(.controls) {
        border-radius: 8px 8px 0 0;
      }
    }
  }

  @include sidebar-open {
    .trigger {
      opacity: 1;
    }
  }
</style>
