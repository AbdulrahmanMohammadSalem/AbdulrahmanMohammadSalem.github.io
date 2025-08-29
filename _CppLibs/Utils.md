---
title: Utils.h
excerpt: "Compact C++ utility toolkit — fast, generic helpers for math, randoms, collections, light encryption, and console polish."
order: 5
date: 2025-08-27
top_project: true
overlay_text: "5th"
badge: FP
---
---
# Description
The **Utils.h** library is a single-header, namespace-organized C++ utility library that bundles small, battle-tested helpers across math, random generation, array/vector utilities, simple encryption, and console formatting. Designed to be a drop-in toolkit for quick projects and prototypes, it also depends on the previously provided [`Strings.h`](/CppLibs/Strings/) for string/number formatting features (e.g., number → text conversion). Clean, generic, and focused on developer ergonomics for everyday tasks.

# Technologies Used
- **Language:** Modern C++ (templates, STL containers)
- **Standard library headers:** `<iostream>`, `<random>`, `<cmath>`, `<sstream>`, `<iomanip>`, `<cstdlib>`
- **Dependencies:** `Strings.h`
- **Key features demonstrated:** templates, `std::vector`, random engines (`std::random_device` + `mt19937`), stream formatting, generic algorithms

# Functionality / Features
## Maths
- Generic numeric helpers: `specialRound`, `isNumberBetween`, `isEven`, `isPrime`.
- Number decomposition: `getNumberParts` (integer/decimal parts + sign).
- Basic combinatorics and sequences: `getFactorial`, `getPermutations`, `getCombinations`, `getFibonacciSequence`.
- Numeric utilities: `getMax` / `getMin` overloads, `clampNumberBetween`, `getOrdinalSuffix`.

## Generators
- Random primitives: `getRandomNumber()` overloads (legacy `rand()` and `mt19937`-based ranges).
- Random boolean with probability support.
- Random characters/words/keys with flexible character classes (capital, small, digit, special, non-special, all).
- Utilities to produce random keys and words with invalid/accepted-chars filtering.

## Arrays
- Fill arrays with random numbers/characters/words/keys.
- Common algorithms for arrays: `shuffleArray`, `getMin`/`getMax`, `getSum`/`getAverage`/`getMedian`.
- Searching/counting helpers, `isSorted`, `sort` (bubble-sort), `reverse`, `isPalindrome`, `rotateElements`, and `toString` for readable printing.

## Vectors
- Vector variants of the array utilities: random filling, min/max/sum/average/median, sort/reverse/palindrome checks.
- Useful helpers: `shuffleVector`, `removeDuplicates`, `mergeTwoVectors`, `splitVector`, `getSubVector`, and `toString`.

## Encrypt_Decrypt
- Simple symmetric text transform `encrypt` / `decrypt` using a repeating key algorithm over printable ASCII range (32–126). Designed for obfuscation / lightweight local use.

## Mesc
- Console/UX helper: `printHeader` prints a nicely centered boxed title/subtitle.
- Bridge to `Strings.h`: `getNumberAsText` calls the string-number conversion helper for human-readable numbers.

# Implementation Highlights
- **Modular namespace layout:** The library is split into intuitive namespaces (`Maths`, `Generators`, `Arrays`, `Vectors`, `Encrypt_Decrypt`, `Mesc`) making it easy to find and import only what you need.
- **Template-driven generic APIs:** Most utilities are templated (min/max, sums, sorts, prime checks), so they work with integers, floats, and custom numeric types without duplication.
- **Modern random engine where it matters:** Range-based random numbers use `std::random_device` + `std::mt19937` and `std::uniform_int_distribution`, giving high-quality randomness for keys and shuffles; a `srand`/`rand` compatibility wrapper remains for quick uses.
- **Convenient collection tools:** Array and vector helpers provide a consistent API (shuffle, sort, median, toString), making the library useful both for quick scripts and educational demos.
- **Practical utilities for everyday tasks:** From `getOrdinalSuffix` to `getNumberParts`, these tiny helpers reduce boilerplate in CLI tools and data-processing code.
- **Text integration:** `Mesc::getNumberAsText` demonstrates seamless reuse of `Strings.h`'s number→text conversion, showing the library is designed to interoperate with your other headers.
- **Readable output helpers:** `toString` implementations use `ostringstream` so arrays/vectors serialize cleanly for debug printing or logs.

# Conclusion
- **This library demonstrates breadth and good engineering sense:** The library collects many practical helpers that show you understand common developer needs (math, randomness, collection ops, and I/O polish).
- **Shows ability to design reusable APIs:** Namespaces, templates, and consistent function naming illustrate how you organize utility code for reuse and readability.
- **Talkable in interviews:** You can explain trade-offs (e.g., `rand()` vs mt19937`, templated genericity, simple encryption choices) and propose improvements — perfect material for a technical conversation.
- **Immediate practical value:** Recruiters and clients appreciate projects that save time across other projects; this library is an easy example of quality-of-life engineering that improves developer productivity.

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.
3. Make sure that you have [`Strings.h`](/CppLibs/Strings/) also installed.

# Source Code
*You can find the source code for this header [here](https://gist.github.com/AbdulrahmanMohammadSalem/5d27315cb7e7c702af4ef5b4c7ca3155).*
