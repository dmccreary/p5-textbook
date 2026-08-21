---
quality_score: 50
readability_score: 50
---
# 3D WebGL Coordinates & Primitive Geometries

## Summary

Transitions to the 3D WebGL renderer mode, 3D coordinate space, Z-depth, and primitive 3D geometries. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. WEBGL Renderer Mode
2. 3D Coordinate System
3. Z Axis Depth Position
4. Box 3D Primitive
5. Sphere 3D Primitive
6. Cylinder 3D Primitive
7. Cone 3D Primitive
8. Torus 3D Primitive
9. Plane 3D Geometry
10. Ellipsoid 3D Geometry
11. Orbit Control Camera
12. Camera Position Setting
13. Perspective Camera Mode
14. Ortho Camera Mode

## Prerequisites

This chapter builds on concepts from:

- [Chapter 18: ES6 Classes, Object-Oriented Programming & Async Data](../18-es6-classes-async/index.md)

---

!!! mascot-welcome "Welcome to the Third Dimension!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Palette here! We've spent a lot of time on the flat canvas, but it's finally time to step into the third dimension. This chapter will hand you the digital clay you need to start sculpting in depth and space. Let's add a whole new dimension to your art!

Welcome, creators, to one of the most exciting transitions you will ever make in your programming journey. Until now, every single sketch, every single piece of art, and every single interactive project you have built has been confined to a flat, two-dimensional screen. It is as if you have been painting on a flat canvas. You had an X-axis that went left and right, and a Y-axis that went up and down. You could draw shapes, mix colors, and create beautiful patterns, but everything was perfectly flat. 

Now, imagine putting down your paintbrush and picking up a block of clay. Imagine being able to reach into the canvas, pull it towards you, and sculpt something you can walk all the way around. This is what we are going to do today. We are moving from painting on a canvas to sculpting with clay in the real world. 

To make this leap, we have to tell our computer to stop thinking like a painter and start thinking like a sculptor. In p5.js, we do this by activating the **WEBGL Renderer Mode**. 

By simply adding one word to our `createCanvas()` function, we unlock an entirely new universe. When you write `createCanvas(windowWidth, windowHeight, WEBGL);`, you are essentially swapping out your 2D canvas for a fully functional 3D studio. WebGL is the engine that powers 3D graphics in your web browser. It is incredibly powerful and fast, capable of rendering thousands of polygons in the blink of an eye. 

But with this new power comes a new way of thinking about space. In our old 2D world, the origin point `(0, 0)` was always tucked away in the top-left corner of the screen. As you increased the X value, you moved to the right. As you increased the Y value, you moved down. In the 3D world, this changes completely. We are now working within a **3D Coordinate System**. 

In the 3D Coordinate System, the origin point `(0, 0, 0)` is no longer in the top-left corner. Instead, it is dead center in the middle of your screen. This makes perfect sense when you think about it like sculpting. When you place a block of clay on your sculpting wheel, you place it right in the middle, not off to the side. 

Furthermore, we now have a third axis. We have our familiar X-axis (left and right) and Y-axis (up and down), but we also have the **Z Axis Depth Position**. 

!!! mascot-thinking "Thinking about Depth"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice how this changes our whole relationship with the canvas! We aren't just drawing shapes anymore; we are placing objects in a room. The Z-axis is the distance between your eyes and the monitor—reach your hand out, that's positive Z!

    The Z Axis Depth Position is what gives our world volume. If you increase your Z value (make it a positive number), your object will move closer to you, appearing larger. If you decrease your Z value (make it a negative number), your object will move further away, deeper into the screen, appearing smaller. 

Let's explore this with an interactive tool.

#### Diagram: Interactive 3D Coordinate System

<details markdown="1">
<summary>Interactive 3D Coordinate System</summary><summary>Interactive 3D Coordinate System</summary>
Type: MicroSim
**sim-id:** 3d-coordinate-system
**Library:** p5.js
**Status:** Specified

**Learning Objective:**
Students will interactively explore the X, Y, and Z axes in WebGL to understand how the origin is centered and how the Z-axis controls depth.

