const app = Vue.createApp({
  setup() {
    const themes = Vue.ref("");
    const colors = Vue.ref("");
    const colorsRef = Vue.ref("");
    const query = Vue.ref("");
    const single_color = Vue.ref("");
    const allGroups = Vue.ref("");

    const isCardCliked = Vue.ref(false);

    const lightThemes = (theme) => {
      query.value = theme;
    };
    const darkThemes = (theme) => {
      query.value = theme;
    };

    const displayAll = (all_colors) => {
      query.value = all_colors;
    };

    const displayGroup = (colorGroup, colorHex) => {
      const singleColor = colorsRef.value.find(
        (color) => color.hex.toLowerCase() === colorHex.toLowerCase()
      );
      const groups = colorsRef.value.filter(
        (colors) => colors.group.toLowerCase() === colorGroup.toLowerCase()
      );

      if (groups) {
        allGroups.value = groups;
      }

      if (singleColor) {
        single_color.value = singleColor;
      }

      isCardCliked.value = true;
    };

    const filteredColors = Vue.computed(() => {
      switch (query.value) {
        case "light-theme":
          return colors.value.filter(
            (color) => color.theme.toLowerCase() === "light"
          );
        case "dark-theme":
          return colors.value.filter(
            (color) => color.theme.toLowerCase() === "dark"
          );
        case "all_colors":
          return colors.value;
        default:
          return colors.value.filter((color) =>
            color.name.toLowerCase().startsWith(query.value.toLowerCase())
          );
      }
    });

    const copyHex = (hex) => {
      try {
        navigator.clipboard.writeText(hex);
        alert(`${hex} copied to clipboard`);
      } catch (error) {
        alert("An error occured");
      }
    };

    Vue.onMounted(async () => {
      try {
        const data = await fetch("https://color-serve.onrender.com/api/colors");
        const results = await data.json();
        colors.value = results.data;
        colorsRef.value = results.data;
      } catch (error) {
        console.log(error.message);
      }
    });

    return {
      lightThemes,
      darkThemes,
      displayAll,
      displayGroup,
      copyHex,
      filteredColors,
      themes,
      colors,
      colorsRef,
      allGroups,
      single_color,
      isCardCliked,
      query,
    };
  },
});

app.mount("#app");
