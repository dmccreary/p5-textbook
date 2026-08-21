# Quiz: Functions, Arrow Expressions & Callbacks

Test your understanding of Function declarations, parameters, return values, arrow functions, and callback architecture with these review questions.

---

#### 1. What is the primary architectural purpose of decomposing code into custom functions?

<div class="upper-alpha" markdown>
1. Modular reusability, abstraction of complex tasks, and reduced code duplication
2. To increase the size of the compiled JavaScript file
3. To force code to run synchronously on a single CPU core
4. To prevent global variables from being declared
</div>

??? question "Show Answer"
    The correct answer is **A**. Functions allow programmers to encapsulate logic into named, reusable modules with parameterized inputs and return values, enhancing clarity, testability, and maintainability. Options B, C, and D are false.

    **Concept Tested:** Modular Function Abstraction

---

#### 2. What keyword is used to terminate a function and send a computed value back to the caller?

<div class="upper-alpha" markdown>
1. return
2. yield
3. export
4. send
</div>

??? question "Show Answer"
    The correct answer is **A**. The `return` statement ends function execution and specifies a value to be returned to the function caller. Options B, C, and D do not perform standard function value return in JavaScript.

    **Concept Tested:** Function Return Statement

---

#### 3. How is an ES6 arrow function syntactically written to square a number `x`?

<div class="upper-alpha" markdown>
1. const sq = function(x) { x * x };
2. const sq = (x) => x * x;
3. const sq = x -> x * x;
4. const sq = (x) => return x * x;
</div>

??? question "Show Answer"
    The correct answer is **B**. Concise ES6 arrow functions with a single expression implicitly return the evaluated expression without requiring braces or the `return` keyword: `(x) => x * x`. Option C uses invalid arrow syntax. Option D has syntax error with `return` without braces.

    **Concept Tested:** Arrow Function Expression

---

#### 4. What is a callback function in JavaScript?

<div class="upper-alpha" markdown>
1. A recursive function that calls itself until stack overflow
2. A function passed as an argument to another function, intended to be executed at a later time or upon an event
3. A function that can only be called from an HTML button
4. A function that has no parameters
</div>

??? question "Show Answer"
    The correct answer is **B**. A callback is a function provided to another function (or event listener) to be invoked when a specific task completes or an event occurs. Options B, C, and D misdefine callbacks.

    **Concept Tested:** Callback Function Concept

---

#### 5. Why is passing a function reference `button.mousePressed(resetSketch)` correct, while `button.mousePressed(resetSketch())` is a common beginner bug?

<div class="upper-alpha" markdown>
1. resetSketch() only works with arrow functions
2. resetSketch passes the function as a callback, while resetSketch() invokes the function immediately during setup
3. p5.js requires parentheses for all callback bindings
4. resetSketch without parentheses deletes the function
</div>

??? question "Show Answer"
    The correct answer is **B**. Passing the identifier `resetSketch` passes a reference to the function so it can be called later when clicked. Adding `()` executes the function immediately during setup and passes its return value (`undefined`) instead of the function. Options B, C, and D are false.

    **Concept Tested:** Callback Reference vs Execution

---

#### 6. What lexical property distinguishes ES6 arrow functions from traditional `function` declarations regarding the `this` keyword?

<div class="upper-alpha" markdown>
1. Arrow functions cannot access outer variables
2. Arrow functions create a brand-new global `this` binding
3. Arrow functions do not bind their own `this`; they inherit `this` lexically from the surrounding scope
4. Arrow functions require the `new` keyword to be called
</div>

??? question "Show Answer"
    The correct answer is **C**. Arrow functions capture the `this` value of the enclosing execution context, preventing common context-loss bugs inside class methods and callbacks. Options B, C, and D are incorrect.

    **Concept Tested:** Lexical This Binding

---

#### 7. What will a function return by default in JavaScript if it reaches the end of its body without executing a `return` statement?

<div class="upper-alpha" markdown>
1. 0
2. null
3. undefined
4. false
</div>

??? question "Show Answer"
    The correct answer is **C**. In JavaScript, functions that do not explicitly return a value evaluate to `undefined`. Options B, C, and D are not the default implicit return value.

    **Concept Tested:** Implicit Return Undefined

---

#### 8. How do default parameter values work in modern JavaScript functions (e.g. `function drawTree(x, y, branches = 5)`)?

<div class="upper-alpha" markdown>
1. It throws a TypeError if a different number is passed
2. The parameter is permanently locked to 5 and cannot be changed
3. If the caller omits `branches` or passes `undefined`, the parameter defaults to 5
4. It multiplies incoming values by 5
</div>

??? question "Show Answer"
    The correct answer is **C**. Default parameters allow formal parameters to be initialized with default values if no value or `undefined` is passed during invocation. Options B, C, and D are false.

    **Concept Tested:** Default Parameter Values

---

#### 9. What is a pure function in computer science?

<div class="upper-alpha" markdown>
1. A function that cannot return strings
2. A function that only contains mathematical operators without any variables
3. A function that is written in assembly language
4. A function whose return value depends solely on its input arguments, producing no observable side effects
</div>

??? question "Show Answer"
    The correct answer is **D**. Pure functions are deterministic: given the same arguments, they always return the same result and do not mutate external state (no side effects), making them easy to test and debug. Options B, C, and D are incorrect.

    **Concept Tested:** Pure Function Definition

---

#### 10. A developer writes a helper function `isMouseInside(x, y, w, h)` to detect button hover. What return type should this function produce?

<div class="upper-alpha" markdown>
1. DOM Element
2. String ('yes' or 'no')
3. Number (1 or 0)
4. Boolean (true or false)
</div>

??? question "Show Answer"
    The correct answer is **D**. Functions that check conditions or predicates should return boolean values (`true` or `false`), allowing direct use in conditional statements like `if (isMouseInside(...))`. Options B, C, and D are less idiomatic.

    **Concept Tested:** Boolean Predicate Functions

---
