import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useQuery } from "react-query";
import { QueryStatus } from "../../../consts";
import { useBrakepoints } from "../../../utils"
import { ICrag } from "../../../interfaces";
import { fetchCrags } from "../../../api";
import { Map, DataComponentWrapper } from "../../../sharedComponents";
import "../../../styles/CragPreview.scss";
import { mouse, drag } from "../../../assets";

interface Props {
    scrollTop: number;
}

const CragPreview: React.FC<Props> = ({ scrollTop }): JSX.Element => {
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [selectedCrag, setSelectedCrag] = useState<ICrag>();
    const { status, data } = useQuery('crags', fetchCrags);
    const maxMobileDescriptionLength = 70;
    const { isMobile } = useBrakepoints();

    useEffect(() => {
        if (scrollTop > 350 && !showAnimation) {
            setShowAnimation(true);
        }
    }, [scrollTop, showAnimation])

    if (!selectedCrag && data) {
        setSelectedCrag(data[0])
    }

    const selectedCragById = (cragId: string) => {
        const cragToSelect = data?.find(crag => crag._id === cragId);

        if (cragToSelect) {
            setShowAnimation(false);
            setSelectedCrag(cragToSelect);
        }
    }

    const getDescription = (description: string): string => {
        const splitedDescription = description.split(" ");

        if (!isMobile || splitedDescription.length < maxMobileDescriptionLength) {
            return description;
        }

        const trimmedDescription = splitedDescription.slice(0, maxMobileDescriptionLength);
        trimmedDescription.push(" (...)");
        return trimmedDescription.join(" ");

    }

    return (
        <DataComponentWrapper
            queryStatus={status as QueryStatus}
            customLoaderWrapper={(children) =>
                <div className="CragPreview">{children}</div>
            }
        >
            <div className="CragPreview">
                <h2 className="sectionHeader">Discover climbing everywhere around the world</h2>
                <div className="sectionContent">
                    <div
                        style={showAnimation ? { animation: "slideUp forwards 0.7s" } : {}}
                        onClick={() => setShowAnimation(prev => (!prev))}
                        className="cragDetails"
                    >
                        <h2 className="cragHeader">
                            {`${selectedCrag?.name} | ${selectedCrag?.country}`}
                        </h2>

                        <div className="desctiption">
                            {selectedCrag?.description && getDescription(selectedCrag.description)}
                        </div>

                        <div className="imagesWrapper">
                            {selectedCrag?.images.slice(0, 3).map(imgSrc =>
                                <div className="cragImage" key={imgSrc}>
                                    <img src={imgSrc} alt="alt" />
                                </div>
                            )}
                        </div>


                        <Link className="button" to={`/crag/${selectedCrag?._id}`}>
                            see the region
                        </Link>
                    </div>
                    <div className="cragMapWrapper">
                        <Map
                            markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: -20, name, coordinates, _id })) || []}
                            handleClick={(value) => selectedCragById(value)}
                            forcedCenter={[10, 40]}
                            scale={800}
                        />

                        <div className="controllsInfo">
                            <div className="controll">
                                <img src={mouse} alt="scroll" className="icon" />
                                <div className="description">use scroll to zoom in and out on map</div>
                            </div>
                            <div className="controll">
                                <img src={drag} alt="scroll" className="icon" />
                                <div className="description">hold and move mouse to move the map</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </DataComponentWrapper>
    )
}

export default CragPreview;