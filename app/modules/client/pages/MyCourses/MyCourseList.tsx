import { HStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import MyCircularProgress from '../../../shared/components/MyCircularProgress'
import IModel from '../../../shared/interfaces/models/model.interface'
import InfiniteHorizontalList from '../../components/InfiniteHorizontalList'
import NoCoursesMessage from './NoCoursesMessage'

export interface MyCourseListProps<T extends IModel> {
    isLoading: boolean
    items: T[]
    renderItem: (item: T, i: number) => ReactNode
}
export default function MyCourseList<T extends IModel>(props: MyCourseListProps<T>) {
    if (props.isLoading)
        return (
            <HStack justify={'center'}>
                <MyCircularProgress />
            </HStack>
        )
    if (props.items.length == 0) return <NoCoursesMessage />
    return <InfiniteHorizontalList renderItem={props.renderItem} list={props.items} />
}
