import React, { use } from 'react';

const Users2 = ({usersPromse}) => {
    const users = use(usersPromse);

    console.log('users 2 suspense data load', users);

    return (
        <div>
            <h2>This is Usar2</h2>
        </div>
    );
};

export default Users2;