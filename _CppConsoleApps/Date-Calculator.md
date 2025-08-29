---
title: Date Calculator
excerpt: "A modular C++ date calculator with robust input handling and user-friendly console navigation."
date: 2025-08-27
order: 4
overlay_text: "4th"
badge: FP
---
---
# Description
The **Date Calculator** is a console-based application written in C++ that leverages a custom-built [`Dates.h`](/CppLibs/Dates/) library to provide a wide range of date operations. It serves as a practical demonstration of how to transform low-level date utilities into an interactive tool for end-users.

Users can perform complex date-related tasks like calculating the difference between two dates, finding future or past dates, and validating calendar input — all within a simple, menu-driven interface.

This project highlights not only the power of the `Dates.h` library but also how supporting libraries [`Readers.h`](/CppLibs/Readers/), [`Files.h`](/CppLibs/Files/) contribute to a robust, reusable, and modular system.

# Technologies Used
- **C++** — Core language for implementation.
- **Custom Libraries:** `Dates.h`, `Readers.h`, `Files.h`.
- **Standard Libraries:** `<iostream>`, `<iomanip>`, `<string>`, `<vector>`.
- **Console-based UI** — menu-driven, text-based navigation.

# Functionality / Features
## Core Date Analysis
- **Leap Year Checker and Year/Month/Day Data:** Quickly determine leap years, total days, and time units.
- **Day of Week & Weekend Checks:** Get the weekday name for any date, or verify if it falls on a weekend/holiday.
- **Compare Dates:** Tell if one date is before, after, or equal to another.

## Date Navigation & Arithmetic
- **Add/Subtract Time Units:** Calculate future or past dates by days, weeks, or months (handles leap years and varying month lengths).
- **Day Order in Year:** Convert a “day number” (e.g., the 200th day) into an exact date.
- **Vacation Tools:** Compute total vacation days (excluding weekends) and calculate return dates automatically.

## Calendars & Visuals
- **Monthly and Yearly Calendars:** Display formatted calendars directly in the console.
- **Inclusive Counters:** Show total days from start of year, until end of year, or until the week’s end.

## Age & Period Calculations
- **Age Calculator:** Determine age up until today or a specific date, with full breakdown (years, months, days).
- **Period Operations:**
  - Check if a date exists within a range.
  - Detect if two ranges overlap.
  - Calculate total overlap days between periods.

## Customization & Settings
- **Date Formats:** Configure accepted formats (e.g., `dd/mm/yyyy`).
- **Weekend Rules:** Define which days count as weekends.
- **End-of-Week Setting:** Customize when the week is considered to end.

# Implementation Highlights
## Modular Design with Reusable Libraries
- The application relies on the `Dates.h` **library** for all core date calculations.
- Supporting libraries handle **different concerns:**
  - `Readers.h` ensures **robust, validated input handling**.
  - `Files.h` allows for **persistent storage** where needed.
  - [`Utils.h`](/CppLibs/Utils/) (*included in `Files.h`*) provides **general-purpose helpers** to reduce code duplication.
- This separation of concerns keeps the **main application code clean**, focusing on orchestration rather than low-level details.

## Menu-Driven Console UI
- The program presents a **clear, user-friendly menu** with options to perform each type of calculation.
- The design mirrors real calculator workflows: the user selects an operation, provides inputs, and receives a **formatted, easy-to-read result**.
- Invalid inputs are handled gracefully — the program prompts again instead of crashing or producing incorrect results.

## Input & Output Formatting
- Thanks to `Readers.h` and `<iomanip>`, date inputs and outputs are presented in a **standardized, human-readable format** (e.g. `dd/mm/yyyy`).
- This makes results consistent across different features.

## Practical Demonstration of `Dates.h`
- While `Dates.h` provides the algorithms, the Date Calculator `demonstrates real-world application`.
- Transforms raw functions into a `tool` that someone can actually use day-to-day (e.g. checking deadlines, calculating due dates).
- This separation of library vs. app shows skill in **both low-level problem solving** and **high-level system design**.

# Conclusion
- Built a **console-based** application that turns raw date operations into an accessible, menu-driven tool.
- Showcased the value of **modularity** by integrating multiple self-built libraries (Dates, Readers, Files, Utils).
- Ensured a **smooth user experience** with input validation and consistent formatting.
- Highlighted practical skills in **application orchestration, error handling, and reusable design**.
- Demonstrated how to evolve a **low-level library** into a complete, user-facing program.

# Screenshots
<div class="screenshots-grid">
  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Date_Calculator/Main-Menu-Screen.png">
  
    <figcaption>Main Menu Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Date_Calculator/Month-Calendar-Screen.png">
  
    <figcaption>Month Calendar Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Date_Calculator/Age-Calculator-Screen.png">
  
    <figcaption>Age Calculator Screen</figcaption>
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
*You can download the executable file for this project from [here](https://drive.google.com/uc?export=download&id=1UNpDipV8uJR6GA_8G-KGRzdBRf4tiqLv).*

> Since this application is not digitally signed by a recognized publisher, your system may display a warning before running it. You can safely ignore it and continue.

# Source Code
- *You can find the source code for this project [here](https://gist.github.com/AbdulrahmanMohammadSalem/44b3f6229f5aa95ceb84214f2b56c787).*
- *Make sure that you have [`Dates.h`](/CppLibs/Dates/) also installed.*