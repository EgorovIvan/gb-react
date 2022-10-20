import * as React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <h3>Home</h3>
            <div>
                <Link to="/login">Sign In</Link>
            </div>
            <div>
                <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Home