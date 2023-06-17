<script lang="ts">
  import { isBirthdayParty } from '~/stores/birthdate';

  let className = '';
  export { className as class };

  let Confetti: typeof import('svelte-confetti').Confetti;

  $: if ($isBirthdayParty && !Confetti) {
    import('svelte-confetti').then(mod => {
      Confetti = mod.Confetti;
    });
  }
</script>

{#if $isBirthdayParty && Confetti}
  <div class={className} class:container={true}>
    <svelte:component
      this={Confetti}
      amount={1000}
      fallDistance="100vh"
      infinite
      xSpread={0.5}
      x={[-5, 5]}
      y={[-5, 5]}
    />
  </div>
{/if}

<style lang="scss">
  .container {
    position: fixed;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100svw;
    height: 100svh;
    overflow: hidden;
  }

  @include sidebar-open {
    .container {
      width: calc(100svw - var(--sidebar-width));
    }
  }
</style>
