import { Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCoursesInCart } from '../../../../../store/course/cart.slice'
import { useBorderColor } from '../../../../shared/hooks/style.hook'
import CartCourse from './CartCourse'

export default function CartCourseList() {
    const borderColor = useBorderColor()
    const courses = useSelector(selectCoursesInCart)
    const coursesHtml = courses.map((item, i) => {
        return <CartCourse key={item._id} course={item} />
    })
    return (
        <Stack
            divider={<StackDivider color={borderColor} />}
            border="1px solid"
            borderColor={borderColor}
            spacing={4}
            p={4}
        >
            {coursesHtml}
        </Stack>
    )
}