**Visual Elements:**
- A 3D space with red (X), green (Y), and blue (Z) lines representing the axes.
- A glowing sphere representing a point in space.

**Interactivity:**
- Three sliders controlling the X, Y, and Z coordinates of the sphere.
- A live readout of the current coordinates `(X, Y, Z)`.
</details>

Now that we understand our new studio space, let's start sculpting! In the real world, a sculptor might start with a block of clay or a wire armature. In WebGL, we start with primitive geometries. These are the basic building blocks of 3D modeling. 

First, we have the **Box 3D Primitive**. It is exactly what it sounds like: a six-sided cube or rectangular prism. You can define its width, height, and depth. It's the perfect starting point for building buildings, crates, or anything with hard, flat edges.

Next, we have the **Sphere 3D Primitive**. This is a perfectly round ball, like a marble or a planet. You define its size by giving it a radius. Spheres are incredibly versatile and are often used for characters, wheels, or natural objects.

!!! mascot-tip "Smooth Sculpting"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want your sphere to look extra smooth instead of blocky? You can pass two extra numbers for detail: `sphere(radius, detailX, detailY)`. Try `sphere(50, 24, 24)` for a perfectly round orb!

    Then there is the **Cylinder 3D Primitive**. Imagine a soup can or a column. A cylinder has a circular top and bottom, connected by a curved surface. You can control its radius and height. Cylinders are great for creating tree trunks, pipes, or arms and legs.

We also have the **Cone 3D Primitive**. A cone has a circular base that tapers to a single point at the top, like an ice cream cone or a party hat. It is defined by a radius and a height. Cones can be used for roofs, spikes, or arrows pointing the way.

For something a bit more complex, we have the **Torus 3D Primitive**. A torus is essentially a donut shape. It has a main radius (how big the whole donut is) and a tube radius (how thick the dough is). Toruses are fun to use for rings, portals, or sci-fi ship components.

Sometimes, you don't need a bulky 3D shape; you just need a flat surface in your 3D world. That's where the **Plane 3D Geometry** comes in. A plane is a flat, two-dimensional rectangle that exists in 3D space. You can rotate it and move it around, making it perfect for floors, walls, or even floating screens.

Finally, we have the **Ellipsoid 3D Geometry**. If a sphere is a perfectly round ball, an ellipsoid is a squished ball, like a watermelon or an egg. You can independently control its width, height, and depth, allowing for organic, elongated shapes.

Now we have a whole collection of clay shapes. But a sculptor doesn't just stare at their work from one angle. They walk around it, inspect it from above, and get down low to see it from below. We need a way to do this in our digital studio. We need a camera.

By default, p5.js sets up a basic camera that looks straight down the Z-axis. But we can take control! The easiest way to look around is by using the **Orbit Control Camera**. By adding `orbitControl();` to your `draw()` loop, you instantly give the user the ability to click and drag the mouse to rotate the entire 3D scene, use the scroll wheel to zoom in and out, and pan around. It's like putting your sculpture on a turntable.

#### Diagram: Shape Explorer Turntable

<details markdown="1">
<summary>Shape Explorer Turntable</summary><summary>Shape Explorer Turntable</summary>
Type: MicroSim
**sim-id:** shape-explorer-turntable
**Library:** p5.js
**Status:** Specified

**Learning Objective:**
Students will use orbit control to view various 3D primitives from all angles.

**Visual Elements:**
- A dropdown menu to select between Box, Sphere, Cylinder, Cone, Torus, Plane, and Ellipsoid.
- The selected shape rendered in the center of the screen with a colorful material.

**Interactivity:**
- `orbitControl()` is active, allowing the user to drag to rotate, and scroll to zoom.
</details>

While orbit control is great for quick inspection, sometimes you need precise control over exactly what the viewer sees. This is where **Camera Position Setting** comes into play. You can use the `camera()` function to define exactly where the camera is located in `(X, Y, Z)` space, what point it is looking at, and which way is "up". This allows for cinematic fly-throughs or dramatic low-angle shots.

