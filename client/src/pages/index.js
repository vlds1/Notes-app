import React from 'react'
import { Navbar } from '../components/navbar'

export const IndexPage = () => {
    const navbar = Navbar()

    return(
    <div>
        {navbar}
        <div className="container center index-text">
            Welcome to Notes
        </div>
    </div>
    )
}