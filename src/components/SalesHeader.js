import React from 'react';
import moment from 'moment';

class SalesHeader extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            eventTime: 1544594400,
            currentTime: new moment().unix(),
            timeDifference: moment.duration(1544594400 - new moment().unix(), 'seconds')
        }
    }

    componentDidMount(){
        setInterval(() => {
            this.setState((prevState) => ({timeDifference: moment.duration(prevState.timeDifference.asSeconds() -1, 'seconds')}));
        },
        1000);
    }

    render(){

        //Timer to add back later


        // <div className='timer'>
        //             <div className='timer__block'>
        //                 <p className='timer__number'>
        //                     {`${this.state.timeDifference.days() < 10 ? '0' : ''}${this.state.timeDifference.days()}`}
        //                 </p>
        //                 <p className='timer__label'>
        //                     Days
        //                 </p>
        //             </div>
        //             <div className='timer__block'>
        //                 <p className='timer__number'>
        //                     {`${this.state.timeDifference.hours() < 10 ? '0' : ''}${this.state.timeDifference.hours()}`}
        //                 </p>
        //                 <p className='timer__label'>
        //                     Hours
        //                 </p>
        //             </div>
        //             <div className='timer__block'>
        //                 <p className='timer__number'>
        //                     {`${this.state.timeDifference.minutes() < 10 ? '0':''}${this.state.timeDifference.minutes()}`}
        //                 </p>
        //                 <p className='timer__label'>
        //                     Minutes
        //                 </p>
        //             </div>
        //             <div className='timer__block'>
        //                 <p className='timer__number'>
        //                     {`${this.state.timeDifference.seconds() < 10 ? '0':''}${this.state.timeDifference.seconds()}`}
        //                 </p>
        //                 <p className='timer__label'>
        //                     Seconds
        //                 </p>
        //             </div>
        //          </div>

        return (
            <header className='sales-header'>
                <img src='/img/addux-logo.png' className='sales-header__logo' />
            </header>
        );
    }

}

//<p className='sales-header__text'>{`${this.state.timeDifference.days()} days ${this.state.timeDifference.hours()} hours ${this.state.timeDifference.minutes()} minutes ${this.state.timeDifference.seconds()} seconds`}</p>

export default SalesHeader;