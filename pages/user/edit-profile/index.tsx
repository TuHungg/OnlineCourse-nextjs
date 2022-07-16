import { Stack } from '@chakra-ui/react'
import React from 'react'
import ClientLayout from '../../../app/modules/client/ClientLayout'
import ClientPageContainer from '../../../app/modules/client/components/ClientPageContainer'
import ClientPageHeading from '../../../app/modules/client/components/ClientPageHeading'
import ProfileForm from '../../../app/modules/client/pages/ProfilePage/ProfileForm'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

type Props = {}

const EditProfilePage: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <MyHead title={AppTitle.EDIT_PROFILE} />
            <ClientPageContainer maxW={'container.sm'}>
                <Stack spacing={5} pb={10}>
                    <ClientPageHeading>Your Profile</ClientPageHeading>
                    <ProfileForm />
                </Stack>
            </ClientPageContainer>
        </>
    )
}

EditProfilePage.getLayout = ClientLayout

export default EditProfilePage
