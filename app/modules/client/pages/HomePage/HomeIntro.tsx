import { Image, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import ISlider from '../../../shared/interfaces/models/slider.interface'
import ClientPageContainer from '../../components/ClientPageContainer'
import { GroupProvider, useCourseGroup } from '../../providers/group.provider'
import { useHomeSlidersQuery } from '../../queries/home-sliders-query.hook'

const limit = 2
const List = (props: { items?: ISlider[] }) => {
    const images =
        props.items?.map((item, i) => {
            return <Image draggable={false} key={i} src={item.picture || ''} alt="" />
        }) || []
    return (
        <Carousel
            arrows={false}
            containerClass="react-multi-carousel-list home-intro-carousel-container"
            itemClass="home-intro-carousel-item"
            responsive={{
                base: {
                    breakpoint: { max: 10000, min: 0 },
                    items: 1,
                    slidesToSlide: 1,
                },
            }}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
        >
            {images}
        </Carousel>
    )
}

const Main = () => {
    const {
        state: { page },
    } = useCourseGroup()
    const { isLoading, hasNextPage, fetchNextPage, data } = useHomeSlidersQuery(limit)
    useEffect(() => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }, [page, hasNextPage, fetchNextPage])
    const sliders = data?.pages?.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    return (
        <ClientPageContainer px={0}>
            <Skeleton isLoaded={!isLoading}>
                <List items={sliders} />
            </Skeleton>
        </ClientPageContainer>
    )
}

const HomeIntro = () => {
    return (
        <GroupProvider limit={limit}>
            <Main />
        </GroupProvider>
    )
}

export default React.memo(HomeIntro)
