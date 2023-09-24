import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/home">Hotel Rooms</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" >
                            <i class="fa fa-bars" style={{color:'white'}}></i>
                        </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mr-5">
                            {user ? (
                                <>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" 
                                        type="button" id="dropdownMenuButton" 
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                        >
                                            {user.name}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="/profile">Profile</a>
                                            <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link " href="/register">Register</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/login">Login</a>
                                    </li>
                                </>)}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar