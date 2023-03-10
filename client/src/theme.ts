import { createTheme } from "@mui/material/styles";

export const shades = {
    primary: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    },
    secondary: {
        100: "#f8d4ce",
        200: "#f1a99d",
        300: "#e97e6b",
        400: "#e2533a",
        500: "#db2809",
        600: "#af2007",
        700: "#831805",
        800: "#581004",
        900: "#2c0802"
    },
    neutral: {
        100: "#f5f5f5",
        200: "#ecebeb",
        300: "#e2e1e1",
        400: "#d9d7d7",
        500: "#cfcdcd",
        600: "#a6a4a4",
        700: "#7c7b7b",
        800: "#535252",
        900: "#292929"
    },    
}

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500]
        },
        secondary: {
            main: shades.secondary[500]
        },
        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100]
        }
    },
    typography: {
        fontFamily: ["Fauna One", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 48,
        },
        h2: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 36,
        },
        h3: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 20,
        },
        h4: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 17,
        },
        h5: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 14,
        },

    }
})

