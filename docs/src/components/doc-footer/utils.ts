import navigation from "data/navigation.json";

export function findPreviousAndNext(href: string) {
  let previous = { name: "", href: "" };
  let isFindingNext = false;

  for (const { links } of navigation) {
    for (const link of links) {
      if (isFindingNext) {
        return {
          previous,
          next: link,
        };
      }

      if (link.href !== href) {
        previous = link;
        continue;
      }

      isFindingNext = true;
    }
  }

  if (isFindingNext) {
    return {
      previous,
      next: { name: "", href: "" },
    };
  }

  return {
    previous: { name: "", href: "" },
    next: { name: "", href: "" },
  };
}
