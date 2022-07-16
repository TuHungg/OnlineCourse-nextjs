import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { FiUser } from "react-icons/fi";
import BriefCard, { BriefCardProps } from "../../../components/BriefCard";

const briefCardsData: BriefCardProps[] = [
    {
        icon: FiUser,
        title: 'Users',
        subtitle: 'Active Users',
        rightText: '50%',
    },
    {
        icon: FiUser,
        title: 'Users 1',
        subtitle: 'Active Users',
        rightText: '50%'
    },
    {
        icon: FiUser,
        title: 'Users 2',
        subtitle: 'Active Users',
        rightText: '50%'
    },
    {
        icon: FiUser,
        title: 'Users 3',
        subtitle: 'Active Users',
        rightText: '50%'
    },
]

const UserBriefInfo: React.FC = () => {
    const briefCardsHtml = briefCardsData.map(item => {
        return (
            <GridItem key={item.title} colSpan={{ base: 1 }} >
                <BriefCard {...item} />
            </GridItem>
        )
    })
    return <SimpleGrid columns={2} spacing={4}>
        {briefCardsHtml}
    </SimpleGrid>;
}
export default React.memo(UserBriefInfo);