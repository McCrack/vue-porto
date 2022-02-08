const THEMES = ['default']
export const themeSwitcher = () => {
    if (THEMES.length) {
        const randomValue = Math.floor(Math.random() * THEMES.length)
        const theme = THEMES[randomValue]
        return theme
    }
}