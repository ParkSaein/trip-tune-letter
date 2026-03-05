export const theme = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // MD3 Light 색상 팔레트
          primary: { main: "#6750A4" },
          secondary: { main: "#625B71" },
          background: { default: "#FEF7FF", paper: "#FFFFFF" },
          text: { primary: "#1C1B1F", secondary: "#49454F" },
        }
      : {
          // MD3 Dark 색상 팔레트
          primary: { main: "#D0BCFF" },
          secondary: { main: "#CCC2DC" },
          background: { default: "#1C1B1F", paper: "#2B2B2B" },
          text: { primary: "#E6E1E5", secondary: "#CAC4D0" },
        }),
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  shape: {
    borderRadius: 12, // MD3 기본 둥근 모서리
  },
});