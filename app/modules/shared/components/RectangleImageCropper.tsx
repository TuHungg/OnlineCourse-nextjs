import React, { useRef } from 'react'
import MyImageCropper from './MyImageCropper/MyImageCropper'

export interface RectangleImageCropperProps {
    imageSrc?: string
}
export default function RectangleImageCropper(props: RectangleImageCropperProps) {
    const childFuncRef = useRef<() => string>();
    return (
        <>
            {props.imageSrc && <MyImageCropper childFuncRef={childFuncRef} imageSrc={props.imageSrc} />}
        </>
    )
}
