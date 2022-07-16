import React from 'react'
import AuthBox from '../../../app/modules/auth/components/AuthBox'
import ResetPasswordForm from '../../../app/modules/auth/forms/ResetPasswordForm/ResetPasswordForm'
import ClientLayout from '../../../app/modules/client/ClientLayout'
import MyHead from '../../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../../app/types/next'
import AppTitle from '../../../app/utils/constants/app-title.constant'

const ResetPassword: NextPageWithLayout = () => {
    return (
        <>
            <MyHead title={AppTitle.RESET_PASSWORD} />
            <AuthBox title={'Reset Password'}>
                <ResetPasswordForm />
            </AuthBox>
        </>
    )
}

ResetPassword.getLayout = ClientLayout

export default ResetPassword
