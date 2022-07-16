import { Box, Button, ButtonGroup, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import AppImg from '../../../../../utils/constants/app-img.constant'
import CourseHelper from '../../../../../utils/helpers/model-helpers/course.helper'
import PathHelper from '../../../../../utils/helpers/path.helper'
import { useAuth } from '../../../../auth/providers/auth.provider'
import CourseImage from '../../../../shared/components/CourseImage'
import NextLink from '../../../../shared/components/NextLink'
import Price from '../../../../shared/components/Price'
import { useSubtitleColor } from '../../../../shared/hooks/style.hook'
import ICourse from '../../../../shared/interfaces/models/course.interface'
import Rating from '../../../components/Rating'
import { useCart } from '../../../providers/cart.provider'
import { useAddToWishlist } from '../../../queries/wishlist-query.hook'
import { CourseExcerptMeta } from '../../SearchPage/FilteredCourseList/FilteredCourseExcerpt'

const CartCoursePrice = ({ course }: { course: ICourse }) => {
    const subColor = useSubtitleColor()
    const prices = CourseHelper.getPrices(
        course.basicInfo.price,
        course.basicInfo.currency,
        course.promotions
    )
    return (
        <Stack spacing={0}>
            <Text color={'pink.500'} fontWeight={'bold'}>
                <Price value={prices.sellPrice} />
            </Text>
            {prices.sellPrice != prices.originPrice && (
                <Text as="del" color={subColor} fontSize="sm">
                    <Price value={prices.originPrice} />
                </Text>
            )}
        </Stack>
    )
}

const CourseActions = ({ course }: { course: ICourse }) => {
    const {
        state: { user },
    } = useAuth()
    const { deleteCourseInCart } = useCart()
    const { mutate: addToWishlist } = useAddToWishlist()
    const onRemove = () => {
        deleteCourseInCart(course)
    }
    const onMoveToWishlist = () => {
        addToWishlist([course._id])
        deleteCourseInCart(course)
    }
    return (
        <ButtonGroup
            flexDir={{ base: 'row', sm: 'column' }}
            alignItems={{ base: 'center', sm: 'end' }}
        >
            <Button onClick={onRemove} size="sm" variant="link" colorScheme={'purple'}>
                Remove
            </Button>
            {/* <Button onClick={onRemove} size="sm" variant="link" colorScheme={'purple'}>
                Save for Later
            </Button> */}
            {!!user && (
                <Button onClick={onMoveToWishlist} size="sm" variant="link" colorScheme={'purple'}>
                    Move to Wishlist
                </Button>
            )}
        </ButtonGroup>
    )
}

function CartCourse({ course }: { course: ICourse }) {
    const subColor = useSubtitleColor()
    const courseLink = PathHelper.getCourseDetailPath(course.basicInfo.slug)
    return (
        <HStack spacing={{ md: 10, lg: 20 }} align="start">
            <Stack
                flexDir={{ base: 'column', md: 'row' }}
                align="start"
                gap={{ base: 0, md: 2 }}
                spacing={{ base: 2, md: 0 }}
                flex={1}
            >
                <HStack align={'end'} justify="space-between">
                    <NextLink href={courseLink}>
                        <CourseImage src={course.basicInfo.image || AppImg.MEDIA_PLACEHOLDER} />
                    </NextLink>
                    <Box display={{ md: 'none' }}>
                        <CartCoursePrice course={course} />
                    </Box>
                </HStack>
                {/* INFO */}
                <Stack
                    flexDir={{ base: 'column', sm: 'row' }}
                    flex={1}
                    justify="space-between"
                    align={'start'}
                    gap={15}
                    spacing={0}
                >
                    {/* TITLE & SUBTITLE */}
                    <Stack spacing={0}>
                        <NextLink href={courseLink}>
                            <Heading fontSize={'sm'}>{course.basicInfo.title}</Heading>
                        </NextLink>

                        <NextLink href={courseLink}>
                            <Text color={subColor} fontSize="xs">
                                {course.basicInfo.subtitle}
                            </Text>
                        </NextLink>

                        {course.meta?.avgRatingScore && (
                            <Rating
                                size="sm"
                                value={course.meta.avgRatingScore}
                                ratingCount={course.meta.ratingCount}
                            />
                        )}
                        <CourseExcerptMeta course={course} />
                    </Stack>

                    {/* ACTIONS */}
                    <CourseActions course={course} />
                </Stack>
            </Stack>
            {/* PRICE */}
            <Box display={{ base: 'none', md: 'block' }}>
                <CartCoursePrice course={course} />
            </Box>
        </HStack>
    )
}

export default React.memo(CartCourse)
