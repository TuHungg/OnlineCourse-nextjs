import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';
import { useDispatch } from "react-redux";
import { swapCourseUnit } from "../../../store/course/form-course.slice";
import { useSortable } from "../../shared/hooks/sortable.hook";
import { IUnitSwapByIds } from './../../shared/interfaces/unit-swap.interface';
import { IUnitAddress } from './../interaces/unit-address.interface';

export type TDragUnit = {
    sectionId: string
    id: string
}

export const useUnitSortable = (data: IUnitAddress) => {
    const dispatch = useDispatch();
    const sortable = useSortable<TDragUnit>({
        accept: `section-course-unit`,
        canDrag: false,
        item: { sectionId: data.sectionId, id: data.unitId },
        onSwap: async (item) => {
            const payload = { parentAId: item.sectionId, aId: item.id, parentBId: data.sectionId, bId: data.unitId };
            dispatch(swapCourseUnit(payload));
        },
    })
    return sortable;
}
