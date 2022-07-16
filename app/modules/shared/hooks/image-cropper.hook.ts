import { ChangeEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

export const useImageCropper = (initialSrc?: string | null, getImgSrcFuncRef?: MutableRefObject<(() => string | null | undefined) | undefined>) => {
    const [src, setSrc] = useState<string | null | undefined>(initialSrc);
    const [newSrc, setNewSrc] = useState<string | null>();
    const srcRef = useRef<string | null | undefined>(initialSrc);
    const [cropMode, setCropMode] = useState(false);


    useEffect(() => {
        setSrc(initialSrc);
        srcRef.current = initialSrc;
    }, [initialSrc])

    useEffect(() => {
        getImgSrcFuncRef && (getImgSrcFuncRef.current = getImgSrc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getImgSrc = useCallback(() => {
        const url = srcRef.current;
        return url;
    }, []);

    const onFileChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                const src = reader?.result?.toString() || '';
                setNewSrc(src)
                srcRef.current = src;
            })
            reader.readAsDataURL(e.target.files[0])
            setCropMode(true);
        }
    }, []);

    const onCropped = useCallback((src: string) => {
        setNewSrc(src);
        srcRef.current = src;
        setCropMode(false);
    }, [])

    const reset = useCallback(() => {
        setSrc(undefined);
        setNewSrc(undefined);
        srcRef.current = undefined;
    }, []);

    return {
        state: {
            src, newSrc, cropMode
        },
        methods: {
            setSrc, setNewSrc, reset
        },
        events: {
            onCropped, onFileChange
        }
    }

}