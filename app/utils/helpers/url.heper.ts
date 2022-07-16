import { ParsedUrlQuery } from 'querystring'
export default class UrlHelper {
    static cvtObjToQueryString(query: Record<string, any>): string {
        const searchParams = new URLSearchParams()
        for (let key in query) {
            if (query[key]) {
                searchParams.set(key, query[key] + '')
            }
        }
        return searchParams.toString()
    }
    static paramsToObject(entries: IterableIterator<[string, string]>): ParsedUrlQuery {
        const result: {
            [key: string]: string
        } = {}
        const arr = Array.from(entries)
        for (const [key, value] of arr) {
            // each 'entry' is a [key, value] tupple
            result[key] = value
        }
        return result
    }

    static delQueryParam(path: string, paramName: string): string {
        const urlSearchParams = new URLSearchParams(window.location.search)
        urlSearchParams.delete(paramName)
        const queryStr = urlSearchParams.toString()
        const searchString = !!queryStr ? `?${queryStr}` : ''
        const url = path.slice(0, path.indexOf('?')) + searchString
        return url
    }
}
