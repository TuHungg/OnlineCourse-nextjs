import { Heading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

export interface ClientPageHeadingProps extends HeadingProps {}
function ClientPageHeading({ children, ...props }: ClientPageHeadingProps) {
    return (
        <Heading fontSize={['2xl', '2xl', '4xl']} {...props}>
            {children}
        </Heading>
    )
}

export default React.memo(ClientPageHeading)
