import Head from 'next/head'
import React from 'react'
import AppImg from '../../../utils/constants/app-img.constant'
import PathHelper from '../../../utils/helpers/path.helper'

const Meta = ({ name, content }: { name?: string; content?: string }) => {
    if (!name || !content) return <></>
    return <meta name={name} content={content} />
}
const OgMeta = ({ prop, content }: { prop?: string; content?: string }) => {
    if (!prop || !content) return <></>
    return <meta property={prop} content={content} />
}

export interface MyHead {
    title?: string
    author?: string
    description?: string
    ogBasics?: {
        title?: string
        description?: string
        path?: string
        type?: 'article' | 'website'
    }
    ogImage?: {
        url?: string
        width?: number
        height?: number
    }
}
export default function MyHead({ title, description, ogBasics, ogImage, author }: MyHead) {
    const imageUrl = ogImage?.url || PathHelper.getClientDomain(AppImg.OG_APP_LOGO.slice(1))
    const imageWidth = ogImage?.width || 702
    const imageHeight = ogImage?.height || 368
    return (
        <Head>
            {title && <title>{title}</title>}
            <Meta name="description" content={description} />
            <Meta name="author" content={author} />
            {/* OG ==*/}
            <OgMeta prop="og:url" content={PathHelper.getClientDomain(ogBasics?.path)} />
            <OgMeta prop={'og:type'} content={ogBasics?.type || 'website'} />
            <OgMeta prop={'og:title'} content={ogBasics?.title || title} />
            <OgMeta prop="og:description" content={ogBasics?.description || description} />
            {/* OG IMAGE */}
            <OgMeta prop="og:image:url" content={imageUrl} />
            <OgMeta prop="og:image:width" content={imageWidth + ''} />
            <OgMeta prop="og:image:height" content={imageHeight + ''} />
        </Head>
    )
}