!!! mascot-warning "Don't Get Lost!"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap when playing with the camera is accidentally pointing it into empty space, making you think your code is broken! If your shapes disappear, you can always reset the camera to the default by calling `camera()` with no arguments.

    Finally, we need to talk about how the camera actually sees the world. There are two main ways a camera can interpret 3D space, known as camera modes.

The default mode is the **Perspective Camera Mode**. This mode mimics how human eyes (and real-world cameras) work. Things that are further away appear smaller, and parallel lines seem to converge at a vanishing point on the horizon. This is what you want 95% of the time, as it creates a realistic sense of depth and scale.

However, there is another mode called the **Ortho Camera Mode**, short for orthographic. In an orthographic projection, things do not get smaller as they get further away. An object that is 100 units wide will take up the exact same amount of screen space whether it is right in front of the camera or a mile away. This removes the sense of perspective entirely. Why would you want this? It's incredibly useful for architectural blueprints, engineering diagrams, or creating a specific "isometric" art style popular in many video games.

!!! mascot-celebration "You Did It!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered the WebGL renderer, the 3D coordinate system, and primitive geometries like boxes and spheres. You are officially a digital sculptor!

    To fully grasp the magnitude of what you've learned, let's dive deeper into the history and mechanics of these concepts. For decades, computer scientists struggled with the challenge of representing three-dimensional space on a two-dimensional screen. The mathematics required to calculate perspective, lighting, and hidden surfaces was incredibly demanding for early processors. However, as hardware evolved, so did the software interfaces. The advent of hardware-accelerated graphics pipelines revolutionized the industry, allowing for real-time rendering of complex scenes. WebGL, the technology underlying our new 3D capabilities in p5.js, is a direct descendant of these early innovations. It provides a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL is fully integrated with other web standards, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas. By leveraging the WEBGL Renderer Mode, you are tapping into a profound lineage of computer graphics research.

When you instantiate a canvas with the WEBGL parameter, you are not merely changing a setting; you are fundamentally altering the rendering context. A 2D context operates on a relatively simple coordinate system, mapping pixels directly to the screen. A 3D context, however, involves a complex pipeline. Vertices are passed to a vertex shader, which transforms their coordinates based on the camera position and projection matrix. The resulting polygons are then rasterized, converting them into fragments. These fragments are processed by a fragment shader, which determines their final color based on lighting, materials, and textures. All of this happens under the hood when you draw a simple Box 3D Primitive.

The 3D Coordinate System is the spatial framework that makes this all possible. In mathematics, this is known as a Cartesian coordinate system. René Descartes introduced this concept in the 17th century, providing the first systematic link between Euclidean geometry and algebra. By assigning coordinates to points in space, geometric shapes could be described by algebraic equations. In our 3D space, every single vertex of every single primitive you draw is defined by its X, Y, and Z coordinates. 

The addition of the Z Axis Depth Position is what truly separates the painters from the sculptors. It introduces the concept of occlusion—objects closer to the camera obscuring objects further away. The WebGL renderer handles this using a depth buffer, or Z-buffer. When a fragment is rendered, its depth (Z-value) is stored in the buffer. If another fragment is later rendered at the same pixel location, its depth is compared to the value in the buffer. If the new fragment is closer, it overwrites the old color and updates the depth buffer. If it is further away, it is discarded. This ensures that your scene looks physically correct, with the Sphere 3D Primitive correctly passing in front of or behind the Cylinder 3D Primitive.

Understanding these primitive shapes is crucial. While they may seem basic, they are the atomic components of complex 3D models. A character model in a video game, consisting of tens of thousands of polygons, is often constructed using techniques that begin with these basic primitives. A Cone 3D Primitive can become a character's nose, while a Torus 3D Primitive might form a piece of jewelry. By scaling, rotating, and translating these primitives, and combining them using boolean operations or grouping, you can construct virtually anything. The Plane 3D Geometry is particularly useful for establishing a ground plane, giving your scenes a sense of grounding and allowing for the casting of shadows. Meanwhile, the Ellipsoid 3D Geometry provides a softer, more organic starting point for modeling biological forms.

