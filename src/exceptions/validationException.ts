import { ValidationError } from "../validators";
import { BaseException } from "./baseException";

export class ValidationException extends BaseException {
  constructor(public readonly errors: ValidationError[]) {
    super("Validation failed", "VALIDATION_ERROR");
    this.name = "ValidationException";
  }

  /**
   * Obtiene los errores agrupados por campo.
   */
  public getErrorsByField(): Record<string, string[]> {
    const grouped: Record<string, string[]> = {};

    for (const error of this.errors) {
      if (!grouped[error.field]) grouped[error.field] = [];
      grouped[error.field].push(error.message);
    }

    return grouped;
  }
}
