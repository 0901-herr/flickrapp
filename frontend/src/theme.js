// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    100: "#FAFAFA",
    200: "#F5F5F5",
    300: "#A1A1A1",
    1000: "#000000",
  },
  primary: {
    0: "#2564D4",
    100: "#EA3583",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              light: colorTokens.primary[0],
              main: colorTokens.primary[100],
            },
            neutral: {
              text: colorTokens.grey[1000],
              subtitle: colorTokens.grey[300],
              hover: colorTokens.grey[200],
            },
            background: {
              menu: colorTokens.grey[100],
            },
          }
        : {
            // palette values for dark mode
            primary: {
              light: colorTokens.primary[0],
              main: colorTokens.primary[100],
            },
            neutral: {
              text: colorTokens.grey[0],
              subtitle: colorTokens.grey[300],
              hover: colorTokens.grey[200],
            },
            background: {
              menu: colorTokens.grey[100],
            },
          }),
    },
  };
};
