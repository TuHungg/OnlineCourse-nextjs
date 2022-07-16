type TSortBy = 'asc' | 'desc'
export default interface IClientUrlParams {
    _page?: number
    _limit?: number
    _sortBy?: string
    _order?: TSortBy
    _searchField?: string
    _searchValue?: string
    [key: string]: string | number | undefined
}
