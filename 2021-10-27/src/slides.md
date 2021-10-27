---
theme: default
title: A Bright Horizon with Vue & Vite
titleTemplate: "%s – Slidev"
highlighter: shiki
layout: cover
---

# A Bright Horizon<br>with <logos-vue /> & <logos-vitejs />

<p class="text-2xl !leading-8">
  How new tools and techniques affect<br>the way we view and build applications
</p>

<img
  class="absolute bottom-4 right-4 w-75"
  src="/flamenco/flamenco-done.png"
/>

---
layout: intro
---

<img
  class="absolute bottom-30 right-14 w-75"
  src="/flamenco/flamenco-waiting.png"
/>

# Objectives for Today

---

# Objectives for Today

<v-clicks>

- Introduction to Vue 3, with a focus on:
  - Composition API
  - `<script setup>`
- Comparison of traditional bundlers and dev servers
- Outlook into the future with `unplugin`

</v-clicks>

<br>
<br>

<div v-click>

## 🙅‍♂️ Not Part of This Talk

</div>

<v-clicks>

- Comprehensive list of changes and additions between Vue 2 and 3
- 🍍 **Pinia** as a better alternative to Vuex
  - Maybe part of another talk

</v-clicks>

---

# 😯 Notable New Features

Some of the New Features to Keep an Eye on in Vue 3

<v-clicks>

