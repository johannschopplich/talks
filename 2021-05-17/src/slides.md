---
theme: default
title: "Barrierefreies Routing in SPAs"
titleTemplate: "%s – Slidev"
highlighter: shiki
background: /img/johann-schopplich-greifswald.jpg
class: text-center
info: |
  ## Für LeanERA
  Kleine Präsentation für das zweite Bewerbungsgespräch.
---

# Barrierefreies Routing in SPAs

## Navigation zwischen Routes<br>an Bildschirmlesegeräte übermitteln

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 p-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Los geht’s <uim-arrow-circle-right class="inline mb-0.1em" />
  </span>
</div>

---
layout: image-right
image: /img/screenshot-kirby-vue-3.png
---

# Auszug aus Kirby + Vue.js Starterkit

[github.com/johannschopplich/kirby-vue3-starterkit](https://github.com/johannschopplich/kirby-vue3-starterkit)

### Schlüssel-Features

<v-clicks>

- 🛣 automatischer Routebaum
- 🔍 SEO-freundlich
- 🚝 offlinefähig
- ♿ **barrierefreies Frontend-Routing**

</v-clicks>

<a href="https://kirby-vue3-starterkit.jhnn.dev" target="_blank"
  class="abs-bl m-11 text-xl icon-btn opacity-50 !border-none !hover:text-white">
  <carbon-launch />
</a>

---
layout: cover
---

<img src="/img/kirby-vue-3-lighthouse-report.png">

☝️ Barrierefreiheit im Ganzen nicht programmatisch erfassbar — **Daten können trügen**

---

# Barrierefreiheit im Web — warum?

Unsere Verantwortung als Webentwickler*innen

<div grid="~ cols-3 gap-8">
<div v-click>

### Für 100 % **hilfreich**
- Barrierefreiheit = Benutzerfreundlichkeit 📈
- intuitive Bedienbarkeit hilft allen Kund*innen

</div>
<div v-click>

### Für 30% **notwendig**
- hilft Menschen mit Sehschwäche oder motorischen Einschränkungen

</div>
<div v-click>

### Für 10% **unerlässlich**
- 7,5 Millionen Menschen in 🇩🇪 mit anerkannter Schwerbehinderung
- nutzen Internet überdurchschnittlich intensiv mit *Tastatursteuerung* bis *Sprachausgabe*

</div>
</div>

<div v-click>

### Artikel zum Thema

- ♿️ [Die KATAPULT-Website wird barrierefrei](https://katapult-magazin.de/de/artikel/die-katapult-website-wird-barrierefrei) (10.05.2021)
- 🇳🇴 [Barrierefreie Websites sind in Norwegen Pflicht](https://katapult-magazin.de/de/artikel/barrierefreie-websites-sind-in-norwegen-pflicht) (07.05.2020)

</div>

---

# SPAs: vor allem für Screenreader **problematisch**

Routing nicht nachvollziehbar

<div grid="~ cols-2 gap-8">
<div v-click>

📢 **serverseitig gerenderte Seiten**:
  - Links führen zu neuen HTML-Seiten
  - Screenreader ließt neue Seite aus,<br>beginnend mit Titel

</div>
<div v-click>

🔇 **clientseitig gerenderte Anwendungen**:
  - keine neue HTML-Seiten
  - JavaScript übernimmt Routing<br>(zumeist HTML5 History API)

</div>
</div>

<br>
<br>

<div class="p-4 text-center bg-white bg-opacity-10" v-click>
  ℹ️ SPAs emulieren Seitenwechsel
</div>

<style>
h1 {
  background-image: linear-gradient(45deg, #146b8c 40%, #4EC5D4 100%);
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
}
</style>

---
layout: quote
---

# Wechselnde Routes mögen für Sehende **offensichtlich** sein — für Nichtsehende, die einen Screenreader verwenden, sind sie **unsichtbar**.

---

# Routing-Strategie

Anforderung: problemfrei nachvollziehbar für assistive Technologie

<div grid="~ cols-3 gap-8">
<div v-click>

<div class="py-10 text-5xl">1️⃣</div>

## Skip-Link

überspringt Navigation direkt zum Hauptinhalt (`main`)

</div>
<div v-click>

<div class="py-10 text-5xl">2️⃣</div>

## Fokus vom<br>Skip-Link

nach Klick auf internen Link (`<router-link>`)

</div>
<div v-click>

<div class="py-10 text-5xl">3️⃣</div>

## ARIA-Live-Region

um Navigation zur neuen Route explizit zu verkünden

</div>
</div>

---

# Zugrundeliegende Struktur in `App.vue`

<div grid="~ cols-2 gap-8">
<div>

### Logik

<v-clicks>

- Komponenten:
  - Skip-Link
  - „Ansager“
- Hauptcontainer `main` programmatisch fokussierbar mit `tabindex="-1"`
- Router View neu rendern, wenn Route sich ändert
  - Alternativ `<keep-alive>`

</v-clicks>

</div>
<div>

### Component

```vue {all|2|3|5-7}
<template>
  <SkipToContentLink />
  <Announcer />

  <main id="main" tabindex="-1">
    <router-view :key="route.path" />
  </main>
</template>

<script>
export default {
  setup () {
    return {
      route: useRoute()
    }
  }
}
</script>
```

</div>
</div>

---

# Skip-Link & Fokus-Management

<div grid="~ cols-2 gap-8">
<div>

### Logik

<v-clicks>

- Skip-Link off-screen, solange *nicht* fokussiert
- nach Routing programmatisch fokussiert
- bei Klick Sprung zu `main`
  - Hash-Links von Router ignoriert
  - via `element.scrollIntoView()`

</v-clicks>

</div>
<div>

### Component

```vue {all|14-16|4-5}
<template>
  <a
    ref="skipLink"
    href="#main"
    @click.prevent="handleFocusElement"
  >
    Skip to content
  </a>
</template>

<script>
export default {
  setup () {
    watch(route, () => {
      skipLink.value.focus()
    })
  }
}
</script>
```

</div>
</div>

---
layout: cover
---

<video controls>
  <source src="/mov/skip-link.mp4" type="video/mp4">
</video>

🤷‍♂️ Potenzieller Nachteil: visuell irritierend

---

# Live-Regionen

Bereiche, die aktualisiert werden, ohne dass die Webseite neu geladen wird

<div v-click>

- Elemente können fokuslos sein
- Attribut `aria-live` gibt an, dass das Element aktualisiert werden kann
- 🗣 Werte: `off`, `polite`, `assertive`
- **Polite**:
  - Aktualisierungen haben geringe Dringlichkeit
  - Nutzer*in des Screenreaders wird erst informiert, wenn Aktivitäten (Lesen, Tippen usw.) unterbrochen

</div>

<br>
<br>

<div v-click>

### Beispiel

```html
<div aria-live="polite">
  <p>Bereich, der aktualisiert werden kann.</p>
</div>
```

</div>

---

# „Ansager“

Off-screen, visuell unsichtbar

<div grid="~ cols-2 gap-8">
<div>

### Hook

```js {3-6|all}
import { reactive } from 'vue'

const announcer = reactive({
  content: '',
  politeness: 'polite'
})

const setAnnouncer = message => {
  announcer.content = message
}

export default () => ({
  // ...
})
```

</div>
<div>

### Component

```vue {0|10|4-5}
<template>
  <div
    id="announcer"
    :aria-live="announcer.politeness"
    v-text="announcer.content"
  />
</template>

<script>
import { useAnnouncer } from '~/hooks'
export default { /* ... */ }
</script>
```

</div>
</div>

---

# „Ansager“

Off-screen, visuell unsichtbar

<div grid="~ cols-2 gap-8">
<div>

### Hook

```js {0}
import { reactive } from 'vue'

const announcer = reactive({
  content: '',
  politeness: 'polite'
})

const setAnnouncer = message => {
  announcer.content = message
}

export default () => ({
  // ...
})
```

</div>
<div>

### Anwendung

```js
import { useAnnouncer } from '~/hooks'
const { setAnnouncer } = useAnnouncer()

setAnnouncer(`Navigated to ${page.title}`)
```

<br>

- verkünden der neuen Route
- nachdem Content geladen wurde

</div>
</div>

---
layout: cover
---

<video controls>
  <source src="/mov/announcer.mp4" type="video/mp4">
</video>

☝️ Here goes the mail off

---

# Aktive Seite im Header hervorheben

`aria-current="page"` indiziert die aktuell aktive Seite

### Beispiel

```html {4}
<nav>
  <a href="/">Home</a>
  <a href="/photography">Parent</a>
  <a href="/about" aria-current="page">About</a>
</nav>
```

<br>
<br>

<v-clicks>

### Implementierung

- bis Vue Router 3 aufwändige Manipulation mit [scoped slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)
- seit Vue Router 4 `aria-current` automatisch berücksichtigt
- ✅ `<router-link>` muss nicht mehr manuell angepasst werden

</v-clicks>

---
layout: cover
preload: false
---

<div class="relative w-60 h-60 mt-6 mx-auto">
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

  <div
    class="text-4xl absolute top-46 text-[#2bbcd2] text-center -z-1"
    v-motion
    :initial="{ y: -40, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }"
  >
    Danke für die Einladung!
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
layout: center
class: text-center
---

# Fragen? Gerne!

[🤩 Live Demo](https://kirby-vue3-starterkit.jhnn.dev) / [GitHub Repo](https://github.com/johannschopplich/kirby-vue3-starterkit)
