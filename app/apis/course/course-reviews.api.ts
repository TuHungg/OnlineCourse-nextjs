import IClientUrlParams from '../../modules/admin/interfaces/client-url-params.interface'
import IReview from '../../modules/shared/interfaces/models/review.interface'
import { axiosApiInstance } from '../../utils/axios-utils'
import { CONTROLLER } from '../../utils/constants/app.constant'
import UrlHelper from '../../utils/helpers/url.heper'

const getPrefix = (id: string) => `${CONTROLLER.course}/${id}/reviews`

// CLIENT APIS
export function fetchCourseReviews({ queryKey, pageParam = 1 }: any): Promise<IReview[]> {
    const [_key, courseId, limit, filterStar]: [string, string, number, number | undefined] =
        queryKey

    const query: IClientUrlParams = {
        _limit: limit,
        _page: pageParam,
        rating_filter: filterStar,
    }
    const queryString = UrlHelper.cvtObjToQueryString(query)
    return axiosApiInstance.get(`${getPrefix(courseId)}?${queryString}`).then((res) => res.data)
}

export function countCourseReviews(courseId: string, filterStar?: number): Promise<number> {
    const queryString = typeof filterStar != 'undefined' ? `rating_filter=${filterStar}` : ''
    return axiosApiInstance
        .get(`${getPrefix(courseId)}/count?${queryString}`)
        .then((res) => res.data)
}