- Virtual DOM rewrite for better performance
- Rewritten in TypeScript from scratch
- [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html)
- [Teleport](https://v3.vuejs.org/guide/teleport.html)
- [Fragments](https://v3.vuejs.org/guide/migration/fragments.html)
- [SFC composition API syntax sugar (`<script setup>`)](https://v3.vuejs.org/api/sfc-script-setup.html)
- [SFC state-driven CSS variables (`v-bind` in `<style>`)](https://v3.vuejs.org/api/sfc-style.html#state-driven-dynamic-css)
- [Suspense](https://v3.vuejs.org/guide/migration/suspense.html)

</v-clicks>

<br>
<br>

<v-click>

👉 [Head over to the migration page for an in-depth list](https://v3.vuejs.org/guide/migration/introduction.html)

</v-click>

---

# 🎢 Fragments

- Components now have official support for multi-root node components
- Virtual elements won't be rendered in the DOM tree

<br>
<br>

<div class="grid grid-cols-2 gap-x-4 gap-y-2">

###### 2.x Syntax
###### 3.x Syntax

```vue
<!-- Layout.vue -->
<template>
  <div>
    <header><!-- … --></header>
    <main><!-- … --></main>
    <footer><!-- … --></footer>
  </div>
</template>
```

<div>

```vue
<!-- Layout.vue -->
<template>
  <header><!-- … --></header>
  <main><!-- … --></main>
  <footer><!-- … --></footer>
</template>
```

</div>

</div>

---

# 🦕 Breaking Changes

The Ones Most Relevant to You

<v-clicks>

- Global API
  - Global Vue API is changed to use an application instance
    ```vue
    import { createApp } from 'vue'
    const app = createApp({})
    ```
  - Global and internal APIs have been restructured to be tree-shakable
- Template directives
  - `v-model` usage on components has been reworked
- Components
  - Async components now require `defineAsyncComponent` method to be created

</v-clicks>

<br>
<br>

👉 [List of breaking changes from 2.x](https://v3.vuejs.org/guide/migration/introduction.html#breaking-changes)

---

# The Current Horizon of Vue 2

<div class="grid grid-cols-2 gap-10">

```html
<template>
  <!-- -->
</template>

<script>
import Vue from 'vue'
import Foo from './components/Foo.vue'
import { mixinBar } from './mixins/bar'

export default Vue.extend({
  components: { Foo },
  mixins: { mixinBar },
  data() {
    return {
      // ...
    }
  },
  methods: {
    // ...
  },
  created() {
    // ...
  },
  destroyed() {
    // ...
  }
})
</script>
```

<div>

###### The Problem

<v-clicks>

- Logic isn't generally grouped by feature
- Scroll back and forth to follow what's happening in the SFC
- Extensibility
- TypeScript support

</v-clicks>

</div>

</div>

<img
  v-click
  class="absolute bottom-12 right-12 w-60"
  src="/flamenco/flamenco-logged-out.png"
/>

---
layout: cover
---

# Composition API to the Rescue

---

# First: Reactivity Fundamentals

<div class="grid grid-cols-2 gap-x-4 gap-y-2">

<div>

###### Declaring Reactive State

```js
import { reactive } from 'vue'

// Returns a reactive copy of the object
const state = reactive({
  count: 0
})
```

<br>
<br>

<v-clicks>

- Objects inside `data()` are internally made reactive by `reactive()`
- Reactive conversion is "deep"—it affects all nested properties
- Based on [ES2015 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

</v-clicks>

</div>

<div>

<div v-click="4">

###### Creating Standalone Reactive Values as `refs`

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

</div>

<br>
<br>

<v-clicks>

- For standalone primitive values
- Stands for reactive **ref**erence

</v-clicks>

</div>

</div>

---
clicks: 3
---

# Composition API

<div grid="~ cols-2 gap-x-4">

###### Options API
###### Composition API

```js {all|all|2,8,12,16}
export default {
  data() {
    return {
      dark: false,
      media: matchMedia('(prefers-color-scheme: dark)')
    }
  },
  methods: {
    toggleDark() {
      this.dark = !this.dark
    },
    update() {
      this.dark = this.media.matches
    }
  },
  created() {
    this.media.addEventListener('change', this.update)
    this.update()
  },
  destroyed() {
    this.media.removeEventListener('change', this.update)
  }
}
```

<div v-show="$slidev.nav.clicks >= 1">

```js {*|*|4|4,11} {at:0}
import { ref, onUnmounted } from 'vue'

export default {
  setup() {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const dark = ref(media.matches)

    const update = () => dark.value = media.matches
    const toggleDark = () => dark.value = !dark.value
    
    media.addEventListener('change', update)
    onUnmounted(() => {
      media.removeEventListener('change', update)
    })

    return { dark, toggleDark }
  }
}
```

</div>

</div>

---
clicks: 2
---

# Composability

<div class="grid grid-cols-2 gap-x-4 gap-y-2">

<div>
<div v-show="$slidev.nav.clicks < 2">

```js
import { ref, onUnmounted } from 'vue'

export default {
  setup() {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const dark = ref(media.matches)

    const update = () => dark.value = media.matches
    const toggleDark = () => dark.value = !dark.value
    
    media.addEventListener('change', update)
    onUnmounted(() => {
      media.removeEventListener('change', update)
    })

    return { dark, toggleDark }
  }
}
```

</div>
<div v-show="$slidev.nav.clicks >= 2">

```js
import { useDark } from './useDark'

export default {
  setup() {
    const { dark, toggleDark } = useDark()
    return {
      dark,
      toggleDark
    }
  }
}
```

</div>
</div>

<div v-show="$slidev.nav.clicks >= 1">

```ts
import { ref, onUnmounted } from 'vue'

export function useDark() {
  const media = matchMedia('(prefers-color-scheme: dark)')
  const dark = ref(media.matches)

  const update = () => dark.value = media.matches
  const toggleDark = () => dark.value = !dark.value
  
  media.addEventListener('change', update)
  onUnmounted(() => {
    media.removeEventListener('change', update)
  })

  return { dark, toggleDark }
}
```

<br>
<br>

- Outsourecable into seperate hook

</div>
</div>

---
layout: cover
---

<img
  class="absolute -bottom-4 right-14 w-65"
  src="/flamenco/flamenco-success.png"
/>

# Desirable: Less Verbosity

---

# `<script setup>` Syntax

<v-clicks>

- Compile-time syntactic sugar for using Composition API inside SFCs
- Recommended syntax with 👆
- Advantages over the normal `<script>` syntax:
  - Less boilerplate
  - Declare props and emitted events using pure TypeScript
  - Better runtime performance (the template is compiled into a render function in the same scope, without an intermediate proxy)
  - Better IDE type-inference performance (less work for the language server to extract types from code)

</v-clicks>

---
clicks: 2
---

# `<script setup>` Syntax

<div class="grid grid-cols-2 gap-x-4 gap-y-2">

##### `<script>`

##### `<script setup>`

```html {all|4,10-15}
<script>
import { ref, computed } from 'vue'
import MyButton from './MyButton.vue'

export default {
  components: {
    MyButton,
  },
  setup() {
    const counter = ref(0)
    const doubled = computed(() => counter.value * 2)

    function inc() {
      counter.value += 1
    }

    return { counter, doubled, inc }
  }
}
</script>
```

<div v-show="$slidev.nav.clicks > 1">

```html
<script setup>
import { ref, computed } from 'vue'
import MyButton from './MyButton.vue'

const counter = ref(0)
const doubled = computed(() => counter.value * 2)

function inc() {
  counter.value += 1
}
</script>
```

<div p="y-4 x-2">

- Variables, functions, and components are directly available in the template
- Now stable in Vue 3.2

</div>

</div>

</div>

---
clicks: 2
---

# `v-bind()` in `<style>`

<div class="grid grid-cols-2 gap-x-4 gap-y-2">

###### without

###### with v-bind()

```html {*|*|2,9-13} {at: 0}
<template>
  <button :style="{ color: buttonColor }">
    My Button
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonColor: 'green'
    }
  }
}
</script>

<style>
button {
  border-radius: 4px;
}
</style>
```

<div v-show="$slidev.nav.clicks >= 1">

```html {*|*|6,12} {at: 0}
<template>
  <button>My Button</button>
</template>

<script setup>
const buttonColor = ref('green')
</script>

<style>
button {
  border-radius: 4px;
  color: v-bind(buttonColor);
}
</style>
```

</div>
</div>

---
layout: center
class: text-center
---

# The New Default Tooling — Vite

<div text="center 9xl" m="t-8">
  <logos-vitejs /> + <logos-vue class="transform translate-y-6px" m="-l-2" />
</div>

---
layout: intro
---

<img
  class="absolute bottom-10 right-10 w-75"
  src="/flamenco/flamenco-searching.png"
/>

# What’s Vite?

---

# Bundlers 

<div flex="~" position="absolute top-10 right-10" gap="4" text="center">
  <div flex="~ col">
    <logos-webpack text="5xl" m="auto b-2" />
    Webpack
  </div>
  <div flex="~ col">
    <logos-rollup text="5xl" m="auto b-2" />
    Rollup
  </div>
</div>

<div m="t-8" />

<div class="grid grid-cols-[310px,1fr] gap-4">
<div v-click>

###### Build First

- Designed for **production build** first
- Needs to bundle the entire project to start the dev server
- Complex configuration
- HMR gets slower as projects grow

</div>

<img v-click src="/bundler.png" m="t-10" rounded="md" />

</div>

---

# Dev Servers

<div flex="~" position="absolute top-10 right-10" gap="4" text="center">
  <div flex="~ col">
    <logos-snowpack text="5xl" m="auto b-2" dark="filter invert" />
    Snowpack
  </div>
  <div flex="~ col">
    <logos-vitejs text="5xl" m="auto b-2" />
    Vite
  </div>
</div>


<div m="t-8" />
<div class="grid grid-cols-[300px,1fr]">
<div v-click>

###### Dev First

- Design for Web development
- Native ESM + unbundled
- Server is ready immediately
- On-demand
- Instant HMR
- And much more

</div>

<img v-click src="/esm.png" mt="10" rounded="md" />

</div>

---
layout: intro
---

# Why use Vue 3 with Vite?

<p v-click>For better performance and better DX</p>

---
layout: intro
---

# New Ways to View Vue 👀

---
clicks: 4
---

# Using Components

<div grid="~ cols-2 gap-x-8">

```html {*|9-12|14-19|1-7|*}
<template>
  <my-container>
    <my-button />
    <my-input />
  </my-container>
</template>

<script>
import MyContainer from '../components/MyContainer.vue'
import MyButton from '../components/MyButton.vue'
import MyInput from '../components/MyInput.vue'

export default {
  components: {
    MyContainer,
    MyButton,
    MyInput,
  }
}
</script>
```

<div>

<div v-if="$slidev.nav.clicks >= 1">

###### To Use a Component

<v-clicks fade :at="1">

- Import and name it
- Register the component
- Use it in the template

</v-clicks>

</div>

<br>
<br>

<div v-if="$slidev.nav.clicks >= 4">

###### The Problem

- Verbose
- Names are repeated at least 4 times

</div>
</div>
</div>

<!--
So let's take a look at how we used to use components in Vue: TODO:.....


One that worth mentioning is that while are you actually register the components globally, the drawback of global registration is that you will lose the ability to code splitting and TypeScript support.
-->

---

# Using Components

<div grid="~ cols-2 gap-x-8">

```html
<template>
  <my-container>
    <my-button />
    <my-input />
  </my-container>
</template>

<script setup>
import MyContainer from '../components/MyContainer.vue'
import MyButton from '../components/MyButton.vue'
import MyInput from '../components/MyInput.vue'
</script>
```

<div>

<v-click>

###### With `<script setup>`

- Imports will be available directly in the template
- No longer need to register the components

</v-click>
<v-click>

###### But …

- The component name is still repeated 3 times

</v-click>

</div>
</div>

---

# Components Auto Importing

<RepoFixed name="antfu/vite-plugin-components" />

<div grid="~ gap-x-8" class="grid-cols-[300px,1fr]">

<div>

Using <Repo name="antfu/vite-plugin-components" ml="1" />

```html
<template>
  <my-container>
    <my-button />
    <my-input />
  </my-container>
</template>
```

<br>

#### That's it!

</div>

<div>
<div v-click>

###### How?

- **Compile-time** components resolving
- Components auto-discovery under `src/components` directory

</div>
<div v-click>

###### Differences from Global Registration

- Code-splitting
- No manual registration
- Skipped runtime resolving

</div>
</div>
</div>


---

# How the compilation works

```html
<template>
  <my-container>
    <my-button />
    <my-input />
  </my-container>
</template>
```

<v-click>

… Will be compiled by `@vue/sfc-compiler` to:

```ts {all|3-5}
import { resolveComponent as _resolveComponent } from "vue"
function render(_ctx, _cache) {
  const _component_my_button = _resolveComponent("my-button")
  const _component_my_input = _resolveComponent("my-input")
  const _component_my_container = _resolveComponent("my-container")

  return (_openBlock(), _createBlock(_component_my_container, null, {
    default: _withCtx(() => [
      _createVNode(_component_my_button),
      _createVNode(_component_my_input)
    ]), _: 1 /* STABLE */
  }))
}
```

</v-click>

---
clicks: 5
---

# Writing the Vite plugin

<div grid="~ cols-2 gap-x-8">

```ts {*|5|6|7|9-15} {at: 0}
// vite.config.ts
export default {
  plugins: [{
    name: 'my-plugin',
    enforce: 'post',
    transform(code, id) {
      if (!id.endsWith('.vue')) return

      return code.replace(
        /_resolveComponent\("(.+?)"/g, 
        (_, name) => {
          const component = findComponent(name)
          // inject import for component
          return component.path      
        })
    } 
  }]
}
```

<div>

<v-clicks fade :at="1">

- Use `enforce: post` to ensure the plugin runs after Vue's compilation
- Use `transform` hook to modify the code
- Filter out files that are not Vue
- Replace the `_resolveComponent` usage to real component import

</v-clicks>

<v-click :at="5">
<p p="t-4" opacity="75">
Read <a href="https://vitejs.dev/guide/api-plugin.html" target="_blank">Vite Plugin API Documentation</a> for more
</p>
</v-click>

</div>

</div>

---

# The Result

```ts {4-6}
import { resolveComponent as _resolveComponent } from "vue"

function render(_ctx, _cache) {
  const _component_my_button = _resolveComponent("my-button")
  const _component_my_input = _resolveComponent("my-input")
  const _component_my_container = _resolveComponent("my-container")

  return () => /* ... */
}
```

After:

```ts {2-4}
import { resolveComponent as _resolveComponent } from "vue"
import _component_my_button from "../components/MyButton.vue"
import _component_my_input from "../components/MyInput.vue"
import _component_my_container from "../components/MyContainer.vue"

function render(_ctx, _cache) {
  return () => /* ... */
}
```

---
disabled: true
---

# API Auto Importing

<RepoFixed name="antfu/unplugin-auto-import" />

Similarly, we could implement auto importing for APIs

<div grid="~ cols-2 gap-4">

```html
<script setup>
import { ref, computed, watch } from 'vue'
import { debouncedWatch } from '@vueuse/core'

const counter = ref(0)
const doubled = computed(() => counter.value * 2)

debouncedWatch(counter, () => {
  console.log('counter changed')
})
</script>
```

```html
<script setup>
const counter = ref(0)
const doubled = computed(() => counter.value * 2)

debouncedWatch(counter, () => {
  console.log('counter changed')
})
</script>
```

</div>

---

# Use Icons

<RepoFixed name="antfu/vite-plugin-icons" v-click="6" />

<div class="grid grid-cols-[1fr,1.2fr]">

<div>

###### Current Possibilities to Use Icons

<v-clicks>

- **Icon fonts**
  - Entire icon set needs to be shipped
  - Flash-of-unstyled-content (FOUC)
- **SVG**
  - Needs to be imported manually
  - Can't change color when used as images
- **Icon components**
  - Dependency limits on what the icon set provides
  - Needs to be registered manually

</v-clicks>

</div>

<div>

<v-click>

###### A better solution?

</v-click>
<v-click>

<p text="sm" class="!-mb-4">

Inspired by Vite's on-demand mindset, we could actually bundle the icons at compile-time when as need:

</p>

```html
<template>
  <MdiAlarm />
  <FaBeer style="color: orange" />
  <TearsOfJoy/>
</template>

<script setup>
import MdiAlarm from '~icons/mdi/alarm'
import FaBeer from '~icons/fa/beer'
import TearsOfJoy from '~icons/twemoji/face-with-tears-of-joy'
</script>
```

</v-click>
<v-click>

<p text="sm" class="!-mb-4">

Powered by [Iconify](https://iconify.design), **10,000+ icons** from 100+ popular icon sets in a unified syntax.

</p>

```js
import Icon from '~icons/[collection]/[id]'
```

<p text="sm" class="!-mb-4">

</p>

</v-click>

</div>

</div>

---
clicks: 1
---

# On-demand Icons

<div my="5">

- Only the icons actually used will be bundled
- Almost any icons available to use
- Directly stylable via `class` and `style`
- SSR / SSG friendly

</div>

<div v-if="$slidev.nav.clicks === 0">

```html
<template>
  <MdiAlarm />
  <FaBeer style="color: orange" />
  <TearsOfJoy/>
</template>

<script setup>
import MdiAlarm from '~icons/mdi/alarm'
import FaBeer from '~icons/fa/beer'
import TearsOfJoy from '~icons/twemoji/face-with-tears-of-joy'
</script>
```

</div>
<div v-else>

```html
<template>
  <MdiAlarm />
  <FaBeer style="color: orange" />
  <TearsOfJoy/>
</template>
```

</div>

---
class: flex flex-col
---

<div grid="~ gap-10" h="full" class="grid-cols-[1.8fr,1fr]">
<div>

# Vite Ecosystem

An Excerpt

<div mt="5" />

<v-clicks>

<Repo name="antfu/vite-plugin-components" /> - Components auto-import

<Repo name="antfu/vite-plugin-auto-import" /> - API auto-import

<Repo name="antfu/vite-plugin-icons" /> - On-demanded icons solution

<Repo name="hannoeru/vite-plugin-pages" /> - File-based routing

<Repo name="windicss/vite-plugin-windicss" /> - Windi CSS (on-demand Tailwind CSS)

<div>
<br>
<br>
… And many more
</div>

</v-clicks>

</div>
<div flex="~" h="full">

<div flex="~ col" text="center" m="auto" v-click>

<img src="/awesome-vite.svg" w="100" m="auto" />
<Repo name="vitejs/awesome-vite" />

</div>
</div>
</div>

---
layout: center
class: text-center
---

<p opacity="50">Vite has inspired many new plugins and better ways to improve DX</p>
<h1 v-click>Available for Your Existing Projects Right Now</h1>

---
layout: center
class: text-center
---

<h1 text="!5xl">Introducing <b>unplugin</b></h1>

<h3 v-click opacity="60">A unified plugin system for Vite, Rollup, Webpack, and more</h3>

<v-click>

<h3 opacity="60" mt="10">Written once — running on:</h3>

<div class="flex gap-5 text-5xl p-6 -mt-2 -mb-20 place-content-center">
  <logos-vitejs />
  <logos-rollup />
  <logos-webpack text="1.1em" />
  <logos-nuxt-icon />
</div>

</v-click>

<img
  class="absolute bottom-4 right-8 w-75"
  src="/flamenco/flamenco-upgrade.png"
/>

---
disabled: true
---

# Unplugin

<RepoFixed name="unjs/unplugin" />

<div class="grid grid-cols-2 gap-x-4 grid-gap-y-2">

###### Vite Plugin

###### Unplugin

```ts


export const VitePlugin = () => {
  return {
    name: 'my-first-unplugin',
    transform (code) {
      return code.replace(
        /<template>/, 
        `<template><div>Injected</div>`
      )
    },
  }
}
```

```ts
import { createUnplugin } from 'unplugin'

export const unplugin = createUnplugin(() => {
  return {
    name: 'my-first-unplugin',
    transform (code) {
      return code.replace(
        /<template>/, 
        `<template><div>Injected</div>`
      )
    },
  }
})

export const VitePlugin = unplugin.vite
export const RollupPlugin = unplugin.rollup
export const WebpackPlugin = unplugin.webpack
```

</div>

---

# Vite Plugins <carbon-arrow-right /> Unplugins

<v-clicks>

<div>
<code opacity="50">vite-plugin-components</code> <carbon-arrow-right /> <code text="green-400">unplugin-vue-components</code>
  <ul></ul>
</div>

<div>
<code opacity="50">vite-plugin-auto-import</code> <carbon-arrow-right /> <code text="green-400">unplugin-auto-import</code>
  <ul>For <logos-vue/> Vue / <logos-react/> React / <logos-svelte-icon/> Svelte / <logos-javascript/> Vanila / Any framework</ul>
</div>

<div>
<code opacity="50">vite-plugin-icons</code> <carbon-arrow-right /> <code text="green-400">unplugin-icons</code>

<ul class="grid grid-cols-[1fr,40px,1fr,40px,1fr] w-min whitespace-nowrap">

<div class="group">
  <div><logos-vue/> Vue</div>
  <div><logos-react/> React</div>
  <div><logos-preact/> Preact</div>
  <div><logos-svelte-icon/> Svelte</div>
  <div><solid-logo/> SolidJS</div>
  <div><logos-webcomponents/> Web Components</div>
  <div><logos-javascript/> Vanila</div>
  <div>…</div>
</div>
<carbon-add m="auto" />

<div class="group">
  <div><logos-vitejs/> Vite</div>
  <div><logos-nuxt-icon/> Nuxt</div>
  <div><logos-nextjs-icon class="inline filter invert" /> Next.js</div>
  <div><logos-rollup/> Rollup</div>
  <div><logos-vue/> Vue CLI</div>
  <div><logos-webpack/> Webpack</div>
  <div>…</div>
</div>

<carbon-add m="auto" />

<div class="group">
  <div><carbon-carbon/> <a href="https://carbondesignsystem.com/guidelines/icons/library/" target="_blank">Carbon Icons</a></div>
  <div><mdi-material-design/> <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a></div>
  <div><uim-circle-layer/> <a href="https://iconscout.com/unicons" target="_blank">Unicons</a></div>
  <div><twemoji-star-struck/> <a href="https://github.com/twitter/twemoji" target="_blank">Twemoji</a></div>
  <div><tabler-writing-sign/> <a href="https://tabler-icons.io/" target="_blank">Tabler</a></div>
  <div><bx-bx-planet/> <a href="https://github.com/atisawd/boxicons" target="_blank">BoxIcons</a></div>
  <div><eos-icons:installing/> <a href="https://gitlab.com/SUSE-UIUX/eos-icons" target="_blank">EOS Icons</a></div>
  <div>…</div>
</div>

</ul>
</div>

</v-clicks>

<style>
ul {
  @apply pl-6 mt-2 mb-6 text-sm;
}
.group {
  @apply flex flex-col gap-2 p-4 my-auto;
  @apply border-l-1 border-r-1 border-gray-400/50;
}
</style>

---
layout: center
class: text-center
---

# What about Vue 2?

<p v-click class="text-xl">Still covered!</p>

---

# Vue 2

<v-click>

###### Polyfills

- Composition API: [`@vue/composition-api`](https://github.com/vuejs/composition-api)
- `<script setup>` & Ref sugar: [`unplugin-vue2-script-setup`](https://github.com/antfu/unplugin-vue2-script-setup)

</v-click>
<v-click>

###### Vite Support

- [`vite-plugin-vue2`](https://github.com/underfin/vite-plugin-vue2)
- [`nuxt-vite`](https://github.com/nuxt/vite)

</v-click>
<v-click>

###### DX Enhancement

- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components)
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import)
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons)

</v-click>

---

# To Sum It Up

This is what you could get in Vue 2, Nuxt 2, Vue CLI, Vue 3, Vite:

<div class="grid grid-cols-[1fr,30px,1fr] gap-2">

```html
<template>
  <button>
    <IconSun v-if="dark" />
    <IconMoon v-else/>
  </button>
</template>

<script>
import IconSun from '@some-icon-set/sun'
import IconMoon from '@some-icon-set/moon'

export default {
  components: {
    IconSun,
    IconMoon,
  },
  data() {
    return {
      dark: false,
      media: matchMedia('(prefers-color-scheme: dark)')
    }
  },
  methods: {
    toggleDark() { this.dark = !this.dark },
    update() { this.dark = this.media.matches }
  },
  created() {
    this.media.addEventListener('change', this.update)
    this.update()
  },
  destroyed() {
    this.media.removeEventListener('change', this.update)
  }
}
</script>
```

<div class="flex" h="50">
  <carbon-arrow-right m="auto" opacity="50" />
</div>

<div>

```html
<script setup>
const dark = useDark()
</script>

<template>
  <button>
    <IconSun v-if="dark" />
    <IconMoon v-else/>
  </button>
</template>
```

</div>

</div>

---

# Starter Templates

Project templates that have plugins mentioned previously

<div grid="~ gap-6" class="pt-6 grid-cols-[200px,1fr]">

<Repo name="antfu/vitesse" m="y-auto" />
<div m="y-auto">Opinionated Vue 3 + Vite Starter template</div>

<Repo name="antfu/vitesse-nuxt" m="y-auto" />
<div m="y-auto">Vitesse experience on Nuxt 2</div>

<Repo name="antfu/vitesse-webext" m="y-auto" />
<div m="y-auto">Vitesse for Web Extensions</div>

</div>

<div m="t-10" v-click>

###### Try it now!

<div m="p-2" />

```bash
npx degit antfu/vitesse
```

</div>

<div v-click p="t-10">

😯 Spoiler: Nuxt 3 has many of these features built-in directly.

</div>

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
    src="/leanera-logo-bg.png"
  />
  <img
    v-motion
    :initial="{ y: 500, x: -100, scale: 2 }"
    :enter="final"
    class="absolute top-0 left-0 right-0 bottom-0"
    src="/leanera-logo-p1.png"
  />
  <img
    v-motion
    :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
    :enter="final"
    class="absolute top-0 left-0 right-0 bottom-0"
    src="/leanera-logo-p2.png"
  />

  <div
    class="absolute top-46 w-40 text-2xl text-[#2bbcd2] text-center -z-1"
    v-motion
    :initial="{ y: -40, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }"
  >
    Thank You!
  </div>
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
layout: intro
---

# Credits to Anthony Fu

Slides forked from his [New ways to Vue](https://github.com/antfu/talks/tree/master/2021-10-20) talk at Vue.js London 2021.

<div class="leading-8 opacity-80">
  He is a Vue & Vite core team member, as well as the<br>
  creator of Slidev, VueUse, Vitesse, etc.
</div>

<div class="my-10 grid grid-cols-[40px,1fr] w-min gap-y-4">
  <ri-github-line class="opacity-50" />
  <div><a href="https://github.com/antfu" target="_blank">antfu</a></div>
  <ri-twitter-line class="opacity-50" />
  <div><a href="https://twitter.com/antfu7" target="_blank">antfu7</a></div>
  <ri-user-3-line class="opacity-50" />
  <div><a href="https://antfu.me" target="_blank">antfu.me</a></div>
</div>

<img src="https://antfu.me/avatar.png" class="rounded-full w-40 abs-tr mt-30 mr-20" />
