<script lang="ts">
  import { toggleSidebar } from '~/stores/sidebar';

  let className: string;

  export let title: string;
  export { className as class };
</script>

<button
  aria-label={title}
  class={className}
  {title}
  on:click={toggleSidebar}
>
  <slot />
</button>
