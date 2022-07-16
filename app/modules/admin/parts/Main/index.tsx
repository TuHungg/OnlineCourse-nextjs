import React from 'react'
import { Divider, Flex, GridItem, Icon, IconButton, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import TopBar from '../TopBar';
import Card from '../../../shared/components/Card';
import BriefCard from '../../components/BriefCard';

export default function Main() {
    return (
        <Card
            ml={{
                base: 0,
                md: 2
            }}
            px={{
                base: 2,
                md: 4
            }}
            flex={1}
        >

            <VStack
                flex={1}
                justifyContent={'flex-start'}
                align='stretch'
            >
                <TopBar />
                <Divider />
                {/* FEATURE BLOCK */}
                <SimpleGrid columns={2} spacing={4}>
                    <GridItem
                        colSpan={{
                            base: 2, md: 1
                        }}
                    >
                        <SimpleGrid columns={2} spacing={4}>
                            <GridItem colSpan={{
                                base: 2,
                                md: 1
                            }}>
                                <BriefCard />
                            </GridItem><GridItem colSpan={{
                                base: 2,
                                md: 1
                            }}>
                                <BriefCard />
                            </GridItem><GridItem colSpan={{
                                base: 2,
                                md: 1
                            }}>
                                <BriefCard />
                            </GridItem><GridItem colSpan={{
                                base: 2,
                                md: 1
                            }}>
                                <BriefCard />
                            </GridItem>
                        </SimpleGrid>
                    </GridItem>
                    {/* REVIEW PANEL */}
                    <GridItem>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </Card>
    )
}
