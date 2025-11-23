import Wrapper from "../app/Wrapper/Wrapper";
import {ProductListing} from "@/components/home/index"
export default function NewArrival(){
    return(
            <Wrapper className="flex flex-col  gap-10  ">
                <div className="flex justify-center">
                    <h2 className="font-bold text-3xl md:text-5xl">
                        NEW ARRIVALS
                    </h2>
                </div>
                <div>
                    <ProductListing/>
                </div>
            </Wrapper>
    )
}