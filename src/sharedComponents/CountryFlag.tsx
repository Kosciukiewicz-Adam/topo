import React from "react"
import { countryCodes } from "../consts";

interface Props {
    countryName: string
}

const CountryFlag: React.FC<Props> = ({ countryName }): JSX.Element => {
    const countryCode = countryCodes[countryName.trim().toLocaleLowerCase()];

    return (
        <img
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            className="flag"
            alt="flag"
        />
    );
};

export default CountryFlag;