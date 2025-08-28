---
title: Readers.h
excerpt: "Header-only, templated console input validators for robust, type-safe CLI prompts."
order: 1
date: 2025-08-27
overlay_text: "1st"
---
---
# Description
The **Readers.h** library is a single-header C++ utility library that provides a compact, consistent collection of console input helpers. Packaged under the `readers` namespace, the library exposes strongly-typed, template-based functions for reading and validating numeric input, plus helpers for words, lines, single characters, and booleans. It focuses on defensive stream handling, input re-prompting, and simple, reusable API surface for CLI apps and small tools.

# Technologies Used
- **Language:** C++ (ISO C++)
- **Standard Library headers:** `<iostream>`, `<string>`
- **Design patterns / concepts:** templates, function overloading, default parameters, namespace-based encapsulation

# Functionality / Features
## Generic numeric readers
`readNumber<T>(msg)`, range-checked overload `readNumber<T>(msg, from, to)`. Works for any numeric type `T` (e.g., `int`, `long`, `double`).

## Specialized numeric constraints
`readPositiveNumber`, `readNegativeNumber`, `readNonPositiveNumber`, `readNonNegativeNumber`, `readNonZeroNumber` — each enforces the expected sign/constraint.

## String & word input
`readWord(msg)` for whitespace-delimited tokens, and `readString(msg, isAfterCin)` which correctly handles `getline` after `cin`.

## Character input with whitelist
`readCharacter(msg, allowedChars, errMsg)` only accepts characters included in the `allowedChars` string (useful for Y/N prompts or single-key menus).

## Boolean helper
`readBoolean(msg)` — wraps `readCharacter` and returns `true`/`false` for `y/n` responses (case-insensitive).

## Robust stream handling
All readers clear `cin` on failure, ignore remaining input up to `numeric_limits<streamsize>::max()`, and loop until valid input is provided.

## Developer ergonomics:
Optional `errMsg` parameter lets the function change the prompt text after the first invalid attempt.

# Implementation Highlights
- **Template-first design**
  - Numeric functions are templates, making the API flexible across integer and floating types without duplication.
  - Range-checked overload uses the same function name with different signatures for intuitive use.
- **Careful `cin` recovery**
  - After invalid input the functions call `cin.clear()` and `cin.ignore(numeric_limits<streamsize>::max(), '\n')` to remove the bad token and any leftover input so subsequent reads are clean.
  - `cin.peek() != '\n'` is used to detect trailing input on the same line (helps avoid accepting `12abc` as `12`).
- **Consistent UX**
  - Each function accepts a prompt string and an optional alternate error prompt to guide users after the first failed attempt.
  - `readString` supports the common `getline`-after-`cin` pattern using `cin >> ws` when `isAfterCin` is true.
- **Composable building blocks**
  - Higher-level helpers wrap lower-level ones (e.g., `readBoolean` uses `readCharacter`), reducing duplication and keeping logic centralized.
- **Single-header convenience**
  - Being header-only makes it drop-in for small projects and educational codebases; templates are defined inline so no linking concerns.

# Conclusion
- This project demonstrates attention to the small but critical details of user input and defensive programming — a quality every production CLI or tooling project needs.
- Shows practical knowledge of templates, overloading, stream state management, and API ergonomics.
- A neat, reusable utility that's immediately useful in other projects — great to cite during interviews as an example of improving developer experience and input reliability.

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.

# Source Code
*You can find the source code for this header [here](https://gist.github.com/AbdulrahmanMohammadSalem/c5dffe1d9e1ec1cf17733d8f95fbfed9).*