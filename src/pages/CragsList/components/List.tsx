import React, { useState } from "react";
import { ICrag } from "../../../interfaces";
import { useNavigate } from "react-router";
import { getCountryFlag } from "../../../utils/countryFlag.tsx";
import "../../../styles/List.scss";

import detailedList from "../../../assets/icons/detailed_list.svg";
import simpleList from "../../../assets/icons/simple_list.svg";
import checkboxYes from "../../../assets/icons/checkbox_yes.svg";
import checkboxNo from "../../../assets/icons/checkbox_no.svg";

interface Props {
    countriesList: string[];
    filteredCrags: (countryName?: string) => ICrag[];
    getCountryLabel: (countryName: string) => string;
}

enum ListView {
    SIMPLE = "simple",
    DETAILED = "detailed",
}

const List: React.FC<Props> = ({ countriesList, getCountryLabel, filteredCrags }): JSX.Element => {
    const [listView, setListView] = useState<ListView>(ListView.DETAILED);
    const [sortByCountry, setSortByCountry] = useState<boolean>(true);
    const navigate = useNavigate();

    const getListElement = (crag: ICrag) => {
        if (listView === ListView.SIMPLE) {
            return (
                <div className="cragLabel" id={crag.name}>
                    <div className="navButton" onClick={() => navigate(`/crag/${crag._id}`)}>
                        see crag
                    </div>
                    <div className="name">{crag.name}</div>
                </div>
            )
        }

        let shortDescription = crag.description.split("").slice(0, 200).join("");
        shortDescription += "[...]";

        return (
            <div className="cragLabel" id={crag.name}>
                <img src={crag.images[0]} alt="crag" className="image" />
                <div className="wrapper">
                    <div className="name">{crag.name}</div>
                    <div className="routesAmount">{`${crag?.routesAmount} routes`}</div>
                </div>
                <div className="shortDescription">{shortDescription}</div>
                <div className="navButton" onClick={() => navigate(`/crag/${crag._id}`)}>
                    see crag
                </div>
            </div>
        )
    }

    const getList = (): JSX.Element => {
        if (!sortByCountry) {
            return (
                <div className="cragsWrapper">
                    {filteredCrags().map(crag =>
                        getListElement(crag)
                    )}
                </div>
            )
        }

        return (
            <>
                {
                    countriesList.map((country) => (filteredCrags(country).length ?
                        (<div className="countryTab" key={country}>
                            <h2 className="countryName">
                                {listView === ListView.DETAILED &&
                                    getCountryFlag(country)
                                }
                                {getCountryLabel(country)}
                            </h2>
                            <div className="cragsWrapper">
                                {filteredCrags(country).map(crag =>
                                    getListElement(crag)
                                )}
                            </div>
                        </div>)
                        : <></>))
                }
            </>
        )
    }

    return (
        <div className={`List ${listView}`}>
            <div className="listViewControll">
                List view:
                <div className={`button${listView === ListView.SIMPLE ? " active" : ""}`} onClick={() => setListView(ListView.SIMPLE)}>
                    <img src={simpleList} alt="icon" />
                    <div className="label">Simple</div>
                </div>
                <div className={`button${listView === ListView.DETAILED ? " active" : ""}`} onClick={() => setListView(ListView.DETAILED)}>
                    <img src={detailedList} alt="icon" />
                    <div className="label">Detailed</div>
                </div>
                <div className={`button${sortByCountry ? " active" : ""} sortByCountry`} onClick={() => setSortByCountry(prev => !prev)}>
                    {sortByCountry ? <img src={checkboxYes} alt="icon" /> : <img src={checkboxNo} alt="icon" />}
                    <div className="label">Sort by country</div>
                </div>
            </div>
            {getList()}
        </div >
    )
}

export default List;