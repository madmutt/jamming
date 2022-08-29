import React from 'react';
import './Player.css';

class Player extends React.Component {
    constructor(props){
        super(props);

        this.playTrack = this.playTrack.bind(this);
    }

    playTrack(e){
        const audios = document.getElementsByTagName('audio');
        const audio = e.target.firstChild.nextElementSibling;

        if (audio.duration > 0 && !audio.paused) {
            //Its playing... Pause it
            audio.load();
            audio.parentNode.parentNode.classList.remove("playing");
        } else {
            //Not playing...maybe paused, stopped or never played.
            for (let i = 0, len = audios.length; i < len; i++) {
                if (audios[i] != audio) {
                     audios[i].load();
                     audios[i].parentNode.parentNode.classList.remove("playing");
                }
            }
            audio.play();
            audio.parentNode.parentNode.classList.add("playing");
        }
    }

    renderAction(){
        if(this.props.track.preview_url){
            return <audio controls><source src={this.props.track.preview_url} type="audio/mpeg" /></audio>;
        }
    }

    render() {
        return (
            <div className={ this.props.track.preview_url ? "thumbWrapper" : "thumbWrapper noPreview" } onClick={this.playTrack}>
                <img src={this.props.track.img} alt="" />
                {this.renderAction()}
            </div>
            );
    }
}

export default Player;
