// adapted from https://github.com/pveyes/katla/blob/main/utils/codec.ts
// https://github.com/pveyes/katla

export function encode(value: string): string {
  const base64 = Buffer.from(value).toString('base64');
  const eqSuffixRegExp = /=*$/;
  const numberOfEqualSign =
    base64.match(eqSuffixRegExp)?.[0]?.length ?? 0;
  const base64Str = base64.replace(eqSuffixRegExp, '');

  let newStr = '';
  const additions = [2, 1, -1, -2];
  for (let i = 0; i < base64Str.length; i++) {
    const charCode = base64Str.charCodeAt(i) + additions[i % 4];
    newStr += String.fromCharCode(charCode);
  }

  return newStr + numberOfEqualSign;
}

export function decode(hash: string): string {
  const totalChar = hash.length;
  const encoded = hash.substring(0, totalChar - 1);

  let base64 = '';
  const additions = [-2, -1, 1, 2];
  for (let i = 0; i < encoded.length; i++) {
    const charCode = encoded.charCodeAt(i) + additions[i % 4];
    base64 += String.fromCharCode(charCode);
  }

  const numberOfEqualSigns = Number(hash.substring(totalChar - 1));
  const equalSign = '='.repeat(numberOfEqualSigns);
  base64 += equalSign;

  return Buffer.from(base64, 'base64').toString();
}
