import {
  Flex,
  Text,
  VStack,
  Heading,
  Box,
  Button,
  Input,
  HStack,
  Center,
  Stack,
  InputGroup,
  InputLeftElement,
  IconButton,
  Icon,
  Switch,
  useColorMode,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
} from '@chakra-ui/react'
import { SearchIcon, EmailIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'

const Narbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const variant = useBreakpointValue({ base: onOpen, md: onOpen });

  return (
    <HStack marginTop={2} w="full" padding="0 2.2rem">
      <HStack spacing={6} display={['none', 'none', 'flex', 'flex']}>
        <Flex>
          <Link href="/">
            <Image
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              alt="llogo"
              w="91"
              h="34"
            />
          </Link>
        </Flex>
        <Box>
          <Text fontSize={'sm'}>Catogories</Text>
        </Box>
        <Box flex-grow="1">
          <SearchBar />
        </Box>
        <Box w="121px">
          <Text fontSize={'sm'}>Udemy Business</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'}>Teach on Udemy</Text>
        </Box>
        <Box>
          <Switch color="green.500" isChecked={isDark} onChange={toggleColorMode} />
        </Box>
        <Box>
          <Link href="#">
            <Button colorScheme="teal" variant="ghost">
              <Icon as={AiOutlineShoppingCart} w={8} h={8} />
            </Button>
          </Link>
        </Box>
        <HStack>
          <Link href="#">
            <Button variant="outline" colorScheme="black">
              Log in
            </Button>
          </Link>
          <Link href="#">
            <Button bg="blackAlpha.800" variant="solid">
              <Text color="white">Sign up</Text>
            </Button>
          </Link>
          <Link href="#">
            <Button colorScheme="black" variant="outline">
              {' '}
              <Icon as={BiWorld} />{' '}
            </Button>
          </Link>
        </HStack>
      </HStack>

      <Flex display={['flex', 'flex', 'flex', 'none']}>
        <HStack w="full" spacing={10}>
          <Box>
            <IconButton
              aria-label="Open Menu"
              size="lg"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          </Box>

          <HStack>
            <Box>
              <Heading>Udemy</Heading>
            </Box>
          </HStack>
          <HStack>
            <IconButton aria-label="Open Car" size="lg" icon={<AiOutlineShoppingCart />} />
          </HStack>
          <HStack>
            <IconButton aria-label="Open Search" size="lg" icon={<SearchIcon />} />
          </HStack>
        </HStack>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  )
}

export default Narbar