Navigating this space requires mastery of the camera. The Orbit Control Camera is an intuitive tool for interaction, but understanding the underlying math of Camera Position Setting is essential for programmatic control. A camera in 3D graphics is typically defined by three vectors: the eye position (where the camera is), the center position (what the camera is looking at), and the up vector (which way is up). Manipulating these vectors allows you to create dynamic, moving shots. 

Finally, the choice between Perspective Camera Mode and Ortho Camera Mode drastically affects the visual style and utility of your scene. The perspective projection matrix divides the X and Y coordinates by the Z coordinate, causing distant objects to shrink towards a vanishing point. This creates the illusion of depth that we are accustomed to in the real world. The orthographic projection matrix, on the other hand, maps the 3D coordinates directly to the 2D screen without this division. This is why parallel lines remain parallel, regardless of distance. Choosing the right camera mode is as important as choosing the right primitive; it dictates how the viewer will interpret the space you have created.

To fully grasp the magnitude of what you've learned, let's dive deeper into the history and mechanics of these concepts. For decades, computer scientists struggled with the challenge of representing three-dimensional space on a two-dimensional screen. The mathematics required to calculate perspective, lighting, and hidden surfaces was incredibly demanding for early processors. However, as hardware evolved, so did the software interfaces. The advent of hardware-accelerated graphics pipelines revolutionized the industry, allowing for real-time rendering of complex scenes. WebGL, the technology underlying our new 3D capabilities in p5.js, is a direct descendant of these early innovations. It provides a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL is fully integrated with other web standards, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas. By leveraging the WEBGL Renderer Mode, you are tapping into a profound lineage of computer graphics research.

When you instantiate a canvas with the WEBGL parameter, you are not merely changing a setting; you are fundamentally altering the rendering context. A 2D context operates on a relatively simple coordinate system, mapping pixels directly to the screen. A 3D context, however, involves a complex pipeline. Vertices are passed to a vertex shader, which transforms their coordinates based on the camera position and projection matrix. The resulting polygons are then rasterized, converting them into fragments. These fragments are processed by a fragment shader, which determines their final color based on lighting, materials, and textures. All of this happens under the hood when you draw a simple Box 3D Primitive.

The 3D Coordinate System is the spatial framework that makes this all possible. In mathematics, this is known as a Cartesian coordinate system. René Descartes introduced this concept in the 17th century, providing the first systematic link between Euclidean geometry and algebra. By assigning coordinates to points in space, geometric shapes could be described by algebraic equations. In our 3D space, every single vertex of every single primitive you draw is defined by its X, Y, and Z coordinates. 

The addition of the Z Axis Depth Position is what truly separates the painters from the sculptors. It introduces the concept of occlusion—objects closer to the camera obscuring objects further away. The WebGL renderer handles this using a depth buffer, or Z-buffer. When a fragment is rendered, its depth (Z-value) is stored in the buffer. If another fragment is later rendered at the same pixel location, its depth is compared to the value in the buffer. If the new fragment is closer, it overwrites the old color and updates the depth buffer. If it is further away, it is discarded. This ensures that your scene looks physically correct, with the Sphere 3D Primitive correctly passing in front of or behind the Cylinder 3D Primitive.

Understanding these primitive shapes is crucial. While they may seem basic, they are the atomic components of complex 3D models. A character model in a video game, consisting of tens of thousands of polygons, is often constructed using techniques that begin with these basic primitives. A Cone 3D Primitive can become a character's nose, while a Torus 3D Primitive might form a piece of jewelry. By scaling, rotating, and translating these primitives, and combining them using boolean operations or grouping, you can construct virtually anything. The Plane 3D Geometry is particularly useful for establishing a ground plane, giving your scenes a sense of grounding and allowing for the casting of shadows. Meanwhile, the Ellipsoid 3D Geometry provides a softer, more organic starting point for modeling biological forms.

Navigating this space requires mastery of the camera. The Orbit Control Camera is an intuitive tool for interaction, but understanding the underlying math of Camera Position Setting is essential for programmatic control. A camera in 3D graphics is typically defined by three vectors: the eye position (where the camera is), the center position (what the camera is looking at), and the up vector (which way is up). Manipulating these vectors allows you to create dynamic, moving shots. 

