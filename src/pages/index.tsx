import React from 'react'
import HeadMeta from '../components/HeadMeta';
import Index from '../components/Index'; 
import Page from '../components/Page'

function index() {
    
    return (
        <>
            <HeadMeta>
                <title>Fund ASC</title>
            </HeadMeta>
            <Page><Index /></Page>         
        </>
    )
}

export default index
