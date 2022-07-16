import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import {
    apiReachNewNotifications,
    apiReadNotification,
    countMyNewNotifications,
    countMyNotifications,
    fetchMyNotifications,
} from '../../../apis/my-notification.api'
import QueryHelper from '../../../utils/helpers/QueryHelper'
import INotification from '../interfaces/models/notification.interface'
import { countMyUnreadNotifications } from './../../../apis/my-notification.api'
import { useAuth } from './../../auth/providers/auth.provider'

const ROWS_PER_PAGE = 5
export const RQK_MY_NOTIFICATIONS = 'my-notifications'
export const useMyNotificationsQuery = (options?: UseInfiniteQueryOptions<INotification[]>) => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    const { data: count = 0 } = useCountMyNotificationQuery()
    return useInfiniteQuery<INotification[]>(
        [RQK_MY_NOTIFICATIONS, ROWS_PER_PAGE],
        fetchMyNotifications,
        {
            notifyOnChangeProps: 'tracked',
            keepPreviousData: true,
            getNextPageParam: (_lastPage, pages) =>
                QueryHelper.getNextPageParams(pages.length, ROWS_PER_PAGE, count),
            enabled: enableAuthFetch,
            ...options,
        }
    )
}

export const useCountMyNotificationQuery = () => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<number>([RQK_MY_NOTIFICATIONS, 'count'], countMyNotifications, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
    })
}

export const useCountMyUnreadNotificationQuery = () => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<number>([RQK_MY_NOTIFICATIONS, 'unread-count'], countMyUnreadNotifications, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
    })
}

export const useCountMyNewNotificationQuery = () => {
    const {
        state: { enableAuthFetch },
    } = useAuth()
    return useQuery<number>([RQK_MY_NOTIFICATIONS, 'new-count'], countMyNewNotifications, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        enabled: enableAuthFetch,
    })
}

export const useReachMyNotifications = () => {
    const queryClient = useQueryClient()
    return useMutation(apiReachNewNotifications, {
        onMutate: () => {},
        onSuccess: (_) => {
            queryClient.invalidateQueries([RQK_MY_NOTIFICATIONS, 'new-count'])
        },
    })
}

export const useReadNotification = () => {
    const queryClient = useQueryClient()
    return useMutation(apiReadNotification, {
        onMutate: () => {},
        onSuccess: (_) => {
            queryClient.invalidateQueries([RQK_MY_NOTIFICATIONS])
        },
    })
}
