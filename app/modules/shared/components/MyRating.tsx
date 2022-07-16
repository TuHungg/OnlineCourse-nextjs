import { StarIcon } from '@chakra-ui/icons'
import { color, HStack, Icon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

type IMyRating = {
    color: string
    // onMouseOver:
}

interface defaultProps {
    starCount: number
    // editing: boolean
    starColor: string
    emptyStarColor: string
}

const stars = [1, 2, 3, 4, 5]

const MyRating = ({
    starCount = 5,
    // editing = true,
    starColor = 'yellow.400',
    emptyStarColor = 'gray.400',
}: defaultProps) => {
    const [colorStars1, setColor1] = useState(emptyStarColor)

    const [colorStars2, setColor2] = useState(starColor)

    const onStarHover = (star: any, e: React.MouseEvent<SVGElement, MouseEvent>) => {}

    const starStyle = (star: any) => {
        return 5 >= star ? colorStars1 : colorStars2
    }

    // const renderStar = (st) => {
    //     for let
    // }

    return (
        <>
            <Text>I am feeling...</Text>
            <HStack bg={'gray.700'} spacing={5} py={2} px={2} borderRadius={'30'}>
                {stars.map((star) => (
                    <Icon
                        key={star}
                        as={StarIcon}
                        color={starStyle(star)}
                        boxSize={9}
                        value={star}
                        onMouseOver={(e) => onStarHover(star, e)}
                        // onMouseOut={() => setColor1('gray.400')}
                    />
                ))}
            </HStack>
        </>
    )
}

export default MyRating
