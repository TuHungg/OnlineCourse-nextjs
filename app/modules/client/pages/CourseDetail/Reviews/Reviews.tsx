import { HStack, Select } from '@chakra-ui/react'
import React, { ChangeEventHandler } from 'react'
import { InfiniteData } from 'react-query'
import IReview from '../../../../shared/interfaces/models/review.interface'
import ContentCard from '../../../components/ContentCard'
import ReviewList from './ReviewList'

const RatingFilter = (props: { setFilterStar: (val?: number) => void }) => {
    const optionsHtml = [...Array(5)].map((_, i) => {
        const value = 5 - i
        return (
            <option key={value} value={value}>
                {value} stars
            </option>
        )
    })
    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const val = e.target.value ? Number.parseInt(e.target.value) : undefined
        props.setFilterStar(val)
    }
    return (
        <Select onChange={onChange} maxW={'200px'} placeholder="All ratings">
            {optionsHtml}
        </Select>
    )
}

export interface ReviewsProps {
    data?: InfiniteData<IReview[]>
    isLoading: boolean
    filterStar?: number
    setFilterStar?: (val?: number) => void
    fetchNextPage: () => void
    hasNextPage?: boolean
    showTitle?: boolean
}
export default function Reviews({
    data,
    isLoading,
    filterStar,
    setFilterStar,
    hasNextPage,
    fetchNextPage,
    showTitle = true,
}: ReviewsProps) {
    const reviews = data?.pages.reduce((prev, current) => {
        return prev.concat(current)
    }, [])
    return (
        <ContentCard title={showTitle ? 'Reviews' : ''} border="none">
            {setFilterStar && (
                <HStack justify={'end'}>{<RatingFilter setFilterStar={setFilterStar} />}</HStack>
            )}
            <ReviewList
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                filterStar={filterStar}
                reviews={reviews || []}
            />
        </ContentCard>
    )
}
