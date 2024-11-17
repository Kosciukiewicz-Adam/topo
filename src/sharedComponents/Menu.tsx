import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import "../styles/Menu.scss";

interface Props {
    scrollTop: number;
    homepage?: boolean;
}

const Menu: React.FC<Props> = ({ scrollTop, homepage }): JSX.Element => {
    const navigate = useNavigate();
    const menuOptions: { name: string, link: string }[] = [
        { name: "Home", link: "/" },
        { name: "Crags", link: "/crags" },
    ];

    const className = `Menu ${scrollTop < 100 ? "transparent" : ""} ${homepage ? "homepage" : ""}`

    return (
        <div className={className}>
            <img src={logo} alt="menu logo" className="menuLogo" onClick={() => navigate("/")} />
            <div className="linksWrapper">
                {menuOptions.map(option => (
                    <NavLink
                        className={({ isActive }) => isActive ? "link active" : "link"}
                        key={option.name}
                        to={option.link}
                    >
                        {option.name}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Menu;