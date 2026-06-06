import { useState, useEffect } from 'react'

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
    const [value, setValue] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value.trim())
        }, 400)

        return () => clearTimeout(timeout)
    }, [value, onSearch])

    return (
        <input
            type="search"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder ?? 'Search stories...'}
        />
    )
}