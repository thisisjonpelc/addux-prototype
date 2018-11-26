import React from "react";

const Footer = (props) => (
    <footer className="footer">
        <a href='https://www.kajabi.com' target='_blank' className="footer__box">
            <span className="footer__text--light-gray">Access</span>&nbsp; Course
        </a>
        <a href='https://www.adduxonline.com/private-workshop' target='_blank' className="footer__box">
            <span className="footer__text--light-gray">Schedule</span>&nbsp; a Workshop
        </a>
        <a href='mailto:contact@adduxonline.com' className="footer__box">
            <span className="footer__text--light-gray">Get</span>&nbsp; Help
        </a>
        <div onClick={props.changeTutorialActive} className="footer__box">
            <svg className="footer__icon">
                <use xlinkHref="img/sprite.svg#icon-video-solid"></use>
            </svg>
            <span className="footer__text--light-gray footer__text--margin">Watch</span>&nbsp; Tutorial
        </div>
    </footer>
);

export default Footer;