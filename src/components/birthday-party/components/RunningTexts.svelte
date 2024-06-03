<script lang="ts">
  import { age } from '~/stores/birthdate';

  export let texts: string[];

  const parseRunningText = (rawText: string, year?: number) => {
    if (!rawText.includes('${year}')) return rawText;
    return rawText.replaceAll(/\$\{year\}/g, (year ?? '').toString());
  };
</script>

<div class="running-texts">
  <ul style:animation-duration={`${4 * texts.length}s`}>
    {#each texts as text}
      <li>{parseRunningText(text, $age.year)}</li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .running-texts {
    position: absolute;
    bottom: 0;
    z-index: 3;
    width: 100%;
    padding: 8px 0;
    overflow: hidden;
    background-color: var(--color-primary);
    box-shadow: var(--shadow-low);
  }

  ul {
    display: flex;
    align-items: center;
    width: max-content;
    margin: 0;
    padding: 0;
    overflow: hidden;
    color: var(--color-secondary);
    font-size: 22px;
    font-family: var(--font-family);
    line-height: 24px;
    white-space: nowrap;
    vertical-align: middle;
    list-style: none;
    animation: right-to-left-marquee linear infinite;

    @include md {
      font-size: 14px;
      line-height: 18px;
    }
  }

  li {
    display: flex;
    align-items: center;

    &:not(:last-child)::after {
      margin: 0 4px;
      font-size: 12px;
      line-height: 16px;
      content: '●';
    }
  }

  @keyframes right-to-left-marquee {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(-100%);
    }
  }
</style>
