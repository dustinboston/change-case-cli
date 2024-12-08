import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from "change-case";

/**
 * A centralized collection of case transformation functions from the `change-case` library.
 * This object allows dynamic access to these functions by key and simplifies typing across the module.
 * By grouping them here, we can ensure consistent behavior and easily support additional case types if needed.
 *
 * @example
 * ```typescript
 * import { caseFunctions } from '@dustinboston/change-case-cli';
 * const result = caseFunctions.camelCase("test string");
 * console.log(result); // "testString"
 * ```
 */
export const caseFunctions = {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} as const;

/**
 * A union type representing the valid keys of `caseFunctions`.
 * This ensures that only valid case type names can be passed to functions that rely on this type.
 *
 * @example
 * ```typescript
 * import { CaseTypes } from '@dustinboston/change-case-cli';
 * const caseType: CaseTypes = "camelCase"; // Valid
 * // const invalidCaseType: CaseTypes = "invalidCase"; // TypeScript will error
 * ```
 */
export type CaseTypes = keyof typeof caseFunctions;

/**
 * A set of valid case type names derived from the keys of `caseFunctions`.
 * Using a `Set` provides efficient membership checks and prevents runtime errors from invalid case types.
 * This is useful for runtime validation of user input or dynamic case type selection.
 *
 * @example
 * ```typescript
 * import { caseTypes } from '@dustinboston/change-case-cli';
 * console.log(caseTypes.has("camelCase")); // true
 * console.log(caseTypes.has("invalidCase")); // false
 * ```
 */
export const caseTypes: Set<CaseTypes> = new Set<CaseTypes>(Object.keys(caseFunctions) as CaseTypes[]);

/**
 * Ensures that a given case type is valid by checking it against `caseTypes`.
 * This prevents misuse by catching invalid or misspelled case types early,
 * avoiding runtime errors when accessing `caseFunctions`.
 *
 * @param caseType The case type to check.
 * @throws {TypeError} If the case type is invalid or undefined.
 *
 * @example
 * ```typescript
 * import { assertCaseType } from '@dustinboston/change-case-cli';
 * assertCaseType("camelCase"); // Passes
 * // assertCaseType("invalidCase"); // Throws TypeError
 * ```
 */
export function assertCaseType(
  caseType?: CaseTypes,
): asserts caseType is CaseTypes {
  if (!caseType || !caseTypes.has(caseType)) {
    throw new TypeError("Invalid case type.");
  }
}

/**
 * Ensures that a non-empty value is provided for conversion.
 * This avoids unnecessary processing of invalid or empty input and makes error handling more consistent.
 *
 * @param value The string value to check.
 * @throws {TypeError} If the value is empty or undefined.
 *
 * @example
 * ```typescript
 * import { assertValue } from '@dustinboston/change-case-cli';
 * assertValue("test string"); // Passes
 * // assertValue(""); // Throws TypeError
 * ```
 */
export function assertValue(value: string): asserts value is string {
  if (!value) {
    throw new TypeError("No value provided.");
  }
}

/**
 * Converts a string to a specific case using the `caseFunctions` collection.
 * This acts as a wrapper around the `change-case` library, ensuring valid inputs and consistent behavior.
 * By centralizing this functionality, you can use this command in conjunction with other linux commands.
 *
 * @param caseType The case type to convert the string to. Must be one of the valid keys in `caseFunctions`.
 * @param value The string value to convert. Must be non-empty.
 * @returns The converted string in the specified case.
 * @throws {TypeError} If the case type is invalid or the value is empty.
 *
 * @example
 * ```typescript
 * import { toCase } from '@dustinboston/change-case-cli';
 * const result = toCase("camelCase", "test string");
 * console.log(result); // "testString"
 *
 * // Throws TypeError:
 * // toCase("invalidCase" as any, "test string");
 * // toCase("camelCase", "");
 * ```
 */
export function toCase(
  caseType: CaseTypes,
  value: string,
): string {
  assertCaseType(caseType);
  assertValue(value);

  return caseFunctions[caseType](value);
}
