import { useCallback, useRef, useState } from "react";
import FileUploadHelper from "../../../utils/helpers/file-upload.helper";

export const useUploadImage = (uploadDir: string, oldSrc?: string | null) => {
    const [uploadProgress, setUploadProgress] = useState<number>();
    const getImgSrcFuncRef = useRef<() => string>();

    const handleUpload = useCallback(async (callback: (uploaded: boolean, src?: string | null) => void) => {
        const imgSrc = getImgSrcFuncRef.current && getImgSrcFuncRef.current()
        if (FileUploadHelper.needUpload(imgSrc, oldSrc)) {
            await new FileUploadHelper().uploadBase64(imgSrc!, uploadDir, {
                onProgress: ((progress) => {
                    setUploadProgress(progress * 100);
                }),
                onComplete: ((downloadUrl) => {
                    callback(true, FileUploadHelper.getImageFieldValue(downloadUrl, oldSrc));
                    setUploadProgress(undefined);
                }),
            })
        } else {
            callback(false, FileUploadHelper.getImageFieldValue(imgSrc, oldSrc));
        }
    }, [oldSrc, uploadDir])
    return {
        getImgSrcFuncRef,
        handleUpload,
        uploadProgress
    }
}