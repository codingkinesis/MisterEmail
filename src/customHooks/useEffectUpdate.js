import { useEffect, useRef } from "react";

export function useEffectUpdate(cd, dependencies) {
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        cd()
    }, dependencies)
}