import { useTheme } from '@chakra-ui/react'
import React, { useRef } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export interface VideoPlayerProps extends ReactPlayerProps {}
export default function VideoPlayer({ url, ...props }: VideoPlayerProps) {
    const ref = useRef<ReactPlayer>(null)
    return (
        <ReactPlayer
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            ref={ref}
            // playing={true}
            url={url}
            controls
            width="100%"
            style={{
                backgroundColor: 'black',
            }}
            {...props}
        />
    )
}
