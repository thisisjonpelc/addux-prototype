import React from 'react';
import axios from 'axios';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        //console.log(props);
        //console.log(props.walkthrough);

        this.state={

        }
    }

    render() {
        return (         
            <div className={`app-overlay ${this.props.hidden && 'hidden'}`}>
                <svg onClick={this.props.changeUserActive} className='app-overlay__close'>
                    <use href='img/sprite.svg#icon-close'></use>    
                </svg> 
                <h1>This the user page!</h1> 
            </div>
        );
    }
}

export default AdminPage;