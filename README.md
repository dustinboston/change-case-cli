# Change Case CLI

A command-line tool to convert strings between various case formats using the powerful
[`change-case`](https://github.com/blakeembrey/change-case) library.

Easily transform strings into formats like `camelCase`, `snake_case`, `kebab-case`, and more. Perfect for developers
working with multiple naming conventions in codebases, configuration files, or documentation.

---

## Features

- Supports a wide variety of case formats.
- Simple command-line API with intuitive flags.
- Input validation to prevent invalid cases or empty strings.
- Works seamlessly with Deno and Node.js.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Supported Cases](#supported-cases)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Using Deno

No installation required! Simply run the tool directly using Deno:

```bash
deno run --allow-read --allow-env --allow-net jsr:change-case-cli --case <CASE> <STRING>
```

### Using Node.js

Install globally to make the `change_case` command available system-wide:

```bash
npm install -g @dustinboston/change-case-cli
```

Or, run it with `npx` without installation:

```bash
npx @dustinboston/change-case-cli --case <CASE> <STRING>
```

---

## Usage

### Command Syntax

```bash
change-case-cli --case <CASE> <STRING>
```

#### Options:

- `--case`, `-c` (required): Specify the target case type.
- `--help`, `-h`: Display the usage instructions.

#### Arguments:

- `<CASE>`: The desired case transformation. Must be one of the supported case types.
- `<STRING>`: The input string to transform.

---

## Supported Cases

The following case types are supported:

- `camelCase`
- `capitalCase`
- `constantCase`
- `dotCase`
- `kebabCase`
- `noCase`
- `pascalCase`
- `pascalSnakeCase`
- `pathCase`
- `sentenceCase`
- `snakeCase`
- `trainCase`

For a full list of case types and their meanings, visit the
[`change-case` documentation](https://github.com/blakeembrey/change-case).

---

## Examples

### Using Deno

```bash
deno run --allow-read --allow-env --allow-net jsr:change-case-cli --case camelCase "test string"
# Output: testString

deno run --allow-read --allow-env --allow-net jsr:change-case-cli --case snakeCase "test string"
# Output: test_string
```

### Using Node.js

```bash
npx @dustinboston/change-case-cli --case kebabCase "Hello World"
# Output: hello-world

change_case --case constantCase "some value"
# Output: SOME_VALUE
```

---

## Error Handling

1. **Invalid Case Type**:
   ```bash
   change-case-cli --case unknownCase "hello world"
   # Error: Invalid case type.
   ```

2. **Missing Input**:
   ```bash
   change-case-cli --case camelCase
   # Error: No value provided.
   ```

---

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

Please ensure your code adheres to the existing style and passes all tests.

---

## License

This project is licensed under the GNU General Public License. See the [LICENSE](LICENSE) file for details.