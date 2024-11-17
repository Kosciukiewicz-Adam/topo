import React from "react";
import "../styles/ErrorPage.scss";
import { errorPageBg, clouds } from "../assets";
import Menu from "./Menu";
import { useScrollTop } from "../utils";

const ErrorPage: React.FC = (): JSX.Element => {
    const scrollTop = useScrollTop();

    return (
        <div className="ErrorPage" style={{ backgroundImage: `url(${errorPageBg})` }}>
            <Menu scrollTop={scrollTop} />
            <div>
                <h1 className="title">404</h1>
                <h2 className="subtitle">Page not found</h2>
            </div>

            <div className='clouds' style={{ backgroundImage: `url(${clouds})` }}>
            </div>
        </div>
    );
};

export default ErrorPage;