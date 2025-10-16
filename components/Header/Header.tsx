import React from "react";
import logo from "@/assets/cloth-high-resolution-logo.png";
import Image from "next/image";
const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>Menu</div>
        <div className="logo">
          <Image className="h-10 w-10" alt="logo" src={logo} />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <span>Search</span>
        <span>Cart</span>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Header;
