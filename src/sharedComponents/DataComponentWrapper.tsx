import React from "react";
import { QueryStatus } from "../consts";

interface Props {
    queryStatus: QueryStatus;
    children: JSX.Element;
    customLoader?: JSX.Element;
}

const DataComponentWrapper: React.FC<Props> = ({ queryStatus, children, customLoader }): JSX.Element => {
    switch (queryStatus) {
        case QueryStatus.LOADING:
            return customLoader || <div>Loader</div>;
        case QueryStatus.SUCCESS:
            return children;
        case QueryStatus.ERROR:
        default:
            return <div>Error</div>
    }
}

export default DataComponentWrapper;