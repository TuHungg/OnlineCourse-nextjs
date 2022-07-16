import React from 'react'
import Image from 'next/image'

export interface NextImageProps {
    alt: string
    src: string
}

export default function NextImage({ alt, src }: NextImageProps) {
    return (
        <>{src && <Image alt={alt} src={src} layout='fill' />}</>
    )
}
