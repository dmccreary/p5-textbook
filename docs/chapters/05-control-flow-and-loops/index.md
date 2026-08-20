---
quality_score: 100
readability_score: 62
---
# Control Flow, Loops & Array Data Structures

## Summary

Covers conditional branching (if/else, switch), loop constructs (for, while), nested grid iterations, and dynamic array methods. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. While Loop Construct
2. For Loop Construct
3. Loop Counter Variable
4. Infinite Loop Prevention
5. Nested For Loops
6. 2D Grid Iteration
7. Array Data Structure
8. Array Element Indexing
9. Array Push Method
10. Array Pop Method
11. Array Length Property
12. For Of Loop Iteration
13. For Each Array Method
14. Array Splice Removal
15. Array Concat Joining
16. 2D Matrix Array
17. Array Reverse Ordering
18. Array Sort Ordering
19. Boolean Flag Variable
20. State Machine Logic
21. Break and Continue Keywords

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Variables, Data Types & Scope Fundamentals](../04-variables-and-scope/index.md)

---

!!! mascot-welcome "Welcome to Chapter 5!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Hey artists, why draw one circle when you could draw ten thousand in the blink of an eye? This chapter is all about giving you the incredible superpower of automation and repetition. Learn to command armies of shapes and watch your complex patterns unfold!

Welcome to Chapter 5! Have you ever had to do the exact same thing over and over again? Maybe it was writing sentences on a chalkboard as a punishment, or maybe it was stamping the same logo on a hundred different flyers. In programming, repeating tasks manually is the ultimate buzzkill. It's boring, prone to errors, and totally defeats the purpose of having a powerful computer at your fingertips.

## Introduction to Repetition: The Factory Assembly Line

Imagine your code as a factory. The **Factory Assembly Line** is a perfect metaphor for loops. On an assembly line, the same operation happens repeatedly to different items as they pass down the belt. A robot arm might tighten exactly four bolts on every car chassis that goes by. It doesn't need a separate instruction manual for each car; it just repeats the "tighten four bolts" sequence as long as the conveyor belt keeps moving.

In p5.js, when we want to draw 100 circles across the screen, we don't write `circle()` 100 times. Instead, we build a loop—our own little factory assembly line—that says, "Hey computer, execute this block of code 100 times."

### The **While Loop Construct**

The simplest way to create this assembly line is using the **While Loop Construct**. A `while` loop is exactly what it sounds like: it keeps executing a block of code *while* a certain condition is true.

```javascript
let count = 0;
while (count < 5) {
  console.log("Stamping flyer number " + count);
  count = count + 1;
}
```

In this example, the loop checks the condition `count < 5`. If it's true, it runs the code inside the curly braces. After running the code, it goes back up, checks the condition again, and repeats. This brings us to a critical piece of the puzzle: the **Loop Counter Variable**.

### The **Loop Counter Variable**

The **Loop Counter Variable** (in the example above, `count`) is the foreman of our factory. It keeps track of how many times the loop has run. Without it, the loop wouldn't know when to stop. We initialize it before the loop, check its value in the loop condition, and update it (like `count = count + 1`) inside the loop body.

### The **Infinite Loop Prevention** and The Infinite Loop Trap

What happens if you forget to update your loop counter variable? You fall into **The Infinite Loop Trap**. Imagine the robot arm on the assembly line goes rogue, repeatedly tightening the same bolt forever because the conveyor belt broke. Your program will get stuck in that loop, running as fast as the processor allows, until the browser crashes or your computer fans start screaming.

**Infinite Loop Prevention** is crucial. You must always ensure that the condition evaluated in your `while` loop will eventually become false. If you are checking `count < 5`, you absolutely must ensure that `count` increases during the loop execution.

!!! mascot-warning "The Infinite Loop Trap"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for browser crashes! If you write a `while` loop but forget to update the counter variable inside the curly braces, the condition will never become false. The computer will run the loop forever, locking up your entire browser. To prevent this, always make sure your update statement (like `count = count + 1`) is the very last line inside your loop body before you hit the run button!

### The **For Loop Construct**

Because setting up a loop counter, checking a condition, and updating the counter is so common, programmers created a streamlined version: the **For Loop Construct**. It packages all three steps (initialization, condition, and update) into a single, neat line of code.

