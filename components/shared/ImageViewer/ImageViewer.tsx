import Modal from "../Modal";

export default function ImageViewer({isImageViewrOpen , closeImageViewer,imageData , altText}){

    return(
        <Modal open={isImageViewrOpen} handleClose={closeImageViewer} >
            <div>
                    <img src={imageData} alt={altText} />
            </div>
        </Modal>
    )
}