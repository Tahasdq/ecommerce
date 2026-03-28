import Wrapper from "../app/Wrapper/Wrapper";
import formaleCategory from "@/assets/formal.png";

export default function BrowseByDress() {
  return (
    <Wrapper>
      <div className="bg-[#F0F0F0] flow-root rounded-3xl">
        <div className="flex justify-center mt-20">
          <h2 className="font-bold text-3xl md:text-5xl">
            Browse By Dresses Style
          </h2>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 p-24 ">
            <div className="h-52  relative overflow-hidden col-span-1 lg:col-span-4 bg-white  z-10 rounded-3xl cursor-pointer">
              <div
                style={{ backgroundImage: `url(${formaleCategory.src})` }}
                className={`sm:ml-20  md:ml-10 absolute top-0 left-0 h-full w-full  bg-no-repeat bg-cover bg-right `}
              >
              </div>
              <div className=" text-xl sm:text-2xl   px-3 py-6  font-bold">Casual</div>
        </div>
          <div className="h-52  relative overflow-hidden col-span-1 lg:col-span-8 bg-white  z-10 rounded-3xl cursor-pointer">
            <div
              style={{ backgroundImage: `url(${formaleCategory.src})` }}
              className={`sm:ml-20  md:ml-10 absolute top-0 left-0 h-full w-full  bg-no-repeat  bg-cover  bg-right `}
            >
                
            </div>
           <div className=" text-xl sm:text-2xl   px-3 py-6  font-bold">Formal</div> 
          </div>
          <div className="h-52  relative overflow-hidden col-span-1 lg:col-span-8 bg-white  z-10 rounded-3xl cursor-pointer">
            <div
              style={{ backgroundImage: `url(${formaleCategory.src})` }}
              className={`sm:ml-20 md:ml-10 absolute top-0 left-0 h-full w-full  bg-no-repeat    bg-cover  bg-right `}
            >
                
            </div>
            <div className=" text-xl sm:text-2xl   px-3 py-6  font-bold">Party</div>
          </div>
          <div className="h-52  relative overflow-hidden col-span-1 lg:col-span-4 bg-white  z-10 rounded-3xl cursor-pointer">
            <div
              style={{ backgroundImage: `url(${formaleCategory.src})` }}
              className={` sm:ml-20  md:ml-10 absolute top-0 left-0 h-full w-full  bg-no-repeat   bg-cover  bg-right`}
            >

            </div>
            <div className=" text-xl sm:text-2xl   px-3 py-6  font-bold">Gym</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
