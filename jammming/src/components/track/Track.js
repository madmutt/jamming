import './Track.css';

function Track() {

    renderAction(){
        return isRemoval == true ? "-" : "+";
    }
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>Track Name</h3>
                <p>Artist name | Album Name</p>
            </div>
            <button className="Track-action">{this.renderAction}</button>
        </div>
    );
}

export default Track;
