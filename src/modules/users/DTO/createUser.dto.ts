import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  registerDecorator,
  ValidateIf,
  ValidationOptions,
} from 'class-validator';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'matchKeys', async: false })
export class matchKeys implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return args.object[args.property] === args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.constraints[0]} and ${args.property} don't match`;
  }
}

export function IsMatch(
  constraints: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints,
      validator: matchKeys,
    });
  };
}

export class CreateUserDTO {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @Length(3, 15, { message: 'name length must be between 3 and 15 characters' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsStrongPassword()
  password: string;

  @ValidateIf((data: CreateUserDTO) => {
    return Boolean(data.password);
  })
  @IsMatch(['password'])
  cPassword: string;

  @IsNotEmpty({ message: 'age is required' })
  @IsInt()
  age: number;
}
