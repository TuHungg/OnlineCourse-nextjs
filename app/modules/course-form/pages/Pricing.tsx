import React from 'react'
import BasicsForm from '../parts/BasicsForm'
import CoursePageSection from '../parts/CoursePageSection'
import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import PricingForm from '../parts/PricingForm'

function Pricing() {
    return (
        <CoursePageSection title={'Pricing'} >
            <Stack spacing={4}>
                <Text>
                    Course Price Tier
                </Text>
                <Text>
                    Please select the price tier for your course below and click Save. The list price that students will see in other currencies is determined using the price tier matrix.
                </Text>
                <Text>If you intend to offer your course for free, the total length of video content must be less than 2 hours.</Text>
            </Stack>
            <PricingForm />
        </CoursePageSection>
    )
}

export default React.memo(Pricing)