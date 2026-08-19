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

## Introduction: The Magic of Memory

Imagine for a moment that you are a highly organized warehouse manager. Your warehouse is a gigantic, cavernous building filled with rows upon rows of empty cardboard boxes. Whenever a shipment arrives, you have a choice: you can just throw the items randomly into any open box, or you can carefully label the box with a black marker so you know exactly what is inside. If you choose the random approach, finding a specific item later—like a single red sock or a vintage video game—will be a nightmare. You would have to open every single box and dig through it. But if you slap a label on the box that says "Red Socks," you can walk straight to it the moment you need it. 

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

!!! mascot "Palette the Chameleon says..."
    "Think of `let` like a dry-erase marker on a plastic storage bin. You can write 'Winter Clothes' on it today, but next season you can wipe it off and write 'Summer Gear'. The label stays the same, but you can swap out the contents whenever you want! That's why it's a *variable*—it varies!"

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
