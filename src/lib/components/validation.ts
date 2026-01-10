// validation.ts
// Accessible, GOV.UK-style validation rules for form components

import z from "zod";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export class FieldValidator {
  /* -------------------- BASIC -------------------- */

  static required(value: string): ValidationResult {
    const trimmed = value?.trim?.() ?? '';
    return {
      isValid: trimmed.length > 0,
      message: trimmed.length > 0 ? undefined : 'This field is required',
    };
  }

  static email(value: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(value),
      message: emailRegex.test(value)
        ? undefined
        : 'Enter a valid email address',
    };
  }

  static numeric(value: string): ValidationResult {
    const num = Number(value);
    return {
      isValid: !isNaN(num) && isFinite(num),
      message: !isNaN(num) && isFinite(num)
        ? undefined
        : 'Must be a number',
    };
  }

  /* -------------------- LENGTH -------------------- */

  static minLength(min: number) {
    return (value: string): ValidationResult => ({
      isValid: value.length >= min,
      message: value.length >= min
        ? undefined
        : `Must be at least ${min} characters`,
    });
  }

  static maxLength(max: number) {
    return (value: string): ValidationResult => ({
      isValid: value.length <= max,
      message: value.length <= max
        ? undefined
        : `Must be ${max} characters or less`,
    });
  }

  static exactLength(len: number) {
    return (value: string): ValidationResult => ({
      isValid: value.length === len,
      message: value.length === len
        ? undefined
        : `Must be exactly ${len} characters`,
    });
  }

  /* -------------------- PATTERN -------------------- */

  static pattern(regex: RegExp, errorMessage: string) {
    return (value: string): ValidationResult => ({
      isValid: regex.test(value),
      message: regex.test(value) ? undefined : errorMessage,
    });
  }

  /* -------------------- UK-SPECIFIC -------------------- */

  static ukPostcode(value: string): ValidationResult {
    const postcodeRegex =
      /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;

    const trimmed = value.trim();
    return {
      isValid: postcodeRegex.test(trimmed),
      message: postcodeRegex.test(trimmed)
        ? undefined
        : 'Enter a valid UK postcode',
    };
  }

  static ukPhone(value: string): ValidationResult {
    const phoneRegex =
      /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

    return {
      isValid: phoneRegex.test(value),
      message: phoneRegex.test(value)
        ? undefined
        : 'Enter a valid UK phone number',
    };
  }

  /* -------------------- DATE -------------------- */

  static validDate(value: string): ValidationResult {
    const date = new Date(value);
    const isValid =
      !isNaN(date.getTime()) && value.length >= 8;

    return {
      isValid,
      message: isValid ? undefined : 'Enter a real date',
    };
  }

  static dateInPast(value: string): ValidationResult {
    const date = new Date(value);
    const now = new Date();
    return {
      isValid: date < now,
      message: date < now ? undefined : 'Date must be in the past',
    };
  }

  static dateInFuture(value: string): ValidationResult {
    const date = new Date(value);
    const now = new Date();
    return {
      isValid: date > now,
      message: date > now ? undefined : 'Date must be in the future',
    };
  }

  /* -------------------- NUMERIC RANGE -------------------- */

  static minValue(min: number) {
    return (value: string): ValidationResult => {
      const num = Number(value);
      return {
        isValid: !isNaN(num) && num >= min,
        message: !isNaN(num) && num >= min
          ? undefined
          : `Must be ${min} or more`,
      };
    };
  }

  static maxValue(max: number) {
    return (value: string): ValidationResult => {
      const num = Number(value);
      return {
        isValid: !isNaN(num) && num <= max,
        message: !isNaN(num) && num <= max
          ? undefined
          : `Must be ${max} or less`,
      };
    };
  }

  /* -------------------- MULTI-VALUE -------------------- */

  static atLeastOne(values: string | string[]): ValidationResult {
    const arr = Array.isArray(values) ? values : (values ? [values] : []);
    return {
      isValid: arr.length > 0,
      message: arr.length > 0
        ? undefined
        : 'Select at least one option',
    };
  }

  /* -------------------- FILE UPLOAD -------------------- */

  static fileRequired(value: File | null): ValidationResult {
    return {
      isValid: value !== null,
      message: value !== null ? undefined : 'Please select a file',
    };
  }

  static fileType(allowedTypes: string[]) {
    return (file: File | null): ValidationResult => ({
      isValid: !!file && allowedTypes.includes(file.type),
      message: 'Upload a file of the correct type',
    });
  }

  static fileSize(maxBytes: number) {
    return (file: File | null): ValidationResult => ({
      isValid: !!file && file.size <= maxBytes,
      message:
        'File must be smaller than ' +
        Math.round(maxBytes / 1024 / 1024) +
        'MB',
    });
  }
}

