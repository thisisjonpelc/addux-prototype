import React from "react";

const Header = () => (
    <footer class="footer">
        <div class="footer__box footer__box--alt">
            <svg class="footer__icon footer__icon--alt">
                <use href="img/sprite.svg#icon-plus-solid"></use>
            </svg>

            <span class="footer__text--margin">Create a new Roadmap</span>
        </div>
        <div class="footer__box">
            <span class="footer__text--light-gray">Schedule</span>&nbsp; a Workshop
        </div>
        <div class="footer__box">
            <span class="footer__text--light-gray">Get</span>&nbsp; Help
        </div>
        <div class="footer__box">
            <svg class="footer__icon">
                <use href="img/sprite.svg#icon-video-solid"></use>
            </svg>
            <span class="footer__text--light-gray footer__text--margin">Watch</span>&nbsp; Tutorial
        </div>
    </footer>
);

export default Header;