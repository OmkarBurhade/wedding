# Theme Switcher Guide

Ye file simple language me explain karti hai ki `index.html` me jo theme change functionality add ki gayi hai, wo kaise kaam karti hai aur future me aap ise kisi bhi naye UI me kaise use kar sakte ho.

Is guide ko aise likha gaya hai ki agar aap beginner ho tab bhi aap step by step follow kar sako.

## 1. Theme System Kya Hai?

Theme system ka matlab:

- website ke main colors ek jagah par define hote hain
- user kisi color swatch par click karta hai
- poori website ke colors change ho jate hain
- page reload karne ke baad bhi selected theme save rehti hai

Is project me theme system 3 cheezon par based hai:

1. CSS variables
2. Tailwind classes
3. JavaScript + `localStorage`

## 2. Ye System Kaha Kaha Hai?

`index.html` me theme functionality 4 main parts me bani hui hai:

1. Tailwind config
2. CSS variables
3. Theme switcher UI
4. JavaScript logic

In 4 parts ko samajh lo, phir aap kisi bhi page me same system bana sakte ho.

## 3. Part 1: Tailwind Config

File ke top me `tailwind.config` ke andar theme colors define kiye gaye hain.

Example:

```html
colors: {
  primary: 'var(--color-primary)',
  'primary-dark': 'var(--color-primary-dark)',
  'primary-soft': 'var(--color-primary-soft)',
  secondary: 'var(--color-secondary)',
  'secondary-muted': 'var(--color-secondary-muted)',
  'secondary-light': 'var(--color-secondary-light)',
  surface: 'var(--color-surface)',
  'surface-soft': 'var(--color-surface-soft)',
  'surface-input': 'var(--color-surface-input)',
  'surface-tint': 'var(--color-surface-tint)',
}
```

### Iska matlab kya hai?

Yaha hum Tailwind ko bol rahe hain:

- `primary` color directly ek fixed hex color nahi hai
- balki wo `--color-primary` naam ke CSS variable se aayega

Matlab agar `--color-primary` ka value badal diya, to `primary` use karne wali saari jagah update ho jayegi.

## 4. Part 2: CSS Variables

Ye sabse important part hai.

`<style>` block ke andar theme tokens define kiye gaye hain.

Example:

```css
:root {
  --color-primary: #662f97;
  --color-primary-dark: #53257b;
  --color-primary-soft: #733ca4;
  --color-secondary: #6b4e63;
}
```

### `:root` ka matlab

`root` matlab poori website ka default theme.

Agar user kuch select na kare, to ye colors use honge.

## 5. Dusre Themes Kaha Hain?

Default theme ke niche dusre themes is format me likhe gaye hain:

```css
[data-theme="ocean"] {
  --color-primary: #2f6b97;
  --color-primary-dark: #234f72;
  --color-primary-soft: #4c85b3;
  --color-secondary: #4e6075;
}
```

### Iska matlab

Agar HTML element par `data-theme="ocean"` lag gaya, to website ke colors ocean theme ke ho jayenge.

Yahi pura secret hai.

## 6. Part 3: Theme Switcher UI

`body` ke start me ek sticky section add kiya gaya hai:

```html
<div id="themeSwitcher">
  <button data-theme="royal" data-swatch="#662f97"></button>
  <button data-theme="ocean" data-swatch="#2f6b97"></button>
</div>
```

### Yaha 2 cheezein important hain

- `data-theme`
- `data-swatch`

### `data-theme` kya karta hai?

Ye theme ka naam batata hai.

Example:

- `royal`
- `ocean`
- `sage`
- `rose`
- `amber`

Ye naam CSS aur JavaScript dono me same hona chahiye.

### `data-swatch` kya karta hai?

Ye button par dikhne wala circle color hota hai.

Example:

```html
data-swatch="#2f6b97"
```

Matlab swatch button blue dikhega.

## 7. Part 4: JavaScript Logic

Theme logic niche script me hai.

Important cheezein:

```js
const THEME_STORAGE_KEY = 'wedding-theme';
const THEMES = {
  royal: { swatch: '#662f97' },
  ocean: { swatch: '#2f6b97' },
};
```

### Ye kya karta hai?

- `THEMES` object batata hai kaun kaun se themes available hain
- `THEME_STORAGE_KEY` batata hai kis naam se selected theme save hogi

## 8. Theme Apply Kaise Hota Hai?

Sabse important function:

```js
function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem(THEME_STORAGE_KEY, themeName);
}
```

### Is function me kya ho raha hai?

1. HTML root par `data-theme="themeName"` set hota hai
2. selected theme `localStorage` me save hoti hai

Bas itna hi.

