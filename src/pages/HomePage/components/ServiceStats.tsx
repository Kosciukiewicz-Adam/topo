import React, { useEffect, useState } from "react";
import { useBrakepoints } from "../../../utils"
import "../../../styles/ServiceStats.scss";
import { serviceStatsBg, route, years, users, crag, sector } from "../../../assets";

interface Props {
    scrollTop: number;
}

interface Stat {
    number: number;
    label: string;
    icon: string;
}

const getStat: React.FC<Stat> = ({ icon, number, label }): JSX.Element => (
    <div className="stat" key={label}>
        <img src={icon} alt="" className="icon" />
        <div className="textWrapper">
            <div className="number">{number}</div>
            <div className="label">{label}</div>
        </div>
    </div>
)

const ServiceStats: React.FC<Props> = ({ scrollTop }): JSX.Element => {
    const [counter, setCounter] = useState<number>(0);
    const { isMobile } = useBrakepoints();
    const startScrollHeight = isMobile ? 100 : 1200
    const sectorsAmount = 102;
    const routesAmount = 851;
    const usersAmount = 5000;
    const cragsAmount = 46;
    const yearsAmount = 5;

    const getBgImageScale = (): number => {
        return scrollTop / 1000;
    }

    useEffect(() => {
        let interval: number = 0;

        if (scrollTop > startScrollHeight) {
            interval = window.setInterval(() => setCounter(prev => (prev + 1)), 30);
        }

        if (counter >= users) {
            window.clearInterval(interval)
        }

        return () => {
            window.clearInterval(interval)
        };
    }, [scrollTop, counter, startScrollHeight]);

    const getIncrementedNumber = (number: number, speedMultiply?: number) => {
        if (speedMultiply) {
            return counter * speedMultiply <= number ? counter * speedMultiply : number;
        }

        return counter <= number ? counter : number;
    }


    const stats: Stat[] = [
        { icon: crag, number: getIncrementedNumber(cragsAmount), label: "crags around the world" },
        { icon: sector, number: getIncrementedNumber(sectorsAmount), label: "sectors in every country" },
        { icon: route, number: getIncrementedNumber(routesAmount, 10), label: "routes in range of grades" },
        { icon: users, number: getIncrementedNumber(usersAmount, 50), label: "happy users" },
        { icon: years, number: getIncrementedNumber(yearsAmount), label: "years of operation" }
    ]

    return (
        <div className="ServiceStats">
            <h2 className="sectionHeader">Look at our stats</h2>
            <div className="contentwrapper">

                {isMobile ? (
                    <div className="mobileWrapper">
                        {stats.map(stat => getStat(stat))}
                    </div>
                ) : (
                    <>
                        <div className="statsWrapper">
                            {stats.slice(0, 3).map(stat => getStat(stat))}
                        </div>
                        <div className="bgImageWrapper">
                            <img src={serviceStatsBg} alt='' className="bgImage" style={{ transform: `scale(${getBgImageScale()})` }} />
                        </div>
                        <div className="statsWrapper">
                            {stats.slice(3, 5).map(stat => getStat(stat))}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default ServiceStats;