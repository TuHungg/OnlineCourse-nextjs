import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    StackDivider,
    VStack,
    Text,
    Stack,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCardBg } from '../../../shared/hooks/style.hook'
import { useActiveColor } from '../../hooks/style.hook'
import { ClientMenuProvider } from '../../providers/client-menu.provider'

type Props = {}

const Main = () => {
    const color = useActiveColor()
    const menuBg = useCardBg()
    return (
        <Box>
            <Button
                as="div"
                sx={{
                    '&:hover': {
                        '> .menu': {
                            display: 'flex !important',
                        },
                    },
                }}
                pos="relative"
            >
                <Icon as={AiOutlineShoppingCart} />
                <Box pt={30} className="menu" pos="absolute" zIndex="sticky" display={'none'}>
                    <VStack
                        // alignItems={'end'}
                        mt={200}
                        mr={200}
                        w="100%"
                        bg={menuBg}
                        left={0}
                        border={'1px solid'}
                        color="gray.500"
                        borderRadius={5}
                        px={2}
                    >
                        <Box borderBottom={'1px solid'} flex={1} p={4} w="250px">
                            Product
                        </Box>
                        <Stack pb={5}>
                            <Box w="250px" pr={60}>
                                <Heading size={'md'} color="black">
                                    Total: $19.99
                                </Heading>
                            </Box>
                            <Button bg={'black'}>
                                <Text color="white">Go to Cart</Text>
                            </Button>
                        </Stack>
                    </VStack>
                </Box>
            </Button>
        </Box>
    )
}

const PopoverBtnCart = (props: Props) => {
    return (
        <ClientMenuProvider>
            <Main />
        </ClientMenuProvider>
    )
}

export default PopoverBtnCart
