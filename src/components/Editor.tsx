import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect } from 'react'

interface EditorProps {
    content: string
    onChange: (html: string) => void
    placeholder?: string
}

export default function Editor({ content, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: placeholder ?? 'Tell your story...' }),
            Image,
            Link.configure({ openOnClick: false }),
            CharacterCount,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content, false)
        }
    }, [content, editor])

    return <EditorContent editor={editor} />
}