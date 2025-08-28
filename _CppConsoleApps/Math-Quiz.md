---
title: Math Quiz
excerpt: "Adaptive Arithmetic Trainer — Randomized arithmetic quiz with instant grading, difficulty/op-type control, and pass/fail summary."
date: 2025-08-27
order: 2
overlay_text: "2nd"
---
---
# Description
A compact, single-file C++ console application that generates and grades an arithmetic quiz. The user chooses the number of questions (1–100), the difficulty level (Easy / Medium / Hard / Mixed), and the operation type (Addition, Subtraction, Multiplication, Division, or Mixed). The quiz auto-generates random questions, accepts answers, gives immediate feedback (right/wrong with visual and audible cues), and shows a final score with pass/fail status. Clean, focused, and ideal for demonstrating solid C++ fundamentals and user-facing CLI polish.

# Technologies Used
- **Language:** C++ (ISO C++)
- **Standard Libraries**: `<iostream>`, `<cstdlib>`
- **Platform-specific calls:** `system("cls")`, `system("color")` for Windows console.
- **Core concepts demonstrated:** structs, enums, arrays, functions, random number generation, input validation, pass-by-reference.

# Functionality / Features
## Configurable quiz length
Player selects 1–100 questions with input validation.

## Difficulty selection
Easy, Medium, Hard, or a mixed mode that randomizes difficulty per question.

## Operation selection
Choose one operation (Add, Sub, Mult, Div) or a mixed mode that randomizes operations.

## Randomized questions
Each question's operands are generated according to the chosen difficulty ranges.

## Immediate feedback
After each answer, the program indicates correct/incorrect, shows the correct answer if needed, and changes console color / beeps on wrong answers.

## Per-question tracking
The program stores each question's operands, operation, correct answer, user answer, and whether it was answered correctly.

## Final report
Displays number of questions, chosen level and operation type, count of right/wrong answers, and a pass/fail result (pass = right answers ≥ wrong answers).

## Replay loop
Option to retake the quiz without restarting the program.

# Implementation Highlights
- **Strong domain modeling**
  - `enLvl` and `enOpType` enums capture quiz configuration clearly and safely.
  - `stQuestionInfo` encapsulates all data about a single question (operands, operation, real/user solution, correctness).
  - `stQuizInfo` aggregates the questions array and quiz-level statistics for easy summarization.
- **Separation of concerns**
  - User input: `readHowManyQuestions`, `readQuizLvl`, `readQuizOpType`.
  - Question generation: `generateQuestion`, `generateRndNum`.
  - Calculation: `simpleCalculator`.
  - Presentation: `printQuestion`, `printQuizResults`.
  - Grading: `correctQuestionAnswer`, `askAndCorrectQuestionsListAnswers`.
- **Simple yet effective randomization**
  - Mixed modes are supported by replacing the `Mix` enum with a random choice at generation time—straightforward and readable.
- **User-friendly feedback**
  - Visual (console color) and audible cues (beep on wrong) improve the CLI experience and make the app feel responsive and polished.
- **Memory/time-safe design choices**
  - Uses a fixed-size array (`questionsList[100]`) with explicit validation on number-of-questions (1–100), preventing out-of-bounds usage.
  - Integer division is used intentionally; the generator avoids zero divisors by choosing ranges starting from 1.

# Conclusion
- This project demonstrates careful use of C++ fundamentals: enums, structs, arrays, function decomposition, and basic I/O.
- Shows attention to UX in CLI tools—input validation, immediate feedback, and a clear final summary.
- A concise project that’s easy to walk through during interviews and can be extended into a more advanced practice tool.

# Screenshots
<div class="screenshots-grid">
  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Math_Quiz/Setting-Up-The-Quiz.png">
  
    <figcaption>Setting up the quiz</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Math_Quiz/Checking-User-Answer.png">
  
    <figcaption>Checking user answer</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Math_Quiz/Final-Results.png">
  
    <figcaption>Final results</figcaption>
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
*You can download the executable file from [here](https://drive.google.com/uc?export=download&id=1K1Mo5HN8hyoB7xTXpZ0xNObSTd61n2bM).*

> Since this application is not digitally signed by a recognized publisher, your system may display a warning before running it. You can safely ignore it and continue.

# Source Code
*You can find the source code [here](https://gist.github.com/AbdulrahmanMohammadSalem/64270366ce4618d525bbeaf2925a4b82).*