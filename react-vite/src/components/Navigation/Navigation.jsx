import { Link } from "react-router-dom";
import "./Navigation.css";
import { IoPersonOutline } from "react-icons/io5";
import { PiShoppingCartSimple  } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";

function Navigation() {
  const [showMenu, setShowMenu ] = useState(false)

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="navigation">
      <div className="container">
        <div className="left nav-icons">
          {showMenu ? <RxCross1 onClick={handleMenuClick}/>: <RxHamburgerMenu onClick={handleMenuClick}/>}
        </div>
        <div className="logo">
          <h1>BOARD & NIX</h1>
        </div>
        <div className="right nav-icons">
          <Link to='/'><IoPersonOutline /></Link>
          <Link to='/products'><PiShoppingCartSimple /></Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
