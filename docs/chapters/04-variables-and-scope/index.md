---
quality_score: 100
readability_score: 62
---
# Variables, Data Types & Scope Fundamentals

## Summary

Teaches variable declarations (let, const), global vs. local scoping, and relational comparison operators. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Let Variable Declaration
2. Const Constant Variable
3. Global Variable Scope
4. Local Block Scope
5. If Conditional Branch
6. Else Conditional Branch
7. Else If Chained Logic
8. Relational Operators
9. Logical AND Operator
10. Logical OR Operator
11. Logical NOT Operator
12. Ternary Operator Syntax
13. Switch Statement Syntax

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Color Theory, Color Modes & Pixel Manipulation](../03-color-theory-pixels/index.md)

---

!!! mascot-welcome "Welcome to Chapter 4!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Welcome back, creators! Do you want your artwork to change, react, and remember things over time? You'll need to understand how our code stores information. This chapter is your secret to unlocking dynamic memory, so let's blend some code and level up your skills!

Imagine for a moment that you are a highly organized warehouse manager. Your warehouse is a gigantic, cavernous building filled with rows upon rows of empty cardboard boxes. Whenever a shipment arrives, you have a choice: you can just throw the items randomly into any open box, or you can carefully label the box with a black marker so you know exactly what is inside. If you choose the random approach, finding a specific item later—like a single red sock or a vintage video game—will be a nightmare. You would have to open every single box and dig through it. But if you slap a label on the box that says "Red Socks," you can walk straight to it the moment you need it. 

## Introduction: The Magic of Memory

In the world of computer programming, the computer's memory (its RAM) is exactly like that massive warehouse. It consists of millions and millions of empty storage slots. When we write programs in p5.js, we often need to remember things: the player's score, the X and Y coordinates of a character on the screen, the color of the background, or the number of lives remaining. To store these pieces of information, we use something called a **variable**. 

A variable is a labeled box in the computer's memory. We give the box a name, we put a value inside it, and whenever we need that value later, we just call it by its name. 

## The Art of Labeling: **Let Variable Declaration**

In JavaScript (the programming language that powers p5.js), there are a few different ways to create variables, but the most common and versatile way is by using the `let` keyword. 

Creating a variable is known as a **Let Variable Declaration**. When you use `let`, you are giving the computer a direct command: "Hey, find me an empty box in the warehouse, put this label on it, and let me put something inside."

Let's look at an example. In your p5.js sketch, you might write:

```javascript
let playerHealth = 100;
let characterName = "Hero";
let xPosition = 200;
let yPosition = 200;
```

What exactly is happening here? We are declaring four distinct variables. 
1. `playerHealth` is storing the number 100.
2. `characterName` is storing a piece of text (known as a string) called "Hero".
3. `xPosition` and `yPosition` are storing the numbers 200, representing a coordinate on our canvas.

The true power of variables declared with `let` is hidden in the word itself: *variable*. These boxes are not sealed permanently. Their contents can vary—meaning they can change—over time. If our character takes damage from an enemy, we can change the contents of the `playerHealth` box. 

```javascript
// The player takes 20 damage!
playerHealth = playerHealth - 20; 
```

Now, the `playerHealth` box holds the number 80. Notice that we didn't use the `let` keyword the second time. You only need to use `let` when you are creating the box for the very first time. After the box exists, you can just refer to it by its name to change what's inside. 

!!! mascot-thinking "The Dry-Erase Metaphor"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of `let` like a dry-erase marker on a plastic storage bin. You can write 'Winter Clothes' on it today, but next season you can wipe it off and write 'Summer Gear'. The label stays the same, but you can swap out the contents whenever you want!

### Choosing Good Names for Your Boxes

When you create variables, you get to choose their names. However, you should follow standard conventions. Variable names should be descriptive. A variable named `x` might be okay for a quick test, but in a large game, a variable named `enemyLaserXPosition` is much clearer. We typically use a naming style called **camelCase**, where the first word is lowercase, and every following word starts with a capital letter (e.g., `myFirstVariable`, `playerScore`, `isGameOver`). This makes the names easy to read without using spaces, which are not allowed in variable names.

## Unchanging Truths: **Const Constant Variable**

Sometimes, you want to put something in a box, put the lid on, seal it shut with heavy-duty duct tape, and never, ever let it change. For these situations, we use a **Const Constant Variable**. 

"Const" stands for constant. When you declare a variable using `const`, you are making a promise to the computer that the value inside that box will remain exactly the same for the entire duration of the program. 

```javascript
const pi = 3.14159;
const maxPlayers = 4;
const gameTitle = "Space Invaders";
```