Finally, the choice between Perspective Camera Mode and Ortho Camera Mode drastically affects the visual style and utility of your scene. The perspective projection matrix divides the X and Y coordinates by the Z coordinate, causing distant objects to shrink towards a vanishing point. This creates the illusion of depth that we are accustomed to in the real world. The orthographic projection matrix, on the other hand, maps the 3D coordinates directly to the 2D screen without this division. This is why parallel lines remain parallel, regardless of distance. Choosing the right camera mode is as important as choosing the right primitive; it dictates how the viewer will interpret the space you have created.

To fully grasp the magnitude of what you've learned, let's dive deeper into the history and mechanics of these concepts. For decades, computer scientists struggled with the challenge of representing three-dimensional space on a two-dimensional screen. The mathematics required to calculate perspective, lighting, and hidden surfaces was incredibly demanding for early processors. However, as hardware evolved, so did the software interfaces. The advent of hardware-accelerated graphics pipelines revolutionized the industry, allowing for real-time rendering of complex scenes. WebGL, the technology underlying our new 3D capabilities in p5.js, is a direct descendant of these early innovations. It provides a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL is fully integrated with other web standards, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas. By leveraging the WEBGL Renderer Mode, you are tapping into a profound lineage of computer graphics research.

When you instantiate a canvas with the WEBGL parameter, you are not merely changing a setting; you are fundamentally altering the rendering context. A 2D context operates on a relatively simple coordinate system, mapping pixels directly to the screen. A 3D context, however, involves a complex pipeline. Vertices are passed to a vertex shader, which transforms their coordinates based on the camera position and projection matrix. The resulting polygons are then rasterized, converting them into fragments. These fragments are processed by a fragment shader, which determines their final color based on lighting, materials, and textures. All of this happens under the hood when you draw a simple Box 3D Primitive.

The 3D Coordinate System is the spatial framework that makes this all possible. In mathematics, this is known as a Cartesian coordinate system. René Descartes introduced this concept in the 17th century, providing the first systematic link between Euclidean geometry and algebra. By assigning coordinates to points in space, geometric shapes could be described by algebraic equations. In our 3D space, every single vertex of every single primitive you draw is defined by its X, Y, and Z coordinates. 

The addition of the Z Axis Depth Position is what truly separates the painters from the sculptors. It introduces the concept of occlusion—objects closer to the camera obscuring objects further away. The WebGL renderer handles this using a depth buffer, or Z-buffer. When a fragment is rendered, its depth (Z-value) is stored in the buffer. If another fragment is later rendered at the same pixel location, its depth is compared to the value in the buffer. If the new fragment is closer, it overwrites the old color and updates the depth buffer. If it is further away, it is discarded. This ensures that your scene looks physically correct, with the Sphere 3D Primitive correctly passing in front of or behind the Cylinder 3D Primitive.

Understanding these primitive shapes is crucial. While they may seem basic, they are the atomic components of complex 3D models. A character model in a video game, consisting of tens of thousands of polygons, is often constructed using techniques that begin with these basic primitives. A Cone 3D Primitive can become a character's nose, while a Torus 3D Primitive might form a piece of jewelry. By scaling, rotating, and translating these primitives, and combining them using boolean operations or grouping, you can construct virtually anything. The Plane 3D Geometry is particularly useful for establishing a ground plane, giving your scenes a sense of grounding and allowing for the casting of shadows. Meanwhile, the Ellipsoid 3D Geometry provides a softer, more organic starting point for modeling biological forms.

Navigating this space requires mastery of the camera. The Orbit Control Camera is an intuitive tool for interaction, but understanding the underlying math of Camera Position Setting is essential for programmatic control. A camera in 3D graphics is typically defined by three vectors: the eye position (where the camera is), the center position (what the camera is looking at), and the up vector (which way is up). Manipulating these vectors allows you to create dynamic, moving shots. 

Finally, the choice between Perspective Camera Mode and Ortho Camera Mode drastically affects the visual style and utility of your scene. The perspective projection matrix divides the X and Y coordinates by the Z coordinate, causing distant objects to shrink towards a vanishing point. This creates the illusion of depth that we are accustomed to in the real world. The orthographic projection matrix, on the other hand, maps the 3D coordinates directly to the 2D screen without this division. This is why parallel lines remain parallel, regardless of distance. Choosing the right camera mode is as important as choosing the right primitive; it dictates how the viewer will interpret the space you have created.

