/** @type {import('prettier').Config} */
const config = {
  // Cấu hình định dạng cơ bản
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,

  // Khai báo plugins (Tailwind plugin nên để ở cuối cùng)
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  // Cấu hình cho @ianvs/prettier-plugin-sort-imports
  importOrder: [
    "^(react/(.*)$)|^(react$)", // 1. React
    "^(next/(.*)$)|^(next$)", // 2. Next.js
    "<THIRD_PARTY_MODULES>", // 3. Các thư viện NPM khác (Supabase, Lucide,...)
    "", // Dòng trống để ngăn cách
    "^types$", // 4. Types
    "^@/types/(.*)$",
    "^@/config/(.*)$", // 5. Configs
    "^@/lib/(.*)$", // 6. Utils / Libs (như utils của shadcn)
    "^@/hooks/(.*)$", // 7. Hooks
    "^@/components/ui/(.*)$", // 8. UI Components (shadcn)
    "^@/components/(.*)$", // 9. Custom Components
    "^@/app/(.*)$", // 10. App routing / Context
    "",
    "^[./]", // 11. Các import tương đối (./, ../)
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
