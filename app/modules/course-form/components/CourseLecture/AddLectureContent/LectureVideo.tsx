import { Image, AspectRatio, Box, Button, FormControl, FormLabel, Heading, HStack, Icon, Switch, VStack } from '@chakra-ui/react';
import React from 'react';
import AppIcon from '../../../../../utils/constants/app-icon.constant';
import TypeHelper from '../../../../../utils/helpers/type.helper';
import VideoTime from '../../../../shared/components/VideoTime';
import { useLectureParams } from '../../../providers/lecture-params.provider';
import { useUnitParams } from '../../../providers/unit-params.provider';

export default function LectureVideo() {
    const { state: { lecture }, methods: { setContentType } } = useLectureParams();
    const { methods: { setEditContent } } = useUnitParams();
    const video = TypeHelper.isFile(lecture?.video) ? lecture?.video : undefined;
    const onEditClick = () => {
        setEditContent(true);
        setContentType('video');
    }
    return (
        <HStack>
            <AspectRatio bgColor={'black'} w={'150px'} ratio={16 / 9}>
                {video?.thumbnailUrl ? <Image src={video?.thumbnailUrl || ''} alt='thumbnail' /> : <Box></Box>}
            </AspectRatio>
            <HStack flex={1} justify='space-between' align={'stretch'}>
                <VStack align={'start'}>
                    <Heading fontSize={'lg'}>{video?.name}</Heading>
                    <VideoTime duration={video?.duration} />
                    <Button onClick={onEditClick} variant={'link'} leftIcon={<Icon as={AppIcon.edit} />}>Edit Content</Button>
                </VStack>
                <VStack align={'start'} justify='space-between' alignItems={'end'}>
                    <Button colorScheme={'purple'} size='sm'>Preview</Button>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='downloadable' mb='0'>Downloadable</FormLabel>
                        <Switch id='downloadable' />
                    </FormControl>
                </VStack>
            </HStack>
        </HStack>
    )
}
