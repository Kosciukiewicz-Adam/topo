import React from "react";
import Menu from "./Menu";
import { useBrakepoints, useScrollTop } from "../utils";
import "../styles/ErrorPage.scss";
import { errorPageBg, clouds } from "../assets";

const ErrorPage: React.FC = (): JSX.Element => {
    const { isMobile } = useBrakepoints();
    const scrollTop = useScrollTop();

    return (
        <div className="ErrorPage" style={{ backgroundImage: `url(${errorPageBg})` }}>
            <Menu scrollTop={scrollTop} />
            <div className="textWrapper">
                <h1 className="title">404</h1>
                <h2 className="subtitle">Page not found</h2>
            </div>
            {!isMobile && <div className='clouds' style={{ backgroundImage: `url(${clouds})` }} />}
        </div>
    );
};

export default ErrorPage;