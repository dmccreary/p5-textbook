# Quiz: Control Flow, Loops & Array Data Structures

Test your understanding of Loops, nested loops, 2D grids, arrays, and flow control with these review questions.

---

#### 1. What are the three components separated by semicolons in a standard `for` loop header `for (A; B; C)`?

<div class="upper-alpha" markdown>
1. Initialization, Condition, Update (Increment/Decrement)
2. Condition, Action, Breakpoint
3. Declaration, Parameter, Return value
4. Start point, Midpoint, End point
</div>

??? question "Show Answer"
    The correct answer is **A**. A standard `for` loop header consists of initialization (e.g., `let i = 0`), condition check (`i < 10`), and post-iteration update (`i++`). Options A, C, and D are not the components of a standard `for` loop header.

    **Concept Tested:** For Loop Construct

---

#### 2. What dangerous condition occurs if a `while` loop's condition never evaluates to `false`?

<div class="upper-alpha" markdown>
1. An infinite loop that freezes the browser tab or main thread
2. Automatic hardware restart
3. The loop terminates instantly after one iteration
4. The canvas switches to 3D WebGL mode
</div>

??? question "Show Answer"
    The correct answer is **A**. If the loop condition never becomes false, the loop executes indefinitely without yielding control back to the browser, blocking the event loop and causing the browser tab to hang. Options B, C, and D are incorrect.

    **Concept Tested:** Infinite Loop Prevention

---

#### 3. Which loop structure is specifically designed to iterate through row-and-column visual grids on a 2D canvas?

<div class="upper-alpha" markdown>
1. Single while loop with a setTimeout
2. Nested for loops (an outer loop for y and an inner loop for x)
3. Recursive draw() invocation
4. switch statement with 256 cases
</div>

??? question "Show Answer"
    The correct answer is **B**. Nested `for` loops iterate over columns (`x`) across every row (`y`), calculating `(x, y)` coordinate positions to populate a 2D grid of shapes. Options B, C, and D are unsuitable and inefficient for grid rendering.

    **Concept Tested:** Nested Loops and 2D Grids

---

#### 4. How do you access the first element of an array named `particles` in JavaScript?

<div class="upper-alpha" markdown>
1. particles[1]
2. particles[0]
3. particles.first()
4. particles(0)
</div>

??? question "Show Answer"
    The correct answer is **B**. JavaScript arrays are zero-indexed, meaning the first element is at index `0` (`particles[0]`). `particles[1]` accesses the second element. Options C and D are invalid syntax in standard JavaScript.

    **Concept Tested:** Array Indexing

---

#### 5. Which array method adds a new element to the end of an existing array?

<div class="upper-alpha" markdown>
1. pop()
2. push()
3. shift()
4. unshift()
</div>

??? question "Show Answer"
    The correct answer is **B**. `push()` appends one or more elements to the end of an array. `pop()` removes from the end, `shift()` removes from the beginning, and `unshift()` adds to the beginning.

    **Concept Tested:** Array Push Method

---

#### 6. Consider the loop: `for (let x = 0; x < 100; x += 25)`. How many total iterations will this loop execute?

<div class="upper-alpha" markdown>
1. 3
2. 5
3. 4
4. 25
</div>

??? question "Show Answer"
    The correct answer is **C**. The loop executes for `x = 0`, `x = 25`, `x = 50`, and `x = 75`. When `x` reaches 100, the condition `x < 100` evaluates to `false`, terminating the loop after exactly 4 iterations.

    **Concept Tested:** Loop Step Iteration

---

#### 7. When iterating through an array to remove items using `splice()`, why is it recommended to loop backwards from `length - 1` down to `0`?

<div class="upper-alpha" markdown>
1. Looping backwards executes at 2x hardware speed
2. JavaScript prohibits forward iteration when calling splice()
3. Removing an item shifts subsequent index positions left, causing a forward loop to skip the next adjacent element
4. Backwards loops automatically sort the remaining array elements
</div>

??? question "Show Answer"
    The correct answer is **C**. When an item is removed with `splice(i, 1)`, all subsequent items shift to an index one lower. In a forward loop, `i++` advances past the newly shifted item, skipping it. Looping backwards ensures shifted elements have indices already evaluated. Options A, C, and D are false.

    **Concept Tested:** Array Splice in Loops

---

#### 8. What keyword is used inside a `switch` statement block to prevent execution from 'falling through' into subsequent cases?

<div class="upper-alpha" markdown>
1. stop
2. exit
3. break
4. return
</div>

??? question "Show Answer"
    The correct answer is **C**. The `break` keyword terminates the `switch` statement execution, preventing fall-through into matching subsequent `case` blocks. Options A, B, and D are not standard case terminators.

    **Concept Tested:** Switch Statement Break

---

#### 9. A sketch stores 50 particle x-positions in an array `xCoords`. Which loop header correctly visits every valid element in the array?

<div class="upper-alpha" markdown>
1. for (let i = 0; i <= xCoords.length; i++)
2. for (let i = 1; i <= xCoords.length; i++)
3. for (let i = 0; i < 50; i += xCoords)
4. for (let i = 0; i < xCoords.length; i++)
</div>

??? question "Show Answer"
    The correct answer is **D**. Array indices run from `0` to `array.length - 1`. The condition `i < xCoords.length` safely visits every valid index. Option A produces an `undefined` value on the final iteration because `xCoords[length]` is out of bounds.

    **Concept Tested:** Array Length Iteration

---

#### 10. You want to render a 10x10 tile pattern where each tile is 40 pixels wide. Inside nested loops `for(let y=0; y<10; y++)` and `for(let x=0; x<10; x++)`, what are the pixel coordinates for tile `(x, y)`?

<div class="upper-alpha" markdown>
1. `(x + 40, y + 40)`
2. `(x * 10, y * 10)`
3. `(x / 40, y / 40)`
4. `(x * 40, y * 40)`
</div>

??? question "Show Answer"
    The correct answer is **D**. Multiplying the column and row indices by the tile width (`x * 40`, `y * 40`) maps discrete grid units (0, 1, 2...) to pixel positions (0, 40, 80...). Option A only adds an offset. Option C divides. Option D scales by grid dimensions rather than tile size.

    **Concept Tested:** Grid Coordinate Scaling

---
