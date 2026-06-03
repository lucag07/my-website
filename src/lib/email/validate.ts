/**
 * Validates a typical contact email: one @, domain with a dot, TLD ≥ 2 chars, no spaces.
 */
export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (email.length < 5 || email.length > 254) return false;
  if (/\s/.test(email)) return false;

  const atIndex = email.indexOf("@");
  if (atIndex <= 0 || atIndex !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!local || !domain) return false;
  if (!domain.includes(".")) return false;

  const labels = domain.split(".");
  if (labels.some((label) => label.length === 0)) return false;

  const tld = labels[labels.length - 1];
  if (!tld || tld.length < 2) return false;

  const localPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  const domainLabelPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

  if (!localPattern.test(local)) return false;
  if (!labels.every((label) => domainLabelPattern.test(label))) return false;

  return true;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function getEmailValidationError(value: string): string | null {
  if (!value.trim()) {
    return "Enter your email address";
  }
  if (!isValidEmail(value)) {
    return "Enter a valid email (e.g. name@company.com)";
  }
  return null;
}
