---
quality_score: 50
readability_score: 64
---

---

quality_score: 50
readability_score: 65
---
# Vector Math Fundamentals & Physics Acceleration

## Summary

Applies p5.Vector arithmetic, magnitude, normalization, velocity, acceleration, and force accumulation. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

1. p5 Vector Class Concept
2. Create Vector Function
3. Vector Addition Add
4. Vector Subtraction Sub
5. Vector Scalar Multiply
6. Vector Scalar Divide
7. Vector Magnitude Mag
8. Vector Magnitude Sq
9. Vector Normalize Method
10. Vector Set Mag Method
11. Vector Limit Magnitude
12. Vector Heading Angle
13. Vector From Angle
14. Vector Random 2D
15. Vector Dot Product
16. Vector Cross Product
17. Vector Distance Dist
18. Vector Angle Between
19. Vector Lerp Method

## Prerequisites

This chapter builds on concepts from:

- [Chapter 10: Perlin Noise Landscapes & Vector Flow Fields](../10-perlin-noise-fields/index.md)

---

!!! mascot-welcome "Welcome to Vector Math!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Hello artists! Have you ever wanted your shapes to move with real-world momentum and gravity? This chapter introduces the essential math that will turn your flat sketches into dynamic physical simulations. Time to step into the world of physics and give your art some weight!

Imagine you are pushing a shopping cart through a large supermarket. The cart represents an object in our sketch. To make it move, you have to apply a force. When you apply a force, you change its acceleration. Acceleration changes velocity, and velocity changes position! This is the essence of building a physics engine from scratch.

## The Shopping Cart Physics Metaphor

To do this, we need the **p5 Vector Class Concept**. A vector is an entity that has both a magnitude (length) and a direction. In p5.js, vectors are objects that store x, y, and sometimes z components. 

You can create one using the **Create Vector Function**. For instance, `let pos = createVector(x, y);`. 

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the **Vector Addition Add** method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the **Vector Subtraction Sub** method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the **Vector Scalar Multiply** method. If you get tired and push half as hard, you can use the **Vector Scalar Divide** method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the **Vector Magnitude Mag** method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the **Vector Magnitude Sq** method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the **Vector Normalize Method**. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the **Vector Set Mag Method**. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the **Vector Limit Magnitude** method.

!!! mascot-tip "Speed Limits"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a lifesaver: if you constantly apply a force (like gravity) without any friction, your objects will eventually accelerate to infinity and fly off the screen! Always slap a `velocity.limit(maxSpeed)` at the end of your update loop to keep things under control.

Which way is the cart pointing? You can find out using the **Vector Heading Angle** method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the **Vector From Angle** method. Sometimes you want the cart to start moving in a completely random direction. For this, the **Vector Random 2D** method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the **Vector Dot Product**. If we want to find a perpendicular force, maybe in 3D space, we use the **Vector Cross Product**. 

To find out how far away another shopper is, you can use the **Vector Distance Dist** method. If you want to know the angle between your path and their path, use the **Vector Angle Between** method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the **Vector Lerp Method**.

!!! mascot-encourage "Take it Step by Step"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If all this vector math feels overwhelming right now, that's completely normal! We are building an entire physics engine from scratch. Take a deep breath, and let's break it down into smaller pieces together.

### Deep Dive 1
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

### Deep Dive 2
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

### Deep Dive 3
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

### Deep Dive 4
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

### Deep Dive 5
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

### Deep Dive 6
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

### Deep Dive 7
Let's explore these ideas further with more examples.

When you are moving the shopping cart down the aisle, you might push it forward, and your friend might push it sideways. The resulting movement is the sum of these forces. This is called vector addition.
To calculate the total force on our shopping cart, we use the Vector Addition Add method. This allows us to combine multiple forces acting on an object. Similarly, if there is friction working against you, you might use the Vector Subtraction Sub method to subtract the friction vector from your velocity vector.

Sometimes you just push the cart twice as hard in the same direction. This scaling operation uses the Vector Scalar Multiply method. If you get tired and push half as hard, you can use the Vector Scalar Divide method. These scalar operations scale the vector's length without changing its direction.

If you want to know exactly how fast your shopping cart is moving, you need its speed. In vector terms, speed is the length of the velocity vector. We can find this using the Vector Magnitude Mag method. However, calculating the true magnitude requires a square root, which can be computationally expensive. If you only need to compare two lengths, you can use the Vector Magnitude Sq method instead to save performance.

When you only care about the direction you are pushing the cart, and not the strength, you need a unit vector. A unit vector has a length of exactly 1. You can turn any vector into a unit vector using the Vector Normalize Method. Once you have a normalized vector, you might want to give it a specific length. For example, setting the maximum speed of the shopping cart. You can do this with the Vector Set Mag Method. Alternatively, if you want to cap the speed so the cart doesn't go flying out of control, you can use the Vector Limit Magnitude method.

Which way is the cart pointing? You can find out using the Vector Heading Angle method, which returns the angle of rotation for the vector. If you know the angle you want to go, and you want to create a vector pointing that way, you use the Vector From Angle method. Sometimes you want the cart to start moving in a completely random direction. For this, the Vector Random 2D method is perfect, giving you a random unit vector.

What if we want to know how much two shopping carts are moving in the same direction? We can use the Vector Dot Product. If we want to find a perpendicular force, maybe in 3D space, we use the Vector Cross Product. 

To find out how far away another shopper is, you can use the Vector Distance Dist method. If you want to know the angle between your path and their path, use the Vector Angle Between method. Finally, if you want your cart to smoothly transition from its current velocity to a target velocity over time, you can interpolate between the vectors using the Vector Lerp Method.

!!! mascot-thinking "The Engine of Motion"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: an object's position doesn't just change magically. Force changes acceleration, acceleration changes velocity, and velocity changes position. This chain reaction is the core mental model behind every physics engine in the world!

### Interactive Physics

#### Diagram: Shopping Cart Acceleration


<iframe src="../../sims/shopping-cart-acceleration/main.html" width="100%" height="487px" scrolling="no"></iframe>
[Run Shopping Cart Acceleration Fullscreen](../../sims/shopping-cart-acceleration/main.html)

<details markdown="1">
<summary>MicroSim: Shopping Cart Acceleration</summary><summary>MicroSim: Shopping Cart Acceleration</summary>
This MicroSim should display a shopping cart from a top-down view. 
Users can click and drag to apply a force vector to the cart.
The cart's velocity should be visualized with an arrow, updating dynamically as acceleration is added.
</details>

#### Diagram: Vector Dot Product Visualizer


<iframe src="../../sims/vector-dot-product-visualizer/main.html" width="100%" height="487px" scrolling="no"></iframe>
[Run Vector Dot Product Visualizer Fullscreen](../../sims/vector-dot-product-visualizer/main.html)

<details markdown="1">
<summary>MicroSim: Vector Dot Product Visualizer</summary><summary>MicroSim: Vector Dot Product Visualizer</summary>
A visualizer showing two vectors, A and B. As the user rotates A, a bar graph shows the dot product. It peaks when they align and hits zero when perpendicular.
</details>

!!! mascot-celebration "Chapter Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered vector addition, magnitude calculations, and the force accumulation chain that powers real-world physics engines!

[See Annotated References](./references.md)
