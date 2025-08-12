'use client'
import { useEffect, useRef } from "react";
import { useInput } from "@/store/input";
import { useWrapperControl } from "@/store/utils";
import Actions from "./actions";


function Input() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)

    async function send() {
        try {
            const result = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    "input": "Hello gemini"
                })
            });
            const response = await result.json()
            console.log(response.text);
        } catch (error) {
            console.log(error)
        }

        // create a state, that saves it.
    }

    //send with enter key
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") send()
    }

    // handle textbox increment 
    const handleTextDynamicSize = (textHTMLElement: HTMLTextAreaElement) => {
        // get the border heights
        const { borderTopWidth, borderBottomWidth } = window.getComputedStyle(textHTMLElement)

        // get the full height of the text box 
        const scrollHeight = textHTMLElement.scrollHeight + parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)

        return Math.min(scrollHeight, 500)
    }
    useEffect(() => {
        const textHTMLElement = textareaRef.current
        if (textHTMLElement) {
            textHTMLElement.style.height = 'auto';
            textHTMLElement.style.height = handleTextDynamicSize(textHTMLElement) + 'px'
        }
    }, [input])


    return (
        <div className="md:max-w-3xl sm:w-[60%] w-[90%] sm:max-w-lg rounded-3xl shadow-sm flex flex-col items-start justify-center">
            <form className="w-full px-3 pb-3">
                <div className="flex items-center justify-center w-full">
                    <textarea
                        ref={textareaRef}
                        placeholder="Ask anything"
                        className="w-full  py-3 text-sm sm:text-base border-0 resize-none outline-none bg-transparent"
                        rows={1}
                        value={input}
                        onChange={(e) => saveInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>

                <Actions />

            </form>
        </div>
    )
}

export default Input

