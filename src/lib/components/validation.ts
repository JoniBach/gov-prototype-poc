// validation.ts - Accessible validation rules for form components

// Validation functions return null if valid, or error message string if invalid

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export class FieldValidator {
  static required(value: string): ValidationResult {
    const trimmed = value.trim();
    return {
      isValid: trimmed.length > 0,
      message: trimmed.length > 0 ? undefined : 'This field is required'
    };
  }

  static email(value: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(value),
      message: emailRegex.test(value) ? undefined : 'Enter a valid email address'
    };
  }

  static minLength(min: number) {
    return (value: string): ValidationResult => {
      return {
        isValid: value.length >= min,
        message: value.length >= min ? undefined : `Must be at least ${min} characters`
      };
    };
  }

  static maxLength(max: number) {
    return (value: string): ValidationResult => {
      return {
        isValid: value.length <= max,
        message: value.length <= max ? undefined : `Must be ${max} characters or less`
      };
    };
  }

  static numeric(value: string): ValidationResult {
    const num = parseFloat(value);
    return {
      isValid: !isNaN(num) && isFinite(num),
      message: (!isNaN(num) && isFinite(num)) ? undefined : 'Must be a number'
    };
  }

  static pattern(regex: RegExp, errorMessage: string) {
    return (value: string): ValidationResult => {
      return {
        isValid: regex.test(value),
        message: regex.test(value) ? undefined : errorMessage
      };
    };
  }

  // For checkboxes/radios - at least one selected
  static atLeastOne(values: string[]): ValidationResult {
    return {
      isValid: values.length > 0,
      message: values.length > 0 ? undefined : 'Select at least one option'
    };
  }
}

// Validation rule map for string-based configuration
export const ValidationRules: Record<string, (value: any, params?: any) => ValidationResult> = {
  required: FieldValidator.required,
  email: FieldValidator.email,
  numeric: FieldValidator.numeric,
  minLength: (value: string, min: number) => FieldValidator.minLength(min)(value),
  maxLength: (value: string, max: number) => FieldValidator.maxLength(max)(value),
  atLeastOne: FieldValidator.atLeastOne,
  // Add more as needed
};

// Component-specific validation rules
export const ComponentValidations = {
  TextInput: {
    required: FieldValidator.required,
    email: FieldValidator.email,
    numeric: FieldValidator.numeric,
    minLength: FieldValidator.minLength,
    maxLength: FieldValidator.maxLength,
    pattern: FieldValidator.pattern,
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
    required: (value: string) => FieldValidator.required(value),
    // Could add date format validation
  },

  FileUpload: {
    required: (value: File | null) => ({
      isValid: value !== null,
      message: value !== null ? undefined : 'Please select a file'
    }),
  },

  CharacterCount: {
    required: FieldValidator.required,
    maxLength: FieldValidator.maxLength,
  },

  PasswordInput: {
    required: FieldValidator.required,
    minLength: FieldValidator.minLength,
    // Could add strength validation
  },
};

// Helper to run multiple validations
export function validateField(validations: ((value: any) => ValidationResult)[], value: any): ValidationResult {
  for (const validation of validations) {
    const result = validation(value);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}

// Helper to validate by rule names
export function validateByRules(rules: string[], value: any, params?: Record<string, any>): ValidationResult {
  for (const rule of rules) {
    if (ValidationRules[rule]) {
      const result = ValidationRules[rule](value, params?.[rule]);
      if (!result.isValid) {
        return result;
      }
    }
  }
  return { isValid: true };
}
