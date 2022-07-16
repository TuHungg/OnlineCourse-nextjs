import { Container, Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ClientLayout from '../../app/modules/client/ClientLayout'
import ClientPageContainer from '../../app/modules/client/components/ClientPageContainer'
import ClientPageHeading from '../../app/modules/client/components/ClientPageHeading'
import CartContent from '../../app/modules/client/pages/CartPage/CartContent/CartContent'
import EmptyCart from '../../app/modules/client/pages/CartPage/EmptyCart'
import MyHead from '../../app/modules/shared/components/MyHead'
import { selectTotalCourse } from '../../app/store/course/cart.slice'
import { NextPageWithLayout } from '../../app/types/next'
import AppTitle from '../../app/utils/constants/app-title.constant'

const CartPage: NextPageWithLayout = () => {
    const totalCourse = useSelector(selectTotalCourse)
    return (
        <>
            <MyHead title={AppTitle.CART} />
            <ClientPageContainer>
                <Stack spacing={10}>
                    <ClientPageHeading>Shopping Cart</ClientPageHeading>
                    <Stack>
                        <Heading fontSize="md">{totalCourse} Courses in Cart</Heading>
                        {totalCourse > 0 ? <CartContent /> : <EmptyCart />}
                    </Stack>
                    {/* <Heading>{JSON.stringify(router.query)}</Heading> */}
                    {/* <ShoppingCart /> */}
                </Stack>
            </ClientPageContainer>
        </>
    )
}

CartPage.getLayout = ClientLayout
export default CartPage
