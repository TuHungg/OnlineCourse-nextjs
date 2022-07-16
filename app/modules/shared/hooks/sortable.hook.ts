import { useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TDragItem } from "../interfaces/drag-item.interface";

interface ISortableOptions {
    accept: string
    canDrag?: boolean
    //

}
export const useSortable = <T extends TDragItem>(options: ISortableOptions & {
    item: T
    onEnd?: (dragItem: T) => void
    onDrop?: (dragItem: T) => void
    onSwap?: (dragItem: T, dropItem?: T) => void
    canSwap?: (dragItem: T) => boolean
}) => {
    const { canSwap = (dragItem) => dragItem.id != options.item.id } = options;
    let initialCanDrag = options.canDrag == undefined ? true : options.canDrag;
    const [canDrag, setCanDrag] = useState<boolean>(initialCanDrag);
    const ref = useRef<HTMLDivElement>(null)

    const [{ isOver, handlerId, canDrop }, drop] = useDrop({
        accept: options.accept,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item) => {
            if (canSwap(item)) {
                options.onSwap && options.onSwap(item, options.item);
            }
        },
        drop: async (item: T, monitor: any) => {
            options.onDrop && await options.onDrop(item);
        },
    });
    const [{ isDragging }, drag,] = useDrag({
        type: options.accept,
        item: options.item,

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag,
        end: (item, monitoring) => {
            options.onEnd && options.onEnd(item);
        },
    });
    drag(drop(ref))
    const opacity = isOver ? 0 : isDragging ? 0 : 1;
    const dragButtonEvents = useMemo(() => {
        return {
            onMouseEnter: () => setCanDrag(true),
            onMouseLeave: () => setCanDrag(false),
        }
    }, [])
    return {
        ref,
        handlerId,
        opacity,
        methods: { setCanDrag },
        state: { isOver, canDrop, isDragging },
        dragButtonEvents
    };
}