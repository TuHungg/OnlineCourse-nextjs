import {
  Box,
  Heading,
  HStack,
  Stack,
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from '@chakra-ui/react'

const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Stack w="full" h="300px" bg={'blackAlpha.900'}>
      <HStack spacing={180} mt={10}>
        <VStack>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
        </VStack>

        <VStack>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
        </VStack>

        <VStack>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
          <Link>
            <Text color="white" fontSize="sm">
              Udemy business
            </Text>
          </Link>
        </VStack>

        <Box>
          <Button onClick={onOpen} variant="outline" color={'white'}>
            English
          </Button>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Choose a language</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack spacing={100}>
                <Box>
                  <Text>English</Text>
                  <Text>China</Text>
                  <Text>Francias</Text>
                  <Text>Italiano</Text>
                  <Text>Romana</Text>
                  <Text>Viet Nam</Text>
                </Box>
                <Box>
                  <Text>English</Text>
                  <Text>China</Text>
                  <Text>Francias</Text>
                  <Text>Italiano</Text>
                  <Text>Romana</Text>
                  <Text>Viet Nam</Text>
                </Box>
                <Box>
                  <Text>English</Text>
                  <Text>China</Text>
                  <Text>Francias</Text>
                  <Text>Italiano</Text>
                  <Text>Romana</Text>
                  <Text>Viet Nam</Text>
                </Box>
              </HStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>

      <Box pt={100} pl={10}>
        <Link>
          <Heading color="white">Udemy</Heading>
        </Link>
      </Box>
    </Stack>
  )
}

export default Footer
