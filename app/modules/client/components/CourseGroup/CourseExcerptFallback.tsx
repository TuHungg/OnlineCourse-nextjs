import { StarIcon } from '@chakra-ui/icons';
import { Image, Box, Badge } from '@chakra-ui/react';
import React from 'react'

export default function CourseExcerptFallback() {
    const property = {
        imageUrl: 'https://vietnix.vn/wp-content/uploads/2021/07/python-la-gi.webp',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Help you learning python super faster',
        formattedPrice: '$18.99',
        reviewCount: 34,
        rating: 4,
        discount: '$89.99',
        bestseller: 'Bestseller',
    };
    return (

        <Box as="button" maxW="sm" overflow="hidden" h="284px">
            <Image src={property.imageUrl} alt={property.imageAlt} />

            <Box p="2">
                <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" colorScheme="green">
                        New
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {property.beds} beds &bull; {property.baths} baths
                    </Box>
                </Box>

                <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {property.title}
                </Box>

                <Box display="flex" alignItems="center">
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon key={i} color={i < property.rating ? 'yellow.600' : 'gray.300'} />
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {property.reviewCount} reviews
                    </Box>
                </Box>

                <Box mr={155} display="flex" fontWeight="semibold">
                    {property.formattedPrice}
                    <Box as="del" ml="3" color="gray.400">
                        {property.discount}
                    </Box>
                </Box>
                <Box display="flex" mt="2 ">
                    <Badge bg="yellow.400" variant="subtle">
                        {property.bestseller}
                    </Badge>
                </Box>
            </Box>
        </Box>

    )
}
