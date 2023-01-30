import { readdirSync } from "fs";

console.log(generateNavigationJson());

function generateNavigationJson() {
  const ignoredFiles = getIgnoredFiles();

  const hooks = readdirSync("packages/hooks/src")
    .filter((file) => !ignoredFiles.includes(file))
    .map((file) => {
      const kebabName = file.replace(".ts", "");
      const camelName = kebabToCamel(kebabName);
      return {
        name: camelName,
        href: `/${kebabName}`,
      };
    });

  const navigation = generateNavigation(hooks);
  return JSON.stringify(navigation, null, 2);
}

function getIgnoredFiles() {
  return ["index.ts", "types", "use-storage.ts", "utils.ts"];
}

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function generateNavigation(hooks) {
  return [
    {
      section: "Getting Started",
      links: [
        {
          name: "Introduction",
          href: "/introduction",
        },
        {
          name: "Installation",
          href: "/installation",
        },
      ],
    },
    {
      section: "Hooks",
      links: hooks,
    },
  ];
}
