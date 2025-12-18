import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.tsx";
import { locations } from "#constants";
import useLocationStore from "#store/location.ts";
import clsx from "clsx";
import useWindowStore from "#store/window.ts";

type ItemType = {
  id: number;
  name: string;
  icon: string;
  kind: string;
  fileType?: "pdf" | "fig" | "url" | string;
  href?: string;
  position?: string;
};

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item: ItemType) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if ((item.fileType === "fig" || item.fileType === "url") && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (items: ItemType[]) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          item.id === activeLocation?.id ? "active" : "not-active",
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>

          <div>
            <h3>Work</h3>
            <ul>{renderList(locations.work.children ?? [])}</ul>
          </div>
        </div>

        <ul className="content">
          {activeLocation?.children?.map((item: ItemType) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
