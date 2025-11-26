import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants/index.ts";

const Navbar = () => {
  return (
    <nav>
      {/*navigation links*/}
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">macos-portfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/*icons*/}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        {/*time*/}
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
