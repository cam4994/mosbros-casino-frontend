import React from 'react';

const Home = () => (
    // <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
    //     <iframe frameborder="0" height="100%" width="100%"
    //         src="https://youtube.com/embed/ehrSceHtzV0?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1">
    //     </iframe>
    // </div>
    <div className="video-background">
        <div className="video-foreground">
            <iframe src="https://www.youtube.com/embed/ehrSceHtzV0?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1" frameBorder="0" allowFullScreen></iframe>
        </div>
    </div>

)

export default Home;

