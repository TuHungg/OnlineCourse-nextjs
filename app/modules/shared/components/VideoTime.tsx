import { Text } from '@chakra-ui/react';
import React from 'react'
import Helper from '../../../utils/helpers/helper.helper';


export interface VideoTimeProps {
    duration?: number
}
export default function VideoTime({ duration }: VideoTimeProps) {
    if (!duration) return null;
    const m = Helper.lodash.padStart(Math.floor(duration / 60) + '', 2, '0');
    const s = Helper.lodash.padStart(Math.floor(duration % 60) + '', 2, '0');
    return (
        <Text>{m}:{s}</Text>
    )
}
