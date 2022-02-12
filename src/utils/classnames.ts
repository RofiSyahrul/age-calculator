export default function classnames(
  ...args: Array<string | null | undefined | Record<string, boolean>>
): string {
  return args
    .reduce<string>((acc, value) => {
      if (!value) return acc;
      if (typeof value === 'object') {
        const truthyKeys: string[] = [];
        for (const key in value) {
          if (value[key]) truthyKeys.push(key);
        }
        return `${acc} ${truthyKeys.join(' ')}`;
      }
      return `${acc} ${value}`;
    }, '')
    .trim();
}
