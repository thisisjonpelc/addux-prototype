import React from "react";

import {labels} from "../constants/constants";

const ColumnHeader = ({category}) => (
    <div className="column-header">
        <span className="column-header__text">{labels[category]}</span>
        <svg className="column-header__icon">
            <use href="img/sprite.svg#icon-video-solid"></use>
        </svg>
    </div>
)

export default ColumnHeader;