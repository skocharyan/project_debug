import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

export function IsPassword(
  property: string,
  validationOptions?: ValidationOptions
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsPasswordCorrect
    });
  };
}

@ValidatorConstraint({ name: 'isPassword', async: false })
export class IsPasswordCorrect implements ValidatorConstraintInterface {
  validate(value: string) {
    // const [errorMessage] = args.constraints;
    const isValid =
      /(?=^.{8,}$)(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[0-9])/.test(
        value
      );

    if (!isValid) {
      return false;
    }

    return isValid;
  }

  defaultMessage() {
    return 'Password is too weak';
  }
}
