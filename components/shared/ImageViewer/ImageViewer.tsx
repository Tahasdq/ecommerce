import Modal from "../Modal";
interface ImageViewer {
    isImageViewrOpen:boolean
    closeImageViewer :(val:boolean)=>void
    imageData:string|File
    altText:string
}
export default function ImageViewer({isImageViewrOpen , closeImageViewer,imageData , altText}:ImageViewer){

    return(
        <Modal open={isImageViewrOpen} handleClose={closeImageViewer} >
            <div>
                    <img src={imageData} alt={altText} />
            </div>
        </Modal>
    )
}