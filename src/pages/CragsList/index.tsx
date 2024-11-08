import React, { useState, useEffect } from "react";
import "../../styles/CragsList.scss";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { fetchCrags } from "../../api/crag.ts";
import { QueryStatus } from "../../consts/index.ts";
import DataComponentWrapper from "../../sharedComponents/DataComponentWrapper.tsx";
import Footer from "../../sharedComponents/Footer.tsx";
import Menu from "../../sharedComponents/Menu.tsx";
import Map from "../../sharedComponents/Map.tsx";
import List from "./components/List.tsx";

import search from "../../assets/icons/search.svg";
import mouse from "../../assets/icons/mouse.svg";
import drag from "../../assets/icons/drag.svg";
import background from "../../assets/test2.jpg";

const CragsList: React.FC = (): JSX.Element => {
    const { data, status } = useQuery('crags', () => fetchCrags());
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [scrollTop, setScrollTop] = useState<number>(0);
    const navigate = useNavigate();

    const formatedSearchQuery = searchQuery.trim().toLocaleLowerCase()

    const searchHints = data?.filter(crag =>
        crag.name.trim().toLocaleLowerCase().includes(formatedSearchQuery)).map(({ _id, name }) =>
            ({ name, _id }));

    const handleScroll = () => {
        const newScrollYPosition = window.scrollY;
        setScrollTop(newScrollYPosition);
    };

    const scrollToList = () => {
        window.scrollTo({ top: 1000 })
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            scrollToList()
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    const showHints = !!searchHints?.length && !!searchQuery.length;

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="CragsList">
                <Menu scrollTop={scrollTop} />
                <div className="landingPage" style={{ backgroundImage: `url(${background})` }}>
                    <h1 className="header">Find the crag</h1>
                    <div className={`searchbar${showHints ? " hintsActive" : ""}`}>
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
                        <img src={search} className="searchIcon" alt="search" onClick={scrollToList} />
                        {showHints && (
                            <div className="hintsList">
                                {searchHints?.map(hint => (
                                    <div className="hint" onClick={() => navigate(`/crag/${hint._id}`)}>{hint.name}</div>
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

                <List
                    searchQuery={formatedSearchQuery}
                    crags={data || []}
                />
                <Footer />
            </div>
        </DataComponentWrapper >
    )
}

export default CragsList;