const app = Vue.createApp({
  setup() {
    const themes = Vue.ref("");
    const colors = Vue.ref("");
    const colorsRef = Vue.ref("");

    const single_color = Vue.ref('');
    const allGroups = Vue.ref('');

    const  isCardCliked = Vue.ref(false)

    const lightThemes = (theme) => {
      displayTheme(theme);
    };
    const darkThemes = (theme) => {
      displayTheme(theme);
    };

    const displayTheme = (theme) => {
      const findThemes = colorsRef.value.filter(
        (colors) => colors.theme == theme
      );

      findThemes
        ? (colors.value = findThemes)
        : console.log("Cannot find this theme");
    };
    const displayAll = () => {
      colors.value = colorsRef.value;
    };

    const displayGroup = (colorGroup, colorHex) => {
      const singleColor = colorsRef.value.find(color => color.hex.toLowerCase() === colorHex.toLowerCase())
      const groups = colorsRef.value.filter(colors => colors.group.toLowerCase() === colorGroup.toLowerCase());

      if (groups) {
       allGroups.value = groups
      }

      if (singleColor) {
        single_color.value = singleColor
      }

      isCardCliked.value = true
    }

    const copyHex = (hex) => {

      try {
      navigator.clipboard.writeText(hex);
      alert(`${hex} copied to clipboard`);
      } catch (error) {
        alert('An error occured');
      }
    }

    Vue.onMounted(async () => {
      try {
        const data = await fetch("https://color-serve.onrender.com/api/colors");
        const results = await data.json();
        colors.value = results.data;
        colorsRef.value = results.data;
      } catch (error) {
        console.log("Failed to fetch", error.message);
      }
    });

    return {
      lightThemes,
      darkThemes,
      displayAll,
      displayGroup,
      copyHex,
      themes,
      colors,
      colorsRef,
      allGroups,
      single_color,
      isCardCliked
    };
  },
});

app.mount("#app");
