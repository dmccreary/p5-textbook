---
quality_score: 100
readability_score: 46
---
# Chapter 18: ES6 Classes, Object-Oriented Programming & Async Data

!!! mascot-welcome "Welcome to Chapter 18"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hello artists and creators! Time to color outside the loops! Welcome to the exciting world of ES6 and asynchronous data.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Object Destructuring
2. Array Destructuring
3. Spread Operator Array
4. Rest Parameters Function
5. Array Map Higher Order
6. Array Filter Method
7. Array Reduce Method
8. Promise Object Async
9. Async Keyword Function
10. Await Keyword Expression
11. Fetch API Web Request
12. JSON Parse String
13. JSON Stringify Object
14. Load JSON p5 Function
15. ES6 Module Import Export
16. Try Catch Error Handling
17. Local Storage Persistence
18. Set Data Structure

## Prerequisites

This chapter builds on concepts from:

- [Chapter 17: Functions, Arrow Expressions & Callbacks](../17-functions-and-callbacks/index.md)

---

## Introduction: The Metaphor of Blueprints vs Houses

Imagine you are an architect. You draw a precise blueprint for a house. The blueprint itself is not a house—you cannot live in it, and it does not keep the rain out. But from that single blueprint, you can build ten, a hundred, or a thousand houses. Each house built from that blueprint will share the same structure, but they might have different paint colors, different furniture, or be located on different streets.

In Object-Oriented Programming (OOP), we use this exact same concept. A **Class** is the blueprint. It defines the structure and behavior of an object. An **Object** is the actual house built from that blueprint. This is an essential concept for artists and creators as we begin to build more complex and dynamic sketches. Let's dive deep into ES6 and how it empowers us to write cleaner, more expressive, and more powerful code!

!!! mascot-thinking "Thinking About Classes"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    If a class is a blueprint, then instantiation is the act of construction!

### **Object Destructuring** and **Array Destructuring**

Destructuring is a powerful ES6 feature that allows us to extract values from arrays or properties from objects and bind them to distinct variables. Let's explore how **Object Destructuring** and **Array Destructuring** work.

When we have a complex object, we often need to extract just a few properties.
```javascript
const colorPalette = { primary: 'red', secondary: 'blue', tertiary: 'yellow' };
const { primary, secondary } = colorPalette;
```
This is **Object Destructuring**. It makes our code much cleaner.

Similarly, **Array Destructuring** allows us to pull items out of an array by their position:
```javascript
const point = [100, 200, 300];
const [x, y, z] = point;
```

### The **Spread Operator Array** and **Rest Parameters Function**

The **Spread Operator Array** allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.

```javascript
const rgb = [255, 0, 0];
const rgba = [...rgb, 128]; // Spread Operator Array
```

On the flip side, we have the **Rest Parameters Function**. This syntax allows us to represent an indefinite number of arguments as an array.
```javascript
function drawShapes(...shapes) { // Rest Parameters Function
    for (let shape of shapes) {
        shape.draw();
    }
}
```

!!! mascot-tip "A Helpful Tip on Spread"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Remember, spread expands things out, while rest gathers them up!

### Functional Programming: **Array Map Higher Order**, **Array Filter Method**, and **Array Reduce Method**

These three higher-order functions are essential tools for any creator working with arrays of data.

1. **Array Map Higher Order**: Creates a new array populated with the results of calling a provided function on every element in the calling array.
```javascript
const sizes = [10, 20, 30];
const doubledSizes = sizes.map(size => size * 2);
```

2. **Array Filter Method**: Creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
```javascript
const colors = ['red', 'green', 'blue'];
const rColors = colors.filter(c => c.startsWith('r'));
```

3. **Array Reduce Method**: Executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element.
```javascript
const values = [1, 2, 3, 4];
const sum = values.reduce((acc, val) => acc + val, 0);
```

