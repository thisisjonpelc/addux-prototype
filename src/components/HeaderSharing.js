import React from "react";

const HeaderSharing = (props) => {
    return (
        <div>
            <header className="header">
                <img src="/img/addux-logo.png" className="logo" />
                        
                        <div  className="info-box">
                            <h1 className="info-box__title">{props.activeAddux.name}</h1>
                        </div>
                        
                </header>
        </div>
    );
}

export default HeaderSharing;