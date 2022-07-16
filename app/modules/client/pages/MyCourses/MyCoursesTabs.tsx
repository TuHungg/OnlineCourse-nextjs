import {
    Box,
    Heading,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import { TMyCourse } from '../../../shared/interfaces/models/user.interface'
import ClientPageContainer from '../../components/ClientPageContainer'
import ArchivedCourses from './ArchivedCourses/ArchivedCourses'
import LearningCourses from './LearningCourses/LearningCourses'
import Wishlist from './Wishlist/Wishlist'

interface ITab {
    path: TMyCourse
    label: string
}
const tabs: ITab[] = [
    {
        label: 'All courses',
        path: 'learning',
    },
    {
        label: 'Wishlist',
        path: 'wishlist',
    },
    {
        label: 'archived',
        path: 'archived',
    },
]
const paths = tabs.map((item) => item.path)
export default function MyCoursesTabs() {
    const [currentPath, setCurrentPath] = useState<TMyCourse>()
    const headingBg = useColorModeValue('gray.800', 'blackAlpha.500')
    const router = useRouter()
    const { params } = router.query
    useEffect(() => {
        if (params) {
            const path = params[0] as TMyCourse
            if (!paths.includes(path)) {
                router.replace(PathHelper.getMyCoursesPath())
            }
            setCurrentPath(params?.at(0) as any)
        } else {
            // router.push(router.asPath + '/all', undefined, { shallow: true })
        }
    }, [params, router])
    const tabListHtml = tabs.map((item) => (
        <NextLink key={item.path} href={PathHelper.getMyCoursesPath(item.path)}>
            <Tab>{item.label}</Tab>
        </NextLink>
    ))
    return (
        <Tabs
            isLazy
            variant="soft-rounded"
            colorScheme={'gray'}
            index={currentPath ? paths.indexOf(currentPath) : -1}
        >
            <Box bgColor={headingBg}>
                <ClientPageContainer>
                    <Stack spacing={5} py={[4, 5, 6]}>
                        <Heading fontSize="4xl" color="whitesmoke">
                            My learning
                        </Heading>
                        <TabList>{tabListHtml}</TabList>
                    </Stack>
                </ClientPageContainer>
            </Box>

            <ClientPageContainer>
                <TabPanels>
                    <TabPanel px={0}>
                        <LearningCourses />
                    </TabPanel>
                    <TabPanel px={0}>
                        <Wishlist />
                    </TabPanel>
                    <TabPanel px={0}>
                        <ArchivedCourses />
                    </TabPanel>
                </TabPanels>
            </ClientPageContainer>
        </Tabs>
    )
}