```javascript
for (let i = 0; i < 5; i++) {
  console.log("Stamping flyer number " + i);
}
```

Here, `let i = 0` sets up our **Loop Counter Variable**. `i < 5` is our condition. And `i++` (which is shorthand for `i = i + 1`) is the update step. The `for` loop is often the preferred choice when you know exactly how many times you want the assembly line to run.

### **Break and Continue Keywords**

Sometimes, you need to disrupt the assembly line. Maybe a defective product comes down the belt, and you need to skip it, or maybe the factory catches fire and you need to shut down the line entirely.

The **Break and Continue Keywords** give you this control.
- `break`: Completely exits the loop immediately. The factory shuts down.
- `continue`: Skips the rest of the current loop iteration and moves directly to the next one. The defective product is skipped.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Stops the loop entirely when i reaches 5
  }
  if (i % 2 === 0) {
    continue; // Skips even numbers
  }
  console.log(i); // This will only print 1 and 3
}
```

## Grids and Patterns: The Spreadsheet Metaphor

Now that we can draw a row of shapes using a single loop, how do we draw a grid of shapes? Imagine a checkerboard, a brick wall, or the pixels on your screen. To create these 2D patterns, we need to think about **The Spreadsheet**.

A spreadsheet is organized into rows and columns. If you want to visit every cell in a spreadsheet, you might say, "Go to row 1, then read column A, B, C. Then go to row 2, and read column A, B, C."

### **Nested For Loops**

In code, we achieve this "spreadsheet scanning" by putting one loop inside another. This is called **Nested For Loops**. The outer loop typically controls the rows (the Y-axis in p5.js), and the inner loop controls the columns (the X-axis).

```javascript
for (let y = 0; y < height; y += 40) {
  for (let x = 0; x < width; x += 40) {
    fill(random(255));
    rect(x, y, 40, 40);
  }
}
```

For every single step of the outer `y` loop, the inner `x` loop runs to completion. So, if `y = 0`, the `x` loop draws a full row of squares across the top of the screen. Then `y` becomes 40, and the `x` loop draws another full row.

!!! mascot-encourage "The Nested Loop Brain-Bender"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If your brain feels completely twisted trying to visualize a loop running inside another loop, take a deep breath. That is totally normal! It is one of the first major cognitive hurdles in all of programming. Don't rush it. Grab a piece of paper and manually write down the values of `x` and `y` for the first few steps. It will click soon!

### **2D Grid Iteration**

This process is known as **2D Grid Iteration**. It is the fundamental technique for processing images (which are just grids of pixels), generating tile-based game maps, or creating complex, repeating geometric art. By mastering **Nested For Loops**, you unlock the ability to cover the entire canvas systematically.

#### Diagram: Nested Grid Explorer

<details>
<summary><b>MicroSim: Nested Grid Explorer</b></summary><summary><b>MicroSim: Nested Grid Explorer</b></summary>
<b>Type:</b> p5.js Interactive Concept Explorer

<b>Description:</b> A visual simulation demonstrating how **Nested For Loops** execute over a **2D Grid Iteration**. The canvas shows a 5x5 grid of cells. 
<b>Interactivity:</b>
- A "Step Forward" button allows the user to manually advance the loop execution.
- As the loop steps, the code snippet on the side highlights which line is currently executing (the outer `y` loop or the inner `x` loop).
- The corresponding cell in the 5x5 grid lights up, showing exactly how the inner loop completes a full row before the outer loop moves down to the next row.
- A slider controls the speed of an "Auto-Play" mode.
</details>

## Data Collections: The Train Cars

Up until now, our variables have been like single boxes, capable of holding only one value at a time. `let x = 50;` holds exactly one number. But what if we want to keep track of the X coordinates for 100 different bouncing balls? Creating 100 separate variables (`x1`, `x2`, `x3`...) is a nightmare.

We need a way to organize multiple related pieces of data. Enter the **Array Data Structure**.

Think of an Array as a train. The train has a locomotive at the front (the variable name), and trailing behind it are multiple train cars linked together in a specific order. Each train car holds one piece of data.

```javascript
let ballXPositions = [10, 50, 100, 200];
```

The square brackets `[]` are the tracks that define our train. Inside, separated by commas, are the contents of our train cars.

### **Array Element Indexing**

How do we access a specific train car? We use its position number, which in programming is called an index. But there's a catch: programmers start counting from zero!

This is known as **Array Element Indexing**. The first item is at index 0, the second is at index 1, and so on.

```javascript
console.log(ballXPositions[0]); // Prints 10
console.log(ballXPositions[2]); // Prints 100
```

### The **Array Length Property**

Every array automatically keeps track of how many train cars it has. This is the **Array Length Property**. You access it using `.length`.

```javascript
console.log(ballXPositions.length); // Prints 4
```

This property is incredibly useful when combined with a **For Loop Construct**. You can loop through every element in an array without even knowing exactly how many elements there are beforehand:

```javascript
for (let i = 0; i < ballXPositions.length; i++) {
  circle(ballXPositions[i], 100, 20);
}
```

### Expanding and Shrinking: **Array Push Method** and **Array Pop Method**

Arrays in JavaScript are dynamic; they can grow and shrink while your program runs. We can add and remove train cars.

The **Array Push Method** adds a new item to the *end* of the array. It pushes a new train car onto the tracks.

```javascript
ballXPositions.push(300); // Array is now [10, 50, 100, 200, 300]
```

The **Array Pop Method** removes the last item from the end of the array. It unhooks the last train car.

```javascript
let lastPos = ballXPositions.pop(); // Returns 300. Array is back to [10, 50, 100, 200]
```

!!! mascot-tip "The Last Element Shortcut"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a secret for dealing with dynamic arrays that are constantly growing or shrinking: if you ever need to grab the very last item in the train, but you don't know exactly how many cars there are, you don't need to count them! Just ask for `yourArray[yourArray.length - 1]`. It works perfectly every single time!

## Advanced Array Maneuvers

Once you're comfortable with basic array trains, you'll find there are many specialized methods to manage your data collections efficiently.

### **For Of Loop Iteration**

When you want to look at every single item in an array, the standard `for` loop works, but it can be a bit clunky to write out `let i = 0; i < array.length; i++` every time. Modern JavaScript gives us a cleaner alternative: the **For Of Loop Iteration**.

```javascript
let colors = ['red', 'green', 'blue'];
for (let col of colors) {
  fill(col);
  circle(random(width), random(height), 50);
}
```

This loop automatically iterates through every element in the `colors` array. In each iteration, the variable `col` takes on the value of the current element. It is much easier to read!

### The **For Each Array Method**

Another popular way to loop through arrays is the **For Each Array Method**. This relies on a concept called callbacks (which we will explore deeply later), but essentially, it asks the array to run a specific function for every item it contains.

```javascript
let sizes = [10, 20, 30];
sizes.forEach(function(size) {
  rect(width/2, height/2, size, size);
});
```

### Removing and Joining: **Array Splice Removal** and **Array Concat Joining**

What if you want to remove a train car from the *middle* of the train? You can't use `pop()`, because that only targets the end. For precise surgery, we use **Array Splice Removal**.

The `splice()` method requires two arguments: the index where you want to start cutting, and how many items you want to remove.

```javascript
let animals = ['dog', 'cat', 'bird', 'fish'];
animals.splice(1, 2); 
// Starts at index 1 ('cat'), removes 2 items ('cat' and 'bird')
// Array is now ['dog', 'fish']
```

Sometimes you have two separate trains and you want to hitch them together into one long train. We use **Array Concat Joining** for this.

```javascript
let trainA = [1, 2, 3];
let trainB = [4, 5, 6];
let longTrain = trainA.concat(trainB); // [1, 2, 3, 4, 5, 6]
```

### Order and Chaos: **Array Reverse Ordering** and **Array Sort Ordering**

You can quickly flip the entire order of your array using **Array Reverse Ordering**.

```javascript
let countdown = [1, 2, 3, 4, 5];
countdown.reverse(); // Now [5, 4, 3, 2, 1]
```

Sorting elements is another incredibly common task. The **Array Sort Ordering** method can alphabetize strings or arrange numbers (though number sorting requires a little extra helper function in JavaScript).

```javascript
let names = ['Zebra', 'Ape', 'Lion'];
names.sort(); // Now ['Ape', 'Lion', 'Zebra']
```

## Grids and Data: The 2D Matrix Array

We learned about 2D grids earlier using nested loops. But how do we *store* data for a 2D grid? We can put arrays inside of arrays! This creates a **2D Matrix Array**.

Imagine a tic-tac-toe board. It's a 3x3 grid. We can represent it as an array that contains three arrays (one for each row).

```javascript
let board = [
  ['X', 'O', ' '],
  [' ', 'X', 'O'],
  ['O', ' ', 'X']
];
```

To access the top-middle element, we first select the row array at index 0, and then the column element at index 1: `board[0][1]`, which gives us 'O'. By combining **Nested For Loops** with a **2D Matrix Array**, you can build complex systems like chess boards, Sudoku games, or terrain maps.

### Managing State: **Boolean Flag Variable** and **State Machine Logic**

As your programs become more complex, especially with interactivity, you need to keep track of what "mode" the program is in. Is the game paused or running? Is the player jumping or falling?

A **Boolean Flag Variable** is a simple true/false variable that acts like a switch.

```javascript
let isGameOver = false;