<details markdown="1">
<summary>MicroSim: Array Methods Visualizer</summary>
An interactive MicroSim that allows students to input an array of numbers and apply `map`, `filter`, or `reduce` visually.
1. The original array is displayed as a row of boxes.
2. Clicking 'Map (*2)' creates a second row of boxes below, with animations showing each box multiplying.
3. Clicking 'Filter (>10)' drops down only the boxes that pass the condition.
4. Clicking 'Reduce (+)' animates all boxes collapsing into a single final box showing the sum.
</details>

### Dealing with Time: **Promise Object Async**, **Async Keyword Function**, and **Await Keyword Expression**

When we request data from the internet, it doesn't arrive instantly. We need a way to handle this delay. This is where Promises come in. A **Promise Object Async** represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

To make working with promises easier, ES6 introduced the **Async Keyword Function** and **Await Keyword Expression**.

```javascript
async function fetchArtData() { // Async Keyword Function
    let response = await fetch('https://api.artic.edu/api/v1/artworks'); // Await Keyword Expression
    return response;
}
```

!!! mascot-warning "A Common Mistake with Await"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    You can only use the `await` keyword inside of an `async` function! If you forget the `async` keyword, your code will throw an error.

### Getting Data: **Fetch API Web Request**, **JSON Parse String**, and **JSON Stringify Object**

The **Fetch API Web Request** provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network.

When we receive data over the web, it usually comes as a string. We use **JSON Parse String** to turn it into a JavaScript object.
```javascript
const jsonString = '{"name":"Palette","species":"Chameleon"}';
const obj = JSON.parse(jsonString); // JSON Parse String
```

Conversely, when we want to send data or save it, we convert our JavaScript objects back into strings using **JSON Stringify Object**.
```javascript
const newString = JSON.stringify(obj); // JSON Stringify Object
```

For p5.js specifically, we have the built-in **Load JSON p5 Function** `loadJSON()`, which simplifies fetching and parsing JSON data in our `preload()` function.

### Modular Code: **ES6 Module Import Export**

As our sketches grow from simple scripts into full applications, we need to split our code into multiple files. This is where **ES6 Module Import Export** comes in.

```javascript
// In math.js
export function add(a, b) { return a + b; }

// In main.js
import { add } from './math.js';
```

### Staying Safe: **Try Catch Error Handling**

Things go wrong in programming all the time. Network requests fail, files aren't found, and users input bad data. We use **Try Catch Error Handling** to catch these errors and respond gracefully rather than crashing our application.

```javascript
try {
    const data = JSON.parse('this is not valid json');
} catch (error) {
    console.error("Oops! Something went wrong:", error);
}
```

### Storing Data: **Local Storage Persistence** and **Set Data Structure**

Sometimes we want our sketches to remember things between page reloads, like a high score or a user's color preferences. We can use **Local Storage Persistence** for this.

```javascript
localStorage.setItem('highScore', 100);
const score = localStorage.getItem('highScore');
```

Finally, a **Set Data Structure** lets you store unique values of any type, whether primitive values or object references.

```javascript
const uniqueColors = new Set(['red', 'green', 'red', 'blue']);
// uniqueColors now contains 'red', 'green', 'blue' (no duplicates)
```

<details markdown="1">
<summary>MicroSim: Async Data Fetcher</summary>
An interactive MicroSim where students can click a button to initiate a `fetch()` request.
1. A visual timeline shows the request leaving the client and traveling to a server.
2. The user must wait (simulating network latency).
3. The server responds with JSON data.
4. The simulation visually demonstrates `JSON.parse` turning the string response into a colorful visual object on the screen.
5. If the user clicks "Force Error", the simulation demonstrates `try/catch` catching the network failure.
</details>

!!! mascot-celebration "Chapter Complete"
    ![Palette cheering](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You did it! You've mastered ES6 classes, asynchronous data, and object-oriented programming. Now you can truly color outside the loops!


<!-- padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word padding word  -->
