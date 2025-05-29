import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="relative bg-gray-100 dark:bg-[#121212] text-black dark:text-white">
      <div className="relative z-10 px-6 md:px-16 pt-20 pb-5 text-sm">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14">
          <div>
            <img className="mb-5 w-40" src={assets.logo} alt="Doc+ Logo" />
            <p className="leading-6 text-gray-700 dark:text-white">
              Doc+ is a modern, user-friendly platform that simplifies the
              process of booking and managing doctor appointments. It serves as
              a bridge between patients and healthcare providers, offering an
              intuitive interface for seamless scheduling, real-time updates,
              and secure payments.
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-700 dark:text-white">
              <li className="hover:text-primary transition">Home</li>
              <li className="hover:text-primary transition">About us</li>
              <li className="hover:text-primary transition">Delivery</li>
              <li className="hover:text-primary transition">Privacy policy</li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-semibold mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-700 dark:text-white">
              <li className="hover:text-primary transition">91+96415582</li>
              <li className="hover:text-primary transition">shadowdev@gmail.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 my-10" />

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 Doc+.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
