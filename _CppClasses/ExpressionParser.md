---
title: ExpressionParser
excerpt: "A versatile C++ engine for evaluating mathematical and logical expressions."
date: 2025-10-10
order: 6
top_project: true
overlay_text: "6th"
badge: OOP
---
---
# Description
A powerful, self-contained, and header-only C++ library designed to parse and evaluate complex mathematical and logical expressions from string inputs. Built with pure C++, it provides a robust and versatile engine for applications requiring dynamic calculation capabilities, such as scientific calculators, data analysis tools, or embedded scripting engines.

The parser is engineered for high precision and flexibility, offering extensive control over calculation behavior, including angle units for trigonometric functions and operator precedence. Beyond simple arithmetic, it supports a vast library of functions, handles logical and bitwise operations, and can even evaluate expressions as a function of a variable $$x$$ over a given range. A key feature is its ability to generate a complete, step-by-step breakdown of the evaluation process, making it an excellent tool for educational or debugging purposes.

# Technologies Used
- **Language:** C++
- **Core Libraries:** C++ Standard Library (STL)
- **Key Components:** `string`, `vector`, `stack`, `unordered_map`, `cmath` for mathematical functions, and `random` for number generation.

# Functionality & Features
The `ExpressionParser` is equipped with an extensive set of features that provide a comprehensive evaluation environment.

## Core Mathematical Operations
- **Full Arithmetic Support:** Handles addition, subtraction, multiplication, division, and exponentiation (`^`) with correct operator precedence.
- **Configurable Operator Precedence:** Features robust support for implicit multiplication (e.g. `2(3+1)` or `5x`), with an option to assign it a higher binding priority than standard division.
- **Advanced Syntax:** Correctly parses nested parentheses, factorials (`!`), percentages (`%`), permutations (`P`), combinations (`C`), and the modulo operator function (`mod(m,n)`). Both the factorial and percentage operators bind tightly to their operands with a higher precedence than exponentiation (e.g. `2^5%` is evaluated as `2^(0.05)`).
- **Constants and Randomness:** Built-in support for constants `pi` ($$\pi$$) and `e` ($$e$$), along with a special token for generating random numbers between `0`,`1` (`rnd#`).
- **Context-Aware Parsing:** Features a sophisticated system for scientific notation and constants. The lowercase `e` is dual-purpose: it's parsed as Euler's number unless immediately followed by a digit (or a decimal point), in which case it signifies scientific notation ($$\times10^{...}$$). For unambiguous use, the uppercase `E` acts as a more powerful and dedicated scientific notation operator that correctly handles signs, allowing expressions like `2.5E-3` to be evaluated as $$2.5\times10^{-3}$$. The parser also correctly interprets absolute value using vertical bars (`|`) with any level of nesting.

## Advanced Mathematical Functions
- **Comprehensive Function Library:** Includes a wide range of functions:
  - **Trigonometry:** `sin`, `cos`, `tan`, `csc`, `sec`, `cot`
  - **Inverse Trigonometry:** `asin`, `acos`, `atan`, `scsc`, `asec`, `acot`
  - **Hyperbolic:** `sinh`, `cosh`, `tanh`, `csch`, `sech`, `coth`
  - **Inverse Hyperbolic:** `asinh`, `acosh`, `atanh`, `acsch`, `asech`, `acoth`
  - **Logarithms & Roots:** `log(n)`, `log(base,n)`, `ln`, `sqrt`, `cbrt`, `nthrt(n,m)`
  - **Others:** `abs`, `rndInt(from,to)` for a random integer value between `from` and `to`.
- **Flexible Angle Units:** Seamlessly performs trigonometric calculations in **degrees, radians, or gradians**.

## Logical and Bitwise Operations
- **Comparison Operators:** Full support for `<`, `>`, `=`, `<=`, and `>=`.
- **Logic Gates:** A complete set of logical gates including `AND`, `OR`, `NOT`, `NAND`, `NOR`, `XOR`, and `XNOR`.
- **Bitwise Shift Operators:** Includes support for left (`<<`) and right (`>>`) bitwise shifts, which perform efficient multiplication and division by powers of two on integer operands.
- **Dual-Mode Logic:** A unique feature allowing logic gates to operate in two modes:
  1. **Logical Mode:** Treats any non-zero value as `true` (1).
  2. **Bitwise Mode:** Performs bitwise operations on integer operands.
- **Boolean Functions:** Includes helper functions like `ispr` (is prime), `issqr` (is perfect square), `isodd`, and `iseven`—each returns either `1` (true) or `0` (false), then the evaluation is continued.