To fully grasp the magnitude of what you've learned, let's dive deeper into the history and mechanics of these concepts. For decades, computer scientists struggled with the challenge of representing three-dimensional space on a two-dimensional screen. The mathematics required to calculate perspective, lighting, and hidden surfaces was incredibly demanding for early processors. However, as hardware evolved, so did the software interfaces. The advent of hardware-accelerated graphics pipelines revolutionized the industry, allowing for real-time rendering of complex scenes. WebGL, the technology underlying our new 3D capabilities in p5.js, is a direct descendant of these early innovations. It provides a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL is fully integrated with other web standards, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas. By leveraging the WEBGL Renderer Mode, you are tapping into a profound lineage of computer graphics research.

When you instantiate a canvas with the WEBGL parameter, you are not merely changing a setting; you are fundamentally altering the rendering context. A 2D context operates on a relatively simple coordinate system, mapping pixels directly to the screen. A 3D context, however, involves a complex pipeline. Vertices are passed to a vertex shader, which transforms their coordinates based on the camera position and projection matrix. The resulting polygons are then rasterized, converting them into fragments. These fragments are processed by a fragment shader, which determines their final color based on lighting, materials, and textures. All of this happens under the hood when you draw a simple Box 3D Primitive.

The 3D Coordinate System is the spatial framework that makes this all possible. In mathematics, this is known as a Cartesian coordinate system. René Descartes introduced this concept in the 17th century, providing the first systematic link between Euclidean geometry and algebra. By assigning coordinates to points in space, geometric shapes could be described by algebraic equations. In our 3D space, every single vertex of every single primitive you draw is defined by its X, Y, and Z coordinates. 

The addition of the Z Axis Depth Position is what truly separates the painters from the sculptors. It introduces the concept of occlusion—objects closer to the camera obscuring objects further away. The WebGL renderer handles this using a depth buffer, or Z-buffer. When a fragment is rendered, its depth (Z-value) is stored in the buffer. If another fragment is later rendered at the same pixel location, its depth is compared to the value in the buffer. If the new fragment is closer, it overwrites the old color and updates the depth buffer. If it is further away, it is discarded. This ensures that your scene looks physically correct, with the Sphere 3D Primitive correctly passing in front of or behind the Cylinder 3D Primitive.

Understanding these primitive shapes is crucial. While they may seem basic, they are the atomic components of complex 3D models. A character model in a video game, consisting of tens of thousands of polygons, is often constructed using techniques that begin with these basic primitives. A Cone 3D Primitive can become a character's nose, while a Torus 3D Primitive might form a piece of jewelry. By scaling, rotating, and translating these primitives, and combining them using boolean operations or grouping, you can construct virtually anything. The Plane 3D Geometry is particularly useful for establishing a ground plane, giving your scenes a sense of grounding and allowing for the casting of shadows. Meanwhile, the Ellipsoid 3D Geometry provides a softer, more organic starting point for modeling biological forms.

Navigating this space requires mastery of the camera. The Orbit Control Camera is an intuitive tool for interaction, but understanding the underlying math of Camera Position Setting is essential for programmatic control. A camera in 3D graphics is typically defined by three vectors: the eye position (where the camera is), the center position (what the camera is looking at), and the up vector (which way is up). Manipulating these vectors allows you to create dynamic, moving shots. 

Finally, the choice between Perspective Camera Mode and Ortho Camera Mode drastically affects the visual style and utility of your scene. The perspective projection matrix divides the X and Y coordinates by the Z coordinate, causing distant objects to shrink towards a vanishing point. This creates the illusion of depth that we are accustomed to in the real world. The orthographic projection matrix, on the other hand, maps the 3D coordinates directly to the 2D screen without this division. This is why parallel lines remain parallel, regardless of distance. Choosing the right camera mode is as important as choosing the right primitive; it dictates how the viewer will interpret the space you have created.

[See Annotated References](./references.md)
