/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSteam,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="">
      {/* Footer section */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          {/* Logo and tagline */}
          <p className="font-bold">
            <span className="">
              <img className="h-16 mx-auto" src="/logo.png" alt="Statify" />
            </span>{" "}
            <br />
            Unlock the Power of Personalized Music Insights
          </p>
          <p>© Copyright. All Rights Reserved</p>
          <p>
            Designed by <span className="text-secondary">bruhdeep</span>
          </p>
        </aside>
        <nav>
          {/* Social media links */}
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/bruhdeep">
              <FaGithub size={25} />
            </a>
            <a href="https://discordid.netlify.app/?id=413679054777090049">
              <FaDiscord size={25} />
            </a>
            <a href="https://www.instagram.com/bruhdeepo/">
              <FaInstagram size={25} />
            </a>
            <a href="https://www.linkedin.com/in/pradip02/">
              <FaLinkedin size={25} />
            </a>
            <a href="https://steamcommunity.com/id/bruhdeep/">
              <FaSteam size={25} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
