import { watch } from "vue-function-api";

function initTheme(color) {
  watch(() => color.value, () => applyThemeColor(color.value));
}

function applyThemeColor(color) {
  const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  console.log(`setting primary theme color to '${color}'.`);
  for (const shade of shades) {
    // e.g., --primary_1000: var(--blue_1000);
    const style = document.documentElement.style;
    style.setProperty(`--primary_${shade}`, `var(--${color}_${shade})`);
  }
}

export { initTheme };
