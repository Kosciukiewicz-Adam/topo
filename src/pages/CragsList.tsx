import React, { useState } from "react";
import "../styles/CragsList.scss";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { fetchCrags } from "../api/crag.ts";
import { QueryStatus } from "../consts";
import { ICrag } from "../interfaces";
import DataComponentWrapper from "../sharedComponents/DataComponentWrapper.tsx";
import Footer from "../sharedComponents/Footer.tsx";
import Menu from "../sharedComponents/Menu.tsx";
import Map from "../sharedComponents/Map.tsx";

import search from "../assets/icons/search.svg";
import mouse from "../assets/icons/mouse.svg";
import drag from "../assets/icons/drag.svg";

const CragsList: React.FC = (): JSX.Element => {
    const { data, status } = useQuery('crags', () => fetchCrags());
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    const countriesList: string[] = [];
    const searchHints = data?.filter(crag => crag.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())).map(crag => crag.name);

    data?.forEach(crag => {
        if (!countriesList.includes(crag.country)) {
            countriesList.push(crag.country);
        }
    })

    const filteredCrags = (country: string): ICrag[] => {
        return data?.filter(crag => {
            if (searchQuery) {
                return crag.country === country && crag.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
            }
            return crag.country === country;
        }) || [];
    }

    const getCountryLabel = (country: string): string => {
        return `${country} | ${filteredCrags(country).length} ${filteredCrags(country).length > 1 ? 'crags' : 'crag'}`
    }

    const handleHintClick = (hint: string) => {
        document.getElementById(hint)?.scrollIntoView();
        setSearchQuery("");
    }

    const showHints = !!searchHints?.length && !!searchQuery.length;

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="CragsList">
                <Menu />
                <div className="landingPage">
                    <h1 className="header">Find the crag</h1>
                    <div className={`searchbar${showHints ? " hintsActive" : ""}`}>
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
                        <img src={search} className="searchIcon" alt="search" />
                        {showHints && (
                            <div className="hintsList">
                                {searchHints?.map(hint => (
                                    <div className="hint" onClick={() => handleHintClick(hint)}>{hint}</div>
                                ))}</div>
                        )}
                    </div>

                    <div className="mapWrapper">
                        <Map
                            markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: -10, name, coordinates, _id }))}
                            handleClick={(cragId) => navigate(`/crag/${cragId}`)}
                            background="#F7770F"
                            toutchable={true}
                            scale={200}
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

                <div className="countriesList">
                    {countriesList.map((country) => (
                        <div className="countryTab" key={country}>
                            <h2 className="countryName">{getCountryLabel(country)}</h2>
                            <div className="cragsWrapper">
                                {filteredCrags(country).map(crag => (
                                    <div className="cragLabel" id={crag.name}>
                                        <div className="navButton" onClick={() => navigate(`/crag/${crag._id}`)}>
                                            see crag
                                        </div>
                                        <div className="name">{crag.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </DataComponentWrapper >
    )
}

export default CragsList;