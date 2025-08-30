---
title: Strings.h
excerpt: "Comprehensive string toolkit: tokenization, filtering, transforms, and number→text conversion."
order: 3
date: 2025-08-27
overlay_text: "3rd"
badge: FP
---
---
# Description
The **Strings.h** library is a compact, header-only C++ string utilities library split across two namespaces: `strings_utilities` (number → text conversion + rounding) and `strings` (character classification, tokenization, trimming, filtering, replacements and other common string transformations). It bundles a wide set of small, focused helpers that are immediately useful for CLI tools, data-cleaning scripts, and quick string processing during prototyping.

This is a drop-in header for rapid development: lots of ready-made helpers for counting characters/tokens, trimming, reversing, filtering digits/letters/specials/punctuations/operations/brackets, replacing text (with optional case-insensitive modes), and converting numbers to English words (with decimal support).

# Technologies Used
- **Language:** C++ (ISO C++)
- **Standard Library headers:** `<string>`, `<cctype>`, `<cmath>`, `<vector>`
- **C++ features & idioms:** namespaces, recursion (for number-to-text), string manipulation, `std::vector`-based tokenization, small utility-style functions

# Functionality / Features
## Number → Text
  `convertNumToTxt(double, short)` — high-level converter that:
  - handles negative numbers
  - rounds to requested precision
  - converts integer and decimal parts to words (e.g., `-12.34` → `Negative Twelve Point Thirty Four`).

## Character classification & simple predicates (`strings`)
  - `isVow`, `isLtr`, `isSpecial`, `isPunc`, `isOper`, `isBracket` — small character tests (vowels, letters, special symbols, punctuation, operators, brackets).
  - `isStrPalindrome` — checks whether a string is palindromic.

## Case & casing helpers
  - `capAllLtrs`, `lowAllLtrs` — uppercase/lowercase all characters.
  - `capAllTkns`, `lowAllTkns` — change case for all tokens except delimiters.
  - `capTknFstLtr`, `lowTknFstLtr` — change first letter of each token.
  - `invChrCase`, `invStrCase` — invert case for a char or whole string.

## Counting utilities
  - `getVowCnt`, `getCapLtrCnt`, `getSmlLtrCnt`, `getLtrCnt`, `getNonLtrCnt`, `getSpcCnt`, `getChrCnt`, `getDigCnt` — counts for various character classes and occurrences.

## Tokenization & tokens helpers
  - `getNumOfTkns(string, char)` and overload for `string` delimiter — count tokens.
  - `getVctOfTkns(string, char)` and overload for `string` delimiter — return vector<string> tokens.
  - `revTknsSeq` — reverse token order.

## Trimming & simple filters
  - `trmRgt`, `trmLft`, `trm` — trim characters from sides (defaults to space).
  - `remDigs`, `keepDigs`, `remLtrs`, `keepLtrs`, `remSpecials`, `keepSpecials`, `remPuncs`, `keepPuncs`, `remOpers`, `keepOpers`, `remBrackets`, `keepBrackets`, `remChr`, `keepChr` — remove/keep based on character-class or a single char.

## Merging & replacements
  - `mrgVct(vector<string>&, delimiter)` and `mrgArr` — join tokens into a single string with delimiter.
  - `replaceAll`, `replaceCnt` — replace occurrences globally or up to a specified count, with optional case-insensitive mode.
  - `replaceAllTkns` — replace token-equal matches (word-level replace) with delimiter control and case-insensitive option.

# Implementation Highlights
- **Recursive number-to-text (`numToTxtCore`)** — A clear and compact recursive approach that breaks down large numbers into hundred/thousand/million/billion chunks and maps smaller ranges to literal arrays; used by `convertNumToTxt` to produce human-friendly text for integer and decimal parts.
- **Decimal-aware conversion (`convertNumToTxt`)** — Rounds the number to requested precision, separates integer and fractional parts, and converts fractional digits as a separate number (it prints "Point" followed by the word form of the fractional digits).
- **Consistent filtering functions** — A full set of `keep`/`remove` helpers that let you quickly strip or preserve classes of characters; useful for sanitizing or extracting subsets of a string (digits only, letters only, punctuation only, etc.).
- **Tokenization flexibility** — Supports both single-character and string delimiters, returning a `std::vector<std::string>`; also provides token-counting and token-merging helpers for the common token pipeline.
- **Case-insensitive replace** — `replaceAll` and `replaceCnt` implement a case-insensitive mode by working on a lowercase copy and mapping positions back to the original string for replacement, allowing correct replacement sizes in the original-cased string.
- **Small, focused functions** — Each helper does one thing and returns a new string; this makes the library easy to pick and insert into small projects.

# Conclusion
- This library showcases **practical engineering** of small utilities that make day-to-day development faster.
- It demonstrates **careful thought** about user-facing formatting (number→text), data cleaning, and text processing pipelines.

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.

# Source code
*You can find the source code for this header [here](https://github.com/AbdulrahmanMohammadSalem/My-Projects-Portfolio/tree/C%2B%2B-Libraries/Strings.h).*