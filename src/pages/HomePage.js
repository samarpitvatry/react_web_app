import React from 'react';
import { Account } from './Account';

export const HomePage = () => {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ float: 'left', width: '100%', padding: '10px' }}>
                <Account />
            </div>
            {/* Clearfix to ensure parent div contains floated children */}
            <div style={{ clear: 'both' }}></div>
        </div>
    );
};