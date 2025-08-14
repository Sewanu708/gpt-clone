import React, { useEffect, useRef } from 'react'

interface Textbox {
    input: string;
    saveInput: (value: string) => void;
    send: () => Promise<void>,
    isWriting: boolean
}

function Textbox({ input, saveInput, send, isWriting }: Textbox) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    //send with enter key
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") await send()
    }

    // handle textbox increment 
    const handleTextDynamicSize = (textHTMLElement: HTMLTextAreaElement) => {
        // get the border heights
        const { borderTopWidth, borderBottomWidth } = window.getComputedStyle(textHTMLElement)

        // get the full height of the text box 
        const scrollHeight = textHTMLElement.scrollHeight + parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)

        return Math.min(scrollHeight, 200)
    }
    useEffect(() => {
        const textHTMLElement = textareaRef.current
        if (textHTMLElement) {
            textHTMLElement.style.height = 'auto';
            textHTMLElement.style.height = handleTextDynamicSize(textHTMLElement) + 'px'
        }
    }, [input])

    return (
        <div className="flex items-center justify-center w-full">
            <textarea
                ref={textareaRef}
                placeholder="Ask anything"
                className="w-full  py-3 text-sm sm:text-base border-0 resize-none outline-none bg-transparent"
                rows={1}
                value={input}
                onChange={(e) => saveInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isWriting}
            />
        </div>

    )
}

export default Textbox