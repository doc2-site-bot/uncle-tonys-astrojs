import Hero from "./Hero";
import Contact from "./Contact";
import Menu from "./Menu";
import { h as createElement, ComponentChildren } from "preact";
import { toH } from "hast-to-hyperscript";
import type { Root, Element } from "hast";

type RenderParams = {
  meta?: { [key: string]: string };
  hast?: Root;
  refs?: Reference;
  components?: string[];
  key?: string;
  path: string;
};

const componentMap = {
  contact: Contact,
  hero: Hero,
  menu: Menu,
};

/**
 * Recursively render hast with references and components
 */
function render({
  hast,
  refs,
  components,
  path,
  key = "key-",
}: RenderParams): Array<ComponentChildren> | null {
  if (!hast) {
    return null;
  }

  const elements = hast.children.filter(
    (child) =>
      child.type === "element" &&
      child.tagName !== "header" &&
      child.tagName !== "footer"
  ) as unknown as Array<Element>;

  return elements.map((child, index) => {
    if (child.tagName === "fragment" && refs && child?.properties?.reference) {
      return render({
        ...refs[String(child.properties.reference)],
        path,
        key: `key-${key}`,
      });
    }

    if (components && components.includes(child.tagName)) {
      const component =
        componentMap[child.tagName as keyof typeof componentMap];

      if (!component) {
        console.warn(`Component "${child.tagName}" not found`);
        return null;
      }

      const Component = component;

      return (
        <Component
          key={`${key}${index}`}
          hast={child}
          refs={refs}
          path={path}
        />
      );
    }

    return (
      <div
        key={`${key}${index}`}
        className="prose lg:prose-xl mx-auto py-4 text-center"
      >
        {toH(createElement, child)}
      </div>
    );
  }) as unknown as Array<ComponentChildren> | null;
}

function Main({ hast, refs, components, path }: RenderParams) {
  return (
    <main className="bg-red-800 py-8 px-8">
      {render({ hast, refs, components, path })}
    </main>
  );
}

export default Main;
