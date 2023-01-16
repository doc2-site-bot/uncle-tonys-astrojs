import { toH } from "hast-to-hyperscript";
import { h as createElement } from "preact";
import type { Element } from "hast";
import { h } from "hastscript";

function Hero({ hast }: { hast: Element }) {
  let index = 0;

  return (
    <div className="prose lg:prose-xl text-center bg-red-900 mx-auto py-4 my-16 rounded-md drop-shadow-lg">
      <div className="max-w-screen-lg">
        {toH((name, properties, children) => {
          index++;

          if (name === "img") {
            return (
              <img
                key={index}
                src={properties.src}
                loading="eager"
                alt={properties.alt}
                class="object-cover"
              />
            );
          }

          return createElement(name, properties, children);
        }, h("div", ...hast.children))}
      </div>
    </div>
  );
}

export default Hero;
