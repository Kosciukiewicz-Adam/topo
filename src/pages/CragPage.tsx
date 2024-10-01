import React from "react";
import "../styles/CragPage.scss";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCrag, fetchCragRoutes } from "../api/crag.ts";

const CragPage: React.FC = () => {
    const { cragId } = useParams();
    const cragData = useQuery('crag', () => fetchCrag(cragId || ""));
    const routesData = useQuery('cragRoutes', () => fetchCragRoutes(cragId || ""));

    if (cragData.status === "loading" || routesData.status === "loading") {
        return <>LOADING</>
    } else if (cragData.status === "error" || routesData.status === "error") {
        return <>ERROR</>
    }

    // const { name, coordinates, _id, description } = cragData.data;

    return (
        <div className="CragPage">
            {/* <div className="header">
                <h1>{name}</h1>
                <div className="description">{description}</div>
            </div>
            <div className="statsAndLocation">
                <AnimatedChart chartData={{sportClimbing: cragData.data}} />
                <MapChart markers={[{ markerOffset: 0, name, coordinates, _id }]} />
            </div> */}
        </div>
    )
}

export default CragPage;