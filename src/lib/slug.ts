//turns "Why I love Chatter!" into "why-i-love-chatter"

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function generateUniqueSlug(title: string): string {
    const base = generateSlug(title)
    const suffix = Math.random().toString(36).substring(2, 7)
    return `${base}-${suffix}`
}