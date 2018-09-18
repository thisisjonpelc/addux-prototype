import React from "react";

const Header = () => (
    <header className="header">
        <img src="img/addux-logo.png" className="logo" />

        <nav className="app-nav">
                <div className="app-nav__icon-box">
                    <svg className="app-nav__icon">
                        <use href="img/sprite.svg#icon-share-alt-solid"></use>
                    </svg>
                </div>
                <div className="app-nav__icon-box">
                    <svg className="app-nav__icon">
                        <use href="img/sprite.svg#icon-user-solid"></use>
                    </svg>
                </div>
                <div className="app-nav__icon-box">
                    <svg className="app-nav__icon">
                        <use href="img/sprite.svg#icon-pencil-alt-solid"></use>
                    </svg>
                </div>
                <div className="app-nav__icon-box">
                    <svg className="app-nav__icon">
                        <use href="img/sprite.svg#icon-list-solid"></use>
                    </svg>
                </div>
                <div className="app-nav__icon-box app-nav__icon-box--invert">
                    <svg className="app-nav__icon app-nav__icon-small">
                        <use href="img/sprite.svg#icon-plus-solid"></use>
                    </svg>
                </div>
            </nav>

            <div className="info-box">
                <h1 className="info-box__title">Allison's Test #8</h1>
                <div className="info-box__progress-bar"></div>
            </div>
    </header>
);

export default Header;