console.log("App is running!");

import './styles/main.scss';
//import './utils/utils';

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import AdduxApp from "./components/AdduxApp";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configurestore";

import jsPDF from 'jspdf';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

//const doc = new jsPDF();
//doc.fromHTML('<h1 style="color:green;">Hello world!</h1>', 10, 10)  

//const result = doc.output('bloburl');

//doc.save('test.pdf');

//console.log(result);

//window.open(result);

//console.log(result);

//doc.save('test.pdf');


