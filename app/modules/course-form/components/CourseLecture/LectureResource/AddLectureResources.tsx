import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { LECTURE_RESOURCE_DIR } from '../../../../../utils/constants/firebase.constant'
import FileUploadHelper from '../../../../../utils/helpers/file-upload.helper'
import { useAuth } from '../../../../auth/providers/auth.provider'
import IFile from '../../../../shared/interfaces/models/file.interface'
import { IHistory } from '../../../../shared/interfaces/models/shared.interface'
import Library from '../../../parts/library/Library'
import LibraryTable from '../../../parts/library/LibraryTable'
import { useLectureParams } from '../../../providers/lecture-params.provider'
import UploadLectureFile, { UploadFileFormData } from '../UploadLectureFile'

const UploadLectureResource = () => {
    const {
        state: { user },
    } = useAuth()
    const {
        methods: { addResource },
    } = useLectureParams()
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
            addResource({ data })
        },
        [addResource, user]
    )
    return <UploadLectureFile accept="*" dirPath={LECTURE_RESOURCE_DIR} onSave={onSave} />
}

export default function AddLectureResources() {
    const {
        state: { processingFile },
    } = useLectureParams()
    return (
        <Tabs isLazy variant="enclosed">
            <TabList>
                <Tab>Downloadable File</Tab>
                <Tab>Add from library</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {!processingFile ? (
                        <UploadLectureResource />
                    ) : (
                        <LibraryTable rows={[processingFile]} type="processing" />
                    )}
                </TabPanel>
                <TabPanel>
                    <Library />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
