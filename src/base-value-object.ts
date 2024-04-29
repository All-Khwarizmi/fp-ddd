import { Either, getOrElseW, isRight } from "fp-ts/lib/Either";
import Failure from "./failure";
import { pipe } from "fp-ts/lib/function";
import { CustomError } from "./custom-error";
import isEqual from "lodash.isequal";

/**
 * @description An immutable type that is distinguishable only by the state of its properties
 */
export abstract class ValueObject<T> {
  equals(other: unknown): boolean {
    throw new Error("Method not implemented.");
  }
  hashCode(): number {
    throw new Error("Method not implemented.");
  }
  /**
   *
   * @description The value contained in `this` object
   * @returns Either `T` or a `Failure`
   * @advise You should not access the value, nor try to modify it. Create an other object value instead. To check for validity, use the {@link isValid} method.
   */
  abstract readonly value: Either<Failure<T>, T>;

  /**
   *
   * @description Whether or not the value is valid
   * @returns `boolean`
   */
  public isValid(): boolean {
    return isRight(this.value);
  }

  /**
   *
   * @description Force access to `this` value.
   * @returns `T` or crashes the application
   */
  public getOrCrash(): T {
    return pipe(
      this.value,
      getOrElseW(() => {
        throw new CustomError(
          this.value,
          "Crash",
          "Unexpected error occured accessing value object value",
          "Value object"
        );
      })
    );
  }

  /**
   *
   * @description Considers if `this` is equal to `other`
   * @param other
   * @returns `boolean`
   */
  isEqual(other: this): boolean {
    return isEqual(this.value, other.value);
  }
}
