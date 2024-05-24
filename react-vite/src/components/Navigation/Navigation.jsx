import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { IoPersonOutline } from "react-icons/io5";
import { PiShoppingCartSimple  } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { thunkLogout } from "../../redux/session";

function Navigation() {
  const [showMenu, setShowMenu ] = useState(false)
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef()

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    handleMenuClick()
    navigate('/')
  };

  useEffect(() => {
    // Function to handle click outside
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Click occurred outside of the target element
        setShowMenu(false); // Toggle the state
      }
    };

    // Add event listener to handle click outside
    document.addEventListener('click', handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Only run effect once on mount

  return (
    <div className="navigation">
      <div className="container">
        <div className="left nav-icons">
          {showMenu ? (
            <div ref={ref} onMouseLeave={handleMenuClick}>
              <RxCross1 />
              <ul className="dropdown-menu" >
                <li><NavLink to='/' onClick={handleMenuClick}>Home</NavLink></li>
                <li><NavLink to='/products' onClick={handleMenuClick}>Browse</NavLink></li>
                {user ?
                  <>
                    <li><NavLink to='/admin' onClick={handleMenuClick}>Account</NavLink></li>
                    <div className="break-h"></div>
                    <li><Link onClick={logout}>Log Out</Link></li>
                  </>:
                  <>
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={handleMenuClick}
                    modalComponent={<LoginFormModal />}
                    />
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={handleMenuClick}
                    modalComponent={<SignupFormModal />}
                    />
                </>}
              </ul>
            </div>
          )
            : <RxHamburgerMenu onMouseEnter={handleMenuClick} />}
        </div>
        <div className="logo">
          <h1><Link to='/'>BOARD & NIX</Link></h1>
        </div>
        <div className="right nav-icons">
          {user ? <Link to='/admin'><IoPersonOutline /></Link>:
              <i id="account-icon"><OpenModalMenuItem
              itemText={<IoPersonOutline />}
              modalComponent={<LoginFormModal />}
              /></i>
          // <i onClick={() => alert('Please sign in using the menu')}><IoPersonOutline /></i>
          }
          {/* {user ? <i onClick={() => alert('Feature coming soon')}><PiShoppingCartSimple /></i>: <i onClick={() => alert('Please sign in using the menu')}><PiShoppingCartSimple /></i>} */}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