## Functional Evaluation
- **Evaluation over a Variable:** Treats expressions as functions of $$x$$, allowing evaluation at a single point, a vector of points, or over a specified range (`start`, `end`, `step`)—either for generating full lists of evaluation steps, or just returning the values.
- **Summation ($$\sum$$) and Product ($$\prod$$):** Includes `sum(expr, start, end)` and `prod(expr, start, end)` functions to perform complex calculations over a specified range.

## User-Centric Features
- **Variable Precision Control:** Users can specify the numerical precision (up to 17 decimal places) for all calculations, affecting the final result, internal constants, and all steps in the generated evaluation trace.
- **Step-by-Step Evaluation:** Can generate a complete, sequential breakdown of the calculation steps, from the initial expression to the final result, perfect for educational tools or debugging.
- **Advanced Expression Formatting:** Provides a utility to "beautify" raw string expressions for clean UI display, with options to force asterisks with implicit multiplication, use `|` for absolute values, force decimal points, and insert spaces around operators (excluding `P`,`C`).
- **Granular Error Reporting:** Returns specific, detailed error codes from a list of 49 possible issues, allowing for precise feedback on invalid syntax, mathematical domain errors (e.g. `sqrt(-1)`), or invalid function arguments.

# Implementation Highlights
The library's internal architecture is designed for clarity, maintainability, and robustness.
- **Modular, Multi-Class Architecture:** The core logic is cleanly separated into distinct, nested classes, each with a single responsibility:
  - `ExpressionFormatter`: A powerful pre-processing engine that sanitizes, tokenizes, and standardizes the raw input string. It intelligently handles ambiguous syntax like absolute value bars (`|`) and implicit function brackets. Also, it supports early exiting with an error code if the expression was discovered to be invalid while formatting.
  - `ExpressionValidator`: A dedicated validation layer that checks for syntactical correctness, proper operator placement, and valid function arguments before any evaluation occurs.
  - `ExpressionEvaluator`: The heart of the library, which uses a recursive descent parsing strategy to evaluate the formatted and validated expression. It correctly handles operator precedence and associativity, including right-to-left for exponentiation (e.g. `2^3^4` is treated as `2^(3^4)`).
- **Recursive Descent Evaluation Strategy:** The evaluation logic breaks down complex expressions by recursively solving the contents of the highest-precedence operations first (parentheses, functions), and then working through the standard order of operations. This is managed elegantly using a stack to keep track of nested evaluation contexts when generating step-by-step solutions.
- **Pre-processing Pipeline:** Instead of a single, monolithic parsing function, the class uses a pipeline approach. An input expression first goes through formatting and validation. This crucial step simplifies the evaluation logic immensely, as the `ExpressionEvaluator` can assume it is receiving a well-formed and unambiguous expression string.
- **Tokenization with Single Characters:** A clever design choice was to map all functions and multi-character operators (e.g. "sin", "acosh", "<<") to unique single-character tokens during the formatting stage. This significantly simplifies and accelerates the parsing logic within the `ExpressionEvaluator`, as it only needs to handle single-character operators.
- **Atomic Operand Marking via 'Magic Characters':** To solve ambiguity with parenthesized negative bases (e.g. `(-2)^4`), the `ExpressionFormatter` uses an elegant marking system. When it detects a pattern like `(...)` followed by an operator such as `^`, `!`, `%`, `P`, or `C`, it inserts a unique, non-mathematical "magic character" before the opening parenthesis. This character acts as a flag for the `ExpressionEvaluator`, signaling it to treat the entire parenthesized block as a single, unbreakable **atomic operand**. This guarantees the expression is fully resolved (to `-2` in the example) before being passed to the operator, ensuring mathematical correctness.
- **Heuristic and Recursive Disambiguation of Absolute Value \|...\|:** Parsing the ambiguous `|` character is handled by a robust, multi-stage algorithm. Initially, **heuristic rules** analyze the context around each `|` to resolve clear-cut cases, converting them to unambiguous internal tokens for "open" (`[`) and "close" (`]`). For any remaining ambiguous bars, the parser employs a **recursive backtracking algorithm**. This powerful technique systematically explores all possible pairings until it finds a syntactically valid structure. Once fully disambiguated, the pairs are converted into the mapped character for `abs(...)` function format for the evaluator.
- **Efficient and Numerically Stable Combinatorics:** The calculation of permutations (`nPr`) and combinations (`nCr`) is highly optimized to prevent overflow errors common with naive factorial-based methods.
  - For permutations, instead of calculating `n! / (n-r)!`, the implementation directly computes the product series $$n\times(n-1)\times...\times(n-r+1)$$, avoiding large intermediate factorial values.
  - For combinations, the logic is further optimized for numerical stability. Rather than computing the full permutation and then dividing by `r!`, the algorithm **interleaves** multiplication and division within a single loop ($$(\frac{n}{1})\times(\frac{n-1}{2})\times...\times(\frac{n-r+1}{r})$$). This keeps the cumulative result as small as possible at each step, dramatically reducing the risk of overflow and maintaining precision.
