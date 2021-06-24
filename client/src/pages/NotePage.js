import React from 'react'
import { Navbar } from '../components/navbar'

export const NotePage = () => {
    const navbar = Navbar()

    return(
        <div>
            {navbar}
            <div className="container">
                <div className="center flow-text">
                    So far, this page is not neccessary 
                </div>
            </div>
        </div>
    )
}