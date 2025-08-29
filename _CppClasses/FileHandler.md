---
title: FileHandler
excerpt: "File handling in C++, but civilized."
date: 2025-08-27
order: 4
overlay_text: "4th"
badge: OOP
---
---
# Description
FileHandler is a **C++ class-based wrapper** built on top of the [`Files.h`](/Cpplibs/Files/) namespace library. It transforms low-level file utilities into an **object-oriented interface**, making file operations in C++ feel more natural and aligned with patterns seen in languages like Java or C#. The library streamlines common file-handling tasks while still offering advanced operations such as content searching, line manipulation, and even optional encryption/decryption for sensitive data (powered by the [`Utils.h`](/CppLibs/Utils) library).

# Technologies Used
- **C++ (OOP)**
- **STL**
- **Custom Utility Libraries:** `Files.h`, `Utils.h`

# Functionality / Features
## File Management
- Print, clear, copy, move, and check for emptiness.

## Data Transfer
- Convert files to vectors and vice versa.
- Support for both preserving or clearing source data during transfers.

## Content Manipulation
- Insert, append, update, and delete lines or substrings.
- Insert one file directly into another.

## Search & Query
- Check if lines or substrings exist within files.
- Retrieve lines by position and locate their first occurrence.

## Security Options
- Encrypt or decrypt entire files.
- Encrypt or decrypt specific lines, either by line content or index.

# Implementation Highlights
- **OOP Wrapper Design** – Transforms procedural-style functions into clean class methods, greatly improving developer ergonomics.
- **Path Property** – Introduces a `.Path` property using `__declspec(property)`, mimicking high-level language conventions.
- **Seamless Namespace Integration** – Directly maps `Files.h` functions into intuitive object methods, preserving the power of the original library while improving usability.
- **Standards-Compliant Indexing** – Using `size_t` for all line/position-based operations aligns with C++ conventions and ensuring safer handling of large files.
- **Granular Security Control** – Beyond full-file operations, supports encrypting or decrypting individual lines, enabling partial protection of sensitive content.

# Conclusion
- Provides an **object-oriented approach** to file handling in C++.
- Enhances readability and usability while keeping the power of `Files.h`.
- Includes advanced utilities like **content manipulation and search**.
- Offers **optional encryption/decryption** for secure use cases.
- Bridges procedural and object-oriented workflows, showcasing flexibility and clean design.

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.
3. Make sure that you have [`Files.h`](/CppLibs/Files/), [`Utils.h`](/CppLibs/Utils/) also installed.

# Source Code
*You can find the source code for this class [here](https://gist.github.com/AbdulrahmanMohammadSalem/6fe7684264f40e511748cb950e6f29d8).*