- **Optimized Result Substitution with Sign Consolidation:** When substituting a calculated value back into the expression string, the evaluator avoids the common inefficiency of creating redundant signs (e.g. `10+-5`) that require a separate clean-up pass. It uses specialized, context-aware methods (`_insertSubPartialResult` and `_insertSubPartialResult_funs`) that inspect the operator preceding the sub-expression. Based on this context and the sign of the result, these methods **consolidate the signs in a single action**—for example, converting `10-(-5)` directly to `10+5`. This improves performance and ensures the expression string remains syntactically clean at every stage of the step-by-step evaluation.

# Important notes — Must read before use
## Class Usage
- **Properties/Fields:** The `ExpressionParser` class defines several properties that can be accessed or modified through corresponding getter and setter methods. The following table describes each property and its intended purpose:
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Purpose</th>
      <th>Methods</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-align-center"><code>expression</code></td>
      <td class="text-align-center"><code>std::string</code></td>
      <td>- This stores the input expression, providing the ability to retrieve or update its value when needed.<br>- Default value: <code>"0"</code></td>
      <td class="last-table-column text-align-center"><code>getExpression()</code>, <code>setExpression(const std::string&)</code></td>
    </tr>
    <tr>
      <td class="text-align-center text-align-center"><code>implicitMultHighPrec</code></td>
      <td class="text-align-center text-align-center"><code>bool</code></td>
      <td>- This controls whether implicit multiplication (juxtaposition) binds more tightly than standard left-to-right evaluation.<br>- If <code>true</code>, it will give higher precedence over division. Otherwise, it will not.<br>- This doesn't affect functions with implicit brackets, they have their own rules.<br>- Defualt value: <code>false</code>.</td>
      <td class="last-table-column text-align-center"><code>getImplicitMultHighPrec()</code>, <code>setImplicitMultHighPrec(const bool)</code></td>
    </tr>
    <tr>
      <td class="text-align-center text-align-center"><code>forceBitwiseLogic</code></td>
      <td class="text-align-center text-align-center"><code>bool</code></td>
      <td>- This controls the behavior of logical operators.<br>- If <code>true</code>, logical operators will behave as bitwise operators, producing error codes if used with non-integer values.<br>- If <code>false</code>, logical operators will use standard logical evaluation, treating any non-zero value as <code>true</code>.<br>- Default value: <code>false</code>.</td>
      <td class="last-table-column text-align-center"><code>getForceBitwiseOperations()</code>, <code>setForceBitwiseLogic(const bool)</code></td>
    </tr>
    <tr>
      <td class="text-align-center text-align-center"><code>precision</code></td>
      <td class="text-align-center text-align-center"><code>short</code></td>
      <td>- This controls the precision of the results, internal calculations, and formatted expressions.<br>- It will get clamped between 0 and 17.<br>- Default value: 6 digits after the decimal point.</td>
      <td class="last-table-column text-align-center"><code>getPrecision()</code>, <code>setPrecision(const short)</code></td>
    </tr>
    <tr>
      <td class="last-table-row text-align-center"><code>angleUnit</code></td>
      <td class="last-table-row text-align-center"><code>ExpressionParser<br>::AngleUnits</code></td>
      <td class="last-table-row">- This is used when calculating trigonometric and inverse trigonometric functions.<br>- Default value: <code>AngleUnits:: fRADIAN</code>.</td>
      <td class="last-table-row last-table-column text-align-center"><code>getAngleUnit</code>, <code>setAngleUnit(const ExpressionParser::AngleUnits)</code></td>
    </tr>
  </tbody>
</table>

*- Note that all these fields can be initialized through the class constructor when creating a new object. Alternatively, you may omit them, in which case default values will be applied.*

