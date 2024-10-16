import React from 'react'
import {Navigate} from "react-router-dom"
import { getRecruiterID } from '../store/Slice';

function ProtectedRoute({children}) {
    // const recruiterID = localStorage.getItem("recruiterID")
    const recruiterID = getRecruiterID();

    if(!recruiterID) {
        return <Navigate to="/" replace />
    }

 return children
}

export default ProtectedRoute