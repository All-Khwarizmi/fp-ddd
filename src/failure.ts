import { FailureProps } from "./types";

/**
 * @description A base class to handle failures
 * @param invalidValue
 * @param message
 * @param code is optional
 * @method invalidValue
 * @method parseFailure
 * @method databaseFailure
 */
export class Failure<T> {
  readonly invalidValue: T;
  readonly message: string;
  readonly code?: string;
  private constructor(props: FailureProps<T>) {
    this.invalidValue = props.invalidValue;
    this.message = props.message;
    this.code = props.code;
  }
  public static invalidValue<T>({
    invalidValue,
    message,
    code,
  }: FailureProps<T>): Failure<string> {
    const str = JSON.stringify(invalidValue);
    return new Failure({
      invalidValue: str,
      message,
      code: `${code ?? `Error(${invalidValue})`}`,
    });
  }
}

export default Failure;