- **Operational Methods:** The `ExpressionParser` class offers a range of methods dedicated to evaluating, formatting, and generating step-by-step analyses of expressions. The table below outlines these methods, along with their respective purposes and return types:
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Purpose & Return Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-align-center"><code>evaluate</code></td>
      <td class="last-table-column">- This method evaluates the specified <code>expression</code> and returns an <code>ExpressionParser:: EvaluationResult</code> structure containing the computed <code>double</code> value and an accompanying error code indicating the evaluation status.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>formatExpression</code></td>
      <td class="last-table-column">- This method formats the value of the specified <code>expression</code> to enhance readability and ensure suitability for user interfaces.<br>- It accepts four parameters that define the formatting behavior: <code>forceDecimalPoints</code> to enforce decimal point display, <code>forceAsterisks</code> to explicitly denote implicit multiplication, <code>useAbsBars</code> to represent absolute values using vertical bars instead of the function format, and <code>useSpaces</code> to insert spacing around operators (excluding <code>P</code> and <code>C</code>).<br>- The method returns a <code>std::string</code> containing the formatted result.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>generateEvaluationSteps</code></td>
      <td class="last-table-column">- This method evaluates the specified <code>expression</code> while recording each step of the evaluation process.<br>- It accepts the same set of parameters as the <code>formatExpression</code> method to define the formatting of each recorded step.<br>- It returns a <code>std::vector&lt;std::string&gt;</code> containing a sequential breakdown of the evaluation procedure. If the expression is invalid prior to evaluation, an empty vector is returned. If an error occurs during evaluation, the returned <code>vector</code> will stop at the last successfull step.<br>- This method does not return an error code.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>evaluateAt</code></td>
      <td class="last-table-column">- This method interprets the specified <code>expression</code> as a function of <code>x</code>.<br>- It accepts a single <code>double</code> parameter representing the value to substitute for <code>x</code>, then evaluates the resulting expression.<br>- The method returns an <code>ExpressionParser::EvaluationResult</code> structure containing the computed <code>double</code> value along with an accompanying error code indicating the evaluation status.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>evaluateAt</code></td>
      <td class="last-table-column">- This overload of the <code>evaluateAt</code> method accepts a single <code>std::vector&lt;double&gt;</code> parameter and evaluates the specified <code>expression</code> as a function of <code>x</code> for each provided value.<br>- If the expression is invalid prior to evaluation, an empty vector is returned. Otherwise, the method returns a <code>std::vector&lt;ExpressionParser::EvaluationSteps&gt;</code> containing the evaluation results corresponding to each input value.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>evaluateAt</code></td>
      <td class="last-table-column">- This overload of the <code>evaluateAt</code> method accepts three <code>double</code> parameters: <code>startValue</code>, <code>endValue</code>, and <code>step</code>.<br>- It evaluates the specified <code>expression</code> as a function of <code>x</code>, beginning with <code>startValue</code>, incrementing by <code>step</code>, and continuing to substitute and evaluate until the value of <code>endValue</code> is reached or exceeded.<br>- If the expression is invalid prior to evaluation, an empty vector is returned. Likewise, if the parameter set is invalid (for example, if <code>startValue</code> is less than <code>endValue</code> while <code>step</code> is negative), the method also returns an empty vector. Otherwise, it returns a <code>std::vector&lt;ExpressionParser::EvaluationSteps&gt;</code> containing the evaluation results for each computed value.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>generateEvaluationStepsAt</code></td>
      <td class="last-table-column">- This method accepts a single <code>double</code> parameter along with the same set of formatting parameters used by the <code>formatExpression</code> method.<br>- It interprets the specified <code>expression</code> as a function of <code>x</code>, substitutes the given value, and returns a <code>std::vector&lt;std::string&gt;</code> representing a sequential breakdown of the evaluation process, with each step formatted according to the provided parameters.<br>- If the expression is invalid prior to evaluation, an empty vector is returned.</td>
    </tr>
    <tr>
      <td class="text-align-center"><code>generateEvaluationStepsAt</code></td>
      <td class="last-table-column">- This overload of the <code>generateEvaluationStepsAt</code> method accepts a single <code>std::vector&lt;double&gt;</code> parameter, along with the same set of formatting parameters used by the <code>formatExpression</code> method.<br>- It interprets the specified <code>expression</code> as a function of <code>x</code>, substituting and evaluating it for each value in the vector.<br>- The method returns a <code>std::vector&lt;std::vector&lt;std::string&gt;&gt;</code>, where each inner vector contains the formatted evaluation steps corresponding to each individual input value respectively.<br>- If the expression is invalid prior to evaluation, an empty vector is returned.</td>
    </tr>
    <tr>
      <td class="last-table-row"><code>generateEvaluationStepsAt</code></td>
      <td class="last-table-row last-table-column">- This overload of the <code>generateEvaluationStepsAt</code> method accepts three <code>double</code> parameters: <code>startValue</code>, <code>endValue</code>, and <code>step</code>, in addition to the same set of formatting parameters used by the <code>formatExpression</code> method.<br>- It evaluates the specified <code>expression</code> as a function of <code>x</code>, beginning with <code>startValue</code>, incrementing by <code>step</code>, and continuing to substitute and evaluate until the value of <code>endValue</code> is reached or exceeded.<br>- The method returns a <code>std::vector&lt;std::vector&lt;std::string&gt;&gt;</code>, where each inner vector contains the formatted evaluation steps corresponding to each individual computed value respectively.<br>- If the expression is invalid prior to evaluation, an empty vector is returned.</td>
    </tr>
  </tbody>
