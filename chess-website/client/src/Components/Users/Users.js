import React from 'react';

function Users({ UserData }) {
    console.log(UserData);
    return (
        <div id="profile">
            {Item(UserData)}
        </div>
    )
}

function Item(data) {
    return (
        <>
            {
                data.map((user, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <div className="info">
                                <h3 className='name text-dark'>{user.username}</h3>
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