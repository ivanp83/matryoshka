import { FC } from "react";
import { NavLink } from "react-router-dom";

interface NavProps {
  id: number;
}

const Nav: FC<NavProps> = ({ id }) => {
  const setActive = ({ isActive }: any) => (isActive ? "active-link" : "");
  return (
    <nav className={"nav-menu"}>
      <ul>
        <li>
          <NavLink className={setActive} to={`/`}>
            Магазин
          </NavLink>
        </li>
        <li>
          <NavLink className={setActive} to={`about`}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink className={setActive} to={`cart`}>
            Корзина
          </NavLink>
        </li>
        {id == 526244481 && (
          <li>
            <NavLink className={setActive} to={`admin`}>
              Admin
            </NavLink>
          </li>
        )}
        {id == 1294200727 && (
          <li>
            <NavLink className={setActive} to={`admin`}>
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
