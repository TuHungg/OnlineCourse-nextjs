import Helper from '../../../../utils/helpers/helper.helper';
import { IHistory } from '../../interfaces/models/shared.interface';
export const transformHistory = (history: IHistory): IHistory => {
    const cloneItem = Helper.cloneObj<IHistory>(history);
    // cloneItem.createdAt = new Date(cloneItem.createdAt!);
    // cloneItem.updatedAt = cloneItem.updatedAt ? new Date(cloneItem.updatedAt) : undefined;
    return cloneItem;

}