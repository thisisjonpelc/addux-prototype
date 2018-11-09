import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import html2canvas from 'html2canvas';


import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";

import jsPDF from 'jspdf';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));