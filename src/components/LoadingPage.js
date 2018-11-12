import React from "react";

const LoadingPage = (props) => (
    <div id={props.testId} className='loadingPage'>
        <img className='loadingPage__img' src='/img/loading.gif' />
    </div>
);

export default LoadingPage;