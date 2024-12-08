import { assert, assertEquals, assertThrows } from "@std/assert";

import { assertCaseType, assertValue, caseFunctions, caseTypes, toCase } from "./main.ts";

Deno.test("caseFunctions contains all expected case functions", () => {
  const expectedFunctions = [
    "camelCase",
    "capitalCase",
    "constantCase",
    "dotCase",
    "kebabCase",
    "noCase",
    "pascalCase",
    "pascalSnakeCase",
    "pathCase",
    "sentenceCase",
    "snakeCase",
    "trainCase",
  ];
  for (const fn of expectedFunctions) {
    assert(fn in caseFunctions, `caseFunctions is missing function: ${fn}`);
  }
});

Deno.test("caseTypes contains all expected case function keys", () => {
  const expectedFunctions = [
    "camelCase",
    "capitalCase",
    "constantCase",
    "dotCase",
    "kebabCase",
    "noCase",
    "pascalCase",
    "pascalSnakeCase",
    "pathCase",
    "sentenceCase",
    "snakeCase",
    "trainCase",
  ];
  for (const fn of expectedFunctions) {
    assert(caseTypes.has(fn), `caseTypes is missing key: ${fn}`);
  }
});

Deno.test("assertCaseType validates valid case types", () => {
  assertCaseType("camelCase"); // Should not throw
});

Deno.test("assertCaseType throws error for invalid case types", () => {
  assertThrows(
    () => assertCaseType("invalidCase"),
    TypeError,
    "Invalid case type.",
  );
});

Deno.test("assertValue validates non-empty values", () => {
  assertValue("test string"); // Should not throw
});

Deno.test("assertValue throws error for empty string", () => {
  assertThrows(
    () => assertValue(""),
    TypeError,
    "No value provided.",
  );
});

Deno.test("toCase converts string to specified case type", () => {
  const result = toCase("camelCase", "test string");
  assertEquals(result, "testString");
});

Deno.test("toCase throws error for invalid case type", () => {
  assertThrows(
    () => toCase("invalidCase" as any, "test string"),
    TypeError,
    "Invalid case type.",
  );
});

Deno.test("toCase throws error for empty value", () => {
  assertThrows(
    () => toCase("camelCase", ""),
    TypeError,
    "No value provided.",
  );
});
