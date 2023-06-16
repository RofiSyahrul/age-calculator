/* global chrome  */

import { DEFAULT_COLORS } from '~/config/colors';
import type { ColorName } from '~/types/colors';

interface StorageKeyValuePair extends Record<ColorName, string> {
  dob: Date;
}

type StorageKey = keyof StorageKeyValuePair;

const DEFAULT_BIRTHDATE = '1997-06-18T00:00:00+07:00';

const ALL_STORAGE_KEYS: StorageKey[] = [
  'dob',
  'background',
  'primary',
  'secondary',
  'text',
];

function convertValue<T extends StorageKey = StorageKey>(
  key: T,
  value?: string | null,
): StorageKeyValuePair[T] {
  if (key === 'dob') {
    return new Date(
      value || DEFAULT_BIRTHDATE,
    ) as StorageKeyValuePair[T];
  }
  return (value ||
    DEFAULT_COLORS[key as ColorName]) as StorageKeyValuePair[T];
}

export async function getStorageValue<T extends StorageKey>(
  key: T,
): Promise<StorageKeyValuePair[T]> {
  let rawValue: string | null;

  try {
    const result = (await chrome.storage.local.get([key])) as Record<
      StorageKey,
      string
    >;
    rawValue = result[key];
  } catch {
    rawValue = localStorage.getItem(key);
  }

  return convertValue(key, rawValue);
}

export async function getStorageValues(): Promise<StorageKeyValuePair> {
  try {
    const rawValues = (await chrome.storage.local.get(
      ALL_STORAGE_KEYS,
    )) as Partial<Record<StorageKey, string>>;

    const convertedValues = {} as unknown as StorageKeyValuePair;
    ALL_STORAGE_KEYS.forEach(key => {
      convertedValues[key] = convertValue(
        key,
        rawValues[key],
      ) as string & Date;
    });

    return convertedValues;
  } catch {
    const convertedValues = {} as unknown as StorageKeyValuePair;
    ALL_STORAGE_KEYS.forEach(key => {
      convertedValues[key] = convertValue(
        key,
        localStorage.getItem(key),
      ) as string & Date;
    });
    return convertedValues;
  }
}

export async function setStorageValue<T extends StorageKey>(
  key: T,
  value: StorageKeyValuePair[T],
): Promise<void> {
  const stringifiedValue =
    value instanceof Date ? value.toISOString() : value;

  if (typeof stringifiedValue !== 'string') return;

  try {
    await chrome.storage.local.set({ [key]: stringifiedValue });
  } catch (error) {
    localStorage.setItem(key, stringifiedValue);
  }
}
