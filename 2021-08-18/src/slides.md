---
theme: default
titleTemplate: "%s — LeanERA"
highlighter: shiki
fonts:
  sans: "Founders Grotesk,Work Sans"
  mono: "Fira Code"
  local: "Founders Grotesk"
layout: cover
class: text-center
---

<div m="b-30">
  <h1 font="weight-700">Design Tokens</h1>
  <h2 m="-t-6">
    Or: The Abstraction of a Visual Property
  </h2>
</div>

<img
  class="absolute -bottom-4 left-4 w-100"
  src="/img/flamenco/flamenco-done.png"
/>

---
layout: quote
---

<h1>Are you tired of seeing tickets about<br>styling bugs stacking up?</h1>
<h2 opacity="40">Then this is for you.</h2>

<img
  class="absolute -bottom-4 right-6 w-75"
  src="/img/flamenco/flamenco-waiting.png"
/>

---
layout: cover
---

<h1>Let’s lean in!</h1>
<h2 opacity="40">(Pun intended.)</h2>

---

# We will learn today

<div grid="~ cols-2 gap-12" h="100" content="center">
  <div border="1" p="5" v-click>
    <div class="py-10 text-6xl text-center">🤔</div>
    <div text="4xl">What design tokens are</div>
  </div>
  <div border="1" p="5" v-click>
    <div class="py-10 text-6xl text-center">😵</div>
    <div text="4xl">How they help manage an organisation’s branding</div>
  </div>
</div>

---
layout: quote
---

# Now, imagine…

---
layout: image-right
image: https://source.unsplash.com/wD1LRb9OeEo/1920x1080
---

# … You’re **Head of Design** at Large Corp

<v-click>

- Hired to rebrand
- You can’t wait to start

</v-click>

<br>
<br>

<v-click>

### Task & goal

- Replace main color with 🆕 color

</v-click>

<br>
<br>

<v-click>

### Reality: many interfaces and platforms

- Marketing website
- Web application
- Android application
- iOS application

</v-click>

---
layout: quote
---

# Allright, you might say. Managable.

---

# So you open Slack and start writing:

<v-click>

```
Hey Thomas,

we have decided on our new primary brand color. 🚀

- The old one is: rgb(237, 200, 078).
- The new one is: rgb(187, 45, 23).

Would you mind updating the codebase with the new value?

Thanks in advance!
```

</v-click>

<img
  v-click
  class="absolute bottom-10 right-16 w-75"
  src="/img/flamenco/flamenco-message-sent.png"
/>

---
layout: quote
---

# Now, anything can happen.

<v-clicks>

- Thomas may want other color formats
- Do I have to convert to HEX manually?
- iOS team may never respond
- Process gets stuck
- etc.

</v-clicks>

<img
  v-click
  class="absolute top-12 right-30 w-75"
  src="/img/flamenco/flamenco-fatal-error.png"
/>

---
layout: quote
---

# Sounds familiar?

---

# Roto ProfiLiga 2.0 PWA

```scss
// roto.variables.scss
$colors: (
  'primary': #FE0009,
  'ambient': #EDEDED,
  'grey': #747678,
  'grey-light': #E0E1DD,
  'grey-medium': #BCBDBC,
  'grey-dark': #4D4F53,
  // and so on …
)
```

<br>
<br>

<v-click>

### Emerging issues

</v-click>

<v-clicks>

- Where do the colors come from?
- Where is the design system?
- Who manages it?

</v-clicks>

---
layout: quote
---

# <span opacity="40">What happens here?</span><br>☝️ Frontend developers make design decisions.<br>😬 Designers loose them.

---
layout: quote
---

# The underlying business issue:<br>**communicating design decisions**.

<span></span>

<img
  class="absolute bottom-10 right-10 w-75"
  src="/img/flamenco/flamenco-page-not-found.png"
/>

---
layout: cover
---

<img
  class="mx-auto w-full -mb-2"
  src="/img/underconsideration.com-spotify-2015-logo.gif"
/>

<p class="text-sm text-right opacity-60">

