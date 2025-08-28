---
title: Files.h
excerpt: "Line-first file utilities — simple, composable C++ helpers for reading, editing, searching, and lightly encrypting text files."
order: 2
date: 2025-08-27
overlay_text: "2nd"
---
---
# Description
The **Files.h** library is a compact, single-header C++ file-utilities module that provides line-oriented file operations and an in-memory `vector<string>` editing model. It offers simple, high-level functions for reading, writing, copying, moving, inserting, deleting, searching, updating, encrypting/decrypting, and converting files ↔ vectors of lines. Designed as a convenient toolkit for CLI tools, small scripts, or prototyping file manipulation logic without pulling in heavy libraries.

# Technologies Used
- **Language:** C++ (single-header style)

- **Standard library:** `<string>`, `<fstream>`
- **Custom Utility Library:** [`Utils.h`](/CppLibs/Utils/)
- **Primary data model:** line-based `vector<std::string>` used as an editable in-memory representation of a file

# Functionality / Features
## Basic I/O
  - `prtFile(path)` — print file contents to `cout`.
  - `clrFile(path)` — truncate/clear a file.

## Copy / Move
  - `copyFileToFile(src, dest, override=false)` — copy file contents (append or overwrite).
  - `moveFileToFile(...)` — copy then clear the source.
  - `copyFileToVct(src, vct, override=false)` / `moveFileToVct(...)` — load file lines into a `vector<string>` (optionally clearing vector).
  - `getVectorFromFile(path, clearSrc=false)` — convenience that returns a `vector<string>`.

## Save / Persist
  - `copyVctToFile(vct, dest, override=false, copyEmptyLns=true)` — write vector back to file with options.
  - `moveVctToFile(vct, dest, override=false)` — write then clear the vector.

## Line-level editing
  - `appendLnInFile(path, ln)`, `insertLnInFile(path, pos, ln)`, `insertFileInFile(srcPath, destPath, pos)`.
  - `updateLnInFile(path, lnPos, newLn)` and `updateLnInFile(path, ln, newLn)` — update by index or by matching line.
  - `delLnFromFile(path, lnPos)` and `delLnFromFile(path, ln)` — delete by index or by exact line (sets line to empty and writes back).

## String-level editing inside file
  - `delStrFromFile(path, str)` and `delStrFromFile(path, str, count)` — remove substring occurrences.
  - `updateStrInFile(path, str, newStr)` and `updateStrInFile(path, str, newStr, count)` — replace occurrences (global or limited).

## Search & query helpers
  - `isLnInFile(path, ln)`, `isStrInLn(path, lnPos, str)`, `isStrInFile(path, str)`.
  - `getLnFromFile(path, pos)`, `getFirstLnPosInFile(path, ln)`, `isFileEmpty(path)`.

## File encryption / decryption
  - `encryptFile(path, key)` / `decryptFile(path, key)` — applies `Utils::Encrypt_Decrypt` over each line and writes back.

## Return semantics
  - Most functions return `bool` indicating success/failure; query functions return booleans or data (e.g., `vector<string>`, `string`, `short`) as appropriate.

# Implementation Highlights
- **Line-first design:** The library treats files as ordered collections of lines (`vector<string>`) — this simplifies insert/update/delete operations and maps naturally to many CLI/text-processing use cases.
- **Consistent read-edit-write pattern:** Most mutating operations use `copyFileToVct(...)` → modify the `vector` → `copyVctToFile(...)` sequence. That keeps the code straightforward and reduces duplication.
- **Small, composable primitives:** Core functions (`copyFileToVct`, `copyVctToFile`, `appendLnInFile`, `prtFile`) are simple and composable; higher-level behaviors (move, insert file, encrypt/decrypt) are built by combining them.
- **Flexible write modes:** `copyFileToFile` and `copyVctToFile` accept `override` flags to choose overwrite vs append, and `copyVctToFile` can optionally skip empty lines — practical for varied file workflows.
- **String-level operations reuse standard `std::string` functions:** substring search/erase/insert loops perform global or limited replacements/deletions directly on lines, keeping logic explicit and easy to trace.
- **Integration with Utils:** Uses `Utils::Encrypt_Decrypt` for lightweight per-line encryption/decryption and relies on the broader Utils toolset when necessary.

# Conclusion
- **Concrete, practical utility:** File manipulation is a ubiquitous task; this project shows you can build reliable, reusable tooling that saves time across scripts and projects.
- **Demonstrates API design & composition:** The header exposes a small, consistent surface area (mostly bool-returning helpers) and composes simple primitives to implement more complex behaviors — a good example of pragmatic API design.
- **Integrates knowledge across modules:** It ties together file I/O, `vector<string>` data modeling, string manipulation (from `Strings.h`), and encryption (from `Utils.h`), which highlights your ability to compose modules into useful tools.

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.
3. Make sure that you have [`Utils.h`](/CppLibs/Utils/) also installed.

# Source Code
*You can find the source code for this header [here](https://gist.github.com/AbdulrahmanMohammadSalem/9c8fe35f114310a4801932c4c3e9ed3b).*