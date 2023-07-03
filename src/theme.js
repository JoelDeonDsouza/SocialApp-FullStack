export const colorTokens = {
    grey: {
      0: "#F5F5F5",
      10: "#F5F5F5",
      50: "#F5F5F5",
      100: "#F5F5F5",
      200: "#F5F5F5",
      300: "#9DB2BF",
      400: "#9DB2BF",
      500: "#9DB2BF",
      600: "#9BA4B5",
      700: "#9BA4B5",
      800: "#9BA4B5",
      900: "#000000",
      1000: "#000000",
    },
    primary: {
      50: "#2B3A55",
      100: "#2B3A55",
      200: "#2B3A55",
      300: "#2B3A55",
      400: "#2B3A55",
      500: "#332C39",
      600: "#332C39",
      700: "#332C39",
      800: "#332C39",
      900: "#332C39",
    },
  };
  
  // theme settings //
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // dark mode colors//
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // light mode colors//
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Josefin Sans", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Josefin Sans", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Josefin Sans", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Josefin Sans", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Josefin Sans", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Josefin Sans", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Josefin Sans", "sans-serif"].join(","),
          fontSize: 16,
        },
      },
    };
  };