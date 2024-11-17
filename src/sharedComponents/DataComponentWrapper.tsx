import React from "react";
import { QueryStatus } from "../consts";
import "../styles/DataComponentWrapper.scss";
import { loader } from "../assets";

interface Props {
    customLoaderWrapper?: (children: JSX.Element) => JSX.Element;
    queryStatus: QueryStatus;
    children: JSX.Element;
}

const DataComponentWrapper: React.FC<Props> = ({ queryStatus, children, customLoaderWrapper }): JSX.Element => {
    const getLoader = (): JSX.Element => (
        <div className="DataComponentWrapper loader">
            <img className="spinner" src={loader} alt="loader" />
        </div>
    )

    switch (queryStatus) {
        case QueryStatus.LOADING:
            if (customLoaderWrapper) {
                return customLoaderWrapper(getLoader())
            }

            return getLoader();
        case QueryStatus.SUCCESS:
            return children;
        case QueryStatus.ERROR:
        default:
            return <div>Error</div>
    }
}

export default DataComponentWrapper;