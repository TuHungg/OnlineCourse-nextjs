import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import AuthBox from '../../app/modules/auth/components/AuthBox'
import GoogleLoginButton from '../../app/modules/auth/components/LoginGoogleButton'
import LoginSupport from '../../app/modules/auth/components/LoginSupport'
import LoginForm from '../../app/modules/auth/forms/LoginForm/LoginForm'
import { useAuthParams } from '../../app/modules/auth/providers/auth-params.provider'
import { useAuth } from '../../app/modules/auth/providers/auth.provider'
import ClientLayout from '../../app/modules/client/ClientLayout'
import MyHead from '../../app/modules/shared/components/MyHead'
import { NextPageWithLayout } from '../../app/types/next'
import AppTitle from '../../app/utils/constants/app-title.constant'
import { APP_NAME } from '../../app/utils/constants/app.constant'

const LoginPage: NextPageWithLayout = () => {
    const router = useRouter()
    const {
        methods: { setWaitingRedirectPath },
    } = useAuthParams()
    const {
        state: { user },
    } = useAuth()

    useEffect(() => {
        return () => {
            setWaitingRedirectPath()
        }
    }, [router, setWaitingRedirectPath, user])
    return (
        <>
            <MyHead title={AppTitle.LOGIN} />
            <AuthBox title={`Login to ${APP_NAME} account!`}>
                <GoogleLoginButton />
                <Stack>
                    <LoginForm />
                    <LoginSupport />
                </Stack>
            </AuthBox>
        </>
    )
}
LoginPage.getLayout = ClientLayout

export default LoginPage
