import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export default function Modal({children , open ,handleClose} :{children : React.ReactNode , open : boolean , handleClose:(open:boolean)=>void}){
    return (
       <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {children}
        </DialogContent>
    </Dialog>
    )
}