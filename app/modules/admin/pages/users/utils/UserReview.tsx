import { Stack, VStack, Heading, HStack, Progress, Button, Text } from "@chakra-ui/react";
import React from "react";
import Card from "../../../../shared/components/Card";
import Subtitle from "../../../../shared/components/Subtitle";

export const UserReview: React.FC = () => {
    return <Card h={'full'}>
        <Stack flexDir={'column'} spacing={3} justify='space-between' h={'full'}>
            <VStack flex={1} align={'stretch'} h={'full'} spacing={{
                base: 2,
                md: 4
            }}>
                <Heading fontSize={'2xl'}>Reviews</Heading>
                <VStack align='stretch'>
                    <HStack justifyContent={'space-between'}>
                        <Subtitle>Positive Reviews</Subtitle>
                        <Subtitle>80%</Subtitle>
                    </HStack>
                    <Progress h={2} borderRadius={4} value={80} />
                </VStack><VStack align='stretch'>
                    <HStack justifyContent={'space-between'}>
                        <Subtitle>Neutral Reviews</Subtitle>
                        <Subtitle>80%</Subtitle>
                    </HStack>
                    <Progress colorScheme={'gray'} h={2} borderRadius={4} value={80} />
                </VStack><VStack align='stretch'>
                    <HStack justifyContent={'space-between'}>
                        <Subtitle>Negative Reviews</Subtitle>
                        <Subtitle>80%</Subtitle>
                    </HStack>
                    <Progress colorScheme={'red'} h={2} borderRadius={4} value={80} />
                </VStack>
            </VStack>
            <HStack pt={{
                base: 4,
                lg: undefined
            }}>
                <Text flex={1}>
                    More than <Text as={'strong'}>1,500,000 </Text>developers
                    used Creative  products and over<Text as='strong'>700,000</Text> projects were created.
                </Text>
                <Button colorScheme={'purple'}>View all reviews</Button>
            </HStack>
        </Stack>
    </Card>;
}
export default React.memo(UserReview);