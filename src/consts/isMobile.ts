const SCREEN_WIDTH = window.screen.width;
const MOBILE_SCREEN_WIDTH = 750;
export const isMobile = (): boolean => {
    return SCREEN_WIDTH < MOBILE_SCREEN_WIDTH;
}