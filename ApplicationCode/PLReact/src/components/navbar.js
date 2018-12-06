import React from 'react';


const NavBar = () =>{
    return(
        
            <nav className="navbar">
                <div className="row headerStyle">
                    <div className="col-md-1 col-sm-1 col-xl-1">
                        <img src={require('../Images/logo.png')} className="img-thumbnail" />
                    </div>
                    <div className="col-md-11">
                        <h2>Premier League</h2>
                    </div>
                </div>
            </nav>
       
    )
}

export default NavBar;