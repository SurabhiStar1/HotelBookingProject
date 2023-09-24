import React from 'react'

function Success(body) {

    return (
        <div>
            <div className="alert alert-success" role="alert">
                {body.message}

            </div>
        </div>
    )
}

export default Success;