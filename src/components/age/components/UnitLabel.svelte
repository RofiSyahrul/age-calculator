<script lang="ts">
  import { age } from '~/stores/birthdate';
  import type { AgeKey } from '~/types/age';

  let className = '';

  export { className as class };
  export let unit: AgeKey;

  $: label =
    unit.replace(/^\S/g, match => match.toUpperCase()) +
    ($age[unit]! > 1 ? 's' : '');
</script>

<span class={className}>
  {label}
</span>
