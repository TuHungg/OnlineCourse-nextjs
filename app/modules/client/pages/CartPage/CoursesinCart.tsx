import { VStack, Text, Stack, Image } from '@chakra-ui/react'
import React from 'react'

const CoursesinCart = () => {
    return (
        <Stack maxW={'820px'}>
            <Text>{'number'} Courses in Cart</Text>
            <Stack>
                <Image
                    w="120px"
                    h="120px"
                    src="https://vodongho.com/wp-content/uploads/2022/01/android-flip-image-hero.png"
                    alt="imgcourse"
                />
            </Stack>
        </Stack>
    )
}

export default CoursesinCart
