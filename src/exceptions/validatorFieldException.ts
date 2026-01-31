import { BaseException } from "./baseException";

export class ValidatorFieldException extends BaseException {
  constructor() {
    super("No field selected. Call field() first.", "VALIDATOR_FIELD_ERROR");
    this.name = "ValidatorFieldException";
  }
}
