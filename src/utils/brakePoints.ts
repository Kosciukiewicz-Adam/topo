const SCREEN_WIDTH = window.screen.width;
const MOBILE_SCREEN_WIDTH = 750;
const DESKTOP_LG = 1160;

export const isMobile = (): boolean => {
    return SCREEN_WIDTH < MOBILE_SCREEN_WIDTH;
}

export const isDesktopLg = (): boolean => {
    return SCREEN_WIDTH >= DESKTOP_LG;
}

