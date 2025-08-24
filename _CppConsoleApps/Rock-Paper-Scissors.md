---
title: Rock-Paper-Scissors
layout: single
excerpt: "Interactive CLI Rock–Paper–Scissors with round-by-round feedback, colored results, and final scoreboard."
author_profile: false
date: 2025-01-15 # Last updated
weight: 1
overlay_text: "1st"
sidebar:
  nav: "side_nav"
---
---
# Description
A compact, well-structured C++ console application that implements the classic Rock-Paper-Scissors game. The program allows a human player to compete against a computer opponent over a user-specified number of rounds. It validates input, shows round-by-round outcomes, changes console color to reflect the winner, and displays a final scoreboard with an overall winner. Clean, single-file code that demonstrates solid fundamentals in C++ program design and user interaction.

# Technologies Used
- **Language:** C++ (ISO C++)
- **Standard Libraries:** `<iostream>`, `<cstdlib>`
- **Platform-specific calls:** `system("cls")`, `system("color")`for Windows console.
- **Core concepts demonstrated:** enums, structs, functions, random number generation, input validation, control flow.

# Functionality / Features
- **Configurable match length:** Player chooses how many rounds to play (1 to 10).
- **Player vs Computer:** Player inputs their choice each round; computer picks randomly.
- **Input validation:** All inputs (number of rounds, move choice, play-again) are validated with do/while loops to ensure correct values.
- **Round summary:** After each round the app prints:
  - Round number
  - Player choice and computer choice
  - Round winner
- **Visual & auditory feedback:** Console color changes depending on who won the round; the computer win produces a beep for emphasis.
- **Final scoreboard:** After all rounds, a neatly formatted summary shows rounds played, player wins, computer wins, draws, and the final winner.
- **Replay loop:** Player can choose to play again without restarting the program.

# Implementation Highlights
- **Clear domain modeling with enums and structs**
  - `enGameChoice` and `enWinner` enumerate the domain (Stone/Paper/Scissors and winner states) — makes code self-documenting and reduces magic numbers.
  - `stRoundInfo` and `stGameResults` group related data (round state and final results), improving readability and maintainability.
- **Separation of concerns**
  - Function-per-responsibility approach: input reading (`readPlayerChoice`, `askHowManyRounds`), RNG (`genRndNum`, `getComputerChoice`).
  - game logic: `getRoundWinner`.
  - presentation: `printRoundInfo` & `printFinalGameResults`.
  - Flow control: `playGame` / `startGame` are split into small, focused functions. This simplifies testing and future changes.
- **Simple, correct game logic**
  - `getRoundWinner` uses direct comparisons with a safe default return (user wins) and explicit checks for computer-winning cases — logic is easy to follow and extend.
- **User-friendly presentation**
  - `getChoiceName` / `getWinnerName` map enum values to human-readable strings, ensuring UI strings are centrally defined and consistent.
  - `tabs()` helper produces aligned output for the final scoreboard.
- **Randomness & seeding**
  - Uses `srand((unsigned) time(NULL))` and `rand()` for quick pseudo-random choices. Simple and sufficient for a console game.
- **Platform-aware behavior**
  - Console-clearing and color manipulation use `system()` calls (`cls`, `color`), which provide an immediate visual polish on Windows terminals.

# Conclusion
  - This project shows practical mastery of C++ basics: enums, structs, functions, I/O, and control flow.
  - Demonstrates thoughtful code organization in a single-file project — easy to read, extend, and refactor into a multi-file project later.
  - Includes user-facing polish (input validation, colored feedback, round summaries) that shows attention to user experience even in CLI tools.
  - A perfect small project to illustrate progression from procedural logic to cleaner, structured design — ideal talking points for interviews.

# Screenshots
<div class="screenshots-grid">
  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Rock_Paper_Scissors/Screenshot 1.png">
  
    <figcaption>Full match: 01</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Rock_Paper_Scissors/Screenshot 2.png">
  
    <figcaption>Full match: 02</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Rock_Paper_Scissors/Screenshot 3.png">
  
    <figcaption>Full match: 03</figcaption>
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
*You can find the executable file here.*

# Source Code
*You can find the source code here.*