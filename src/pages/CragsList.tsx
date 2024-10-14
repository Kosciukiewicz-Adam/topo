import React, { useState } from "react";
import "../styles/CragsList.scss";
import DataComponentWrapper from "../elements/DataComponentWrapper.tsx";
import { useQuery } from "react-query";
import { fetchCrags } from "../api/crag.ts";
import { QueryStatus } from "../consts";
import Map from "../elements/Map.tsx";
import { ICrag } from "../interfaces";
import Menu from "../components/Menu.tsx";
import { useNavigate } from "react-router";

const CragsList: React.FC = () => {
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
                console.log(crag.name.toLocaleLowerCase().includes(searchQuery), crag.name, searchQuery.toLocaleLowerCase());
                return crag.country === country && crag.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
            }
            return crag.country === country;
        }) || [];
    }

    const getCountryLabel = (country: string): string => {
        return `${country} | ${filteredCrags(country).length} ${filteredCrags(country).length > 1 ? 'crags' : 'crag'}`
    }

    const showHints = !!searchHints?.length && !!searchQuery.length;

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="CragsList">
                <Menu />
                <div className="landingPage">
                    <h1 className="header">Find the crag</h1>
                    <div className={`searchbar${showHints ? " hintsActive" : ""}`}>
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} />
                        <div className="searchIcon">🔎</div>
                        {showHints && (
                            <div className="hintsList">
                                {searchHints?.map(hint => (
                                    <div className="hint" onClick={() => document.getElementById(hint)?.scrollIntoView()}>{hint}</div>
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
            </div>
        </DataComponentWrapper >
    )
}

export default CragsList;