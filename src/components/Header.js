import React from "react";
import Modal from "react-modal";
import {connect} from 'react-redux';
import axios from 'axios';


import AdduxNameForm from "./AdduxNameForm";
import {addAddux, setActive} from "./../actions/addux";
import {logout} from './../actions/auth';

class Header extends React.Component{
    
    constructor(props){
        super(props);

        Modal.setAppElement('#app');

        this.state = {
            createModal : false,
            editModal: false
        }
    }

    showCreateModal = () => {
        this.setState({createModal:true});
    }

    showEditModal = () => {
        //this.setState({editModal: true});
    }

    handleCloseModal = () => {
        this.setState({createModal:false, editModal:false})
    }

    onLogoutClick = () => {
        this.props.logout();
    }

    createNewModal = (e) => {
        e.preventDefault();

        axios.post(
            `/addux`,
            {
                name: e.target.children[0].value
            },
            {
                headers: {
                    'x-auth': this.props.token
                }
            })
        .then((response) => {
            this.handleCloseModal();
            this.props.addAddux(response.data.addux);
            //this.props.setActive(response.data.addux._id);
        })
        .catch((e) => {
        })
    }

    editActiveModal = (e) => {
        e.preventDefault();
    }

    render(){
        return (
            <div>
                <header className="header">
                    <img src="img/addux-logo.png" className="logo" />
            
                    <nav className="app-nav">

                       {
                           this.props.isAdmin 
                           && 
                           (
                               <div onClick={this.props.changeAdminActive} className="app-nav__icon-box">
                                    <svg className="app-nav__icon">
                                        <use xlinkHref="img/sprite.svg#icon-cog"></use>
                                    </svg>
                                </div>
                            )
                       }     
                            {!this.props.empty && <div onClick={this.props.changeShareActive} className="app-nav__icon-box">
                                <svg className="app-nav__icon">
                                    <use xlinkHref="img/sprite.svg#icon-share-alt-solid"></use>
                                </svg>
                            </div>}
                            <div onClick={this.props.changeUserActive} className="app-nav__icon-box">
                                <svg className="app-nav__icon">
                                    <use xlinkHref="img/sprite.svg#icon-user-solid"></use>
                                </svg>
                            </div>
                            <div onClick={this.onLogoutClick} className="app-nav__icon-box">
                                <svg className="app-nav__icon">
                                    <use xlinkHref="img/sprite.svg#icon-sign-out"></use>
                                </svg>
                            </div>
                            {!this.props.empty && <div onClick={this.props.changeNotesActive} className="app-nav__icon-box"> 
                                <svg className="app-nav__icon">
                                    <use xlinkHref="img/sprite.svg#icon-pencil-alt-solid"></use>
                                </svg>
                            </div>}
                            {!this.props.empty && <div onClick={this.props.changeListActive} className="app-nav__icon-box">
                                <svg className="app-nav__icon">
                                    <use xlinkHref="img/sprite.svg#icon-list-solid"></use>
                                </svg>
                            </div> }
                            <div onClick={this.props.showCreateModal} className="app-nav__icon-box app-nav__icon-box--invert">
                                <svg className="app-nav__icon app-nav__icon-small">
                                    <use xlinkHref="img/sprite.svg#icon-plus-solid"></use>
                                </svg>
                            </div>
                        </nav>

                        {!this.props.empty &&
                            <div onClick={this.showEditModal} className="info-box">
                                <h1 className="info-box__title">{this.props.activeAddux.name}</h1>
                                <div className="info-box__progress-bar"></div>
                            </div>
                        }
                </header>

                <Modal
                    isOpen={this.state.editModal}
                    contentLabel="Change Your Addux's name"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <AdduxNameForm addux={this.props.activeAddux} buttonText='Edit your Addux' onSubmit={this.createNewModal}/>
                </Modal>
                
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        activeAddux: state.addux[state.addux.active],
        isAdmin: state.auth.isAdmin,
        token: state.auth.token
    }    
};

const mapDispatchToProps = (dispatch) => {    
    return {
        addAddux: (addux) => dispatch(addAddux(addux)),
        setActive: (id) => dispatch(setActive(id)),
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);