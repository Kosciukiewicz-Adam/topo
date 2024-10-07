import React from "react";
import { QueryStatus } from "../consts/QueryStatus.ts";

interface Props {
    queryStatus: QueryStatus;
    children: JSX.Element;
}

const DataComponentWrapper: React.FC<Props> = ({ queryStatus, children }): JSX.Element => {
    switch (queryStatus) {
        case QueryStatus.LOADING:
            return <div>Loader</div>
        case QueryStatus.SUCCESS:
            return children;
        case QueryStatus.ERROR:
        default:
            return <div>Error</div>
    }
}

export default DataComponentWrapper;