import React, { useState } from "react";
import { Link } from "react-router-dom"
import "../styles/CragPreview.scss";
import { useQuery } from "react-query";
import Map from "../elements/Map.tsx";
import { ICrag, IRoute } from "../interfaces/index.ts";
import { fetchCragRoutes, fetchCrags } from "../api/crag.ts";
import { QueryStatus } from "../consts/QueryStatus.ts";
import Error from "../elements/Error.tsx";
import Loader from "../elements/Loader.tsx";
import { RouteType } from "../consts/RouteType.ts";
import { GradeScale } from "../consts/GradeScale.ts";
import Chart from "../elements/Chart.tsx";

const CragPreview: React.FC = () => {
    const [selectedCrag, setSelectedCrag] = useState<ICrag>();
    const { status, data } = useQuery('crags', fetchCrags);
    const fetchedRoutes = useQuery('cragRoutes', () => fetchCragRoutes(selectedCrag?._id || ""));
    const maxRoutesPerChartCategory = 6;

    if (status === QueryStatus.LOADING) {
        return <Loader />
    } else if (status === QueryStatus.ERROR) {
        return <Error />
    } else if (status === QueryStatus.SUCCESS && !selectedCrag) {
        setSelectedCrag(data[0] as ICrag)
    }

    if (!data) {
        return null;
    }

    const selectedCragById = (cragId) => {
        const cragToSelect = data?.find(crag => crag._id === cragId);

        if (cragToSelect) {
            setSelectedCrag(cragToSelect);
        }
    }

    const getRoutesOfType = (routeType: RouteType) => {
        return fetchedRoutes.data?.filter((route: IRoute) => route.type === routeType) || [];
    }

    return (
        <div className="CragPreview">
            <h2 className="sectionTitle">Discover climbing in every region of any country</h2>
            <div className="sectionContent">
                <div className="cragDetails">
                    <div className="wrapper">
                        {<h2 className="header">{selectedCrag?.name}</h2>}
                        <div className="desctiption">
                            {selectedCrag?.description}
                        </div>
                        <div className="CragRoutesChart">
                            <div className="category">
                                <div className="title">Sport climbing</div>
                                <div className="stats">{`Total routes amount: ${getRoutesOfType(RouteType.SPORT_CLIMBING)?.length}`}</div>
                                <Chart
                                    allRoutes={getRoutesOfType(RouteType.SPORT_CLIMBING)}
                                    routesAmountToShow={maxRoutesPerChartCategory}
                                    gradeScale={GradeScale.FRENCH}
                                />
                            </div>
                            <div className="category">
                                <div className="title">Bouldering</div>
                                <div className="stats">
                                    {`Total boulders amount: ${getRoutesOfType(RouteType.BOULDERING)?.length}`}
                                </div>
                                <Chart
                                    allRoutes={getRoutesOfType(RouteType.BOULDERING)}
                                    routesAmountToShow={maxRoutesPerChartCategory}
                                    gradeScale={GradeScale.V}
                                />
                            </div>
                        </div>
                        <div className="images">
                            {selectedCrag?.images.map(imgSrc =>
                                <div className="cragImage">
                                    <img src={imgSrc} alt="alt" />
                                </div>
                            )}
                        </div>
                    </div>
                    <Link className="button" to={`/crag/${selectedCrag?._id}`}>
                        learn more details anout region
                    </Link>
                </div>
                <div className="regionMapWrapper">
                    <Map
                        markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: 0, name, coordinates, _id }))}
                        handleClick={(value) => selectedCragById(value)}
                    />
                </div>
            </div>
        </div >
    )
}

export default CragPreview;