Aur kyunki CSS variables already `[data-theme="..."]` ke base par likhe hue hain, to website ka color turant change ho jata hai.

## 9. Reload Ke Baad Theme Kaise Save Rehti Hai?

Iske liye ye logic use hota hai:

```js
const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
```

Phir page load hote hi saved theme dobara apply kar di jati hai.

Matlab:

- user ne `ocean` choose kiya
- page reload hua
- `localStorage` se `ocean` mila
- website fir se `ocean` theme me open hui

## 10. Naye UI Me Theme Functionality Kaise Add Karein?

Ab main exact step by step bata raha hoon.

### Step 1: Apne main colors decide karo

Har theme ke liye kam se kam ye colors decide karo:

- primary
- primary-dark
- primary-soft
- secondary
- secondary-muted
- secondary-light
- surface
- surface-soft
- surface-input
- surface-tint

Example:

```css
[data-theme="newtheme"] {
  --color-primary: #1d4ed8;
  --color-primary-dark: #1e3a8a;
  --color-primary-soft: #60a5fa;
  --color-secondary: #475569;
  --color-secondary-muted: #64748b;
  --color-secondary-light: #94a3b8;
  --color-surface: #eff6ff;
  --color-surface-soft: #f8fbff;
  --color-surface-input: #ffffff;
  --color-surface-tint: #f3f8ff;
}
```

### Step 2: Is theme ko CSS me add karo

`<style>` ke andar existing themes ke niche same format me naya block add karo.

Important:

- theme ka naam unique hona chahiye
- name same rehna chahiye across CSS, button, and JS

Example:

```css
[data-theme="sky"] {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-soft: #60a5fa;
  --color-secondary: #475569;
  --color-secondary-muted: #64748b;
  --color-secondary-light: #94a3b8;
  --color-surface: #eff6ff;
  --color-surface-soft: #f8fbff;
  --color-surface-input: #ffffff;
  --color-surface-tint: #f3f8ff;
}
```

### Step 3: Switcher me ek naya button add karo

Example:

```html
<button
  type="button"
  class="theme-swatch h-10 w-10 rounded-full border-2 border-white shadow-md ring-2 ring-transparent transition hover:scale-105"
  data-theme="sky"
  data-swatch="#2563eb"
  aria-label="Apply sky theme">
</button>
```

### Step 4: JavaScript `THEMES` object me add karo

Example:

```js
const THEMES = {
  royal: { swatch: '#662f97' },
  ocean: { swatch: '#2f6b97' },
  sky: { swatch: '#2563eb' },
};
```

### Step 5: Query map me bhi add karo

Ye optional nahi hai, add karna zaroori hai agar aap URL me theme short code bhi chahte ho.

Example:

```js
const THEME_QUERY_MAP = {
  royal: 'r',
  ocean: 'o',
  sky: 'k',
};

const THEME_QUERY_REVERSE_MAP = {
  r: 'royal',
  o: 'ocean',
  k: 'sky',
};
```

## 11. Page Me Colors Kaise Likho?

Ye bahut important hai.

Agar aap future me chahte ho ki koi bhi section theme ke sath automatically change ho, to hardcoded hex color mat likho.

### Galat tarika

```html
<h2 class="text-[#662f97]">Heading</h2>
```

### Sahi tarika

```html
<h2 class="text-[var(--color-primary)]">Heading</h2>
```

Ya agar Tailwind semantic token use karna ho:

```html
<h2 class="text-primary">Heading</h2>
```

Note:

- Tailwind CDN mode me kabhi kabhi arbitrary value `text-[var(--color-primary)]` zyada reliable hoti hai
- project me dono patterns chal sakte hain

## 12. Kaunse Tokens Kab Use Karne Hain?

Ye simple rule yaad rakho:

- `--color-primary`
  use for main buttons, headings, highlight text
- `--color-primary-dark`
  use for hover state
- `--color-primary-soft`
  use for soft heading or hero highlight
- `--color-secondary`
  use for paragraphs and support text
- `--color-secondary-muted`
  use for labels and small captions
- `--color-secondary-light`
  use for placeholders
- `--color-surface`
  use for cards and section backgrounds
- `--color-surface-soft`
  use for soft gradient background
- `--color-surface-input`
  use for inputs
- `--color-surface-tint`
  use for fancy gradient middle color

## 13. Shadows Kaise Theme Ke Sath Change Hote Hain?

Is project me shadows bhi variables se chal rahi hain:

```css
--shadow-soft
--shadow-subtle
--shadow-card
--shadow-cta
--shadow-cta-strong
--shadow-glow
--shadow-switcher
```

### Use kab karna hai?

- `--shadow-soft`
  normal cards
- `--shadow-card`
  slightly stronger card shadow
