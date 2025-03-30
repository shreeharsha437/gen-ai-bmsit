module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^(TeamMemberCard|hoverEffect)$",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "react/no-unescaped-entities": "off",
  },
};
