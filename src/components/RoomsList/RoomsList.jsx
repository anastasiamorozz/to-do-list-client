import React from 'react';
import Room from '../Room/Room';
import '../RoomsList/RoomsList.scss';

const RoomsList = ({ rooms }) => {
    // Check if rooms is null or if it's not an object
    if (rooms === null || typeof rooms !== 'object' || !rooms.hasOwnProperty('dataCr') || !rooms.hasOwnProperty('dataAdd')) {
        return (
            <div className="list">
                <h2>No rooms available</h2>
                <p>{JSON.stringify(rooms)}</p>
            </div>
        );
    }

    const { dataCr, dataAdd } = rooms;

    // Render data from both arrays
    return (
        <div className="rooms-list">
            <h2>My rooms:</h2>
            <ul>
                {dataCr.map((item, index) => (
                    <Room key= {index} room={item} />
                ))}
            </ul>
            <h2>Rooms where I added:</h2>
            <ul>
                {dataAdd.map((item, index) => (
                    <Room key= {index} room={item} />
                ))}
            </ul>
        </div>
    );
}

export default RoomsList;
