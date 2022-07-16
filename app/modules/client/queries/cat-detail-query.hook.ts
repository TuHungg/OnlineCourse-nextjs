import { ICategory } from '../../shared/interfaces/models/category.interface'
import { useQuery, UseQueryOptions } from 'react-query'
import { fetchBySlug } from '../../../apis/acp/admin.api'
import { useRouter } from 'next/router'

export const RQK_CAT_DETAIL = 'cat-detail'

export const getCatDetailSlug = (params: any) => {
    const { catSlugs = [] } = params
    const [primarySlug, subSlug] = catSlugs as string[]
    const slug = subSlug ? subSlug : primarySlug
    return slug
}

export const useCatDetailQuery = (options?: UseQueryOptions<ICategory>) => {
    const router = useRouter()
    const slug = getCatDetailSlug(router.query)
    return useQuery<ICategory>(
        [RQK_CAT_DETAIL, slug],
        () => fetchBySlug<ICategory>('categories', slug + ''),
        {
            enabled: !!slug,
            notifyOnChangeProps: ['data'],
            ...options,
        }
    )
}
