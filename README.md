# 🔦 `light-dark`

`light-dark` is a light-dark theme management library, especially with [`shadcn/ui`](https://github.com/shadcn-ui/ui).

The library sets the initial theme with local storage if an entry exists or uses the default theme `light`. Then, listeners are set up for changes in theme preference, local storage, and manual theme changes.

## Getting Started

You can install the library with your preferred package manager:

```bash
npm install light-dark
# Or pnpm
pnpm add light-dark
# Or Yarn
yarn add light-dark
# Or Bun
bun add light-dark
```

Then you can use the `setupTheme` function for initial setup:
```js
setupTheme();
```
**This function must be only called once in a project. Multiple calls can cause unstable behavior.**

Then you can use the `getTheme` function to get the current theme in your application. It returns either `light` or `dark`.
```js
setupTheme();
const theme = getTheme();

console.log(theme); // light or dark
```

Or you can use the `setTheme` function to set the theme with a value. The value can be either `light` or `dark`.
```js
setupTheme();
const theme = getTheme();

console.log(theme); // let's assume light is logged

setTheme("dark");
const newTheme = getTheme();
console.log(newTheme); // dark
```

Or you can use the `toggleTheme` function to toggle the theme without any specified value. It toggles between `light` and `dark` values.
```js
setupTheme();
const theme = getTheme();

console.log(theme); // let's assume dark is logged

toggleTheme();
const newTheme = getTheme();
console.log(newTheme); // light
```

## License

This repository is licensed under the [MIT](./LICENSE) license.
