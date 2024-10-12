import React, { useState } from "react";
import "../styles/CragsList.scss";
import DataComponentWrapper from "../elements/DataComponentWrapper.tsx";
import { useQuery } from "react-query";
import { fetchCrags } from "../api/crag.ts";
import { QueryStatus } from "../consts";
import Map from "../elements/Map.tsx";
import { ICrag } from "../interfaces";
import bg from "../assets/bg10.webp";
import Menu from "../components/Menu.tsx";

const CragsList: React.FC = () => {
    const { data, status } = useQuery('crags', () => fetchCrags());
    const [searchQuery, setSearchQuery] = useState<string>("")

    const countriesList: string[] = [];

    data?.forEach(crag => {
        if (!countriesList.includes(crag.country)) {
            countriesList.push(crag.country);
        }
    })

    const filteredCrags = (country: string): ICrag[] => {
        return data?.filter(crag => {
            if (searchQuery) {
                return crag.country === country && crag.name.includes(searchQuery);
            }
            return crag.country === country;
        }) || [];
    }

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="CragsList">
                <Menu />
                <div className="header">
                    <h1 className="mainText">Find the crag</h1>
                    <div className="searchbar">
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} />
                        <div className="searchIcon">🔎</div>
                    </div>
                    {/* <img src={bg} alt="background" className="bgImage" /> */}
                </div>

                <div className="mapWrapper">
                    <Map
                        markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: 0, name, coordinates, _id }))}
                        handleClick={(value) => document.getElementById(value)?.scrollIntoView()}
                        scale={300}
                    />
                </div>

                {countriesList.map((country) => (
                    <div className="countryTab" key={country}>
                        <h2>{country}</h2>
                        <div className="cragsWrapper">
                            {filteredCrags(country).map(crag => (
                                <div className="cragLabel">
                                    <div className="name">{crag.name}</div>
                                    <img src={crag.images[0]} alt='crag' className="cragImage" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </DataComponentWrapper>
    )
}

export default CragsList;