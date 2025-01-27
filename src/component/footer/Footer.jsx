import React from "react";
import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "../../images/footer-bg.jpg";


export default function Footer() {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu ">
            <Link to="/" className="text-white">Home</Link>
            <Link to="/" className="text-white">Contact us</Link>
            <Link to="/" className="text-white">Term of services</Link>
            <Link to="/" className="text-white">About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/" className="text-white">Live</Link>
            <Link to="/" className="text-white">FAQ</Link>
            <Link to="/" className="text-white">Premium</Link>
            <Link to="/" className="text-white">Privacy policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/" className="text-white">New Movies</Link>
            <Link to="/" className="text-white">Recent release</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
