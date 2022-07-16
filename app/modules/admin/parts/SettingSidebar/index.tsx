import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Text,
} from '@chakra-ui/react'
import ThemeButton from '../../components/ThemeButton'
import { useSettingSidebar } from '../../providers/setting-sidebar.provider'

export default function SettingSidebar() {
    const { isOpen, onClose, onOpen } = useSettingSidebar()
    return (
        <>
            <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <HStack justify={'space-between'}>
                            <Text>Settings</Text>
                            <ThemeButton />
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
