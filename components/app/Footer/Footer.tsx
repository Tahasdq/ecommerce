import React from "react";
import Wrapper from "../Wrapper/Wrapper";

const Footer = () => {
  return <div>  {/*wrapping in div */}
   <Wrapper  >
    <div className="footer-up w-full flex flex-col gap-5 md:flex-row ">
      <div className="basis-[30%] footer-up-left flex flex-col gap-4">
        <h2>Online shop</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum inventore </p>
        <div className="flex gap-4">
          <span>Twitter</span>
          <span>Facebook</span>
          <span>Instagram</span>
          <span>Github</span>
        </div>
      </div>
      <div className="basis-[70%]  flex flex-row   flex-wrap gap-y-10">
        <div className="flex flex-col basis-1/2  md:basis-1/4 gap-4">
          <h2 className="font-bold">COMPANY</h2>
          <div>About</div>
          <div>Features</div>
          <div>Works</div>
          <div>Careers</div>
        </div>
        <div className="flex flex-col basis-1/2 md:basis-1/4 gap-4">
          <h2 className="font-bold">HELP</h2>
          <div>About</div>
          <div>Features</div>
          <div>Works</div>
          <div>Careers</div>
        </div>
        <div className="flex flex-col basis-1/2 md:basis-1/4 gap-4">
          <h2 className="font-bold">FAQ</h2>
          <div>About</div>
          <div>Features</div>
          <div>Works</div>
          <div>Careers</div>
        </div>
        <div className="flex flex-col basis-1/2 md:basis-1/4  gap-4">
          <h2 className="font-bold">RESOURCES</h2>
          <div>About</div>
          <div>Features</div>
          <div>Works</div>
          <div>Careers</div>
        </div>
      </div>
    </div>
    <hr className="mt-5 mb-4"/>
    <div className="footer-down flex justify-center items-end w-full mb-4">
      <div>Made with &#x2665; by  Muhammad Taha</div>
    </div>
  </Wrapper>
  </div>
};

export default Footer;
