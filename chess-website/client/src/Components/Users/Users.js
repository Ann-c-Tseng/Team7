import React from 'react';

function Users({ UserData }) {
    return (
        <div id="profile">
            {Item(UserData)}
        </div>
    )
}

function Item(data) {
    const userProfilePic = require('../../Images/tentativeProfile.png');
    return (
        <>
            {
                data.map((user, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={userProfilePic} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{user.username}</h3>
                                <span>Clan #1</span>
                            </div>
                        </div>
                        <div className="item">
                            <span>{user.elo}</span>
                        </div>
                    </div>
                    )   
                )
            }
        </>
    )
}

export default Users;