Why would we want to do this? Why not just use `let` for everything? The answer is safety. As your programs grow larger and more complex, it becomes easy to accidentally overwrite a variable that you didn't mean to touch. If you have a variable that controls the force of gravity in your game, and you accidentally change it from `9.8` to `900`, your entire game will break. By using `const`, you create a built-in safety net. If you or anyone else tries to change a `const` variable later in the code:

```javascript
const maxPlayers = 4;

// Later in the code...
maxPlayers = 5; // ERROR! The computer will stop and complain!
```

The computer will throw an error and refuse to run the program. It protects you from your own mistakes. As a general rule of thumb: if you know a value should never change while your program is running, use `const`. If you know the value will need to be updated (like a score, a timer, or a position), use `let`.

## The One-Way Mirror: Understanding Scope

Once you start creating variables, you need to know where they live. Just because you put a box in the warehouse doesn't mean everyone is allowed to open it. This brings us to the concept of **Scope**. Scope is the set of rules that determines which parts of your code can "see" and use your variables.

### The View from the Top: **Global Variable Scope**

A variable declared outside of any functions or blocks has **Global Variable Scope**. It is the ultimate VIP of your code. Everyone in your program, from the `setup()` function to the `draw()` function, and any custom functions you write, can see it, use it, and change it.

```javascript
let score = 0; // This is a global variable

function setup() {
  createCanvas(400, 400);
  textSize(32);
}

function draw() {
  background(220);
  
  // Every time draw runs, it can access and change the global score variable
  score = score + 1; 
  text("Score: " + score, 20, 50);
}
```

In the example above, `score` is a global variable. Because it was declared at the very top of the script, outside of any curly braces `{}`, both `setup()` and `draw()` have full access to it. Global variables are incredibly powerful for tracking the overall state of your program—like the current level, the player's total health, or the position of the main character. 

However, with great power comes great responsibility. Because *any* part of your code can change a global variable, it’s easy to accidentally overwrite important data when your programs get large. Imagine having 50 different functions, and they all have the ability to change the `playerHealth` variable. If the player suddenly dies unexpectedly, tracking down which function caused the bug can be a nightmare. 

### The Russian Nesting Dolls: **Local Block Scope**

To protect variables from being accidentally changed, we can limit their scope. Variables declared inside a pair of curly braces `{}` have **Local Block Scope**. 

Think of scope like a set of Russian nesting dolls, or a room with a one-way mirror. If you are inside a smaller, inner doll (a block of code like a function), you can look out and see the global variables. But the global code outside cannot look in and see your local variables. They are completely hidden.

```javascript
let globalMessage = "I am visible everywhere!"; // Global scope

function setup() {
  createCanvas(400, 400);
  
  let localMessage = "I am a secret!"; // Local block scope
  
  console.log(globalMessage); // Works perfectly!
  console.log(localMessage);  // Works perfectly!
}

function draw() {
  console.log(globalMessage); // Works perfectly!
  
  // ERROR! draw() cannot see localMessage. 
  // It is hidden inside setup()'s scope.
  // console.log(localMessage); 
}
```

This local isolation is fantastic because it means you can reuse variable names like `i`, `x`, or `tempColor` in different functions without them stepping on each other's toes. If you declare `let x = 10` inside `function one()`, and `let x = 50` inside `function two()`, the computer treats them as two completely separate boxes. They just happen to have the same label, but they are stored in different locked rooms.

!!! mascot-warning "The Undefined Trap"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for the "is not defined" error! A common trap is declaring a variable with `let` inside `setup()`, and then trying to use it inside `draw()`. Because it's locked in local block scope, `draw()` has no idea it exists. To fix this, declare `let myVar;` globally at the very top of your file, and only assign the actual value inside `setup()`.

<details class="microsim">
<summary>MicroSim: Scope Visualizer</summary>
<b>Type:</b> Interactive p5.js Sketch
<b>Goal:</b> Let students drag a magnifying glass over different functions to see which variables are currently "visible" in the scope.
<b>Features:</b>
- A split screen with a mock code editor on the left and a visualization of memory boxes on the right.
- Highlighting variables in green if they are accessible from the current line of code under the magnifying glass.
- Highlighting variables in red if they are out of scope.
- Visualizing the "one-way mirror" effect where inner blocks can see outer blocks, but not vice versa.
</details>

## The Switchboard: Making Decisions

A program that does the exact same thing every time is boring. It's like a movie that plays the same way no matter what you do. To make interactive art, games, or applications, your code needs to be able to make decisions based on what is happening in the moment. It needs a switchboard operator directing traffic.

