import React from 'react';

const VimeoVideo = (props) => {
    return (

        <div className='vimeo-video'>
        <div style={{
                padding:'56.25% 0 0 0',
                position:'relative'
                
        }}>
            <iframe id={props.id} src={`https://player.vimeo.com/video/${props.id}?title=0&byline=0&portrait=0`} 
                    style={{
                        position: 'absolute',
                        top:0,
                        left:0,
                        width:'100%',
                        height:'100%'
                    }}
                    frameBorder="0" 
                    webkitallowfullscreen='true' 
                    mozallowfullscreen='true' 
                    allowFullScreen={true}>
            </iframe>
        </div>
        </div>
    );
}

export default VimeoVideo;