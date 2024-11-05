import React, { useState, useEffect } from "react";
import "../../styles/CragPage.scss";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCrag, fetchCragRoutes, fetchCragSectors } from "../../api/crag.ts";
import { ISector, IRoute } from "../../interfaces";
import { GradeScale } from "../../consts/index.ts";
import SectorsGallery from "./components/SectorsGallery.tsx";
import Footer from "../../sharedComponents/Footer.tsx";
import Chart from "../../sharedComponents/Chart.tsx";
import Menu from "../../sharedComponents/Menu.tsx";
import Map from "../../sharedComponents/Map.tsx";
import Sector from "./components/Sector.tsx";

import backgroundSrc from "../../assets/background.svg";
import wave from "../../assets/wave.svg";
import test from "../../assets/test2.jpg";

const CragPage: React.FC = (): JSX.Element => {
    const { cragId } = useParams();
    const sectorsData = useQuery('cragSectors', () => fetchCragSectors(cragId || ""));
    const routesData = useQuery('cragRoutes', () => fetchCragRoutes(cragId || ""));
    const cragData = useQuery('crag', () => fetchCrag(cragId || ""));
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [selectedSector, setSelectedSector] = useState<ISector>();

    const mapBackground = "#F7770F";
    const mapBorders = "#263238";

    const getSectorRoutes = (sectorId: string): IRoute[] => {
        return routesData?.data?.filter(route => route.sectorId === sectorId) || [];
    }

    const handleScroll = () => {
        const newScrollYPosition = window.scrollY;
        setScrollTop(newScrollYPosition);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    if (!routesData.data || !cragData.data || !sectorsData.data) {
        return <></>;
    }

    if (!selectedSector && sectorsData.data.length) {
        setSelectedSector(sectorsData.data[0])
    }

    const { name, coordinates, _id, description, country } = cragData.data;

    return (
        <div className="CragPage">
            <Menu scrollTop={scrollTop} />
            <div className="landingPage">
                <img src={test} className="wave" />

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
                    scale={1200}
                />
            </div>

            <div className="cragGrades">
                <div className="sectionHeading">Distribution of grades in crag</div>
                <Chart
                    startAnimation={scrollTop > 600}
                    gradeScale={GradeScale.FRENCH}
                    allRoutes={routesData.data}
                />
            </div>

            <img src={backgroundSrc} alt="background" className="waveImage" />

            <SectorsGallery
                setSelectedSector={setSelectedSector}
                getSectorRoutes={getSectorRoutes}
                sectors={sectorsData.data}
            />

            <img src={backgroundSrc} alt="background" className="waveImage" />

            {selectedSector &&
                <Sector
                    getSectorRoutes={getSectorRoutes}
                    scrollTop={scrollTop}
                    {...selectedSector}
                />
            }
            <Footer />
        </div>
    )
}

export default CragPage;