### The Main Path: **If Conditional Branch**

The most basic decision-making tool in programming is the **If Conditional Branch**. It asks a simple Yes/No question. If the answer is Yes (which we call `true` in programming), it runs a specific block of code. If the answer is No (`false`), it completely skips that block of code as if it wasn't even there.

```javascript
let isRaining = true;

if (isRaining) {
  console.log("Bring an umbrella!");
}
```

In p5.js, we constantly use `if` statements to respond to user input. For example, we might want to change the color of a shape only if the mouse is currently moving.

```javascript
function draw() {
  background(220);
  fill(255); // Default white color
  
  if (mouseIsPressed) {
    fill(255, 0, 0); // Change to red IF the mouse is pressed
  }
  
  ellipse(mouseX, mouseY, 50, 50);
}
```

Notice how the `if` statement uses curly braces `{}`. The code *inside* those braces is the block that will be executed if the condition is true. The `fill(255, 0, 0);` line is skipped entirely if the user is not clicking the mouse.

### The Alternative: **Else Conditional Branch**

What if you want to do one thing if the condition is true, but a completely different thing if it’s false? Enter the **Else Conditional Branch**. It acts as a fallback or a default backup plan.

```javascript
function draw() {
  background(220);
  
  if (mouseX > 200) {
    // If the mouse is on the right side of the screen
    fill(0, 0, 255); // Blue
  } else {
    // If the mouse is ANYWHERE else (the left side)
    fill(255, 0, 0); // Red
  }
  
  rect(100, 100, 200, 200);
}
```

The `else` block does not have its own condition in parentheses. It simply catches anything that fails the initial `if` test. It guarantees that one, and only one, of the two blocks of code will run.

### Complex Routing: **Else If Chained Logic**

Sometimes two choices aren't enough. Imagine you are grading a test. There isn't just Pass or Fail; there are A, B, C, D, and F grades. If you have multiple scenarios to check, you can use **Else If Chained Logic** to create a complex switchboard.

```javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Study harder!");
}
```

When the computer evaluates an `else if` chain, it checks the conditions from top to bottom. As soon as it finds *one* condition that is true, it runs that specific block of code and then immediately jumps to the very end of the entire chain, skipping the rest. 

In the example above, `score` is 85. 
1. The computer checks `score >= 90`. That is false.
2. The computer checks `score >= 80`. That is true! It prints "Grade: B".
3. The computer completely ignores the rest of the chain. 

This top-to-bottom evaluation is crucial. If you put `score >= 70` at the very top, an 85 would trigger the "Grade: C" block first, and the computer would never even check if it was a B or an A! Always order your chained logic carefully.

## The Questioning Mind: Operators

To use `if` statements effectively, you need to be able to ask complex, highly specific questions. We do this using operators. Operators are symbols that tell the computer to perform specific mathematical, relational, or logical operations and produce a final result.

### Comparing Things: **Relational Operators**

**Relational Operators** compare two values and return a simple boolean response: `true` or `false`. They are the foundation of all `if` statement conditions.

Here are the standard relational operators you will use constantly in JavaScript:

- `>` Greater than
- `<` Less than
- `>=` Greater than or equal to
- `<=` Less than or equal to
- `===` Strictly equal to
- `!==` Strictly not equal to

```javascript
let playerHealth = 50;
let maxHealth = 100;

if (playerHealth <= 0) {
  text("Game Over", width/2, height/2);
}

if (playerHealth === maxHealth) {
  text("Full Health Bonus!", width/2, height/2 + 30);
}
```

*Note: You might wonder why we use three equals signs (`===`) to check for equality instead of one (`=`). In programming, a single equals sign is the assignment operator (used to put a value into a variable box, like `let x = 5`). The triple equals sign is the comparison operator (used to ask the question, "Is x equal to 5?").*

### Combining Questions: Logical Operators

What if you need to check two or more things at the exact same time? Maybe a door should only open if the player has the key AND is standing near the lock. 

The **Logical AND Operator** (`&&`) requires *both* conditions on either side of it to be true for the entire statement to be true.
```javascript
let hasKey = true;
let isNearDoor = true;

if (hasKey && isNearDoor) {
  console.log("The door swings open."); // Both are true, so this runs!
}
```

The **Logical OR Operator** (`||`) requires *at least one* condition to be true. If the first one is true, or the second one is true, or both are true, the statement passes.
```javascript
let isWeekend = false;
let isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("No school today!"); // isHoliday is true, so this runs!
}
```

