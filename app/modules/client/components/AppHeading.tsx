import { Box, Heading, HeadingProps, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import AppImg from '../../../utils/constants/app-img.constant'
import { APP_NAME } from '../../../utils/constants/app.constant'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'

const AppLogo = () => {
    return <Image src={AppImg.APP_LOGO} w="40px" h="40px" alt={'logo'} />
}

export interface AppHeadingProps extends HeadingProps {}
function AppHeading(props: AppHeadingProps) {
    return (
        <HStack>
            <Box display={{ base: 'none', xl: 'block' }}>
                <AppLogo />
            </Box>
            <NextLink href={PathHelper.getClientPath()}>
                <Heading fontSize={{ base: 'lg', md: '2xl' }} {...props}>
                    {APP_NAME}
                </Heading>
            </NextLink>
        </HStack>
    )
}

export default React.memo(AppHeading)
