import React from "react";

const Footer = (props) => (
    <footer className="footer">
        <div onClick={props.showCreateModal} className="footer__box footer__box--alt">
            <svg className="footer__icon footer__icon--alt">
                <use xlinkHref="img/sprite.svg#icon-plus-solid"></use>
            </svg>
            <span className="footer__text--margin">Create a new Roadmap</span>
        </div>
        <div className="footer__box">
            <span className="footer__text--light-gray">Schedule</span>&nbsp; a Workshop
        </div>
        <div className="footer__box">
            <span className="footer__text--light-gray">Get</span>&nbsp; Help
        </div>
        <div className="footer__box">
            <svg className="footer__icon">
                <use xlinkHref="img/sprite.svg#icon-video-solid"></use>
            </svg>
            <span className="footer__text--light-gray footer__text--margin">Watch</span>&nbsp; Tutorial
        </div>
    </footer>
);

export default Footer;