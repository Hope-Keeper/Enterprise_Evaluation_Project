module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "mui-path-imports"],
    rules: {
        // "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react/prop-types": "off",
        "no-restricted-imports": [
            "error",
            {
                patterns: ["@mui/*/*/*"]
            }
        ],
        "no-undef": "error",
        "mui-path-imports/mui-path-imports": "error",
        semi: ["error", "always"],
        quotes: ["error", "double"]
    }
};
