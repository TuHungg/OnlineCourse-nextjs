import {
    Center,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    MenuItemProps,
    MenuList,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';
import CustomMenuButton from '../../shared/components/CustomMenuButton';
import { useDarkBg, useDefaultBg, useIColor } from '../../shared/hooks/style.hook';


export interface BriefCardProps {
    icon?: IconType,
    title?: string,
    subtitle?: string,
    rightText?: string
    menuItems?: MenuItemProps[]

}

export default function BriefCard({ icon, title, subtitle, rightText, menuItems }: BriefCardProps) {
    const menuItemsHtml = menuItems?.map(item => {
        return (
            <MenuItem key={item.key} icon={< Icon as={FiPlus} />}>{item.children}</MenuItem >
        )
    })
    const iColor = useIColor();
    const bgColor = useDefaultBg();
    const darkColor = useDarkBg()
    return (
        <VStack
            align={'stretch'}
            p={4}
            borderRadius={15}
            bgColor={darkColor}
            minH={'150px'}
            justify={'space-between'}
            transitionProperty='background-color'
            transitionDuration={'normal'}
        >
            <Flex
                justify={'space-between'}
            >
                <Center w={12} h={12}
                    borderRadius={5}
                    bgColor={bgColor}
                    transitionProperty='background-color'
                    transitionDuration={'normal'}
                >
                    <Icon as={icon} w={5} h={5} />
                </Center>
                {
                    menuItems ?
                        (
                            <Menu>
                                <CustomMenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    color={iColor}
                                >
                                    <Icon as={FiMoreVertical} />
                                </CustomMenuButton>
                                <MenuList>
                                    {menuItemsHtml}
                                </MenuList>
                            </Menu>
                        ) : null

                }


            </Flex>
            <HStack
                align={'flex-end'}
            >
                <VStack
                    flex={1}
                    align={'stretch'}
                >
                    <Heading color={iColor} size={'md'}>{title}</Heading>
                    <Text color={iColor}>{subtitle}</Text>
                </VStack>
                <Heading color={iColor} size={'md'}>{rightText}</Heading>

            </HStack>
        </VStack>
    )
}
