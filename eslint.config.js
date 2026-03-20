import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], 
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      } 
    },
    rules: {
      // Aqui você personaliza suas regras
      "no-unused-vars": "warn",     // avisa sobre variáveis não usadas
      "no-console": "off",          // permite console.log()
      "semi": ["error", "always"],  // exige ponto e vírgula
      "quotes": ["error", "double"], // usa aspas duplas
      "indent": ["error", 2],        // 2 espaços de indentação
      "object-curly-spacing": [
        "error",
        "always"
      ],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": [
        "error",
        {
          "anonymous": "always",
          "named": "always",
          "asyncArrow": "always"
        }
      ],
    },
    
  },
]);
