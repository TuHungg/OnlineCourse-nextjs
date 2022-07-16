import { useControllableState } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
    createContext,
    useContext,
    ReactNode,
    ChangeEventHandler,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react'
import Helper from '../../../utils/helpers/helper.helper'
import { useUrlHelper } from '../../shared/hooks/url-helper.hook'
import { useAdminUrlParams } from './admin-query.provider'

let debounceTimeout: any
type TSearch = {
    field: string
    value: string
    onSearch: (val: string) => void
    onFieldChange: (value: string) => void
}
const SearchContext = createContext<TSearch>({} as TSearch)
export const useSearch = () => {
    return useContext(SearchContext)
}
export default function SearchProvider({
    defaultField,
    children,
}: {
    defaultField: string
    children: ReactNode
}) {
    const [field, setField] = useState<string>(defaultField || '')
    const [value, setValue] = useControllableState({ defaultValue: '' })

    const router = useRouter()
    const clientQuery = useAdminUrlParams()
    const { getUrlWithQueryParams } = useUrlHelper()

    useEffect(() => {
        setField(clientQuery._searchField || defaultField)
    }, [clientQuery._searchField, defaultField])

    useEffect(() => {
        setValue(clientQuery._searchValue || '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientQuery._searchValue])

    const onSearchFieldChange = useCallback(
        (field: string) => {
            setField(field)
            if (!Helper.isEmpty(value)) {
                router.push(
                    getUrlWithQueryParams({
                        _searchField: field,
                        _searchValue: value,
                    })
                )
            }
        },
        [getUrlWithQueryParams, router, value]
    )

    const onSearch = useCallback(
        (val: string) => {
            setValue(val)
            clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(() => {
                router.push(
                    getUrlWithQueryParams({
                        _searchField: field,
                        _searchValue: val,
                    })
                )
            }, 400)
        },
        [getUrlWithQueryParams, router, field, setValue]
    )
    const state = useMemo(
        () => ({
            field: field,
            value,
            onSearch,
            onFieldChange: onSearchFieldChange,
        }),
        [field, onSearch, onSearchFieldChange, value]
    )
    return <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
}