/* -----------------------------------------------------
   STRING-BASED RULE MAP (for schema-driven validation)
----------------------------------------------------- */

export const ValidationRules: Record<
  string,
  (value: any, params?: any) => ValidationResult
> = {
  required: FieldValidator.required,
  email: FieldValidator.email,
  numeric: FieldValidator.numeric,
  ukPostcode: FieldValidator.ukPostcode,
  ukPhone: FieldValidator.ukPhone,
  validDate: FieldValidator.validDate,
  dateInPast: FieldValidator.dateInPast,
  dateInFuture: FieldValidator.dateInFuture,

  minLength: (value: string, min: number) =>
    FieldValidator.minLength(min)(value),

  maxLength: (value: string, max: number) =>
    FieldValidator.maxLength(max)(value),

  exactLength: (value: string, len: number) =>
    FieldValidator.exactLength(len)(value),

  minValue: (value: string, min: number) =>
    FieldValidator.minValue(min)(value),

  maxValue: (value: string, max: number) =>
    FieldValidator.maxValue(max)(value),

  atLeastOne: FieldValidator.atLeastOne,
};

/* -----------------------------------------------------
   COMPONENT-SPECIFIC VALIDATION MAPS
----------------------------------------------------- */

export const ComponentValidations = {
  TextInput: {
    required: FieldValidator.required,
    email: FieldValidator.email,
    numeric: FieldValidator.numeric,
    minLength: FieldValidator.minLength,
    maxLength: FieldValidator.maxLength,
    exactLength: FieldValidator.exactLength,
    pattern: FieldValidator.pattern,
    ukPostcode: FieldValidator.ukPostcode,
    ukPhone: FieldValidator.ukPhone,
  },

  Textarea: {
    required: FieldValidator.required,
    minLength: FieldValidator.minLength,
    maxLength: FieldValidator.maxLength,
    pattern: FieldValidator.pattern,
  },

  Select: {
    required: FieldValidator.required,
  },

  Radios: {
    required: FieldValidator.atLeastOne,
  },

  Checkboxes: {
    required: FieldValidator.atLeastOne,
  },

  DateInput: {
    required: FieldValidator.required,
    validDate: FieldValidator.validDate,
    dateInPast: FieldValidator.dateInPast,
    dateInFuture: FieldValidator.dateInFuture,
  },

  FileUpload: {
    required: FieldValidator.fileRequired,
    fileType: FieldValidator.fileType,
    fileSize: FieldValidator.fileSize,
  },

  CharacterCount: {
    required: FieldValidator.required,
    maxLength: FieldValidator.maxLength,
  },

  PasswordInput: {
    required: FieldValidator.required,
    minLength: FieldValidator.minLength,
  },
};

type ComponentValidatorName = keyof typeof ComponentValidations;


export const validationOptions = (validator: ComponentValidatorName) => z.array(z.enum(
			Object.keys(ComponentValidations[validator]) as [string, ...string[]]
		)).default([])


/* -----------------------------------------------------
   HELPERS
----------------------------------------------------- */

export function validateField(
  validations: ((value: any) => ValidationResult)[],
  value: any
): ValidationResult {
  for (const validation of validations) {
    const result = validation(value);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}

export function runValidations(
  componentValidation: Record<string, any>,
  validators: string[],
  value: any
): string[] {
  const errors: string[] = [];
  for (const validator of validators) {
    if (validator && componentValidation[validator]) {
      const result = componentValidation[validator](value);
      if (result && !result.isValid && result.message && typeof result.message === 'string') {
        errors.push(result.message);
      }
    }
  }
  return errors;
}
