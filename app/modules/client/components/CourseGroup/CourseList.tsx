import { Box } from '@chakra-ui/react'
import React from 'react'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import ICourse from '../../../shared/interfaces/models/course.interface'
import { useCourseGroup } from '../../providers/group.provider'
import HomeCourseExcerpt from './HomeCourseExcerpt'

const responsive: ResponsiveType = {
    xl: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5,
    },
    lg: {
        breakpoint: { max: 1023, min: 768 },
        items: 4,
        slidesToSlide: 4,
    },
    md: {
        breakpoint: { max: 767, min: 640 },
        items: 3,
        slidesToSlide: 3,
        partialVisibilityGutter: 10,
    },
    sm: {
        breakpoint: { max: 639, min: 400 },
        items: 2,
        slidesToSlide: 2,
        partialVisibilityGutter: 20,
    },
    base: {
        breakpoint: { max: 399, min: 0 },
        items: 2,
        slidesToSlide: 2,
        partialVisibilityGutter: 10,
    },
}

export interface CourseListProps {
    courses: ICourse[]
}

const CourseList = (props: CourseListProps) => {
    const {
        methods: { onBeforeChange },
    } = useCourseGroup()
    // const [max] = useMediaQuery('(max-width: 479px)')
    // const [min] = useMediaQuery('(min-width: 400px)')
    const courseExcerptsHtml = props.courses.map((item, i) => {
        return (
            <Box key={i} px={2} draggable={false}>
                <HomeCourseExcerpt course={item} />
            </Box>
        )
    })

    return (
        <Carousel
            className="course-group-carousel"
            beforeChange={onBeforeChange}
            draggable={false}
            responsive={responsive}
            shouldResetAutoplay={false}
            partialVisible={true}
        >
            {courseExcerptsHtml}
        </Carousel>
    )
}

export default React.memo(CourseList)
