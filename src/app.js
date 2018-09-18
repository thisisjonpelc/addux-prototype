console.log("App is running!");

import React from "react";
import ReactDOM from "react-dom";

import './styles/styles.scss';

const template = (<div className="test class"><h1>This is the app!</h1></div>);

ReactDOM.render(template, document.getElementById('app'));