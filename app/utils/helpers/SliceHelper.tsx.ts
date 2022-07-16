export default class SliceHelper {
    static reset<T>(state: T, initialState: T) {
        for (let key in initialState) {
            ;(state as any)[key] = (initialState as any)[key]
        }
    }
}
