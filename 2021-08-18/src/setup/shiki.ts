import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(async ({ loadTheme }) => {
  return {
    theme: {
      dark: "monokai",
      light: await loadTheme(
        require.resolve("theme-vitesse/themes/vitesse-light.json")
      ),
    },
  };
});
