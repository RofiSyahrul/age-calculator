export default function singleLine(
  multilineString: TemplateStringsArray,
  ...values: unknown[]
): string {
  const stringArray = multilineString.raw.map(str =>
    str.replace(/[\n\r]+ */g, ' '),
  );
  return String.raw({ raw: stringArray }, ...values);
}
