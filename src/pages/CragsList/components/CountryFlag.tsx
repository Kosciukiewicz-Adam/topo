import React from "react"

const countryCodes = {
    "bosnia and herzegovina": "BA",
    "spain": "ES",
    "poland": "PL",
    "norway": "NO",
    "usa": "US"
}

export const getCountryFlag = (countryName: string): JSX.Element => {
    const countryCode = countryCodes[countryName.trim().toLocaleLowerCase()];
    return (
        <img
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            className="flag"
            alt="flag"
        />
    );
};