import { useState, useEffect } from "react";

const useScrollTop = (): number => {
    const [scrollTop, setScrollTop] = useState<number>(0);
    const handleScroll = () => {
        const newScrollYPosition = window.scrollY;
        setScrollTop(newScrollYPosition);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return scrollTop;
}

export default useScrollTop;