Source: [https://www.underconsideration.com/brandnew/archives/new_identity_for_spotify_by_collins.php](https://www.underconsideration.com/brandnew/archives/new_identity_for_spotify_by_collins.php)

</p>

---
layout: quote
---

# This is where design tokens enter the game.

<span></span>

<img
  class="absolute -bottom-4 right-14 w-75"
  src="/img/flamenco/flamenco-success.png"
/>

---
layout: quote
---

# Design tokens are **design decisions**, represented as data, that ensure systematically unified and cohesive product experiences.

---
layout: quote
---

<h3 m="-t-4">In simpler terms</h3>

# A design token is an **abstraction of a visual property**,<br>such as <span class="text-[#2bbcd2]">color</span>, <span class="font-mono font-light">font</span>, <span class="bg-[#2bbcd2] px-4">width</span>, etc.

---

<img
  class="relative -mt-6"
  src="/img/specifyapp-button-component-design-tokens-anatomy-dark.webp"
/>

<p class="absolute bottom-2 right-18 text-sm opacity-60">

Source: [https://specifyapp.com/blog/introduction-to-design-tokens](https://specifyapp.com/blog/introduction-to-design-tokens)

</p>

---

<img
  class="relative -mt-6"
  src="https://source.unsplash.com/YPgTovTiUv4/1920x1080"
/>

---

# How to create design tokens

<div grid="~ cols-2 gap-12" h="100" content="center">
  <div border="1" p="5" v-click>
    <div class="py-10 text-6xl text-center">1️⃣</div>
    <div class="text-6xl">Raw Values</div>
    <div text="2xl" font="light" leading="5">Language application agnostic</div>
  </div>
  <div border="1" p="5"  v-click>
    <div class="py-10 text-6xl text-center">2️⃣</div>
    <div class="text-6xl">Transforms</div>
    <div text="2xl" font="light" leading="5">Once transformed and formatted can be used on any platform</div>
  </div>
</div>

---

# How to create design tokens

<div grid="~ cols-2 gap-8">
<div>

### 1️⃣ Raw

```json
{
  "color": {
    "base": {
      "primary": {
        "value": "#2bbcd2"
      }
    }
  }
}
```

</div>
<div>

<v-click>

### 2️⃣ CSS Custom Properties

```css
:root {
  --color-base-primary: #2bbcd2;
}
```

</v-click>
<v-click>

### 2️⃣ Sass

```scss
$color-base-primary: #2bbcd2;
```

</v-click>

</div>
</div>

<br>
<br>

<v-click>

### Transforming design tokens

```bash
node ./scripts/transform-tokens.js
```

</v-click>

---
layout: quote
---

# Design decisions ➡️ design tokens ➡️ platforms

---

<img
  m="-t-6"
  src="/img/specifyapp-how-design-decisions-are-applied-dark.webp"
/>

<p class="absolute bottom-2 right-18 text-sm opacity-60">

Source: [https://specifyapp.com/blog/introduction-to-design-tokens](https://specifyapp.com/blog/introduction-to-design-tokens)

</p>

---

# Design tokens in Figma

<br>

<img
  src="/img/figma-intro.png"
/>

<v-clicks>

- **Figma** is a vector graphics editor and prototyping tool
- primarily web-based
- for UI and UX design application

</v-clicks>

---
layout: quote
---

# In conclusion, design tokens provide:

<v-clicks>

- Unique **source of truth**
- Better translation from design to development
- Design (and thus brand) consistency across any product UI or platform
- Better collaboration between product teams

</v-clicks>

<img
  v-click
  class="absolute bottom-6 right-12 w-75"
  src="/img/flamenco/flamenco-uploading.png"
/>

---
layout: cover
preload: false
---

<div class="relative w-40 h-40 mx-auto">
  <img
    v-motion
    :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
    :enter="final"
    class="absolute top-0 left-0 right-0 bottom-0"
    src="/img/leanera-logo-bg.png"
  />
  <img
    v-motion
    :initial="{ y: 500, x: -100, scale: 2 }"
    :enter="final"
    class="absolute top-0 left-0 right-0 bottom-0"
    src="/img/leanera-logo-p1.png"
  />
  <img
    v-motion
    :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
    :enter="final"
    class="absolute top-0 left-0 right-0 bottom-0"
    src="/img/leanera-logo-p2.png"
  />
</div>

<script setup lang="ts">
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

---
layout: center
class: text-center
---

# Questions? Hit me!

[Style Dictionary](https://amzn.github.io/style-dictionary) · [Figma](https://figma.com)

<img
  class="absolute bottom-4 left-16 w-75"
  src="/img/flamenco/flamenco-come-back-later.png"
/>
