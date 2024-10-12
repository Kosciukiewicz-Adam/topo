import React from "react";
import "../styles/Menu.scss";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
    const menuOptions: { name: string, link: string }[] = [
        { name: "Home", link: "/" },
        { name: "Crags", link: "/crags" },
        { name: "About", link: "/about" }
    ]

    return (
        <div className="Menu">
            {menuOptions.map(option => (
                <Link className="button" to={option.link} key={option.name}>
                    {option.name}
                </Link>
            ))}
        </div>
    )
}

export default Menu;