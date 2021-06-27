import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default (props) =>{
    return(
        <>
        <Header/>
        <main>
            <div className="container mx-auto">
                {props.children}
            </div>
        </main>
        <Footer/>
        </>
    )
    
}