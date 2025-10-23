import { Card, CardContent } from "../ui/card";
import {ProductListing} from "@/components/home/index"
export default function NewArrival(){
    return(
        <Card>
            <div className="flex flex-col justify-center gap-10 h-full">
                <div className="flex justify-center">
                    <h2 className="font-bold text-3xl md:text-5xl">
                        NEW ARRIVALS
                    </h2>
                </div>
                <div>
                    <ProductListing/>
                </div>
            </div>
        </Card>
    )
}