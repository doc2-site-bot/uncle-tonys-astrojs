import { toH } from "hast-to-hyperscript";
import { h as createElement } from "preact";
import type { Root } from "hast";
import { h } from "hastscript";

const variables = {
  year: {
    value: new Date().getFullYear(),
    href: "",
  },
  framework: {
    value: "Astro",
    href: "https://astro.build/",
  },
  host: {
    value: "Netlify",
    href: "http://netlify.com/",
  },
  repo: {
    value: "GitHub repository",
    href: "https://github.com/doc2-site-bot/uncle-tonys-astrojs",
  },
};

export default function Footer({ hast }: { hast: Root | undefined }) {
  if (!hast) {
    return null;
  }

  let index = 0;
  return (
    <footer className="prose max-w-none text-center mx-auto px-8">
      {toH((name, props, children) => {
        index++;

        if (name === "var") {
          const key = children?.[0];
          const variable = variables[key as keyof typeof variables];

          if (!variable) {
            console.warn(`Variable ${key} not found`);
          }

          if (variable.href) {
            return (
              <a
                key={index}
                href={variable.href}
                target="_blank"
                rel="noreferrer"
              >
                {variable.value}
              </a>
            );
          }

          return <span key={index}>{variable.value}</span>;
        } else if (name === "a") {
          return (
            <a key={index} href={props.href} target="_blank" rel="noreferrer">
              {children}
            </a>
          );
        }

        return createElement(name, props, children);
      }, h("div", ...hast.children))}
    </footer>
  );
}
