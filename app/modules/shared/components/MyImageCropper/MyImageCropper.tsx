import 'cropperjs/dist/cropper.css'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Cropper from 'react-cropper'

export interface MyImageCropperProps {
    circle?: boolean
    imageSrc: string
    onCrop?: (src: string) => void
    childFuncRef?: MutableRefObject<(() => string) | undefined>
    aspectRatio?: number
}

export default function MyImageCropper({
    imageSrc,
    childFuncRef,
    circle,
    aspectRatio = 16 / 9,
}: MyImageCropperProps) {
    const cropperRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        childFuncRef && (childFuncRef.current = getCroppedImage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCroppedImage = () => {
        const imageElement: any = cropperRef?.current
        const cropper: any = imageElement?.cropper
        const url = cropper.getCroppedCanvas().toDataURL()
        return url
    }

    return (
        <Cropper
            src={imageSrc}
            style={{
                maxHeight: '400px',
                width: '100%',
                aspectRatio: circle ? undefined : (aspectRatio as any),
            }}
            className={circle ? 'circle-image-cropper' : undefined}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            ref={cropperRef}
            cropBoxResizable={true}
            aspectRatio={circle ? 1 : aspectRatio}
            autoCropArea={1}
        />
    )
}
