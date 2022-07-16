import {
    AspectRatio,
    Box,
    Button,
    GridItem,
    Image,
    Input,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react'
import lodash from 'lodash'
import React, { MutableRefObject, useRef } from 'react'
import AppImg from '../../../utils/constants/app-img.constant'
import MyFormLabel from '../../shared/components/MyFormLabel'
import MyImageCropper from '../../shared/components/MyImageCropper/MyImageCropper'
import { useImageCropper } from '../../shared/hooks/image-cropper.hook'

export interface RecImageUploadProps {
    label?: string
    initialSrc?: string
    description?: string
    getImgSrcFuncRef?: MutableRefObject<(() => string | undefined) | undefined>
    aspectRatio?: number
    containerRatio?: number[]
}

function RecImageUpload({
    containerRatio = [1, 1],
    aspectRatio = 16 / 9,
    ...props
}: RecImageUploadProps) {
    const {
        state: { src, newSrc, cropMode },
        methods: { reset },
        events: { onCropped, onFileChange: onFileChange },
    } = useImageCropper(props.initialSrc, props.getImgSrcFuncRef)

    const cropFuncRef = useRef<() => string>()
    //
    const onCropClick = () => {
        const url = cropFuncRef.current && cropFuncRef.current()
        if (url) {
            onCropped && onCropped(url)
        }
    }

    const columns = lodash.sum(containerRatio)

    return (
        <Stack>
            {props.label ? <MyFormLabel>{props.label}</MyFormLabel> : null}
            <SimpleGrid
                columns={{
                    base: 1,
                    md: columns,
                }}
                spacing={4}
            >
                <GridItem
                    colSpan={{
                        base: 1,
                        md: containerRatio[0],
                    }}
                >
                    {!cropMode ? (
                        <AspectRatio ratio={aspectRatio}>
                            <Image
                                alt="lecture-image"
                                src={newSrc || src || AppImg.MEDIA_PLACEHOLDER}
                            />
                        </AspectRatio>
                    ) : (
                        <MyImageCropper
                            aspectRatio={aspectRatio}
                            childFuncRef={cropFuncRef}
                            imageSrc={newSrc!}
                        />
                    )}
                </GridItem>

                <GridItem
                    colSpan={{
                        base: 1,
                        md: containerRatio[1],
                    }}
                >
                    <Stack flex={1} spacing={5}>
                        {props.description && <Text>{props.description}</Text>}
                        <Box>
                            <Stack align={'start'}>
                                {!cropMode ? (
                                    <Input
                                        accept=".gif,.jpg,.jpeg,.png"
                                        type="file"
                                        onChange={onFileChange}
                                    />
                                ) : (
                                    <Button onClick={onCropClick}>Crop</Button>
                                )}
                                {(src || newSrc) && !cropMode ? (
                                    <Button size="sm" colorScheme={'red'} onClick={reset}>
                                        Remove
                                    </Button>
                                ) : null}
                            </Stack>
                        </Box>
                    </Stack>
                </GridItem>
            </SimpleGrid>
        </Stack>
    )
}

export default React.memo(RecImageUpload)
