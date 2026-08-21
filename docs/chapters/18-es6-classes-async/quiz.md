# Quiz: ES6 Classes, Object-Oriented Programming & Async Data

Test your understanding of Classes, constructors, methods, inheritance, async/await, and fetch() API with these review questions.

---

#### 1. Which special method is automatically executed when a new object instance is created with `new MyClass()`?

<div class="upper-alpha" markdown>
1. constructor()
2. init()
3. create()
4. setup()
</div>

??? question "Show Answer"
    The correct answer is **A**. The `constructor()` method is a special method for creating and initializing an object instance created with a `class`. Options B, C, and D are not the standard ES6 constructor keyword.

    **Concept Tested:** Class Constructor Method

---

#### 2. What keyword is used inside a class method to refer to the current object instance and its properties?

<div class="upper-alpha" markdown>
1. this
2. self
3. me
4. instance
</div>

??? question "Show Answer"
    The correct answer is **A**. In JavaScript classes, `this` refers to the specific instance of the class being created or operated upon. Options B, C, and D are used in other programming languages (like Python) but not JavaScript.

    **Concept Tested:** This Instance Keyword

---

#### 3. How does a child subclass inherit methods and properties from a parent superclass in ES6?

<div class="upper-alpha" markdown>
1. class Car inherits Vehicle
2. class Car extends Vehicle
3. class Car implements Vehicle
4. class Car derivedFrom Vehicle
</div>

??? question "Show Answer"
    The correct answer is **B**. The `extends` keyword is used in class declarations to create a class that is a child of another class. Options B, C, and D are invalid keywords in JavaScript class syntax.

    **Concept Tested:** Class Inheritance Extends

---

#### 4. What function must be called inside a derived subclass constructor before accessing `this`?

<div class="upper-alpha" markdown>
1. parent()
2. super()
3. base()
4. inherit()
</div>

??? question "Show Answer"
    The correct answer is **B**. In derived classes, `super()` must be called before using `this` to invoke the parent superclass constructor and initialize inherited properties. Options B, C, and D are incorrect.

    **Concept Tested:** Super Constructor Call

---

#### 5. What does the `async` keyword placed before a function declaration signify?

<div class="upper-alpha" markdown>
1. The function executes in a separate Web Worker thread on the GPU
2. The function operates asynchronously and automatically returns a Promise
3. The function runs in an infinite background loop
4. The function blocks the main UI thread until finished
</div>

??? question "Show Answer"
    The correct answer is **B**. An `async` function always returns a Promise. Inside an `async` function, the `await` keyword can pause execution until a Promise settles without blocking the browser. Options B, C, and D are incorrect.

    **Concept Tested:** Async Function Promise

---

#### 6. How do you asynchronously load and parse JSON data from an external web API using modern `async/await`?

<div class="upper-alpha" markdown>
1. const data = fetch(url).parse();
2. const data = loadJSONSync(url);
3. const res = await fetch(url); const data = await res.json();
4. const res = http.get(url); const data = res.body;
</div>

??? question "Show Answer"
    The correct answer is **C**. Modern JavaScript fetches network resources using `await fetch(url)` followed by `await res.json()` to parse the response payload into a JavaScript object. Options B, C, and D are invalid or outdated syntax.

    **Concept Tested:** Async Await Fetch JSON

---

#### 7. Which ES6 feature unpacks properties from an object into distinct variables (e.g. `const { x, y } = particle;`)?

<div class="upper-alpha" markdown>
1. Variable Hoisting
2. Array Slicing
3. Object Destructuring
4. Spread Syntax
</div>

??? question "Show Answer"
    The correct answer is **C**. Object destructuring is a JavaScript expression that makes it possible to unpack properties from objects into distinct variables concisely. Options B, C, and D refer to other language features.

    **Concept Tested:** Object Destructuring Syntax

---

#### 8. What does the Array method `.map()` return?

<div class="upper-alpha" markdown>
1. The filtered subset of items matching a predicate
2. A single accumulated scalar value
3. A new array containing the results of calling a provided function on every element in the calling array
4. An integer index of the first match
</div>

??? question "Show Answer"
    The correct answer is **C**. `.map()` transforms an array by applying a callback to each item, returning a brand-new array of equal length with the transformed values. Option B describes `.reduce()`. Option C describes `.filter()`. Option D describes `.findIndex()`.

    **Concept Tested:** Array Map Higher Order

---

#### 9. Why is using `try...catch` blocks essential when fetching asynchronous external data across the internet?

<div class="upper-alpha" markdown>
1. To prevent the browser from caching requests
2. To speed up network download bandwidth
3. To bypass cross-origin CORS security policies
4. To gracefully handle network dropouts, HTTP errors (404/500), or invalid JSON parsing without crashing the application
</div>

??? question "Show Answer"
    The correct answer is **D**. Network requests can fail due to offline status, server outages, or corrupt payloads. Wrapping asynchronous calls in `try...catch` blocks catches runtime exceptions and allows fallback behavior. Options B, C, and D are false.

    **Concept Tested:** Try Catch Async Error Handling

---

#### 10. Which Array method removes elements that fail a test condition and returns a new array with only the elements that pass?

<div class="upper-alpha" markdown>
1. .reduce()
2. .map()
3. .forEach()
4. .filter()
</div>

??? question "Show Answer"
    The correct answer is **D**. `.filter()` evaluates a predicate function on every element, returning a new array containing only elements for which the callback returned `true`. Options B, C, and D perform different array operations.

    **Concept Tested:** Array Filter Method

---
