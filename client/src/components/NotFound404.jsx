import React from 'react';

const NotFound404 = () => {
    return (
        <div className='h-[70vh] flex flex-col items-center justify-center'>
            <h1 style={{ fontSize: '5rem', textAlign: 'center' }}>404</h1>
            <p style={{ textAlign: 'center', fontSize: '2rem' }}>PAGE NOT FOUND</p>
            <p style={{ textAlign: 'center' }}>404_page_message</p>
        </div>
    );
};

export default NotFound404;