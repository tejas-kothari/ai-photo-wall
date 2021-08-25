import "./Header.css";
import gump_logo from "assets/gump_logo.svg";
import bell from "assets/bell.svg";
import search from "assets/search.svg";
import menu_icon from "assets/menu_icon.svg";

export default function Header() {
  return (
    <div className="Header">
      <img src={gump_logo} />
      <div className="rightHeader">
        <img src={search} />
        <img src={bell} />
        <img src={menu_icon} />
      </div>
    </div>
  );
}
