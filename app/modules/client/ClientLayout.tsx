import { Box, Stack } from '@chakra-ui/react'
import { ReactElement } from 'react'
import 'react-multi-carousel/lib/styles.css'
import { AuthParamsProvider } from '../auth/providers/auth-params.provider'
import { SidebarProvider } from '../shared/providers/sidebar.provider'
import MobileSearch from './components/MobileSearch/MobileSearch'
import ClientMobileSidebar from './parts/Sidebar/ClientMobileSidebar'
import TopBar from './parts/Topbar/Topbar'
import { CartProvider } from './providers/cart.provider'
import { ClientParamsProvider } from './providers/client-params.provider'
import { MobileSearchProvider } from './providers/mobile-search-provider'

export default function ClientLayout(page: ReactElement) {
    return (
        <Box>
            <AuthParamsProvider>
                <ClientParamsProvider>
                    <SidebarProvider>
                        <CartProvider>
                            <MobileSearchProvider>
                                <TopBar />
                                <Box>{page}</Box>
                                <ClientMobileSidebar />
                                <MobileSearch />
                                {/* <Footer /> */}
                            </MobileSearchProvider>
                        </CartProvider>
                    </SidebarProvider>
                </ClientParamsProvider>
            </AuthParamsProvider>
        </Box>
    )
}
