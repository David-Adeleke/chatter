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
    <div className="search-bar">
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder ?? 'Search Chatter'}
        aria-label="Search stories"
      />
    </div>
  )
}