import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCrag, fetchCragRoutes, fetchCragSectors } from "../../api";
import { ISector } from "../../interfaces";
import { GradeScale, QueryStatus } from "../../consts";
import { useBrakepoints } from "../../utils";
import { Footer, Chart, Menu, Map, DataComponentWrapper } from "../../sharedComponents"
import SectorsSelector from "./components/SectorsSelector";
import SectorsGallery from "./components/SectorsGallery";
import Sector from "./components/Sector";
import "../../styles/CragPage.scss";
import { subPageBg, wave } from "../../assets";

const CragPage: React.FC = (): JSX.Element => {
    const { cragId } = useParams();
    const sectorsData = useQuery('cragSectors', () => fetchCragSectors(cragId || ""));
    const routesData = useQuery('cragRoutes', () => fetchCragRoutes(cragId || ""));
    const cragData = useQuery('crag', () => fetchCrag(cragId || ""));
    const [selectedSector, setSelectedSector] = useState<ISector>();
    const [scrollTop, setScrollTop] = useState<number>(0);
    const { isMobile } = useBrakepoints();
    const imagesAmount = isMobile ? 2 : 4;

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
        <DataComponentWrapper queryStatus={cragData.status as QueryStatus}>
            <div className="CragPage">
                <Menu scrollTop={scrollTop} />
                <div className="landingPage">
                    <img src={subPageBg} className="wave" alt="mainBackground" />

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
                        <div className="description">
                            {cragData.data.description}
                        </div>
                        <Map
                            markers={[{
                                coordinates: cragData.data.coordinates,
                                name: cragData.data.name,
                                _id: cragData.data._id
                            }]}
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

                <img src={wave} alt="wave" className="waveImage" />

                <SectorsGallery
                    setSelectedSector={setSelectedSector}
                    sectors={sectorsData?.data || []}
                />

                <img src={wave} alt="wave" className="waveImage" />

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
        </DataComponentWrapper>
    )
}

export default CragPage;