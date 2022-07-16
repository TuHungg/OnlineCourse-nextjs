import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { isCourseInCart } from '../../../store/course/cart.slice'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'
import ICourse from '../../shared/interfaces/models/course.interface'
import { useCart } from '../providers/cart.provider'
import { useLearningCourseIdsQuery } from '../queries/learning-courses-query.hook'
export interface AddToCartButtonProps extends ButtonProps {
    course: ICourse
}
function AddToCartButton({ course, ...props }: AddToCartButtonProps) {
    const { addToCart } = useCart()
    const { data: learningCourseIds = [] } = useLearningCourseIdsQuery()
    const existInCart = useSelector(isCourseInCart(course._id))
    const isLearning = learningCourseIds.indexOf(course._id) > -1
    if (isLearning)
        return (
            <NextLink href={PathHelper.getMyCoursesPath()} linkProps={{ flex: 1 }}>
                <Button colorScheme="purple" w="full" {...props}>
                    Go to My Course
                </Button>
            </NextLink>
        )
    if (existInCart)
        return (
            <NextLink linkProps={{ flex: 1 }} href={PathHelper.getCartPath()}>
                <Button colorScheme="purple" w="full" {...props}>
                    Go to Cart
                </Button>
            </NextLink>
        )
    const onAddToCart = () => {
        addToCart(course)
    }
    return (
        <Button onClick={onAddToCart} colorScheme="purple" w="full" {...props}>
            Add to Cart
        </Button>
    )
}

export default React.memo(AddToCartButton)