</table>

## Syntax Notes
- **Function calls without brackets:** The rule is that the argument continues only through implicit multiplication between numeric values and constants. It also extends through chains of exponentiation. In all other cases, the argument is considered to have ended. For example:
<table class="two-column-table">
  <thead>
    <tr>
      <th>Expression</th>
      <th>Evaluated as</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sin30epi^13^(1+1)(2+2)</code></td>
      <td class="last-table-column">$$\sin(30e\pi^{13^{(1+1)}})\cdot(2+2)$$</td>
    </tr>
    <tr>
      <td><code>log2e(1+1)</code></td>
      <td class="last-table-column">$$\log(2e)\cdot(1+1)$$</td>
    </tr>
    <tr>
      <td class="last-table-row"><code>sin30sin60pi(1+1)</code></td>
      <td class="last-table-row last-table-column">$$\sin(30)\cdot\sin(60\pi)\cdot(1+1)$$</td>
    </tr>
  </tbody>
</table>

- **Scientific Notation:** Using an uppercase `E` does not possess a unique operator precedence. Instead, it is automatically transformed into `*10^` during the formatting process, regardless of the expression following. For example:
<table class="two-column-table">
  <thead>
    <tr>
      <th>Expression</th>
      <th>Evaluated as</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>2E+sin30+15pi</code></td>
      <td class="last-table-column">$$2\times10^{\sin30}+15\pi$$</td>
    </tr>
    <tr>
      <td class="last-table-row"><code>17.5eE-rndInt(5,15)-2/3</code></td>
      <td class="last-table-row last-table-column">$$17.5e\times10^{\frac{1}{\text{rndInt(5,15)}}}-\frac{2}{3}$$</td>
    </tr>
  </tbody>
</table>

- **Parser Formatting vs. Mathematical Formatting:** Certain expressions cannot be represented exactly as they appear in standard mathematical notation. The following table outlines the syntax used by the parser alongside their corresponding representations in conventional mathematical form:
<table class="two-column-table">
  <thead>
    <tr>
      <th>Expression</th>
      <th>Corresponds To</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>a^b</code></td>
      <td class="last-table-column">$$a^b$$</td>
    </tr>
    <tr>
      <td><code>nPr</code></td>
      <td class="last-table-column">$${}^nP_r, P(n, r)$$</td>
    </tr>
    <tr>
      <td><code>nCr</code></td>
      <td class="last-table-column">$$\begin{pmatrix}n\\c\end{pmatrix},{}^nC_r,C(n, r)$$</td>
    </tr>
    <tr>
      <td><code>asin(x)</code>, <code>acos(x)</code>, <code>asinh(x)</code>, <code>acosh(x)</code>, etc.</td>
      <td class="last-table-column">$$\sin^{-1}(x), \cos^{-1}(x), \sinh^{-1}(x), \cosh^{-1}(x), \text{etc.}$$</td>
    </tr>
    <tr>
      <td><code>sqrt(x), cbrt(x), nthrt(x,n)</code></td>
      <td class="last-table-column">$$\sqrt{x},\sqrt[3]{x},\sqrt[n]{x}$$</td>
    </tr>
    <tr>
      <td><code>log(a,b)</code></td>
      <td class="last-table-column">$$\log_a(b)$$</td>
    </tr>
    <tr>
      <td><code>sum(f(x),a,b)</code></td>
      <td class="last-table-column">$$\sum_{x=a}^b{f(x)}$$</td>
    </tr>
    <tr>
      <td class="last-table-row"><code>prod(f(x),a,b)</code></td>
      <td class="last-table-column last-table-row">$$\prod_{x=a}^b{f(x)}$$</td>
    </tr>
  </tbody>
</table>

