export default class QueryHelper {
    static getNextPageParams(page: number, rowsPerPage: number, totalItem: number) {
        const totalPage = this.getTotalPage(rowsPerPage, totalItem)
        if (page < totalPage) {
            return page + 1
        } else return undefined
    }
    static getTotalPage(rowsPerPage: number, totalItem: number) {
        const totalPage = Math.ceil(totalItem / rowsPerPage)
        return totalPage
    }
}
