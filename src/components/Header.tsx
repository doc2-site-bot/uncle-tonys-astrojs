import { select, selectAll } from "hast-util-select";
import { toText } from "hast-util-to-text";
import type { Root } from "hast";

function Header({ hast }: { hast: Root | undefined }) {
  if (!hast) {
    return null;
  }

  const logo = select("img", hast);
  const links = selectAll("a", hast);

  return (
    <header class="flex items-center justify-center gap-4 py-2 flex-wrap">
      {logo?.properties && (
        <img
          class="md:ml-[-115px]"
          src={String(logo.properties.src || "")}
          height={115}
          width={115}
          loading="eager"
          alt={String(logo.properties.alt || "")}
        />
      )}
      <nav className="flex items-center">
        {links.map((link, index) => {
          const href = String(link?.properties?.href || "");

          return (
            <a
              rel="prefetch"
              className="text-xl font-bold text-red-700 px-8"
              key={index}
              href={href}
            >
              {toText(link)}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
