import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { LECTURE_RESOURCE_DIR } from '../../../../utils/constants/firebase.constant'
import FileUploadHelper from '../../../../utils/helpers/file-upload.helper'
import { useAuth } from '../../../auth/providers/auth.provider'
import IFile from '../../../shared/interfaces/models/file.interface'
import { IHistory } from '../../../shared/interfaces/models/shared.interface'
import Library from '../../parts/library/Library'
import LibraryTable from '../../parts/library/LibraryTable'
import { useLectureParams } from '../../providers/lecture-params.provider'
import UploadLectureFile, { UploadFileFormData } from './UploadLectureFile'

const UploadLectureVideo = () => {
    const {
        methods: { updateVideo },
    } = useLectureParams()
    const {
        state: { user },
    } = useAuth()
    const onSave = useCallback(
        async (values: UploadFileFormData, url: string) => {
            let { file, name } = values
            const { type, size } = file[0]
            name = FileUploadHelper.getName(name, file[0])
            const data: Partial<IFile> = {
                name,
                type,
                size,
                status: 'success',
                url,
                history: {
                    createdBy: user!._id as any,
                } as IHistory,
            }
            updateVideo({ data })
        },
        [updateVideo, user]
    )
    return (
        <UploadLectureFile
            accept="video/mp4,video/x-m4v,video/*"
            dirPath={LECTURE_RESOURCE_DIR}
            onSave={onSave}
        />
    )
}

export default function AddLectureVideo() {
    const {
        state: { processingFile },
    } = useLectureParams()
    return (
        <Tabs isLazy variant="enclosed">
            <TabList>
                <Tab>Upload Video</Tab>
                <Tab>Add from library</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {!processingFile ? (
                        <UploadLectureVideo />
                    ) : (
                        <LibraryTable rows={[processingFile]} type="processing" />
                    )}
                </TabPanel>
                <TabPanel>
                    <Library fileType="video" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
