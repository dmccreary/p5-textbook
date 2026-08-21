# Quiz: Touch Gestures, Mobile Sensors & Interaction

Test your understanding of Mobile touch events, touches array, multi-touch pinch/zoom, accelerometer, and gyroscope tilt with these review questions.

---

#### 1. Which array stores the coordinates and identifiers of all active touch contact points on a touchscreen device?

<div class="upper-alpha" markdown>
1. touches[]
2. touchPoints[]
3. fingers[]
4. contactList[]
</div>

??? question "Show Answer"
    The correct answer is **A**. The built-in `touches[]` array contains an object for each finger currently touching the screen, with `x`, `y`, and `id` properties. Options B, C, and D are not p5.js system arrays.

    **Concept Tested:** Touches Array

---

#### 2. Which system variables report the device's physical rotational tilt around the X, Y, and Z axes?

<div class="upper-alpha" markdown>
1. rotationX, rotationY, rotationZ
2. tiltX, tiltY, tiltZ
3. gyroX, gyroY, gyroZ
4. angleX, angleY, angleZ
</div>

??? question "Show Answer"
    The correct answer is **A**. `rotationX` (pitch), `rotationY` (roll), and `rotationZ` (yaw) provide real-time angular orientation from the device's built-in gyroscope. Options B, C, and D are not p5.js system variables.

    **Concept Tested:** Device Orientation Tilt

---

#### 3. What mobile sensor measures linear acceleration forces in meters per second squared along the three spatial axes?

<div class="upper-alpha" markdown>
1. Magnetometer compass
2. Accelerometer (accelerationX, accelerationY, accelerationZ)
3. Barometer pressure sensor
4. Ambient light photometer
</div>

??? question "Show Answer"
    The correct answer is **B**. Accelerometer sensors measure dynamic changes in velocity and gravitational acceleration along X, Y, and Z axes. Options B, C, and D measure magnetic fields, air pressure, and light.

    **Concept Tested:** Device Accelerometer Motion

---

#### 4. How do you calculate the distance between two fingers in a two-touch pinch gesture?

<div class="upper-alpha" markdown>
1. touches[0].dist(touches[1])
2. dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y)
3. touches.getPinchDistance()
4. abs(touches[0].x - touches[1].x)
</div>

??? question "Show Answer"
    The correct answer is **B**. Calling `dist()` with the coordinates of the first two touch objects in the `touches[]` array calculates the Euclidean distance between the two fingertips, enabling pinch-to-zoom scaling. Options B, C, and D are invalid syntax.

    **Concept Tested:** Pinch Gesture Math

---

#### 5. Why must web applications request explicit user permission before reading accelerometer or gyroscope sensors on modern iOS Safari devices?

<div class="upper-alpha" markdown>
1. Because mobile browsers cannot process floating-point math without permission
2. To protect user privacy and prevent unauthorized fingerprinting or covert motion tracking
3. Because mobile sensors consume 100% of CPU power when enabled
4. To allow the browser to download external sensor drivers
</div>

??? question "Show Answer"
    The correct answer is **B**. Modern mobile browsers enforce security policies requiring explicit user interaction (such as tapping a button that triggers `DeviceOrientationEvent.requestPermission()`) before exposing motion data. Options B, C, and D are false.

    **Concept Tested:** Sensor Permission Model

---

#### 6. Which event function is called when a touch point is dragged across the glass surface?

<div class="upper-alpha" markdown>
1. touchEnded()
2. touchStarted()
3. touchMoved()
4. touchDragged()
</div>

??? question "Show Answer"
    The correct answer is **C**. `touchMoved()` executes continuously as touch points move across the screen. `touchStarted()` runs on initial contact, and `touchEnded()` runs on finger lift. `touchDragged()` is not a standard p5.js function.

    **Concept Tested:** Touch Moved Event

---

#### 7. If a mobile sketch does not implement touch event handlers, how does p5.js handle single-finger touch interactions by default?

<div class="upper-alpha" markdown>
1. It ignores all screen touches completely
2. It crashes the sketch with an UnhandledTouchError
3. It automatically emulates mouse events, mapping touch coordinates to mouseX and mouseY
4. It opens the device settings menu
</div>

??? question "Show Answer"
    The correct answer is **C**. For backwards compatibility, p5.js automatically maps single-touch events to standard mouse variables (`mouseX`, `mouseY`, `mouseIsPressed`, `mousePressed()`), allowing simple sketches to work seamlessly on mobile. Options B, C, and D are incorrect.

    **Concept Tested:** Touch Mouse Emulation

---

#### 8. What is the purpose of `pAccelerationX`, `pAccelerationY`, and `pAccelerationZ`?

<div class="upper-alpha" markdown>
1. They store predicted acceleration for physics prediction
2. They store the peak maximum acceleration ever recorded
3. They store the acceleration values from the previous frame to calculate sudden spikes (shakes)
4. They record GPS positioning coordinates
</div>

??? question "Show Answer"
    The correct answer is **C**. Comparing current `acceleration` to `pAcceleration` (previous frame) enables detection of rapid threshold changes such as shaking or flicking the device. Options B, C, and D are incorrect.

    **Concept Tested:** Previous Acceleration Shake

---

#### 9. To make a ball roll naturally around the screen when tilting a phone in landscape or portrait, how should tilt angles be mapped to physics forces?

<div class="upper-alpha" markdown>
1. Multiply velocity by the device battery percentage
2. Set the ball's position directly to rotationX and rotationY coordinates
3. Rotate the entire canvas with rotate(rotationZ)
4. Map rotationX and rotationY to horizontal and vertical force vectors applied to the ball's acceleration
</div>

??? question "Show Answer"
    The correct answer is **D**. Treating device tilt angles (`rotationY` and `rotationX`) as gravitational force components ($F_x, F_y$) and accumulating them into the physics acceleration vector creates natural rolling physics. Options B, C, and D do not produce realistic motion.

    **Concept Tested:** Tilt Physics Mapping

---

#### 10. Why is returning `false` from `touchMoved()` especially crucial on mobile web browsers?

<div class="upper-alpha" markdown>
1. It locks screen brightness at 100%
2. It speeds up screen refresh rates to 120Hz
3. It automatically saves a screenshot to the photo library
4. It prevents the mobile browser from performing default page rubber-banding, scrolling, or pull-to-refresh gestures
</div>

??? question "Show Answer"
    The correct answer is **D**. Returning `false` cancels default touch actions like browser viewport scrolling or pull-to-refresh, keeping the interactive canvas stable under the user's fingers. Options B, C, and D are false.

    **Concept Tested:** Touch Move Page Lock

---
