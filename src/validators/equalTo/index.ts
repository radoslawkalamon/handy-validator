import { HandyValidatorPlugin } from '../../HandyValidatorPlugin';

/**
 * equalTo Validator
 * @version 2.0.0
 */
export class EqualToValidator extends HandyValidatorPlugin {
  static errors = {
    elementsNotArray: 'HVP_EQUAL_TO_ELEMENTS_NOT_ARRAY',
  };

  public validate(value: unknown, elements: unknown[] = []): boolean {
    this.argsValidations(elements);
    return elements.includes(value);
  }

  private argsValidations(elements: unknown[]) {
    const validations = [
      {
        condition: Array.isArray(elements),
        assumption: false,
        error: EqualToValidator.errors.elementsNotArray,
      },
    ];
    this.processValidations(validations);
  }
}
