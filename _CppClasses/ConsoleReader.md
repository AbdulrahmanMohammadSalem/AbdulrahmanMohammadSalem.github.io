---
title: ConsoleReader
layout: single
excerpt: "Object-oriented console input reader for C++."
author_profile: false
date: 2025-08-06
weight: 3
overlay_text: "3rd"
sidebar:
  nav: "side_nav"
---
---
# Description
The **ConsoleReader** class is a lightweight C++ utility that simplifies user input by turning raw namespace-based reading functions ([`Readers.h`](/CppLibs/Readers/)) into an **object-oriented workflow**. Inspired by Java's `Scanner` class, it allows developers to create a reader object and call intuitive methods directly, instead of juggling multiple standalone functions.

This project highlights the flexibility of C++—bridging functional namespace utilities with object-oriented design for **cleaner, more maintainable code**.

# Technologies Used
- **C++ (OOP templates)**
- **Custom Utility Library:** `Readers.h`

# Functionality & Features
## Numeric Input
- Read general numbers (any type via templates).
- Range validation (`from`, `to`).
- Variants for positive, negative, non-zero, and signed/unsigned numbers.

## Text Input
- Read single words.
- Read full strings (with optional whitespace handling).

## Character Input
- Read characters with optional allowed character filters.

## Boolean Input
- Simple yes/no validation via `'y'/'n'` style inputs.

## Error Handling
- Built-in re-prompting and validation for safe, user-friendly input loops.

# Implementation Highlights
- **Wrapper Design:** Encapsulates `Readers.h` functions inside a class, mirroring the object-based design of Java and C#.
- **Generic Templates:** Maintains full type flexibility while keeping the workflow consistent.
- **Cleaner API:** Instead of calling `readers::readPositiveNumber<int>(...)`, developers can now write `reader.readPositiveNumber<int>(...)`.
- **Consistent UX:** Every method follows a predictable naming scheme, making it easy to discover and use.
- **Integration Ready:** Works seamlessly with other projects relying on structured input, such as your math quiz or date handling libraries.

# Conclusion
- Provides a **user-friendly, object-oriented layer** on top of `Readers.h`.
- Simplifies the workflow by emulating familiar input-handling patterns from other languages.
- Improves **readability, maintainability, and reusability** across projects.
- Showcases **C++ template mastery** and the ability to build bridges between paradigms (functional → OOP).

# How to Use

# Source Code
*You can find the source code for this class here.*