import React, { useState, useEffect } from "react";
import "../../styles/CragPage.scss";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCrag, fetchCragRoutes, fetchCragSectors } from "../../api/crag.ts";
import { ISector } from "../../interfaces";
import { isMobile } from "../../utils/brakePoints.ts";
import { GradeScale } from "../../consts/index.ts";
import SectorsSelector from "./components/SectorsSelector.tsx";
import SectorsGallery from "./components/SectorsGallery.tsx";
import Footer from "../../sharedComponents/Footer.tsx";
import Chart from "../../sharedComponents/Chart.tsx";
import Menu from "../../sharedComponents/Menu.tsx";
import Map from "../../sharedComponents/Map.tsx";
import Sector from "./components/Sector.tsx";

import backgroundSrc from "../../assets/background.svg";
import test from "../../assets/test2.jpg";

const CragPage: React.FC = (): JSX.Element => {
    const { cragId } = useParams();
    const sectorsData = useQuery('cragSectors', () => fetchCragSectors(cragId || ""));
    const routesData = useQuery('cragRoutes', () => fetchCragRoutes(cragId || ""));
    const cragData = useQuery('crag', () => fetchCrag(cragId || ""));
    const [selectedSector, setSelectedSector] = useState<ISector>();
    const [scrollTop, setScrollTop] = useState<number>(0);
    const imagesAmount = isMobile() ? 2 : 4;

    const mapBackground = "#F7770F";
    const mapBorders = "#263238";

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

    if (!selectedSector && sectorsData?.data?.length) {
        setSelectedSector(sectorsData.data[0])
    }

    return (
        <div className="CragPage">
            <Menu scrollTop={scrollTop} />
            <div className="landingPage">
                <img src={test} className="wave" />

                <div className="header">
                    <h1 className="cargName">{cragData?.data?.name.toUpperCase()}</h1>
                    <div className="stats">{`${cragData?.data?.country} | ${cragData.data?.routesAmount} routes`}</div>
                </div>


                <div className="gallery">
                    {cragData?.data?.images.slice(0, imagesAmount).map(imageSrc => (
                        <img className="cragImage" src={imageSrc} alt="crag" key={imageSrc} />
                    ))}
                </div>
            </div>

            {cragData?.data && (
                <div className="mapAndDescription">
                    <div className="description">{cragData.data.description}</div>
                    <Map
                        markers={[{ name: selectedSector?.name || "", coordinates: cragData.data.coordinates, _id: cragData.data._id }]}
                        background={mapBackground}
                        borders={mapBorders}
                        scale={1200}
                    />
                </div>
            )}

            <div className="cragGrades">
                <div className="sectionHeader">Distribution of grades in crag</div>
                <Chart
                    startAnimation={scrollTop > 600}
                    gradeScale={GradeScale.FRENCH}
                    allRoutes={routesData?.data || []}
                />
            </div>

            <img src={backgroundSrc} alt="background" className="waveImage" />

            <SectorsGallery
                setSelectedSector={setSelectedSector}
                sectors={sectorsData?.data || []}
            />

            <img src={backgroundSrc} alt="background" className="waveImage" />

            {selectedSector &&
                <Sector
                    sectorsSelector={
                        <SectorsSelector
                            selectedSectorId={selectedSector._id}
                            setSelectedSector={setSelectedSector}
                            sectors={sectorsData?.data || []}
                        />
                    }
                    scrollTop={scrollTop}
                    {...selectedSector}
                />
            }
            <Footer />
        </div>
    )
}

export default CragPage;