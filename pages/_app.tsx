import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import NotificationDialog from '../app/modules/admin/components/NotificationDialog'
import SimpleDialog from '../app/modules/admin/components/SimpleDialog/SimpleDialog'
import NotificationDialogProvider from '../app/modules/admin/providers/notification-dialog.provider'
import SimpleDialogProvider from '../app/modules/admin/providers/simple-dialog.provider'
import { AuthProvider } from '../app/modules/auth/providers/auth.provider'
import { AppProvider } from '../app/modules/shared/providers/app.provider'
import { store } from '../app/store/store'
import theme from '../app/theme'
import { AppPropsWithLayout, NextPageWithLayout } from '../app/types/next'
import AppImg from '../app/utils/constants/app-img.constant'
import { APP_NAME } from '../app/utils/constants/app.constant'
import '../styles/globals.scss'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // notifyOnChangeProps: 'tracked',
            retry: 0,
        },
    },
})
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page: NextPageWithLayout) => page)
    return (
        <>
            <Head>
                <title>{APP_NAME}</title>
                <link rel="icon" href={AppImg.APP_LOGO} />
                <meta name="referrer" content="no-referrer" />
            </Head>
            <DndProvider backend={HTML5Backend}>
                <ChakraProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <Hydrate state={pageProps.dehydratedState}>
                            <AppProvider>
                                <Provider store={store}>
                                    <SimpleDialogProvider>
                                        <NotificationDialogProvider>
                                            <AuthProvider>
                                                {getLayout(<Component {...pageProps} />)}
                                                <SimpleDialog />
                                            </AuthProvider>
                                            <NotificationDialog />
                                        </NotificationDialogProvider>
                                    </SimpleDialogProvider>
                                </Provider>
                            </AppProvider>
                            {/* <ReactQueryDevtools  initialIsOpen={false} position="bottom-right" /> */}
                        </Hydrate>
                    </QueryClientProvider>
                </ChakraProvider>
            </DndProvider>
        </>
    )
}

export default MyApp
