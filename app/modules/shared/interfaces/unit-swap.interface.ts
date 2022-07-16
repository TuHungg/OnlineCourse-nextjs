import { ISwapByIds, ISwapByIndexes } from "./swap.inteface";

export interface IUnitSwapByIds extends ISwapByIds {
    parentAId: string
    parentBId: string
}
export interface IUnitSwapByIndexes extends ISwapByIndexes {
    parentAIdx: number
    parentBIdx: number
}