import React from "react";
import { IoIosMenu } from "react-icons/io";
import "./Header.css";
import { IoIosSearch } from "react-icons/io";


const Header = () => {
  return (
    <div className="header-container">
      <div className="header-harm-wrapper">
        <img
          src="https://www.testvalley.kr/logo/logo-new.svg"
          alt="logo"
          srcset=""
        />
        <div className="main-harm-burger-wrapper">
          <div className="harm-burger">
            <IoIosMenu />
          </div>
          <div>
            <p>category</p>
          </div>
        </div>
      </div>
      <div className="bar-container">
        <div className="searchbar">
            <input type="text" placeholder="If you're wondering whether to buy it or not,"/>
            <div className="searchicon">
                <IoIosSearch />
            </div>
        </div>
      </div>
      <div className="sign-container">
        <img src="https://www.testvalley.kr/common/home-event.svg" alt="loginthumbnail" srcset="" />
        <div className="sign">
            Login/Sign Up
        </div>
      </div>
    </div>
  );
};

export default Header;
