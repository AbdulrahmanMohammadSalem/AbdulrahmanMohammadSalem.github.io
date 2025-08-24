---
title: SinglyLinkedList
layout: single
excerpt: "A custom-built, STL-like C++ container that proves I can reinvent the wheel — and make it spin faster!"
author_profile: false
weight: 5
overlay_text: "5th"
sidebar:
  nav: "side_nav"
---
---
# Description
The **SinglyLinkedList** class is a hand-crafted, STL-like container built around a **singly linked list data structure**, fully implemented in C++ templates. It provides a flexible, reusable, and efficient container with an object-oriented interface designed to mimic the usability of standard library containers (such as `std::vector` and `std::list`).

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

# Example Use Cases
```cpp
#include "SinglyLinkedList.h"
#include <iostream>
using namespace std;

int main() {
	SinglyLinkedList<int> list = { 1, 2, 2, 3, 4 };

	// Insert
	list.pushFront(0);     // [0, 1, 2, 2, 3, 4]
	list.pushBack(5);      // [0, 1, 2, 2, 3, 4, 5]

	// Erase
	list.eraseFirstOccurrence(2);  // [0, 1, 2, 3, 4, 5]
	list.eraseAllOccurrences(2);   // [0, 1, 3, 4, 5]

	// Utilities
	list.reverse();                // [5, 4, 3, 1, 0]
	list.extendWith({ 6, 7 });       // [5, 4, 3, 1, 0, 6, 7]

	// Operators
	cout << list[2];               // Outputs: 3
	if (list == list) { /*Code*/ }      // Equality check
}
```

# How to Use

# Source Code
*You can find the source code for this class here.*