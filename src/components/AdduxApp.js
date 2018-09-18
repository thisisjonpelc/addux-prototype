import React from "react";

import Header from "./Header";
import Columns from "./Columns";
import Footer from "./Footer";

export default class AdduxApp extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        console.log("RENDERING!");

        return (
            <div className="app">
                <Header />
                <Columns />
                <Footer />
         
            </div>
        );
    }
}