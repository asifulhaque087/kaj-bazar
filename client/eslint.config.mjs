// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginBoundaries from "eslint-plugin-boundaries"; // 1. Import the boundaries plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// 2. Define the configuration object for eslint-plugin-boundaries
// const boundariesConfig = {
//   // Register the imported plugin
//   plugins: {
//     boundaries: pluginBoundaries,
//   },
//   // Define settings for the plugin
//   settings: {
//     "boundaries/include": ["src/**/*"],
//     "boundaries/elements": [
//       {
//         mode: "full",
//         type: "shared",
//         // pattern: ["src/**/*", "!src/axios.service.ts"],
//         // pattern: ["!src/axios.service.ts", "src/**/*"],

//         pattern: [
//           "src/components/**/*",
//           "src/providers/**/*",
//           "src/store/**/*",
//           "src/hooks/**/*",
//           "src/utils/**/*",
//           "src/types/**/*",
//           "src/lib/**/*",
//           "src/config.ts",
//           "src/constants.ts",
//           "src/axios.service.ts",
//         ],
//       },
//       {
//         mode: "full",
//         type: "feature",
//         capture: ["featureName"],
//         pattern: ["src/features/*/**/*"],
//       },
//       {
//         mode: "full",
//         type: "app",
//         capture: ["_", "fileName"],
//         pattern: ["src/app/**/*"],
//       },
//       // {
//       //   mode: "full",
//       //   type: "neverImport",
//       //   pattern: ["src/*", "src/tasks/**/*"],
//       // },
//     ],
//   },
//   // Define the rules for the plugin
//   rules: {
//     // "boundaries/no-unknown": ["error"],
//     "boundaries/no-unknown-files": ["error"],
//     "boundaries/element-types": [
//       "error",
//       {
//         default: "disallow",
//         rules: [
//           {
//             from: ["shared"],
//             allow: ["shared"],
//           },
//           {
//             from: ["feature"],
//             allow: [
//               "shared",
//               ["feature", { featureName: "${from.featureName}" }],
//             ],
//           },
//           {
//             from: ["app", "neverImport"],
//             allow: ["shared", "feature"],
//           },
//           {
//             from: ["app"],
//             allow: [["app", { fileName: "*.css" }]],
//           },
//         ],
//       },
//     ],
//   },
// };

// 3. Combine the Next.js configs (via compat) and the new boundaries config
const eslintConfig = [
  // This imports all rules, plugins, and settings from next/core-web-vitals and next/typescript
  // ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("next/core-web-vitals"),

  // Add the boundaries configuration as a new object in the flat config array
  // boundariesConfig,
];

export default eslintConfig;
