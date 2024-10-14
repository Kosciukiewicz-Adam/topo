import React, { useState } from "react";
import "../styles/CragPage.scss";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCrag, fetchCragRoutes, fetchCragSectors } from "../api/crag.ts";
import Map from "../elements/Map.tsx";
import Chart from "../elements/Chart.tsx";
import { GradeScale } from "../consts/index.ts";
import { ISector } from "../interfaces/Sector.ts";
import Footer from "../components/Footer.tsx";
import backgroundSrc from "../assets/background.svg";
import wave from "../assets/wave.svg";
import { IRoute } from "../interfaces/Route.ts";
import Menu from "../components/Menu.tsx";

const CragPage: React.FC = () => {
    const [selectedSector, setSelectedSector] = useState<ISector>();
    const { cragId } = useParams();
    const cragData = useQuery('crag', () => fetchCrag(cragId || ""));
    const routesData = useQuery('cragRoutes', () => fetchCragRoutes(cragId || ""));
    const sectorsData = useQuery('cragSectors', () => fetchCragSectors(cragId || ""));

    if (!routesData.data || !cragData.data || !sectorsData.data) {
        return null;
    }

    if (!selectedSector && sectorsData.data.length) {
        setSelectedSector(sectorsData.data[0])
    }

    const { name, coordinates, _id, description, country } = cragData.data;

    const getSectorRoutes = (sectorId: string): IRoute[] => {
        return routesData.data.filter(route => route.sectorId === sectorId)
    }

    const mapBackground = "#F7770F"; //#F7770F
    const mapBorders = "#263238"; // #26323

    return (
        <div className="CragPage">
            <Menu />
            <div className="landingPage">
                <img src={wave} className="wave" />

                <div className="header">
                    <h1 className="cargName">{name.toUpperCase()}</h1>
                    <div className="stats">{`${country} | ${routesData.data.length} routes`}</div>
                </div>


                <div className="gallery">
                    {cragData.data.images.slice(0, 4).map(imageSrc => (
                        <img className="cragImage" src={imageSrc} alt="crag" key={imageSrc} />
                    ))}
                </div>
            </div>

            <div className="mapAndDescription">
                <div className="description">{description}</div>
                <Map
                    markers={[{ markerOffset: 0, name, coordinates, _id }]}
                    background={mapBackground}
                    borders={mapBorders}
                />
            </div>

            <div className="cragGrades">
                <div className="sectionHeading">Distribution of grades in crag</div>
                <Chart allRoutes={routesData.data} gradeScale={GradeScale.FRENCH} />
            </div>

            <img src={backgroundSrc} alt="background" className="waveImage" />

            <div className="sectorsSelection">
                <h2 className="sectionHeading">Sectors</h2>
                <div className="labelsWrapper">
                    {sectorsData.data.map((sector) => (
                        <div
                            onClick={() => setSelectedSector(sector)}
                            className="SectorLabel"
                            key={sector.name}
                        >
                            <img src={sector.image} alt={sector.name} />
                            <div className="content">
                                <div className="name">
                                    {sector.name}
                                </div>
                                <div className="info">
                                    {`${getSectorRoutes(sector._id).length} routes`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <img src={backgroundSrc} alt="background" className="waveImage" />

            {selectedSector && (
                <div className="sectorOverview">
                    <h2 className="sectionHeading">{selectedSector?.name}</h2>

                    <img className="sectorImage" src={selectedSector.imageWithRoutes} alt="sector routes" />

                    <Chart allRoutes={getSectorRoutes(selectedSector._id)} gradeScale={GradeScale.FRENCH} />

                    <div className="tableWrapper">
                        <table className="routesTable">
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Route name</th>
                                    <th>Grade</th>
                                    <th>Length</th>
                                    <th>Author</th>
                                    <th>Estabished</th>
                                </tr>
                                {getSectorRoutes(selectedSector._id).map((route, index) => (
                                    <tr key={route?.name}>
                                        <td>{index + 1}</td>
                                        <td>{route?.name}</td>
                                        <td>{route?.grade}</td>
                                        <td>{route?.lenght}</td>
                                        <td>{route?.author}</td>
                                        <td>{route?.established}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default CragPage;