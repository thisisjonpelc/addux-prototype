console.log("App is running!");

import React from "react";
import ReactDOM from "react-dom";

import AdduxApp from "./components/AdduxApp";

import './styles/main.scss';

const template = (<AdduxApp />);

ReactDOM.render(template, document.getElementById('app'));