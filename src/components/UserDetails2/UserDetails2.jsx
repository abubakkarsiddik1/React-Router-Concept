import React, { use } from 'react';

const UserDetails2 = ({userPromse}) => {
    const {name, username} = use(userPromse);
   
    return (
        <div>
            <p><small>user Name: {username}</small></p>
            <p>{name}</p>
        </div>
    );
};

export default UserDetails2; 