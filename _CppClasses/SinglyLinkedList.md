---
title: SinglyLinkedList
excerpt: "A custom-built, STL-like C++ container that proves I can reinvent the wheel!"
date: 2025-08-27
order: 5
top_project: true
overlay_text: "5th"
badge: OOP
---
---
# Description
The **SinglyLinkedList** class is an STL-like container built around a **singly linked list data structure**, fully implemented in C++ templates. It provides a flexible, reusable, and efficient container with an object-oriented interface designed to mimic the usability of standard library containers (such as `std::vector` and `std::list`).

The main goal of this project is to demonstrate mastery and practice over low-level data structures, memory management, object-oriented programming, and generic programming in C++.

# Technologies Used
- **C++ (Modern C++ Features)**
- **Templates (Generic Programming)**
- **Object-Oriented Programming (Encapsulation, Abstraction)**
- **Dynamic Memory Management**
- **Operator Overloading**

# Functionality / Features
- Full singly linked list implementation with templated support for any data type.

## Core operations
- `pushFront`, `pushBack`, `push`, `pushAfter` for insertion.
- `eraseFront`, `eraseBack`, `erase`, `eraseFirstOccurrence`, `eraseAllOccurrences`, `eraseAdjacentDuplicates` for deletion.
- `getValue`, `getNodeByIndex`, `getFirstNodeByValue` for access.
- `clear`, `reverse`, `extendWith`, `assign` for advanced list management.

## Conversion utilities
- `toString()` for clean string formatting.
- `toVector()` for interoperability with STL containers.

## Safety features
- Robust **exception handling** using `std::out_of_range` and `std::invalid_argument`.
- Safe destruction with proper memory deallocation in destructor.

## Convenience:
- Operator overloading (`[]`, `==`, `!=`) for intuitive, STL-like usage.
- `isEmpty()`, `getSize()`, `getValueCount()`, `doesContain()` for quick checks.

# Implementation Highlights
- **Template-Based Design:** Allows the container to handle any data type without rewriting logic.
- **Efficient Tail Pointer:** Maintains both head and tail pointers for **O(1) pushBack operations**, improving efficiency over naïve implementations.
- **Dynamic Size Tracking:** Maintains list size dynamically, avoiding repeated traversal for size checks.
- **Exception-Safe:** Throws meaningful exceptions (`std::out_of_range`, `std::invalid_argument`) to ensure safe and predictable behavior.
- **Memory-Safe Destructor:** Implements `clear()` within the destructor to guarantee **no memory leaks**.
- **Operator Overloading:** Provides intuitive syntax (`[]`, `==`, `!=`), making the container feel natural to C++ developers familiar with STL.

# Example Use Cases
<script src="https://gist.github.com/AbdulrahmanMohammadSalem/e219f86b1e290881648d3a88f3c583f2.js"></script>

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.

# Source Code
*You can find the source code for this class [here](https://gist.github.com/AbdulrahmanMohammadSalem/1582681d68e1f6725d5625a3de2ee98e).*