## Calculation Priority Sequence
<table>
  <thead>
    <tr>
      <th>Order</th>
      <th>Calculation Type</th>
      <th>Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-align-center">1</td>
      <td>Parenthetical Expressions: evaluated from the deepest upwards.</td>
      <td class="last-table-column"><code>(1+1)</code>,<br><code>12+(12*(13-25.5))</code></td>
    </tr>
    <tr>
      <td class="text-align-center">2</td>
      <td>Function Calls: functions that accept only one argument may be called without parentheses. They follow a certain rule to identify when the argument ends. The value of <code>implicitMultHighPrec</code> doesn't affect that (more on that later).</td>
      <td class="last-table-column"><code>sin30pi</code>, <code>log(2,13)</code>, <code>rndInt(-10,10)</code>, <code>NOT(-10)</code></td>
    </tr>
    <tr>
      <td class="text-align-center">3</td>
      <td>Factorials (<code>!</code>) & Percentages (<code>%</code>): they both bind tighly to what is behind them (as mentioned before).</td>
      <td class="last-table-column"><code>25!</code>, <code>2/5%</code></td>
    </tr>
    <tr>
      <td class="text-align-center">4</td>
      <td>Exponents (<code>^</code>): evaluated from right to left when nesting to represent power towers.</td>
      <td class="last-table-column"><code>2^3</code>, <code>2+3^4^5</code></td>
    </tr>
    <tr>
      <td class="text-align-center">5</td>
      <td>Unary Minus: when using (<code>-</code>) to indicate negation rather than subtraction.</td>
      <td class="last-table-column"><code>12*-12</code>, <code>-(11+2)</code></td>
    </tr>
    <tr>
      <td class="text-align-center">6</td>
      <td>Implicit Multiplication (Juxtaposition): this priority only applies if <code>implicitMultHighPrec</code> is set to <code>true</code>. It will have higher precedence than standard left to right evaluation when combined with division.</td>
      <td class="last-table-column"><code>12/3(1+1.5)</code>,<br><code>-3.14(1+1)(2+2)</code></td>
    </tr>
    <tr>
      <td class="text-align-center">7</td>
      <td>Permutations(<code>P</code>) & Combinations (<code>C</code>): evaluated from left to right.</td>
      <td class="last-table-column"><code>1+5P2</code>, <code>13.5/14C12</code></td>
    </tr>
    <tr>
      <td class="text-align-center">8</td>
      <td>Multiplication (<code>*</code>) & Division (<code>/</code>): evaluated from left to right.</td>
      <td class="last-table-column"><code>1+2*3</code>, <code>1/2*3/4/5</code></td>
    </tr>
    <tr>
      <td class="text-align-center">9</td>
      <td>Addition (<code>+</code>) & Subtraction (<code>-</code>): evaluated from left to right.</td>
      <td class="last-table-column"><code>1+12-14</code></td>
    </tr>
    <tr>
      <td class="text-align-center">10</td>
      <td>Bitwise Shift Operators (<code>&lt;&lt;</code> for left shift), (<code>&gt;&gt;</code> for right shift): evaluated from left to right.</td>
      <td class="last-table-column"><code>12+13&lt;&lt;14*12</code>, <code>7&gt;&gt;1</code></td>
    </tr>
    <tr>
      <td class="text-align-center">11</td>
      <td>Comparison Operators (<code>&lt;</code>, <code>&gt;</code>, <code>=</code>, <code>&lt;=</code>, <code>&gt;=</code>): evaluated from left to right</td>
      <td class="last-table-column"><code>1=1</code>, <code>4+3&lt;2+1</code></td>
    </tr>
    <tr>
      <td class="text-align-center">12</td>
      <td>Logical Operators (<code>AND</code>, <code>NAND</code>): can be used also as bitwise operators if <code>forceBitwiseLogic</code> is set to <code>true</code>—evaluated from left to right.</td>
      <td class="last-table-column"><code>1NAND0</code>, <code>14AND6</code></td>
    </tr>
    <tr>
      <td class="last-table-row text-align-center">13</td>
      <td class="last-table-row">Logical Operators (<code>NAND</code>, <code>NOR</code>, <code>XOR</code>, <code>XNOR</code>): can be used also as bitwise operators if <code>forceBitwiseLogic</code> is set to <code>true</code>—evaluated from left to right.</td>
      <td class="last-table-row last-table-column"><code>1OR0</code>, <code>14XNOR6</code></td>
    </tr>
  </tbody>
</table>

