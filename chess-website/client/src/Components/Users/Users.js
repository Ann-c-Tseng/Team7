import React from 'react';

function Users({ UserData }) {
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
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.img} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>
                                <span>{value.clan}</span>
                            </div>
                        </div>
                        <div className="item">
                            <span>{value.wins}</span>
                        </div>
                    </div>
                    )   
                )
            }
        </>
    )
}

export default Users;