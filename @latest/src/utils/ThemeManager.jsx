import { createTheme } from "@mui/material";

export default function theme() {
  const flowerBoy = {
    main: "#F5A700",
    secondary: "#F3602B",
    tertiary: "#376D3F",
    lightTertiary: "#BEEF9E",
    detail: "#6DA7D9"
  }

  const theme = createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: flowerBoy.main
      },
      secondary: {
        main: flowerBoy.secondary
      }
    }
  })
}