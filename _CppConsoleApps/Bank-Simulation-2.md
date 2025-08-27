---
title: "Bank Simulation #2"
layout: single
excerpt: "Robust C++ console bank simulator — users, client management, and currency conversion."
date: 2025-08-27
weight: 5
overlay_text: "5th"
---
---
# Description
An object-oriented C++ console application that emulates a bank's back-office workflows. The system provides employee (system user) management, full client lifecycle operations (create/read/update/delete), and an integrated currency exchange and calculator module. Built with modular headers and clear separation between domain models, persistence, and UI screens, this project demonstrates practical engineering: robust state handling, file-based persistence, basic security measures, and an extensible architecture ready for GUI or database upgrades.

# Technologies Used
- **C++** (Object Oriented Design)
- **C++ Standard Libraries:** `<string>`, `<vector>`, streams
- **Custom Utility Libraries:** [`Readers.h`](/CppLibs/Readers/), [`Dates.h`](/CppLibs/Dates), [`Files.h`](/CppLibs/Files), [`Utils.h`](/CppLibs/Utils/), [`StringHandler`](/CppClasses/StringHandler/)
- **Flat-file persistence:** (text files; `Currencies.txt` for currency rates)
- **Console-based UI** separated into screen modules for maintainability

# Functionality / Features
- **User (Employee) Management**
  - Add, update, delete and list system users (bank employees).
  - `SystemUser` class that inherits from `Person` (shared person model).
  - Basic validation and file persistence for user records.

- **Client Management**
  - Create, read, update, and delete client records (`BankClient` class derived from `Person`).
  - Dedicated screens for adding, deleting, updating, and searching clients.
  - Persistent storage of clients to flat files with error reporting via enumerated save results.

- **Audit & Logs:** Application writes operational logs/audit entries for transfer and login operations to files — enabling traceability and debugging.

- **Basic Data Security:** Passwords are encrypted before being persisted.

- **Currency Exchange & Calculator**
  - `Currency` model with rate and conversion logic; currency data read from `Currencies.txt`.
  - Currency exchange screen and calculator UI for listing, finding, updating, and converting between currencies.

- **Screen/State Driven Console UI**
  - Each major interaction is encapsulated in a screen header (e.g. add/list/delete screens), making the CLI flow modular and straightforward to navigate.
  - Separation of presentation (screens) from domain logic (models and persistence).

- **Error Handling & Mode Management:** Use of enums to declare modes (e.g. add/update/empty) and distinct result codes for save/find operations, improving robustness and clarity in control flow.

# Implementation Highlights
- **Clear OOP layering:** Domain entities (`Person`, `BankClient`, `SystemUser`, `Currency`) are modeled as classes with inheritance where appropriate, showing disciplined object modeling and reuse.
- **Separation of concerns:** The project splits responsibilities across many headers:
  - Models (e.g. `BankClient.h`, `SystemUser.h`)
  - UI screens (e.g. `AddNewClientScreen.h`, `CurrencyExchangeScreen.h`)
  - Utilities (e.g. `StringHandler`, `Dates.h`)
— A professional structure ideal for scale and maintenance.
- **File-driven currency subsystem:** Currency data is stored in a text file (`Currencies.txt`) and loaded into a `Currency` collection. Conversion is calculated with a simple, correct formula using per-currency rates — easy to update without recompilation.
- **Explicit modes & enums:** Use of `enum` types for object modes (e.g. `eEmptyMode`, `eUpdateMode`, etc.) and save/result enums (e.g. `enSaveResults`) makes state transitions explicit and debuggable.
- **Practical error reporting:** Methods return typed result codes and the code prints clear error messages for file I/O and validation issues — helpful for both developers and testers.
- **Password encryption**
  - The project defines an `ENCRYPTION_KEY` (see `Constants.h`) and applies encryption to user passwords before writing them to storage files. This prevents plain text passwords in the repository or disk.
  - Practical implication: the app uses reversible encryption keyed by `ENCRYPTION_KEY`. That is good as a learning exercise and better than plain text.

# Conclusion
This Bank System project is a production-style demonstration of software engineering fundamentals: object modeling, modular architecture, persistence, input validation, and attention to security and observability. Its clean separation between domain logic and UI screens makes it an excellent candidate for incremental upgrades, while already serving as a polished console product

# Screenshots
<div class="screenshots-grid">
  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_2/Main-Menu-Screen.png">
  
    <figcaption>Main Menu Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_2/Transactions-Menu-Screen.png">
  
    <figcaption>Transactions Menu Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_2/Currency-Exchange-Menu-Screen.png">
  
    <figcaption>Currency Exchange Menu Screen</figcaption>
  </figure>
</div>

<div class="lightbox" id="lightbox">
  <span class="close">&times;</span>
  <button class="prev">&#10094;</button>
  <img class="lightbox-image" src="" alt="">
  <button class="next">&#10095;</button>
  <div class="lightbox-caption"></div>
</div>

<script src="../../assets/js/screenshot-image-overlay.js"></script>

# Try the Project
- *You can download the executable file, along with `Currencies.txt` (as of August 8, 2025) from [here](https://drive.google.com/uc?export=download&id=1BFNZYfQYZyPVbEVWLq6SEw1WF4eZX_xS).*
- *Please note that the default user is `"User1"`, with the password `"1111"`.*

> Since this application is not digitally signed by a recognized publisher, your system may display a warning before running it. You can safely ignore it and continue.

# Source Files
*You can find the source files for this project [here](https://github.com/AbdulrahmanMohammadSalem/Bank-Simulation-2).*