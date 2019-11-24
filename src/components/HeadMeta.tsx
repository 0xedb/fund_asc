import React, { ReactNode } from 'react'
import {Helmet} from 'react-helmet';
import 'antd/dist/antd.css'

interface Props {
    children? : ReactNode
}

function HeadMeta({children}: Props) {
    return (
        <Helmet> 
            <link rel='icon' href='/images/favicon.png' type='image/png' /> 
            <link rel='stylesheet' href='/css/app.css' />
            {children}
        </Helmet>
    )
}
 
export default HeadMeta
