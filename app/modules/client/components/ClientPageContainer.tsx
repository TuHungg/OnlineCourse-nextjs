import { Container, ContainerProps } from '@chakra-ui/react'
import React from 'react'

export interface ClientPageContainerProps extends ContainerProps {}
export default function ClientPageContainer({ children, ...props }: ClientPageContainerProps) {
    return (
        <Container maxW={'container.xl'} m="auto" py={[2, 4, 5]} {...props}>
            {children}
        </Container>
    )
}
