import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';
import axios from 'axios';

import { history } from './../routers/AppRouter';

import { labels } from '../constants/constants';

import { editAddux } from './../actions/addux';
import { unsubscribe } from './../actions/subscription';
import { logout } from './../actions/auth';

class AccordionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.activeAddux[`${props.category}_${props.number}`],
            showSuccess: false,
            showFailure: false,
            statusSelected: props.activeAddux[`${props.category}_${props.number}_status`]
        }
    }

    onCheckChange = (e) => {
        if (true) {
            this.props.onCheckChange(Number(e.target.id.slice(-1)), e.target);
        }
    }

    saveText = debounce(1000, (text) => {

        const updates = {};

        updates[`${this.props.category}_${this.props.number}`] = text;

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

                this.setState(() => {
                    return {
                        showSuccess: true
                    };
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showSuccess: false
                        }
                    })
                },
                    1000);

            })
            .catch((e) => {
                if (e.response.status === 402) {
                    this.props.unsubscribe();
                    history.push('/subscribe');
                }
                else if (e.response.status === 401) {
                    this.props.logout();
                    history.push('/login');
                }
                else {
                    this.setState(() => {
                        return {
                            showFailure: true
                        };
                    });

                    setTimeout(() => {
                        this.setState(() => {
                            return {
                                showFailure: false
                            }
                        })
                    },
                        1000);
                }
            });
    });

    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({ text }));
        this.saveText(text);
    }

    onStatusClick = (statusSelected) => {

        this.setState(() => ({statusSelected}));
        
        const updates = {};

        updates[`${this.props.category}_${this.props.number}_status`] = statusSelected;

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

            this.setState(() => {
                return {
                    showSuccess: true
                };
            });

            setTimeout(() => {
                this.setState(() => {
                    return {
                        showSuccess: false
                    }
                })
            },
                1000);

        })
        .catch((e) => {
            if (e.response.status === 402) {
                this.props.unsubscribe();
                history.push('/subscribe');
            }
            else if (e.response.status === 401) {
                this.props.logout();
                history.push('/login');
            }
            else {
                this.setState(() => {
                    return {
                        showFailure: true
                    };
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showFailure: false
                        }
                    })
                },
                    1000);
            }
        });
    
    } 

    // onRedClick = () => {
    //     this.setState(() => ({statusSelected: 'red'}));
    // }

    render() {
        return (
            <div className='accordion__item'>
                {
                    this.props.linked
                        ?
                        (
                            <input
                                id={`${this.props.category}-${this.props.number}`}
                                type='checkbox'
                                onChange={this.onCheckChange}
                            //checked={this.props.openFields[this.props.number-1]}
                            />
                        )
                        :
                        (
                            <input
                                id={`${this.props.category}-${this.props.number}`}
                                type='checkbox'
                                onChange={this.onCheckChange}
                            />
                        )
                }


                <label className='accordion__label'
                    htmlFor={`${this.props.category}-${this.props.number}`}
                >
                    <span>{`${labels[this.props.category]} ${this.props.number}`}</span>
                    <svg className='accordion__icon'>
                        <use xlinkHref='img/sprite.svg#icon-chevron-down-solid'></use>
                    </svg>
                </label>
                <div className='accordion__text'>
                    <textarea
                        maxLength='100'
                        className='addux-textarea'
                        onChange={this.onTextChange}
                        value={this.state.text}
                        readOnly={this.props.readOnly}>
                    </textarea>
                    {
                        this.props.category === 'progress'
                        &&
                        (<div className='accordion__status'>
                            <div onClick={() => {this.onStatusClick('red')}} className={`accordion__button accordion__button--red ${this.state.statusSelected === 'red' ? 'accordion__button--selected':''}`} />
                            <div onClick={() => {this.onStatusClick('yellow')}} className={`accordion__button accordion__button--yellow ${this.state.statusSelected === 'yellow' ? 'accordion__button--selected':''}` } />
                            <div onClick={() => {this.onStatusClick('green')}} className={`accordion__button accordion__button--green ${this.state.statusSelected === 'green' ? 'accordion__button--selected':''}`} />
                        </div>)
                    }
                    <div className={`accordion__alert accordion__alert--success ${this.state.showSuccess ? '' : 'accordion__alert--hidden'}`}>Input saved</div>
                    <div className={`accordion__alert accordion__alert--failure ${this.state.showFailure ? '' : 'accordion__alert--hidden'}`}>Failed to save input</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {


    return {
        token: state.auth.token
        //activeAddux: state.addux[state.addux.active]
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates)),
        unsubscribe: () => dispatch(unsubscribe()),
        logout: () => dispatch(logout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AccordionItem);