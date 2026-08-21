# Quiz: Variables, Data Types & Scope Fundamentals

Test your understanding of Variables, let, const, global vs local scope, and data types with these review questions.

---

#### 1. What is the primary difference between declaring a variable with `let` versus `const` in JavaScript?

<div class="upper-alpha" markdown>
1. let permits variable reassignment, whereas const creates an immutable binding that cannot be reassigned
2. let variables are global, while const variables are strictly local to setup()
3. const variables can only hold numeric values, while let holds strings
4. const variables automatically increase in value on every frame
</div>

??? question "Show Answer"
    The correct answer is **A**. `let` declares a reassignable block-scoped variable, while `const` declares a block-scoped identifier whose binding cannot be reassigned. Options A, C, and D are false.

    **Concept Tested:** Const vs Let Variables

---

#### 2. If a variable `x` is declared with `let x = 100;` outside of all functions, what scope does it possess?

<div class="upper-alpha" markdown>
1. Global scope accessible across all functions in the sketch
2. Local scope restricted to draw()
3. Block scope restricted to setup()
4. Module scope that prevents draw() from reading its value
</div>

??? question "Show Answer"
    The correct answer is **A**. Variables declared outside of any enclosing function or block have global scope, making them accessible and mutable in `setup()`, `draw()`, and any user-defined functions. Options A, B, and D are incorrect.

    **Concept Tested:** Global Variable Scope

---

#### 3. What occurs when a student declares `let x = 0;` inside `draw()` and writes `x = x + 1;` expecting it to animate across the canvas?

<div class="upper-alpha" markdown>
1. The shape animates smoothly across the canvas
2. x is re-declared and reset to 0 at the start of every frame, preventing progressive animation
3. The sketch throws an unhandled SyntaxError
4. The browser crashes due to memory overflow
</div>

??? question "Show Answer"
    The correct answer is **B**. Because `x` is declared locally inside `draw()`, a brand-new variable `x` is created and initialized to 0 on every single frame, resulting in `x` never exceeding 1. To persist state across frames, `x` must be declared globally outside `draw()`. Options A, C, and D are incorrect.

    **Concept Tested:** Local Block Scope Pitfall

---

#### 4. Which data type in JavaScript represents binary truth values used in conditional evaluations?

<div class="upper-alpha" markdown>
1. Number
2. Boolean
3. String
4. Symbol
</div>

??? question "Show Answer"
    The correct answer is **B**. The Boolean data type has only two possible values: `true` and `false`. They are fundamental for control flow and conditional statements like `if`. Options A, B, and D are other primitive types.

    **Concept Tested:** Boolean Data Type

---

#### 5. What will `console.log(typeof '42');` output in the JavaScript console?

<div class="upper-alpha" markdown>
1. number
2. string
3. boolean
4. undefined
</div>

??? question "Show Answer"
    The correct answer is **B**. Any value enclosed in quotes (single or double) is interpreted as a string primitive, regardless of whether its contents are numeric characters. Therefore `typeof '42'` returns `'string'`.

    **Concept Tested:** Data Types and Typeof

---

#### 6. What is variable shadowing in JavaScript?

<div class="upper-alpha" markdown>
1. Creating a drop shadow behind text variables on the canvas
2. Assigning one variable to another by reference
3. Declaring a local variable with the exact same name as a global variable, temporarily masking the global variable within that scope
4. Deleting a variable from browser memory during garbage collection
</div>

??? question "Show Answer"
    The correct answer is **C**. Variable shadowing occurs when a variable declared within an inner scope (such as inside a function or loop) shares the identifier of a variable in an outer scope, hiding the outer variable within the inner block. Options A, C, and D are incorrect.

    **Concept Tested:** Variable Shadowing

---

#### 7. Which comparison operator checks both value and type equality without performing implicit type coercion?

<div class="upper-alpha" markdown>
1. ==
2. =
3. ===
4. !=
</div>

??? question "Show Answer"
    The correct answer is **C**. The strict equality operator `===` (triple equals) evaluates whether two operands have both the identical value and data type without coercion. `=` is assignment, `==` is loose equality with coercion, and `!=` is loose inequality.

    **Concept Tested:** Strict Equality Operator

---

#### 8. A ball is moving with `x += speed;`. You want it to reverse direction when it hits either the right edge (`width`) or left edge (`0`). Which conditional statement is correct?

<div class="upper-alpha" markdown>
1. if (x > width && x < 0) { speed *= -1; }
2. if (x == width) { speed = 0; }
3. if (x > width || x < 0) { speed *= -1; }
4. if (x > width) { speed = 1; }
</div>

??? question "Show Answer"
    The correct answer is **C**. The logical OR operator `||` triggers if the ball exceeds the right boundary (`x > width`) OR crosses the left boundary (`x < 0`), multiplying `speed` by `-1` to reverse direction. Option A uses logical AND `&&`, which can never be simultaneously true for a single number.

    **Concept Tested:** Conditional Boundary Bouncing

---

#### 9. What value is stored in variable `z` after evaluating `let z = 5 + '5';`?

<div class="upper-alpha" markdown>
1. 10
2. undefined
3. NaN
4. '55'
</div>

??? question "Show Answer"
    The correct answer is **D**. When the `+` operator is applied between a number and a string, JavaScript performs string concatenation, coercing the number `5` to `'5'`, yielding `'55'`. Options A, C, and D are incorrect.

    **Concept Tested:** Implicit Type Coercion

---

#### 10. A student's code contains `if (isColliding = true)` instead of `if (isColliding === true)`. What bug does this introduce?

<div class="upper-alpha" markdown>
1. It causes a fatal syntax error and halts execution
2. It compares isColliding with the global window object
3. It sets isColliding to null
4. It assigns true to isColliding and always evaluates the conditional block as true
</div>

??? question "Show Answer"
    The correct answer is **D**. Using the single equals assignment operator `=` inside an `if` condition assigns `true` to `isColliding` and returns `true`, causing the branch to always execute regardless of previous state. Options A, C, and D are incorrect.

    **Concept Tested:** Assignment vs Comparison Bug

---
