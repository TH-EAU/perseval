// theme.js
import { extendTheme } from "@chakra-ui/react";

// Configuration du thème personnalisé
const theme = extendTheme({
  colors: {},
  fonts: {
    heading: `'Poppins', sans-serif`, // Police pour les titres
    body: `'Poppins', sans-serif`, // Police pour le texte
  },
  // Styles globaux
  styles: {
    global: {
      "html, body": {
        bg: "black", // Fond global de la page
      },
    },
  },
});

export default theme;
