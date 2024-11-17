import { useState, useEffect } from "react";

const MOBILE_SCREEN_WIDTH = 750;
const DESKTOP_LG = 1160;

const useBrakepoints = (): {
    isMobile: boolean;
    isDesktopLg: boolean;
} => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])


    return {
        isMobile: screenWidth < MOBILE_SCREEN_WIDTH,
        isDesktopLg: screenWidth >= DESKTOP_LG
    }
}

export default useBrakepoints;
