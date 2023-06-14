<script lang="ts">
  import { age } from '~/stores/birthdate';
  import type { AgeKey } from '~/types/age';

  let className = '';

  export { className as class };
  export let unit: AgeKey;
</script>

<span class={className}>
  {$age[unit]}
</span>
