import React from 'react'
import './character.css';
const Characters = ({ characters }) => {
    return (
        <div className="row rm-card-box">
            {characters.map((character) => (
                <div key={character.id} className="col-sm-6 col-md-3 col-lg-3 rm-card">
                    <div className="img-wrap">
                        <img src={character.image} />
                        <div className="rm-card-block rm-card-title pl-3">{character.name}</div>
                        <div className="rm-card-block rm-card-sub-title pl-3">
                        id : {character.id} - created {Math.abs(Math.round((new Date(character.created).getTime() - new Date().getTime())/ (1000 * 60 * 60 * 24 * 365.25)))} years ago</div>
                    </div>
                    <div>
                        <p><span className="split-left-span">STATUS</span><span className="split-right-span">{character.status}</span></p>
                        <p><span className="split-left-span">SPECIES</span><span className="split-right-span">{character.species}</span></p>
                        <p><span className="split-left-span">GENDER</span><span className="split-right-span">{character.gender}</span></p>
                        <p><span className="split-left-span">ORIGIN</span><span className="split-right-span">{character.origin.name}</span></p>
                        <p><span className="split-left-span">LAST LOCATION</span><span className="split-right-span">{character.location.name}</span></p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Characters