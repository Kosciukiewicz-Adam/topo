import React from "react";
import "../styles/CragPage.scss";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCrag, fetchCragRoutes, fetchCragSectors } from "../api/crag.ts";
import Map from "../elements/Map.tsx";
import Chart from "../elements/Chart.tsx";
import { GradeScale } from "../consts/index.ts";

const CragPage: React.FC = () => {
    const { cragId } = useParams();
    const cragData = useQuery('crag', () => fetchCrag(cragId || ""));
    const routesData = useQuery('cragRoutes', () => fetchCragRoutes(cragId || ""));
    const sectorsData = useQuery('cragSectors', () => fetchCragSectors(cragId || ""));

    if (!routesData.data || !cragData.data || !sectorsData.data) {
        return null;
    }

    const { name, coordinates, _id, description, country } = cragData.data;

    return (
        <div className="CragPage">
            <div className="header">
                <div className="text">
                    <h1 className="name">{name}</h1>
                    <div className="stats">{`${country} | ${routesData.data.length} routes`}</div>
                    <div className="description">{description}</div>
                </div>
                <Map markers={[{ markerOffset: 0, name, coordinates, _id }]} />
            </div>

            <div className="statsAndLocation">
                <Chart allRoutes={routesData.data} gradeScale={GradeScale.FRENCH} />
            </div>

            <div className="sectorsWrapper">

            </div>
        </div>
    )
}

export default CragPage;