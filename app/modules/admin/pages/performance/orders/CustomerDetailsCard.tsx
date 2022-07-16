import { Text } from '@chakra-ui/react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import ListTile from '../../../../shared/components/ListTile'
import { useAdminOrderDetailQuery } from '../../../queries/admin-order-detail-query.hook'
import OrderCard from './OrderCard'

export const CustomerDetailsCard = () => {
    const { isLoading, data } = useAdminOrderDetailQuery()
    return (
        <OrderCard
            isLoading={isLoading}
            title="Customer Details"
            data={[
                {
                    icon: AppIcon.user,
                    label: 'Customer',
                    content: (
                        <ListTile
                            alt={''}
                            thumb={data?.history.createdBy.profile.avatar || ''}
                            title={data?.history.createdBy.profile.fullName}
                            thumbSize="xs"
                        />
                    ),
                },
                {
                    icon: AppIcon.mail,
                    label: 'Email',
                    content: <Text>{data?.history.createdBy.email}</Text>,
                },
                {
                    icon: AppIcon.phone,
                    label: 'Phone',
                    content: <Text>{data?.history.createdBy.profile.phone}</Text>,
                },
            ]}
        />
    )
}
