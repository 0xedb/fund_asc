import React from 'react'
import HeadMeta from '../components/HeadMeta';
import Index from '../components/Index';

function index() {
    return (
        <>
            <HeadMeta>
                <title>Fund ASC</title>
            </HeadMeta>
            <div>
                <Index />
            </div>
        </>
    )
}

export default index
