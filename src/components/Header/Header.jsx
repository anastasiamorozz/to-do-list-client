import React, { useContext, useState, useEffect } from 'react';
import './Header.scss';
import { UserRoleContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

function Header(){
    const navigate = useNavigate();
    const { userRole } = useContext(UserRoleContext);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const checkAuth = async () => {
          setIsUserAuthenticated(userRole === 'user');
        };
    
        checkAuth();
      }, [userRole]);

    return (
        <header>
            <div className="header">
                <div></div>
                <button onClick={() => (isUserAuthenticated ? navigate("/main") : navigate("/"))}>
                    <div className="logo">
                        <img src='/IconYellow.png' alt="Logo"></img>
                        <h1>ToDo List</h1>
                    </div>
                </button>

                    {!isUserAuthenticated && (<button onClick={()=>{navigate("/auth/reg")}}> <FontAwesomeIcon icon={faArrowRightToBracket} /> </button>)}
                    {isUserAuthenticated && (<a onClick={()=>{navigate("/profile")}}>{username}`s profile</a>)}
                    
            </div>

        </header>
    );
}

export default Header;