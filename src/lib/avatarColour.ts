const COLOURS = [
    { bg: '#3b5bdb', text: '#ffffff' },
    { bg: '#0ca678', text: '#ffffff' },
    { bg: '#e67700', text: '#ffffff' },
    { bg: '#c2255c', text: '#ffffff' },
    { bg: '#7048e8', text: '#ffffff' },
    { bg: '#1971c2', text: '#ffffff' },
    { bg: '#2f9e44', text: '#ffffff' },
    { bg: '#c92a2a', text: '#ffffff' },
    { bg: '#5c7cfa', text: '#ffffff' },
    { bg: '#f06595', text: '#ffffff' },
    { bg: '#20c997', text: '#ffffff' },
    { bg: '#fd7e14', text: '#ffffff' },
] 

export function getAvatarColour(username: string): {bg: string; text: string} {
    let hash = 0
    for(let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash)
        hash |= 0
    }
    const index = Math.abs(hash) % COLOURS.length
    return COLOURS[index]
}