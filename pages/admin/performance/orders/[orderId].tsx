import { GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import AdminLayout from '../../../../app/modules/admin/AdminLayout'
import { CustomerDetailsCard } from '../../../../app/modules/admin/pages/performance/orders/CustomerDetailsCard'
import OrderCourses from '../../../../app/modules/admin/pages/performance/orders/OrderCourses'
import { OrderDetailsCard } from '../../../../app/modules/admin/pages/performance/orders/OrderDetailsCard'
import { useAdminOrderDetailQuery } from '../../../../app/modules/admin/queries/admin-order-detail-query.hook'
import Card from '../../../../app/modules/shared/components/Card'
import MyHead from '../../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../../app/types/next'
import AppTitle from '../../../../app/utils/constants/app-title.constant'

const Page: NextPageWithLayout = () => {
    const { isLoading, data } = useAdminOrderDetailQuery()
    return (
        <>
            <MyHead title={AppTitle.ADMIN_ORDER_DETAIL} />
            <Stack spacing={5}>
                <SimpleGrid spacing={{ md: 5 }} columns={24}>
                    <GridItem colSpan={{ base: 24, md: 12, lg: 11 }}>
                        <OrderDetailsCard />
                    </GridItem>
                    <GridItem colSpan={{ base: 24, md: 12, lg: 12 }}>
                        <CustomerDetailsCard />
                    </GridItem>
                </SimpleGrid>

                <Card>
                    <OrderCourses
                        isLoading={isLoading}
                        data={data?.coursesInOrder}
                        totalPrice={data?.totalPrice}
                    />
                </Card>
            </Stack>
        </>
    )
}

Page.getLayout = AdminLayout
export default Page
