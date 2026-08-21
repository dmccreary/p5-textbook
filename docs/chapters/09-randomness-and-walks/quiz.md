# Quiz: Randomness, Gaussian Distributions & Random Walk

Test your understanding of Uniform random(), Gaussian distribution, randomSeed(), and random walks with these review questions.

---

#### 1. What type of probability distribution is produced by the default `random(min, max)` function in p5.js?

<div class="upper-alpha" markdown>
1. Uniform distribution (all values equally likely)
2. Gaussian / Normal distribution (bell curve)
3. Exponential distribution
4. Poisson distribution
</div>

??? question "Show Answer"
    The correct answer is **A**. `random()` produces a uniform pseudo-random distribution where every floating-point number within the specified range has an equal probability of being chosen. Option A describes `randomGaussian()`.

    **Concept Tested:** Uniform Random Function

---

#### 2. Which function produces random numbers clustered around a mean in a characteristic bell curve distribution?

<div class="upper-alpha" markdown>
1. randomGaussian()
2. randomSeed()
3. noise()
4. randomUniform()
</div>

??? question "Show Answer"
    The correct answer is **A**. `randomGaussian(mean, sd)` generates numbers following a normal (Gaussian) distribution, where values cluster tightly near the mean and taper off symmetrically according to standard deviation `sd`. Options A, C, and D are other functions.

    **Concept Tested:** Random Gaussian Normal

---

#### 3. How does calling `randomSeed(val)` with a fixed integer seed affect subsequent `random()` calls?

<div class="upper-alpha" markdown>
1. It increases the randomness entropy of the system
2. It makes the sequence of generated random numbers 100% deterministic and reproducible
3. It causes random() to always return the seed value itself
4. It disables random() and throws an error
</div>

??? question "Show Answer"
    The correct answer is **B**. Setting a specific random seed initializes the pseudo-random number generator to a known starting state, ensuring that the exact same sequence of pseudo-random numbers is generated every time the sketch runs. Options A, C, and D are incorrect.

    **Concept Tested:** Random Seed Determinism

---

#### 4. In a classic 2D Random Walk simulation, how does an autonomous agent choose its next step?

<div class="upper-alpha" markdown>
1. By following a predetermined bezier spline path
2. By taking a random step in one of several directions (e.g. up, down, left, right) on each frame
3. By seeking the mouse coordinate with gravity
4. By moving strictly in a straight line until hitting a canvas edge
</div>

??? question "Show Answer"
    The correct answer is **B**. In a random walk (Brownian motion model), an agent updates its position on each frame by selecting a random displacement in x and y. Options B, C, and D describe deterministic or steered motion.

    **Concept Tested:** Random Walk Concept

---

#### 5. To generate a random floating-point number between 10 and 50, which syntax is correct?

<div class="upper-alpha" markdown>
1. random(50) + 10;
2. random(10, 50);
3. randomRange(10, 50);
4. uniform(10, 50);
</div>

??? question "Show Answer"
    The correct answer is **B**. In p5.js, `random(low, high)` generates a pseudo-random float between `low` (inclusive) and `high` (exclusive). Option B generates between 10 and 60. Options C and D are not p5.js functions.

    **Concept Tested:** Random Range Function

---

#### 6. If you want a biased random walk where an agent has a 50% chance of stepping right and a 50% split among up, down, and left, which programming technique is used?

<div class="upper-alpha" markdown>
1. Setting randomSeed(0.5)
2. Calling randomGaussian() with negative standard deviation
3. Monte Carlo or cumulative probability branching using random(1)
4. Using perlin noise octave damping
</div>

??? question "Show Answer"
    The correct answer is **C**. Generating a uniform float `let r = random(1);` and testing thresholds (`if (r < 0.5) stepRight(); else if (r < 0.67) stepLeft(); ...`) implements customized discrete probability distributions. Options B, C, and D are inapplicable.

    **Concept Tested:** Biased Random Probability

---

#### 7. What does the second parameter in `randomGaussian(mean, sd)` represent?

<div class="upper-alpha" markdown>
1. The number of samples to average
2. The maximum ceiling cap
3. Standard deviation (the spread/width of the bell curve)
4. The seed value
</div>

??? question "Show Answer"
    The correct answer is **C**. The second argument `sd` specifies the standard deviation, which determines how widely dispersed values are around the `mean`. Approximately 68% of generated values fall within +/- 1 standard deviation of the mean. Options B, C, and D are incorrect.

    **Concept Tested:** Standard Deviation Spread

---

#### 8. Why are standard pseudo-random number generators referred to as 'pseudo-random'?

<div class="upper-alpha" markdown>
1. Because they generate true quantum random numbers from ambient thermal noise
2. Because they can only generate integer values
3. Because they use deterministic mathematical algorithms to produce sequences that only appear random
4. Because they require internet access to fetch randomness from a remote server
</div>

??? question "Show Answer"
    The correct answer is **C**. Digital computers cannot produce true randomness without hardware entropy sources; PRNGs use deterministic mathematical recurrence formulas that pass statistical tests of randomness. Options A, C, and D are false.

    **Concept Tested:** Pseudo-Random Algorithms

---

#### 9. You are simulating a starry night sky. Why is placing stars using `randomGaussian()` around the center aesthetically different from `random()`?

<div class="upper-alpha" markdown>
1. randomGaussian runs on GPU shaders
2. randomGaussian draws stars as circles while random draws squares
3. randomGaussian prevents any stars from overlapping
4. randomGaussian creates a dense galactic core cluster that thins out toward the edges, whereas random produces uniform dispersion
</div>

??? question "Show Answer"
    The correct answer is **D**. Gaussian distribution concentrates points densely near the mean with gradual tapering into sparse outskirts, mimicking natural phenomena like galaxies or tree canopies. Uniform randomness scatters points with equal density everywhere. Options B, C, and D are false.

    **Concept Tested:** Gaussian vs Uniform Aesthetics

---

#### 10. To pick a random element from an array `const colors = ['red', 'blue', 'green', 'yellow'];`, which p5.js shortcut is valid?

<div class="upper-alpha" markdown>
1. colors[random()]
2. colors.random()
3. choose(colors)
4. random(colors)
</div>

??? question "Show Answer"
    The correct answer is **D**. In p5.js, passing an array directly to `random(array)` automatically selects and returns a random element from that array with uniform probability. Options B, C, and D are invalid syntax.

    **Concept Tested:** Array Random Selection

---
