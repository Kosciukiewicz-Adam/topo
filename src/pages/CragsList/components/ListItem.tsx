import React from "react";
import { useNavigate } from "react-router";
import { ListView } from "../../../consts";
import { ICrag } from "../../../interfaces";
import { useBrakepoints } from "../../../utils";
import "../../../styles/ListItem.scss";
import { arrowRight } from "../../../assets";

interface Props {
    listView: ListView;
    index: number;
    crag: ICrag;
}

const ListItem: React.FC<Props> = ({ listView, index, crag }): JSX.Element => {
    const navigate = useNavigate();
    const { isMobile } = useBrakepoints();
    const descriptionLength = isMobile ? 250 : 200;
    let shortDescription = crag.description.split("").slice(0, descriptionLength).join("");
    shortDescription += "[...]";
    const style = {
        animationDelay: `${index * 0.15}s`
    }

    const handleLabelClick = (id: string) => {
        navigate(`/crag/${id}`);
        window.scrollTo({ top: 0 })
    }

    switch (listView) {
        case ListView.DETAILED:
            return (
                <div className="ListItem detailed" style={style} onClick={() => handleLabelClick(crag._id)}>
                    <img src={crag.images[0]} alt="crag" className="image" />
                    <div className="wrapper">
                        <div className="name">{crag.name}</div>
                        <div className="routesAmount">{`${crag?.routesAmount} routes`}</div>
                    </div>
                    <div className="shortDescription">{shortDescription}</div>
                    <img src={arrowRight} alt="arrow" className="navButton" />
                </div>
            );
        case ListView.SIMPLE:
            return (
                <div className="ListItem simple" style={style} onClick={() => handleLabelClick(crag._id)}>
                    <div className="name">{crag.name}</div>
                    <img src={arrowRight} alt="arrow" className="navButton" />
                </div>
            );
    }
}


export default ListItem;