import React from 'react';
import {Link} from 'react-router-dom';

import {history} from './../routers/AppRouter';


class HomePage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            individual: false,
            enterprise: false,
            showForm:false,
            error: ''
        }
    }

    onindividualClick = () => {
        this.setState((prevState) => {
            return {
                individual: !prevState.individual,
                enterprise:false,
                error: ''
            }
        });
    }

    onenterpriseClick = () => {
        this.setState((prevState) => {
            return {
                individual: false,
                enterprise: !prevState.enterprise,
                error: ''
            }
        });
    }

    onButtonClick = () => {

        console.log('Button clicked!');

        if(!(this.state.individual || this.state.enterprise)){
            this.setState(() => {
                return {error: 'Please select a plan'}
            });
        }
        else{
            history.push(`/signup/${this.state.individual ? 'individual' : 'enterprise'}`);
        }
    }


    render(){
        
        return (
            <div className='sales-page'>
                <header className='sales-header'>
                    <img src='/img/addux-logo.png' className='sales-header__logo' />
                    <p className='sales-header__text'>Launch Special Ends - 12.14</p>
                </header>

                <div className='content'>
                    <div className='content-box'>
                        <div className='banner'>
                            <div className='ribbon'>
                                <div className='ribbon__text'>
                                    Launch Special
                                </div>
                            </div>

                            <h1 className='banner__header'>
                                <img src='img/addux-logo.png'/> Online
                            </h1>
                            <img className='banner__image' src='img/banner-image.png' />
                            <div className='banner__accent'>

                            </div>
                        </div>

                        <Link className='loginButton' to='/login'>Login</Link>

                        <div className='blurb'>
                            <h2 className='blurb__heading'>
                                Software, online training, interactive coaching and a resource library to help you simplify and grow.
                            </h2>
                            <div className='blurb__lists'>
                                    <h3 className='blurb__list-heading'>
                                            Included in the addux Online System:
                                            <p className='blurb__list-heading--promo'>
                                                For Enterprise Only: Launch Special 20 Users
                                            </p>
                                            <p className='blurb__list-heading--promo'>
                                                (normally, $2997 for 10 users)
                                            </p>
                                        </h3>
                                        <ul className='blurb__list'>
                                            <li>addux Software</li>
                                            <li>Online Training Course</li>
                                            <li>Weekly Coaching Call For Your Team (Valued @ $2,500/individual)</li>
                                            <li>Weekly Call on how to best use addux</li>
                                    </ul>
                            
                                    <h3 className='blurb__list-heading blurb__list-heading--offer'>
                                            Exclusive Launch Bonuses:
                                        </h3>
                                        <ul className='blurb__list'>
                                            <li>Instant Access Quick Win Strategy Guide</li>
                                            <li>addux Marketing Roadmap</li>
                                            <li>Free 1hr. consultation call - Clarifying your opportunity in 2019</li>
                                            <li>Strategy Implementation Blueprint</li>
                                            <li>
                                                RIA Club (Results in Advance)
                                                <ul className='blurb__inner-list'>
                                                    <li>Additional Video Training</li>
                                                    <li>Action Exercises</li>
                                                    <li>e-books</li>
                                                </ul>
                                            </li>
                                        </ul>
                            </div>
                            

                        </div>
                    </div>

                    <div className='choose-block'>

                        {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}


                        <div className='choose-block__plans'>
                            <div onClick={this.onindividualClick} className={`plan ${this.state.individual ? 'plan--selected' : ''}`}>
                                <p className='plan__title'>
                                    individual
                                </p>
                                <p className='plan__price'>
                                    <span className='plan__price--strike'>$397</span>
                                    <span>$297</span>
                                </p>
                            </div>
                            <div onClick={this.onenterpriseClick} className={`plan ${this.state.enterprise ? 'plan--selected' : ''}`}>
                                <p className='plan__title'>
                                    enterprise
                                </p>
                                <p className='plan__price'>
                                    <span className='plan__price--strike'>$2,997</span>
                                    <span>$1,997</span>
                                </p>
                            </div>
                        </div>

                        <p onClick={this.onButtonClick} className='choose-block__button'>
                            GET THE SYSTEM
                        </p>
                    </div>

                </div>
            </div>

        );
    }
}

export default HomePage;