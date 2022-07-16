import {
    AspectRatio,
    Box,
    HStack,
    Skeleton,
    SkeletonText,
    Stack,
    StackDivider,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import {
    AuthorSkeleton,
    PriceSkeleton,
    RatingSkeleton,
} from '../../../components/CourseGroup/CourseGroupSkeleton'

const ImageSkeleton = () => {
    return (
        <Skeleton>
            <AspectRatio w={{ base: '100px', sm: '150px', md: '250px' }} ratio={16 / 9}>
                <div></div>
            </AspectRatio>
        </Skeleton>
    )
}
const TitleSkeleton = () => {
    return <Skeleton noOfLines={1} h={'18px'} />
}
const SubtitleSkeleton = () => {
    return <SkeletonText noOfLines={2} spacing={[1, 2]} skeletonHeight={3} />
}

const MetaSkeleton = () => {
    return <Skeleton w="80px" h="12px" />
}
const HistorySkeleton = () => {
    return <Skeleton w="75px" h="12px" />
}

const CourseSkeleton = () => {
    return (
        <HStack align={'start'}>
            <ImageSkeleton />
            <Stack spacing={[1, 2]} flex={1} pl={{ md: 4 }}>
                {/* TITLE & SUBTITLE */}
                <Stack spacing={[1, 2]}>
                    <TitleSkeleton />
                    <Box display={{ base: 'none', md: 'unset' }}>
                        <SubtitleSkeleton />
                    </Box>
                </Stack>
                {/* CREATED BY */}
                <AuthorSkeleton height={'12px'} />
                {/* META */}
                <Stack spacing={[1, 2]}>
                    <RatingSkeleton height="15px" />
                    <MetaSkeleton />
                    <HistorySkeleton />
                    <Box display={{ base: 'block', md: 'none' }}>
                        <PriceSkeleton />
                    </Box>
                </Stack>
            </Stack>
            <Box display={{ base: 'none', md: 'block' }} alignSelf={'start'} fontSize={'lg'} ml={4}>
                <PriceSkeleton />
            </Box>
        </HStack>
    )
}

function FilteredCourseSeketon() {
    const renderItem = useCallback((_, i) => {
        return <CourseSkeleton key={i} />
    }, [])
    return (
        <Stack divider={<StackDivider />} spacing={5}>
            {[...Array(3)].map(renderItem)}
        </Stack>
    )
}

export default React.memo(FilteredCourseSeketon)