function draw() {
  if (isGameOver === true) {
    text("Game Over!", width/2, height/2);
    // Don't update game logic
  } else {
    // Run normal game loops
  }
}
```

When you have many different states (Start Menu, Playing, Paused, Game Over, High Score Screen), a simple flag isn't enough. You need **State Machine Logic**.

A State Machine uses a variable (often a string or number) to track the current phase of the program, and a `switch` statement (or `if/else if` blocks) to decide which code to run.

```javascript
let gameState = "MENU";

function draw() {
  if (gameState === "MENU") {
    drawMainMenu();
  } else if (gameState === "PLAYING") {
    playGame();
  } else if (gameState === "GAMEOVER") {
    showGameOverScreen();
  }
}
```

By organizing your code with **State Machine Logic**, you can easily transition from one scene of your interactive application to the next.

#### Diagram: The Interactive Array Train

<details>
<summary><b>MicroSim: The Interactive Array Train</b></summary><summary><b>MicroSim: The Interactive Array Train</b></summary>
<b>Type:</b> p5.js Interactive Concept Explorer

<b>Description:</b> A drag-and-drop interactive visualization of an **Array Data Structure** represented as train cars on a track.
<b>Interactivity:</b>
- UI buttons allow the user to execute the **Array Push Method** (spawns a new train car dropping onto the end of the track) and the **Array Pop Method** (the last train car detaches and rolls off screen).
- A numerical input field combined with a "Splice" button demonstrates **Array Splice Removal** by showing a specific train car dissolving into dust while the cars behind it slide forward to close the gap.
- The **Array Length Property** is prominently displayed on a billboard above the tracks that updates in real-time as cars are added or removed.
- Each train car clearly displays its **Array Element Indexing** number on its side, reinforcing that the first car is always index 0.
</details>

## Chapter Summary

In this chapter, we conquered the core concepts of repetition and data organization. We learned how the **While Loop Construct** and **For Loop Construct** let us automate repetitive tasks, relying on a **Loop Counter Variable** while avoiding the dreaded **Infinite Loop Prevention** pitfalls. We used **Nested For Loops** to master **2D Grid Iteration**.

We then introduced the **Array Data Structure**, leveraging **Array Element Indexing** and the **Array Length Property** to manage lists of data. We manipulated arrays dynamically using the **Array Push Method**, **Array Pop Method**, **Array Splice Removal**, and **Array Concat Joining**, and learned how to iterate cleanly with **For Of Loop Iteration** and the **For Each Array Method**. We even flipped and ordered arrays with **Array Reverse Ordering** and **Array Sort Ordering**, and nested them to create a **2D Matrix Array**.

Finally, we used a **Boolean Flag Variable** and **State Machine Logic** to control the flow and state of our applications, breaking out of loops when necessary using **Break and Continue Keywords**.

You now have the tools to manage massive amounts of data and create complex visual patterns with just a few lines of code. Onward to the next challenge!

!!! mascot-celebration "Automation Mastered!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered while loops, for loops, 2D nested grid iteration, and dynamic array data structures! You now have the power to command armies of shapes and manage complex data with just a few lines of code.
