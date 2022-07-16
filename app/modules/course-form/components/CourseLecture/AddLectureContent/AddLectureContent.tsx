import { Button, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import { useLectureParams } from '../../../providers/lecture-params.provider'
import AddLectureResources from '../LectureResource/AddLectureResources'
import LectureResource from '../LectureResource/LectureResource'
import AddLectureVideo from '../AddLectureVideo'

const PickContentType = () => {
    const { methods: { setContentType, } } = useLectureParams();
    return (
        <Stack align='center'>
            <Text>Select the main type of content. Files and links can be added as resources</Text>
            <HStack spacing={4} >
                <Button onClick={() => setContentType('video')} leftIcon={<Icon as={AppIcon.video} />}>Video</Button>
                {/* <Button onClick={() => setContentType('article')} leftIcon={<Icon as={AppIcon.article} />}>Article</Button> */}
            </HStack>
        </Stack>
    )
}


export default function AddLectureContent() {
    const { state: { contentType }, methods: { reset } } = useLectureParams();
    useEffect(() => {
        return () => {
            reset();
        }
    }, [reset])
    const renderContent = useMemo(() => {
        switch (contentType) {
            case 'video':
                return <AddLectureVideo />
        }
    }, [contentType]);
    return (
        <>
            {
                contentType == 'resource' ? (
                    <AddLectureResources />
                ) : (
                    !contentType ? (
                        <PickContentType />
                    ) : renderContent
                )

            }
        </>

    )
}
