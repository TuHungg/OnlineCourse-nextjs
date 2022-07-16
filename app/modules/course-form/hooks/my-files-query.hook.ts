import { useQuery } from 'react-query'
import { countMyFiles, fetchMyFiles, IFileQuery } from '../../../apis/file.api'
import IFile from '../../shared/interfaces/models/file.interface'
import { useLibrary } from '../providers/library.provider'

export const RQK_MY_FILES = 'files'
export type TFileType = 'all' | 'video'
export const useMyFilesQuery = (page: number, limit: number, fileType: TFileType = 'all') => {
    const {
        state: { search },
    } = useLibrary()
    const query: IFileQuery = { search, fileType }
    return useQuery<IFile[]>([RQK_MY_FILES, query, page, limit], fetchMyFiles, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
    })
}

export const useCountMyFilesQuery = (fileType: TFileType = 'all') => {
    const {
        state: { search },
    } = useLibrary()
    const query: IFileQuery = { search, fileType }
    return useQuery<number>([RQK_MY_FILES, query, 'count'], countMyFiles, {
        keepPreviousData: true,
    })
}
