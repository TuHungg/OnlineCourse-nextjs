import { useEffect, useRef } from "react";

export const useIgnoreFirstEffect = (callback: () => void, dependencies: any[]) => {
    const firstRef = useRef<boolean>(true);
    useEffect(
        () => {
            if (!firstRef.current) callback();
            firstRef.current = false;
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, dependencies
    );
}