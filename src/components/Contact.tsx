import { toH } from "hast-to-hyperscript";
import { h as createElement } from "preact";
import { h } from "hastscript";
import type { Element } from "hast";

const mapsKey = "AIzaSyDVLquTAWKVDTDeJn9_HRK6OAemT_UOb14";

function Contact({ hast, path }: { hast: Element; path: string }) {
  const mapsAddress = String(hast?.properties?.address || "");

  return (
    <div className="mx-auto py-16 prose lg:prose-xl text-center">
      {toH(createElement, h("div", ...hast.children))}

      {path !== "/" && mapsAddress && (
        <div
          className={`relative h-0 pb-[56.25%] overflow-hidden max-w-screen-md my-16 not-prose`}
        >
          <iframe
            title="Maps"
            className="absolute top-0 left-0 h-full w-full border-0"
            width="500"
            height="500"
            referrerpolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${mapsAddress.replaceAll(
              " ",
              "+"
            )}`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

export default Contact;