The **Logical NOT Operator** (`!`) is a bit different. It flips a true to a false, or a false to a true. It means "the opposite of." It is incredibly useful for checking if something hasn't happened yet.
```javascript
let isGameOver = false;

if (!isGameOver) {
  // This translates to "If it is NOT true that the game is over..."
  // In other words, if the game is still running, keep updating the player.
  updatePlayer();
}
```

!!! mascot-thinking "The Logic Gate Bouncers"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of Logical Operators like bouncers at an exclusive club. AND (`&&`) is the strict bouncer who says "You need an ID AND a VIP ticket." OR (`||`) is the chill bouncer who says "You need a ticket OR a VIP pass, either is fine." NOT (`!`) is the weird bouncer who says "If you are NOT wearing sneakers, you can come in!"

## Advanced Decision Making

Once you master `if`, `else`, and operators, you can start writing more concise, professional-looking code. JavaScript offers a few shorthand tools for specific situations.

### The Shortcut: **Ternary Operator Syntax**

Often, you will find yourself writing a very simple `if/else` statement whose only purpose is to assign a value to a variable based on a condition. 

```javascript
// The long way
let status;
let myScore = 80;

if (myScore > 50) {
  status = "Winner";
} else {
  status = "Try Again";
}
```

You can compress this entire block onto a single, elegant line using the **Ternary Operator Syntax**. The syntax looks like a question being asked and answered: `condition ? trueResult : falseResult;`

```javascript
// The Ternary Operator way
let myScore = 80;
let status = (myScore > 50) ? "Winner" : "Try Again";
```
The computer evaluates the condition `(myScore > 50)`. Because it is followed by a question mark `?`, it knows this is a ternary operation. If the condition is true, it grabs the first value `"Winner"`. If it's false, it jumps over the colon `:` and grabs `"Try Again"`. It's a handy shortcut that makes your code cleaner and faster to read once you get used to it.

### The Giant Switchboard: **Switch Statement Syntax**

If you are checking the *exact same variable* against many different possible exact values, a long chain of `else if` statements can get very messy and repetitive. The **Switch Statement Syntax** was built specifically for this scenario. It is perfect for handling things like keyboard inputs or game states.

```javascript
let currentGameState = "PLAYING";

switch (currentGameState) {
  case "START_MENU":
    drawMenuScreen();
    break;
  case "PLAYING":
    drawGameLevel();
    break;
  case "GAME_OVER":
    drawGameOverScreen();
    break;
  default:
    console.log("Unknown game state!");
}
```

Here is how a `switch` works:
1. It looks at the variable in the parentheses (`currentGameState`).
2. It jumps directly to the `case` that perfectly matches that value.
3. It runs the code under that case.
4. When it hits the `break` keyword, it immediately exits the switch statement. If you forget the `break`, it will "fall through" and accidentally run the code in the cases below it!
5. The `default` case at the bottom acts exactly like an `else` statement. It catches anything that didn't match the specific cases above.

<details class="microsim">
<summary>MicroSim: The Logic Gate Switchboard</summary>
<b>Type:</b> Interactive p5.js Puzzle
<b>Goal:</b> Wire up a switchboard using AND, OR, and NOT logic gates to route power to a neon sign.
<b>Features:</b>
- A drag-and-drop interface with logic gate blocks (&&, ||, !).
- Draggable wires that connect different inputs (like toggle buttons or light sensors) to output targets.
- Students must use Logical AND and Logical OR nodes to route the signals correctly based on the puzzle requirements (e.g., "The sign should only glow if Button 1 is ON AND Button 2 is OFF").
- Real-time evaluation: When the boolean conditions are met, the virtual neon sign glows!
</details>

---

## Conclusion and Practice

Variables and conditionals are the absolute bedrock of programming. Without variables, a computer has no memory—it would be a goldfish, forgetting everything the moment a frame is drawn. Without conditionals, a computer has no free will or decision-making ability—it would just be a mindless calculator repeating the same list of steps.

Take your time experimenting with scope. It can be incredibly frustrating at first to figure out why a variable is throwing an error because it's "undefined." But if you remember the Russian nesting dolls and the one-way mirror, you will quickly learn to spot scope bugs. 

Practice combining your relational and logical operators to build complex rules for your p5.js sketches. Try creating a drawing program that changes colors based on where the mouse is and which keys are currently being pressed.

In the next chapter, we will look at loops: how to repeat actions hundreds of times a second without having to write hundreds of lines of code!

!!! mascot-celebration "Memory Unlocked!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered variable declarations, global and local scope, and the complex logic of conditional switchboards! You've given your code both memory and the power to make decisions.
