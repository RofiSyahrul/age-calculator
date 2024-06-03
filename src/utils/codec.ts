// adapted from https://github.com/pveyes/katla/blob/main/utils/codec.ts
// https://github.com/pveyes/katla

const toBase64 = (value: string) => {
  if (typeof window === 'undefined') {
    return Buffer.from(value).toString('base64');
  }

  return btoa(value);
};

const fromBase64 = (value: string) => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes.buffer);
};

export function encode(value: string): string {
  const base64 = toBase64(value);

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

  return newStr + String(numberOfEqualSign);
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

  return fromBase64(base64);
}
