import { Either } from "fp-ts/lib/Either";
import Failure from "./failure";

/**
 * Abstract class representing a Data Transfer Object (DTO).
 * A DTO is responsible for converting data between the domain model and external representations.
 *
 * @template T - The type of the domain model.
 * @template I - The type of the input data.
 * @template O - The type of the output data.
 */
export abstract class DTO<T, I = unknown, O = unknown> {
    /**
     * Converts the domain model to the input data format.
     *
     * @param {T} data - The domain model data to convert.
     * @returns {I} - The converted input data.
     */
    abstract fromDomain({ data }: { data: T }): I;

    /**
     * Converts the output data format to the domain model.
     *
     * @param {O} data - The output data to convert.
     * @returns {Either<Failure<string>, T>} - Either a failure or the converted domain model.
     */
    abstract toDomain({ data }: { data: O }): Either<Failure<string>, T>;
}
