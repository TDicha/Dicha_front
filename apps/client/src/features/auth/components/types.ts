export type SignupStep = "terms" | "details" | "complete";
export type SignupProgress = 1 | 2 | 3;
export type AgreementKey = "terms" | "privacy" | "age" | "marketing";

export type AgreementState = Record<AgreementKey, boolean>;

export interface SignupAgreementRow {
  key: AgreementKey;
  label: string;
  required: boolean;
}

export interface PasswordChecks {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasLength: boolean;
  hasEnoughTypes: boolean;
}
