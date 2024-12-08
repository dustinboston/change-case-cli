/**
 * Convert strings between various cases using the `change-case` library.
 * @see {@link https://github.com/blakeembrey/change-case}
 *
 * This module provides a CLI interface to easily transform strings into a variety of cases,
 * such as camelCase, snake_case, kebab-case, and more.
 *
 * The CLI accepts a case type and a string as arguments, validates them,
 * and then converts the string to the specified case.
 * It also provides helpful usage information and examples for quick reference.
 *
 * Features:
 * - Supports multiple case formats, powered by the `change-case` library.
 * - Validates input to ensure safe and predictable transformations.
 * - Provides detailed usage instructions via the `--help` flag.
 *
 * Example Usage:
 *
 * Run the following commands to transform a string:
 *
 * ```bash
 * deno run --allow-read --allow-env --allow-net jsr:change-case-cli --case camelCase "test string"
 * # Output: testString
 *
 * deno run --allow-read --allow-env --allow-net jsr:change-case-cli --case snakeCase "test string"
 * # Output: test_string
 * ```
 *
 * The CLI also includes aliases for options and displays helpful error messages for invalid inputs.
 * For a full list of supported cases, use the `--help` flag.
 *
 * @module
 */

import { parseArgs } from "@std/cli/parse-args";
import { assertCaseType, assertValue, caseFunctions, caseTypes, toCase } from "./main.ts";

export * from "./main.ts";

/**
 * Returns the usage string for the CLI.
 * @returns The usage string.
 * @internal
 */
function usage(): string {
  return `change-case-cli: Convert strings between various cases.

Usage:

  Deno: 
    deno run 'jsr:change-case-cli' --case <CASE> <STRING>

  Node:
    npx run 'change-case-cli' --case <CASE> <STRING>

  Binary:
    change_case --case <CASE> <STRING> # If installed globally

Arguments:

  CASE: The target case. Can be one of: 
        ${Array.from(caseTypes).join(", ")}

Examples:

  ${
    Object.entries(caseFunctions).map(([key, fn]) =>
      `deno run "jsr:change-case-cli" -c ${key} "@foo BAR" # ${fn("@foo BAR")}`
    ).join("\n  ")
  }

`;
}

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    alias: { h: "help", c: "case" },
    boolean: ["help"],
    string: ["case"],
    negatable: [],
  });

  if (flags.help) {
    console.log(usage());
    Deno.exit();
  }

  if (!flags.case || flags._.length !== 1) {
    console.error("Invalid arguments!\n");
    console.log(usage());
    Deno.exit(1);
  }

  const caseType = flags.case;
  assertCaseType(caseType);

  const [value] = flags._;
  const stringValue = String(value);
  assertValue(stringValue);

  console.log(toCase(caseType, stringValue));
}
