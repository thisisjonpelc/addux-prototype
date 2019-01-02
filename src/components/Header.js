import React from "react";
import { connect } from 'react-redux';
import {debounce} from 'throttle-debounce';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import { logout } from './../actions/auth';
import { editAddux } from './../actions/addux';
import { unsubscribe } from './../actions/subscription';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.activeAddux.name
        }
    }

    onNameClick = (e) => {
        e.target.select();
    }

    saveName = debounce(1000, (name) => {

        const updates={
            name
        };

        axios.patch(
            `/addux/${this.props.activeAddux._id}`,
            updates,
            {
                headers: {
                    'x-auth': this.props.token
                }
            }
        )
            .then((response) => {
                this.props.editAddux(this.props.activeAddux._id, updates);
            })
            .catch((error) => {
                if (e.response.status === 402) {
                    this.props.unsubscribe();
                    history.push('/subscribe');
                }
                else if (e.response.status === 401) {
                    this.props.logout();
                    history.push('/login');
                }
            });

    });

    onNameChange = (e) => {
        const name = e.target.value;

        this.setState({name});
        this.saveName(name);
    }

    onLogoutClick = () => {
        this.props.logout();
    }

    render() {
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
                        {!this.props.empty && <div onClick={this.props.changeNotesActive} className="app-nav__icon-box">
                            <svg className="app-nav__icon">
                                <use xlinkHref="img/sprite.svg#icon-pencil-alt-solid"></use>
                            </svg>
                        </div>}
                        {!this.props.empty && <div onClick={this.props.changeListActive} className="app-nav__icon-box">
                            <svg className="app-nav__icon">
                                <use xlinkHref="img/sprite.svg#icon-list-solid"></use>
                            </svg>
                        </div>}
                        <div onClick={this.props.showCreateModal} className="app-nav__icon-box app-nav__icon-box--invert">
                            <svg className="app-nav__icon app-nav__icon-small">
                                <use xlinkHref="img/sprite.svg#icon-plus-solid"></use>
                            </svg>
                        </div>
                    </nav>

                    <input onClick={this.onNameClick} onChange={this.onNameChange} className='info-box__title' placeholder='Name your addux' type='text' value={this.state.name}/>

                    <div onClick={this.onLogoutClick} className='logout-button'>
                        <svg className="logout-button__icon">
                            <use xlinkHref="img/sprite.svg#icon-sign-out"></use>
                        </svg>
                        <p className='logout-button__text'>
                            Logout
                            </p>
                    </div>

                </header>

            </div>
        );
    }

    // {!this.props.empty &&

    //     <div className="info-box">

    //         {(
    //             this.state.editName
    //                 ?
    //                 <NameEditForm name={this.props.activeAddux.name} closeEdit={this.closeEdit} activeAddux={this.props.activeAddux} token={this.props.token} />
    //                 :
    //                 <h1 onClick={this.onNameClick} className="info-box__title">{this.props.activeAddux.name}</h1>
    //         )}


    //     </div>

    // }

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
        logout: () => dispatch(logout()),
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates)),
        unsubscribe: () => dispatch(unsubscribe())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);