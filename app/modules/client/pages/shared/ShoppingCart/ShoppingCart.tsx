import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import CoursesinCart from '../../CartPage/CoursesinCart'
import MostPopularCoursesGroup from '../../HomePage/MostPopularCoursesGroup'

const ShoppingCart = () => {
    return (
        <Stack>
            <Heading>Shopping Cart</Heading>
            <CoursesinCart />
            <Text>You might also like</Text>
            <MostPopularCoursesGroup />
        </Stack>
    )
}

export default ShoppingCart
