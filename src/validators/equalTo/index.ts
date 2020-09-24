import { HandyValidatorPlugin } from '../../HandyValidatorPlugin';

/**
 * equalTo Validator
 * @version 2.0.0
 */
export class EqualToValidator extends HandyValidatorPlugin {
  static errors = {
    elementsNotAnArray: 'HVP_EQUAL_TO_ELEMENTS_NOT_AN_ARRAY',
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
        error: EqualToValidator.errors.elementsNotAnArray,
      },
    ];
    this.processValidations(validations);
  }
}
