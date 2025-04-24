import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const LegacySystem = () => {
    const user = useSelector((state) => state.auth.user);

    return(
        <div className='p-4'>
            <h2>Welcome {user?.username || 'Guest'}</h2>
        </div>
    );
};

export default LegacySystem;