import React, { useEffect, useState } from "react";
import "../../../styles/List.scss";
import { ICrag } from "../../../interfaces";
import { useNavigate } from "react-router";
import { getCountryFlag } from "./CountryFlag.tsx";
import { ListView } from "../../../consts/index.ts";
import FilterButton from "../../../sharedComponents/FilterButton.tsx";
import ListItem from "./ListItem.tsx";

import detailedList from "../../../assets/icons/detailed_list.svg";
import simpleList from "../../../assets/icons/simple_list.svg";
import checkboxYes from "../../../assets/icons/checkbox_yes.svg";
import checkboxNo from "../../../assets/icons/checkbox_no.svg";
import number from "../../../assets/icons/number.svg";
import abc from "../../../assets/icons/abc.svg";

interface Props {
    crags: ICrag[];
    searchQuery: string;
}

interface Country {
    name: string;
    routesAmount: number;
}

enum SortType {
    ALPHABETICALLY = "alphabetically",
    ROUTES_AMOUNT = "routesAmount",
}

const List: React.FC<Props> = ({ crags, searchQuery }): JSX.Element => {
    const [sortType, setSortType] = useState<SortType>(SortType.ROUTES_AMOUNT);
    const [listView, setListView] = useState<ListView>(ListView.DETAILED);
    const [filterByCountry, setFilterByCountry] = useState<boolean>(true);
    const [cragsToDisplay, setCragsToDisplay] = useState<ICrag[]>(crags);
    const [countriesList, setCountriesList] = useState<Country[]>([]);

    useEffect(() => {
        if (!crags) {
            return;
        }

        let listOfCountries: Country[] = [];
        let initialCrags = structuredClone(crags);

        for (let i = 0; i < crags.length; i++) {
            const countryInArray = listOfCountries.find(country => country.name === crags[i].country);

            if (countryInArray) {
                const indexOfCountryInArray = listOfCountries.indexOf(countryInArray);
                listOfCountries[indexOfCountryInArray].routesAmount += crags[i].routesAmount;
            } else {
                listOfCountries.push({ name: crags[i].country, routesAmount: crags[i].routesAmount })
            }
        }

        if (filterByCountry) {
            switch (sortType) {
                case SortType.ALPHABETICALLY:
                    listOfCountries.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case SortType.ROUTES_AMOUNT:
                    listOfCountries.sort((a, b) => b.routesAmount - a.routesAmount);
                    break;
            }
        }

        switch (sortType) {
            case SortType.ALPHABETICALLY:
                initialCrags.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case SortType.ROUTES_AMOUNT:
                initialCrags.sort((a, b) => b.routesAmount - a.routesAmount);
                break;
        }

        if (searchQuery) {
            initialCrags.filter(crag => crag.name.includes(searchQuery))
        }

        setCountriesList(listOfCountries);
        setCragsToDisplay(initialCrags);
    }, [crags, filterByCountry, sortType, searchQuery]);


    const changeSortType = () => {
        setSortType(sortType === SortType.ALPHABETICALLY ? SortType.ROUTES_AMOUNT : SortType.ALPHABETICALLY)
    }

    const getCountryLabel = ({ routesAmount, name }: Country): string => {
        return `${name} | ${routesAmount} routes`
    }

    return (
        <div className={`List ${listView}`}>
            <div className="listViewControll">
                <FilterButton
                    buttonLabels={["Simple list", "Detailed list"]}
                    iconsSrc={[simpleList, detailedList]}
                    width={120}
                    changeButtonState={() => {
                        setListView(prev => prev === ListView.SIMPLE ? ListView.DETAILED : ListView.SIMPLE)
                    }}
                />

                <FilterButton
                    buttonLabels={["Filtering country", "Not filtering"]}
                    iconsSrc={[checkboxYes, checkboxNo]}
                    width={180}
                    changeButtonState={() => setFilterByCountry(prev => !prev)}
                />

                <FilterButton
                    buttonLabels={["Sorting by routes amount", "Sorting alphabetically"]}
                    changeButtonState={changeSortType}
                    iconsSrc={[abc, number]}
                    width={200}
                />
            </div>
            {filterByCountry ? (
                countriesList.map((country) => (<>
                    <h2 className="countryName" key={country.name}>
                        {listView === ListView.DETAILED &&
                            getCountryFlag(country.name)
                        }
                        {getCountryLabel(country)}
                    </h2>
                    <div className="cragsWrapper">
                        {cragsToDisplay.filter(crag => crag.country === country.name).map((crag, index) =>
                            <ListItem crag={crag} index={index} listView={listView} />
                        )}
                    </div>
                </>))
            ) : (
                <div className="cragsWrapper">
                    {cragsToDisplay.map((crag, index) =>
                        <ListItem crag={crag} index={index} listView={listView} />
                    )}
                </div>
            )}
        </div >
    )
}

export default List;