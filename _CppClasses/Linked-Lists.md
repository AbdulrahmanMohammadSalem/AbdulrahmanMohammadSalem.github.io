---
title: Linked Lists
excerpt: "Custom STL-like linked list containers — built from scratch in modern C++."
date: 2025-09-13
order: 5
top_project: true
overlay_text: "5th"
badge: OOP
---
---
# Description
A pair of generic, STL-like container classes implementing linked lists in modern C++: a `SinglyLinkedList<T>` and a `DoublyLinkedList<T>`. Both are template-based, header-only containers that mirror common container behaviours (construction from vectors/initializer lists, indexing-like access, append/insert/erase, conversions to `std::vector`, comparison operators and more). They're designed to be simple, teachable, and ready-to-use in projects where a custom linked-list is preferred over `std::vector` or when fine-grained control over node-level operations is required.

# Technologies used
- **Language:** Modern C++ (templates, RAII via destructor).
- **Standard Library Features:** `std::vector`, `std::initializer_list`, `std::ostringstream`, `<stdexcept>` exceptions.
- **Style:** Header-only, template-based design for zero-dependency reuse.

# Functionality / Features (high level)
## Common features (both classes):
- Generic template container `template<class T>`.
- Multiple constructors: default, from `std::vector`, from `initializer_list`, fill constructor (size + value) and copy constructor.
- Standard mutators: `pushFront`, `pushBack`, `push(index, value)`, `pushAfter(node, value)`, `pushAfter(index, value)`, `setValue`.
- Deletion operations: `eraseFront`, `eraseBack`, `erase(index)`, `erase(node, validate)`, `eraseFirstOccurrence`, `eraseAllOccurrences`, `eraseAdjacentDuplicates`.
- Utility: `clear`, `reverse`, `extendWith` (another list or vector), `overrideWith`, `fill`.
- Introspection: `getSize`, `isEmpty`, `getValue`, `getFrontValue`, `getBackValue`, `getValueCount`, `doesContain`, `getHead`, `getTail`, `getNodeByIndex`, `getFirstNodeByValue`.
- Conversion & output: `toVector()` / `toString()` (Doubly offers forward/backward versions).
- Operators: `operator[]` (index access, uses `getValue`), `operator==`, `operator!=`, `operator=` `(vector|otherList)`, `operator+=` for append.

## DoublyList-specific extras:
- Every node stores both `prev` and `next`, enabling efficient backward traversal and `toStringBackward()` / `toVectorBackward()`.
- Optimized `getNodeByIndex` — traverses from head or tail based on index to cut average search time. 

## SinglyList-specific notes:
- Slightly leaner node structure (`value` + `next`) and simpler memory overhead; some operations (like `eraseBack`) traverse the list to find the predecessor (O(n)).

# Implementation highlights
- **Template, header-only, and zero-dependency:** both classes are generic and can be dropped into any codebase without linking extra files.
- **Thoughtful constructors:** support for `vector`, `initializer_list`, sized fill, and copy-construction makes the containers ergonomic for tests and real usage.
- **Efficient head/tail maintenance:** both classes maintain `_Head` and `_Tail` pointers and `_Size`, enabling O(1) `pushFront`/`pushBack` and constant-time size queries. This demonstrates attention to practical container performance.
- **Doubly-linked optimization:** `DoublyLinkedList::getNodeByIndex` chooses traversal direction depending on index (front or back)—a useful optimization that cuts the average traversal length ~in half for large lists. 
- **Memory hygiene & RAII:** destructors call `clear()` to delete nodes; `clear()` correctly nulls head/tail and size. Good manual memory management with `delete` after re-linking.
- **Operator ergonomics:** `operator[]`, `operator==`, `operator!=`, `operator=`, and `operator+=` improve usability and mimic `std::vector`-like ergonomics to make these containers friendlier in client code.
- **Rich mutation utilities:** methods like `eraseAdjacentDuplicates`, `eraseAllOccurrences`, `extendWith` and `reverse` are practical utilities that demonstrate completeness beyond minimal linked-list implementations.

# Important notes — Must read before use
- **Manual memory management:** Nodes are allocated with `new` and freed with `delete` in `clear()` / destructors. Be careful with ownership, especially if you keep raw `Node*` pointers outside the list. Use the provided `doesContain(Node*&)` and `erase(node, validate)` when working with node pointers to reduce risk. 
- **No iterator interface:** These classes do not implement `begin()`/`end()` iterators or STL iterator traits. Iteration is done via `toVector()`/`toVectorForward()`/`toVectorBackward()` or by walking nodes (`Node*`). If you need range-based `for` or STL algorithms, convert to `std::vector` first.
- **Indexing is O(n):** `operator[]`, `getValue` and `getNodeByIndex` are linear-time operations (worst-case). For many random-access reads, `std::vector` remains a better choice. Doubly-linked reduces average traversal by picking head/tail to start from, but it’s still O(n).
- **Singly:** `eraseBack` is O(n): Back deletion must traverse to the predecessor. If your workload frequently removes the tail, prefer `DoublyLinkedList`. 
- **Exceptions for invalid operations:** Methods throw `std::out_of_range` or `std::invalid_argument` on bad indices / null targets. Make sure callers handle these exceptions or validate before calling.
- **No move semantics & no custom allocators:** The headers provide copy constructors and `operator=` but do not define move constructors/assignment or allocator hooks. For very large lists or performance-critical code, you might want move-support or allocator-awareness added.
- **Threading:** Not thread-safe. Concurrent reads/writes require external synchronization.
- **API quirks to watch for:**
    - `pushAfter(node, value)`/`erase(node, validate)` accept `Node*` — validating node pointers is optional (validation parameter). Passing invalid pointers without validation is undefined-behaviour.
    - `toString` / `toVector` return by value (copying the list contents) — handy for debug but expensive for huge lists.

