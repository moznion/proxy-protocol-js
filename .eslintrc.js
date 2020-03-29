module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es6": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  "ignorePatterns": [
    "lib/",
    "node_modules/",
    "src/**/*.test.ts",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "import",
    "prefer-arrow",
  ],
  "rules": {
    "constructor-super": [
      "error"
    ],
    "for-direction": [
      "error"
    ],
    "getter-return": [
      "error" ],
    "no-async-promise-executor": [
      "error"
    ],
    "no-case-declarations": [
      "error"
    ],
    "no-class-assign": [
      "error"
    ],
    "no-compare-neg-zero": [
      "error"
    ],
    "no-cond-assign": "error",
    "no-const-assign": [
      "error"
    ],
    "no-constant-condition": [
      "error",
      {
        "checkLoops": false,
      },
    ],
    "no-control-regex": [
      "error"
    ],
    "no-debugger": "error",
    "no-delete-var": [
      "error"
    ],
    "no-dupe-args": [
      "error"
    ],
    "no-dupe-class-members": [
      "error"
    ],
    "no-dupe-keys": [
      "error"
    ],
    "no-duplicate-case": [
      "error"
    ],
    "no-empty": [
      "error"
    ],
    "no-empty-character-class": [
      "error"
    ],
    "no-empty-pattern": [
      "error"
    ],
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        "allow": ["private-constructors"],
      },
    ],
    "no-ex-assign": [
      "error"
    ],
    "no-extra-boolean-cast": [
      "error"
    ],
    "no-extra-semi": [
      "error"
    ],
    "no-fallthrough": [
      "error"
    ],
    "no-func-assign": [
      "error"
    ],
    "no-global-assign": [
      "error"
    ],
    "no-inner-declarations": [
      "error"
    ],
    "no-invalid-regexp": [
      "error"
    ],
    "no-irregular-whitespace": [
      "error"
    ],
    "no-misleading-character-class": [
      "error"
    ],
    "no-mixed-spaces-and-tabs": [
      "error"
    ],
    "no-new-symbol": [
      "error"
    ],
    "no-obj-calls": [
      "error"
    ],
    "no-octal": [
      "error"
    ],
    "no-prototype-builtins": [
      "error"
    ],
    "no-redeclare": "error",
    "no-regex-spaces": [
      "error"
    ],
    "no-self-assign": [
      "error"
    ],
    "no-shadow-restricted-names": [
      "error"
    ],
    "no-sparse-arrays": [
      "error"
    ],
    "no-this-before-super": [
      "error"
    ],
    "no-undef": [
      "error"
    ],
    "no-unexpected-multiline": [
      "error"
    ],
    "no-unreachable": [
      "error"
    ],
    "no-unsafe-finally": [
      "error"
    ],
    "no-unsafe-negation": [
      "error"
    ],
    "no-unused-labels": "error",
    "no-unused-vars": [
      "error"
    ],
    "no-useless-catch": [
      "error"
    ],
    "no-useless-escape": [
      "error"
    ],
    "no-with": [
      "error"
    ],
    "require-yield": [
      "error"
    ],
    "use-isnan": "error",
    "valid-typeof": [
      "error"
    ],
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        "accessibility": "explicit"
      }
    ],
    "@typescript-eslint/interface-name-prefix": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "arrow-body-style": "error",
    "camelcase": "error",
    "curly": [
      "error",
      "multi-line"
    ],
    "default-case": "error",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "guard-for-in": "error",
    "id-blacklist": [
      "error",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined",
    ],
    "id-match": "error",
    "import/no-default-export": "error",
    "import/order": "error",
    "no-caller": "error",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-underscore-dangle": "error",
    "no-unused-expressions": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow/prefer-arrow-functions": "error",
    "prefer-const": "error",
    "radix": "error",
    "no-restricted-globals": ["error",
      {
        "name": "parseInt",
        "message": "tsstyle#type-coercion",
      },
      {
        "name": "parseFloat",
        "message": "tsstyle#type-coercion",
      },
      {
        "name": "Array",
        "message": "tsstyle#type-coercion",
      },
    ],
    "@typescript-eslint/ban-types": ["error", {
      "types": {
        "Object": {
          "message": "Use {} instead",
          "fixWith": "{}"
        },
        "String": {
          "message": "Use string instead",
          "fixWith": "string"
        },
        "Number": {
          "message": "Use number instead",
          "fixWith": "number"
        },
        "Boolean": {
          "message": "Use boolean instead",
          "fixWith": "boolean"
        },
      }
    }],
    "@typescript-eslint/no-use-before-define": ["error",
      {
        "classes": false,
      }
    ],
  },
  "settings": {}
};