- `--shadow-cta`
  buttons
- `--shadow-glow`
  important glowing button

Example:

```html
class="shadow-[0_18px_48px_var(--shadow-soft)]"
```

## 14. Agar Naya Section Bana Rahe Ho To Kaise Likhna Hai?

Example:

```html
<section class="rounded-[28px] border border-[var(--color-primary)]/10 bg-gradient-to-br from-white via-[var(--color-surface-tint)] to-[var(--color-surface)] p-6 shadow-[0_18px_48px_var(--shadow-soft)]">
  <p class="text-[12px] uppercase tracking-[0.3em] text-[var(--color-secondary-muted)]">
    New Section
  </p>
  <h2 class="text-[32px] italic text-[var(--color-primary)]">
    My Heading
  </h2>
  <p class="text-[var(--color-secondary)]">
    Ye text selected theme ke sath automatically color change karega.
  </p>
  <button class="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]">
    Click Me
  </button>
</section>
```

## 15. Agar Aapko Sirf Colors Change Karne Hain To Kaha Change Karein?

Bahut simple answer:

### Default theme change karna ho

`:root` ke andar values change karo.

Example:

```css
:root {
  --color-primary: #111827;
  --color-secondary: #374151;
}
```

### Ocean theme change karna ho

`[data-theme="ocean"]` block ke andar values change karo.

### Rose theme change karna ho

`[data-theme="rose"]` block ke andar values change karo.

Isse poori website update ho jayegi.

## 16. Agar Naya UI Banao To Minimum Kya Copy Karna Hai?

Agar aap dusre page me ye functionality reuse karna chahte ho, to ye 4 parts copy karo:

1. Tailwind theme token config
2. `<style>` me CSS variables and theme blocks
3. `#themeSwitcher` HTML
4. theme JavaScript script

Bas itna copy karne ke baad aap us naye UI me theme-ready layout bana sakte ho.

## 17. Sabse Common Mistakes

### Mistake 1: CSS me theme ka naam aur button me theme ka naam alag

Galat:

```css
[data-theme="blue"] { ... }
```

```html
<button data-theme="ocean"></button>
```

Ye kaam nahi karega.

### Mistake 2: Hardcoded color use karna

Galat:

```html
class="text-[#662f97]"
```

Aisa karoge to theme change hone par wo element same hi rahega.

### Mistake 3: `THEMES` object me theme add nahi karna

Agar CSS me add kiya, button me add kiya, lekin JS me nahi add kiya, to switcher ka logic incomplete ho jayega.

### Mistake 4: Query map me short code bhool jana

Isse URL sharing behavior break ho sakta hai.

## 18. Quick Checklist

Jab bhi naya theme add karo, ye checklist follow karo:

- CSS me `[data-theme="name"]` block add kiya?
- `THEMES` object me add kiya?
- switcher button add kiya?
- `data-theme` names same hain?
- `data-swatch` diya?
- query map me add kiya?
- UI classes me hardcoded hex colors use nahi kiye?

## 19. Real World Best Practice

Agar aap future me aur professional structure banana chaho, to next step ye ho sakta hai:

1. theme tokens ko alag file me rakho
2. theme switcher JS ko alag file me rakho
3. reusable class naming banao
4. hardcoded colors ko dheere dheere pure project me hatao

Abhi current project ke liye jo setup hai wo beginner-friendly bhi hai aur scalable bhi.

## 20. Sabse Simple Rule Yaad Rakho

Agar aapko kuch bhi yaad na rahe, to bas ye yaad rakho:

1. colors CSS variables me rakho
2. UI me unhi variables ko use karo
3. click par `data-theme` change karo
4. `localStorage` me theme save karo

Bas isi se poora theme system chal jata hai.

## 21. Mini Example

Ye sabse chhota version hai:

```html
<style>
  :root {
    --color-primary: #662f97;
  }

  [data-theme="blue"] {
    --color-primary: #2563eb;
  }
</style>

<button onclick="document.documentElement.setAttribute('data-theme', 'blue')">
  Blue Theme
</button>

<h1 style="color: var(--color-primary)">Hello</h1>
```

Is mini example me bhi wahi logic hai jo main project me use hua hai.

## 22. Final Advice

Future me agar aap koi bhi naya wedding template, invitation page, landing page, portfolio, ya ecommerce UI banao, to:

- pehle design banao
- phir colors hardcode mat karo
- seedha semantic variables use karo

Tab aapka poora UI theme-ready ban jayega.

---

Agar aap chaho, next step me main isi `README.md` ke basis par:

- ek `theme-template` snippet bana sakta hoon
- ya theme system ko alag `theme.js` aur `theme.css` style structure me modular bhi kar sakta hoon

