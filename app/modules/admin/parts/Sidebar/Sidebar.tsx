import { Box, Flex, useTheme, VStack } from '@chakra-ui/react'
import React, { memo } from 'react'
import { useDevice } from '../../../shared/hooks/app.hook'
import { useCardBg } from '../../../shared/hooks/style.hook'
import { useAdminSidebar } from '../../providers/admin-sidebar.provider'
import Nav from './Nav'
import NavSizeToggler from './NavSizeToggler'
import SidebarWrapper from './SidebarWrapper'

export type NavSize = 'small' | 'large'

export const ADMIN_SIDEBAR_EXPANDED_WIDTH = 300
export const ADMIN_SIDEBAR_SM_WIDTH = 75
function Sidebar() {
    const { navSize } = useAdminSidebar()
    const { isMobile } = useDevice()
    const bg = useCardBg()
    const theme = useTheme()
    return (
        <SidebarWrapper>
            <Box
                pos={{
                    lg: 'fixed',
                }}
                top={0}
                left={0}
                bottom={0}
                zIndex={theme.zIndices.sticky + 1}
                shadow={'lg'}
                bg={bg}
                transitionProperty="background-color"
                transitionDuration={'normal'}
                p={{
                    base: 2,
                    lg: 4,
                }}
                w={{
                    base: ADMIN_SIDEBAR_EXPANDED_WIDTH + 'px',
                    lg:
                        navSize == 'small'
                            ? ADMIN_SIDEBAR_SM_WIDTH + 'px'
                            : ADMIN_SIDEBAR_EXPANDED_WIDTH + 'px',
                }}
                h={'100vh'}
            >
                <VStack
                    overflowY={'auto'}
                    w={'100%'}
                    h={'100%'}
                    justifyContent="space-between"
                    align={'stretch'}
                >
                    {/* NAV BOX */}
                    <VStack
                        align={{
                            base: 'flex-start',
                            lg: navSize == 'small' ? 'center' : 'flex-start',
                        }}
                        spacing={5}
                    >
                        <Flex
                            flexDir={{
                                base: 'row',
                                lg: navSize == 'small' ? 'column' : 'row',
                            }}
                            w="100%"
                            justify={'space-between'}
                        >
                            {!isMobile ? (
                                <>
                                    <NavSizeToggler />
                                </>
                            ) : null}
                        </Flex>
                        <Nav />
                    </VStack>

                    {/* AVATAR BOX*/}
                    {/* <VStack
                        mb="4"
                        align={{
                            base: 'flex-start',
                            lg: navSize == 'small' ? 'center' : 'flex-start',
                        }}
                    >
                        <Divider
                            display={{
                                base: 'flex',
                                lg: navSize == 'small' ? 'none' : 'flex',
                            }}
                        />
                        <HStack mt={5}>
                            <Avatar size="sm" src={AVATAR} />
                            <VStack
                                ml={5}
                                align="stretch"
                                display={{
                                    base: 'flex',
                                    lg: navSize == 'small' ? 'none' : 'flex',
                                }}
                            >
                                <Heading as="h3" size="sm">
                                    Jennie Kim
                                </Heading>
                                <Subtitle sx={{ mt: '0 !important' }}>Admin</Subtitle>
                            </VStack>
                        </HStack>
                    </VStack> */}
                </VStack>
            </Box>
        </SidebarWrapper>
    )
}

export default memo(Sidebar)
