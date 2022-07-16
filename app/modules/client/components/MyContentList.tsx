import {
    Text,
    ListItem,
    HStack,
    ListIcon,
    List,
    ListProps,
    useColorModeValue,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'

export interface MyContentListProps extends ListProps {
    data: string[]
}

const ListRow = ({ children }: { children: ReactNode }) => {
    const circleBg = useColorModeValue('gray.900', 'gray.100')
    return (
        <ListItem alignItems={'center'}>
            <HStack spacing={6}>
                <ListIcon as={AppIcon.circle} color={circleBg} w={'8px'} />
                <Text flex={1}>{children}</Text>
            </HStack>
        </ListItem>
    )
}
function MyContentList({ data, ...props }: MyContentListProps) {
    const listRowHtml = data.map((item, i) => {
        return <ListRow key={i}>{item}</ListRow>
    })
    return (
        <List spacing={4} {...props}>
            {listRowHtml}
        </List>
    )
}

export default React.memo(MyContentList)
