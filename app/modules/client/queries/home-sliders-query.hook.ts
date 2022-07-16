import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { countHomeSliders, fetchHomeSliders } from '../../../apis/slider.api'
import ISlider from '../../shared/interfaces/models/slider.interface'

export const RQK_HOME_SLIDERS = 'home-sliders'
export const useHomeSlidersQuery = (limit: number) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        countHomeSliders().then((value) => {
            setCount(value)
        })
    }, [])

    return useInfiniteQuery<ISlider[]>([RQK_HOME_SLIDERS, limit], fetchHomeSliders, {
        keepPreviousData: true,
        staleTime: Infinity,
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < count) {
                return pages.length + 1
            } else return undefined
        },
    })
}