## Error Codes
The class supports a comprehensive set of over 40 error codes, which may be triggered if an expression is determined to be invalid prior to evaluation, or if an error occurs during the evaluation process. The following table enumerates all potential issues along with their corresponding error codes and illustrative examples:
<table>
  <thead>
    <tr>
      <th class="td-fit-content">Error Code</th>
      <th>Description</th>
      <th>Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="td-fit-content"><code>NO_ERRORS</code></td>
      <td>Is triggered when the expression is evaluated with no errors whatsover.</td>
      <td class="last-table-column"><code>12*(3+4)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_IMPLICIT_MULTIPLICATION</code></td>
      <td>Is triggered when placing a number (or decimal point) directly after a closed bracket, absolute value bar, or after a constant/variable.</td>
      <td class="last-table-column"><code>(1+1)12.5</code>, <code>3.5pi7</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_DECIMAL_POINTS</code></td>
      <td>Is triggered when finding broken/invalid decimal points placements.</td>
      <td class="last-table-column"><code>12.4.6</code>, <code>3..14</code>, <code>pi.e</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_BRACKETS</code></td>
      <td>Is triggered when the expression contains misbalanced or invalid bracket arrangements.</td>
      <td class="last-table-column"><code>(1+1))((2+2)</code>, <code>((13.5+12(14.6))</code>, <code>1+()+2</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_SCIENTIFIC_NOTATION</code></td>
      <td>Is triggered when a capital <code>E</code> is preceded by an operator or an open bracket.</td>
      <td class="last-table-column"><code>E+3</code>, <code>1+(E2)</code>, <code>2*E3.5)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_OPERATOR_PLACEMENT</code></td>
      <td>Is triggered when two operators are placed next to each other, or when an expression starts with an operator that should have an operand before it.</td>
      <td class="last-table-column"><code>\pi*/e</code>, <code>14^(^15)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_FUNCTION_ARGUMENTS</code></td>
      <td>Is triggered when passing an invalid number of arguments to a multi-argument function, or when using invalid arrangements of commas in multi-argument function calls.</td>
      <td class="last-table-column"><code>log(2,3,4)</code>, <code>prod(,2,3,)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_FUNCTION_CALL</code></td>
      <td>Is triggered when calling a function without passing any arguments, or using multi-argument functions without brackets.</td>
      <td class="last-table-column"><code>e+csc/12</code>, <code>1.5(2E3log)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_ABS_BARS</code></td>
      <td>Is triggered when using an impossible/broken arrangement of vertical bars, or if they cause the expression to be invalid for any other reason after formatting them.</td>
      <td class="last-table-column"><code>|1+2|3|</code>, <code>12+|8.12*|3.1|+1|+|12|</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_EXPRESSION</code></td>
      <td>Is triggered if the expression was found to be invalid for any other reason.</td>
      <td class="last-table-column"><code>C</code>, <code>|,12|</code>, <code>12,,12</code>, <code>sum(2,x^2,5)</code>, <code>ln,3</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>CANNOT_DIVIDE_BY_ZERO</code></td>
      <td>Is triggered when reaching a division by zero while evaluating.</td>
      <td class="last-table-column"><code>8P(1/(2^3-8))</code>, <code>sum(1/x,-5,5)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_EXPONENTIATION</code></td>
      <td>Is triggered when reaching an invalid exponentiation operation while evaluating.</td>
      <td class="last-table-column"><code>(-e)^pi</code>, <code>(-2)^-0.3</code>, <code>0^0</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>EVALUATION_OUT_OF_RANGE</code></td>
      <td>Is triggered when the value <span class="math-text">2<sup>1024</sup> - 1</span> is exceeded during evaluation.</td>
      <td class="last-table-column"><code>2^1024</code>, <code>990!</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_FACTORIAL_INPUT</code></td>
      <td>Is triggered when using a decimal or negative operand.</td>
      <td class="last-table-column"><code>1.5!</code>, <code>(-5)!</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_PERMUTATIONS_OPERANDS</code>, <code>INVALID_COMBINATIONS_OPERANDS</code></td>
      <td>Is triggered when using decimal or negative operands with permutations & combinations respectively. It may also be triggered when the first operand is less than the second.</td>
      <td class="last-table-column"><code>-9.5P5</code>, <code>3P6</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_BITWISE_LEFT_SHIFT_OPERANDS</code>, <code>INVALID_BITWISE_RIGHT_SHIFT_OPERANDS</code></td>
      <td>Is triggered when using at least one decimal operand with the left & right shift operators respectively.</td>
      <td class="last-table-column"><code>30.4&lt;&lt;3</code>, <code>12&gt;&gt;0.2</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_BITWISE_NOT_OPERAND</code></td>
      <td>Is triggered when passing a decimal value into the bitwise <code>NOT</code> function, provided that <code>forceBitwiseLogic</code> is set to <code>true</code>.</td>
      <td class="last-table-column"><code>14AND(NOT-4.7)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>INVALID_BITWISE_AND_OPERANDS</code>, <code>INVALID_BITWISE_OR_OPERANDS</code>, <code>INVALID_BITWISE_NAND_OPERANDS</code>, <code>INVALID_BITWISE_NOR_OPERANDS</code>, <code>INVALID_BITWISE_XOR_OPERANDS</code>, <code>INVALID_BITWISE_XNOR_OPERANDS</code></td>
      <td>Is triggered when using at least one decimal operand with logical <code>AND</code>,<code>OR</code>,<code>NAND</code>,<code>NOR</code>,<code>XOR</code>, and <code>XNOR</code> respectively, provided that <code>forceBitwiseLogic</code> is set to <code>true</code>.</td>
      <td class="last-table-column"><code>1.5eAND18.7</code>, <code>42.5XOR-2e</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>OUT_OF_DOMAIN_TAN</code>, <code>OUT_OF_DOMAIN_CSC</code>, <code>OUT_OF_DOMAIN_SEC</code>, <code>OUT_OF_DOMAIN_COT</code>, <code>OUT_OF_DOMAIN_ASIN</code>, <code>OUT_OF_DOMAIN_ACOS</code>, <code>OUT_OF_DOMAIN_ACSC</code>, <code>OUT_OF_DOMAIN_ASEC</code>, <code>OUT_OF_DOMAIN_ACOT</code>, <code>OUT_OF_DOMAIN_CSCH</code>, <code>OUT_OF_DOMAIN_COTH</code>, <code>OUT_OF_DOMAIN_ACOSH</code>, <code>OUT_OF_DOMAIN_ATANH</code>, <code>OUT_OF_DOMAIN_ACSCH</code>, <code>OUT_OF_DOMAIN_ASECH</code>, <code>OUT_OF_DOMAIN_ACOTH</code>, <code>OUT_OF_DOMAIN_LOG10</code>, <code>OUT_OF_DOMAIN_LN</code>, <code>OUT_OF_DOMAIN_SQRT</code></td>
      <td>Is triggered with <code>tan</code>, <code>csc</code>, <code>sec</code>, <code>cot</code>, <code>asin</code>, <code>acos</code>, <code>acsc</code>, <code>asec</code>, <code>acot</code>, <code>csch</code>, <code>coth</code>, <code>acosh</code>, <code>atanh</code>, <code>acsch</code>, <code>asech</code>, <code>acoth</code>, <code>log</code> (with one argument), <code>ln</code>, and <code>sqrt</code> respectively when the value of the argument falls outside of the accepted domain of the function.</td>
      <td class="last-table-column"><code>log-1</code>, <code>sec(pi/2)</code> (if <code>angleUnit</code> is set to <code>AngleUnits::RADIAN</code>), <code>sqrt(-2)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>OUT_OF_DOMAIN_LOG</code></td>
      <td>For the base, it's triggered when the base is non-positve or equal to <code>1</code>. For the argument, it's triggered when the argument is non-positive.</td>
      <td class="last-table-column"><code>log(-2,5)</code>, <code>log(1,0)</code>, <code>log(e,-4)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>OUT_OF_DOMAIN_NTHRT</code></td>
      <td>Is triggered when the index is equal to <code>0</code>, or the index is even with a negative argument for the <code>ntrht(arg,index)</code>.</td>
      <td class="last-table-column"><code>nthrt(-25,2)</code>, <code>nthrt(5,0)</code></td>
    </tr>
    <tr>
      <td class="td-fit-content"><code>OUT_OF_DOMAIN_MOD</code></td>
      <td>Is triggered when passing at least one decimal argument for the <code>mod(a,b)</code>.</td>
      <td class="last-table-column"><code>mod(1.5,2)</code>, <code>nthrt(-5,0.1)</code></td>
    </tr>
    <tr>
      <td class="last-table-row td-fit-content"><code>INVALID_SUM_LIMITS</code>, <code>INVALID_PROD_LIMITS</code></td>
      <td class="last-table-row">Is triggered if at least one of the limits is decimal or if the second limit is less than the first for <code>sum(expr,a,b)</code>, and <code>prod(expr,a,b)</code> respectively.</td>
      <td class="last-table-row last-table-column"><code>sum(2x,-2.5,5)</code>, <code>prod(2x,20,15)</code></td>
    </tr>
  </tbody>
</table>

# Conclusion
The `ExpressionParser` project is a testament to meticulous software design and a deep understanding of string manipulation/parsing algorithms. It successfully creates a feature-rich, reliable, and easy-to-integrate C++ library for a wide range of mathematical and logical tasks. This project showcases advanced skills in C++ development, object-oriented design, algorithm implementation, and robust error handling. Potential future enhancements could include support for user-defined variables and functions to further extend its scripting capabilities.

# How to Use
1. Download the header file from the section below.
2. Include it in your C++ project using `#include "..."`, with the appropriate path between the double quotes.

# Source code
*You can find the source code for this header [here](https://github.com/AbdulrahmanMohammadSalem/My-Projects-Portfolio/tree/C%2B%2B-Classes/ExpressionParser).*

<style>
  @font-face {
    font-family: 'Latin Modern Math';
    src: url('../../assets/fonts/Latin-Modern-Math.otf/') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Math (Modified)';
    src: url('../../assets/fonts/Latin-Modern-Math-Modified.ttf/') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .math-text {
    font-family: 'Latin Modern Math (Modified)';
  }
  
  .page__title {
    font-family: 'Latin Modern Math' !important;
  }

  td .MathJax_SVG_Display {
    margin: 7px 0px;
  }

  .two-column-table thead tr th, .two-column-table tbody tr td {
    width: 1%;
    text-align: center;
  }

  .text-align-center {
    text-align: center;
  }

  .td-fit-content {
    width: 40% !important;
  }
</style>