# Tabulated comparison

<table>
  <thead>
    <tr>
      <th>Aspect</th>
      <th>SinglyLinkedList&lt;T&gt;</th>
      <th>DoublyLinkedList&lt;T&gt;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Node fields</td>
      <td><code>T value; Node* next;</code> — lighter memory per node.</td>
      <td class="last-table-column"><code>T value; Node* next; Node* prev;</code> — extra pointer enables backward traversal.</td>
    </tr>
    <tr>
      <td>Memory overhead</td>
      <td>Lower (one pointer per node).</td>
      <td class="last-table-column">Higher (two pointers per node).</td>
    </tr>
    <tr>
      <td><code>pushFront</code> / <code>pushBack</code></td>
      <td>O(1) (head/tail maintained).</td>
      <td class="last-table-column">O(1) (head/tail maintained).</td>
    </tr>
    <tr>
      <td><code>eraseBack</code></td>
      <td>O(n) (must find predecessor).</td>
      <td class="last-table-column">O(1) (use <code>_Tail</code> and its <code>prev</code>).</td>
    </tr>
    <tr>
      <td>Indexed access (<code>getNodeByIndex</code>, <code>operator[]</code>)</td>
      <td>O(n) — always traverses from head.</td>
      <td class="last-table-column">O(n) worst, average ≈ n/2 — traverses from head or tail depending on index.</td>
    </tr>
    <tr>
      <td>Reverse traversal</td>
      <td>Not supported (only forward). <code>reverse()</code> exists but no backward iteration.</td>
      <td class="last-table-column">Supported: <code>toVectorBackward()</code> / <code>toStringBackward()</code>.</td>
    </tr>
    <tr>
      <td>API ergonomics</td>
      <td><code>operator[]</code>, <code>operator==</code>, <code>operator+=</code>, conversions to <code>std::vector</code>.</td>
      <td class="last-table-column">Same ergonomics + backward operations.</td>
    </tr>
    <tr>
      <td>Use-case fit</td>
      <td>Memory-sensitive, forward-only lists, append-heavy streams.</td>
      <td class="last-table-column">Efficient tail deletions, bi-directional traversal, O(1) removal with stored <code>Node*</code>.</td>
    </tr>
    <tr>
      <td class="last-table-row">Safety &amp; complexity</td>
      <td class="last-table-row">Slightly simpler implementation (fewer pointers to keep consistent).</td>
      <td class="last-table-row last-table-column">More complex (must keep <code>prev</code>/<code>next</code> consistent); higher risk if modified incorrectly.</td>
    </tr>
  </tbody>
</table>

# Example use cases
1. **Teaching / learning data structures:** Use `SinglyLinkedList<int>` to demonstrate node linking, reversing a list in-place, and copy-construction semantics. Convert to `std::vector` for printing and tests. 
2. **A simple append-only log or event buffer:** For write-heavy appends and occasional reads, the `SinglyLinkedList` is a compact choice (low per-node overhead). Use `pushBack` for incoming events and `toVector()` to snapshot. 
3. **Playlist / navigation UI:** Use `DoublyLinkedList<std::string>` to store tracks and enable efficient "previous"/"next" navigation via node `prev`/`next`. `toStringBackward()` is handy for "reverse queue" displays. 
4. **LRU cache core / O(1) node removal patterns:** While these classes don't include a hash map LRU implementation, `DoublyLinkedList` can be paired with a `std::unordered_map<key, Node*>` so you can remove an arbitrary node in O(1) using the stored `Node*` (use `erase(node, true)` to validate). This shows a real-world pattern where doubly-linked lists shine. 
5. **Undo / redo stacks with traversal:** Keep states in a `DoublyLinkedList<State>`. Move the "`current`" pointer and traverse backward/forward without rebuilding structures. The `prev` pointer removes awkward tail traversals.

# Conclusion
- Use `SinglyLinkedList<T>` when you want a compact, simple forward-only list: memory efficiency and straightforward operations (append, iterate forward) are top priorities. 
- Use `DoublyLinkedList<T>` when you need efficient tail operations, backward traversal, or O(1) removal when you hold `Node*` pointers (e.g. linking with a hash map for an LRU cache). The extra memory cost is the trade-off.

# How to Use
1. Download the header file for the class you want from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.

# Source Code
*You can find the source code for both headers [here](https://github.com/AbdulrahmanMohammadSalem/My-Projects-Portfolio/tree/C%2B%2B-Classes/Linked%20Lists).*