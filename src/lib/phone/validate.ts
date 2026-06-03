import {
  isPossiblePhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

const COUNTRY_LABELS: Partial<Record<CountryCode, string>> = {
  GB: "UK",
  US: "US",
  FR: "French",
  IE: "Irish",
  DE: "German",
};

export function isPhonePossible(value: string): boolean {
  if (!value.trim()) return false;
  try {
    return isPossiblePhoneNumber(value);
  } catch {
    return false;
  }
}

export function toE164(value: string): string | null {
  const parsed = parsePhoneNumberFromString(value);
  if (!parsed?.isPossible()) return null;
  return parsed.format("E.164");
}

export function getPhoneValidationError(value: string): string | null {
  if (!value.trim()) {
    return "Enter your phone number";
  }

  if (isPhonePossible(value)) {
    return null;
  }

  const parsed = parsePhoneNumberFromString(value);
  if (parsed?.country) {
    const label = COUNTRY_LABELS[parsed.country] ?? parsed.country;
    return `Enter a valid ${label} phone number`;
  }

  return "Enter a valid phone number for the selected country";
}
