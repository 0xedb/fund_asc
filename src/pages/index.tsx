import React from 'react'
import HeadMeta from '../components/HeadMeta';
import Index from '../components/Index';
import Login from '../components/Login';
import {} from 'react-router-dom';

function index() {
    
    return (
        <>
            <HeadMeta>
                <title>Fund ASC</title>
            </HeadMeta>
            <div className='centered index'>
                <Index />
            </div>
        </>
    )
}

export default index
