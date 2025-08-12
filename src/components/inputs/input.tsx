'use client'
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { actions } from "@/data";
import { FaArrowUp } from "react-icons/fa";
import { RiVoiceAiFill } from "react-icons/ri";
import { useInput } from "@/store/input";
import { PlusIcon } from "lucide-react";
import Wrapper from "../dropdown";
import { useWrapperControl } from "@/store/utils";


function Input() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)
    const trigger = useWrapperControl((state) => state.trigger)

    async function send() {
        try {
            const result = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    "input": "Hello open ai"
                })
            });
            const response = await result.json()
            console.log(response.json);
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

                <div className="flex  items-center justify-between  w-full  ">
                    <div className="hidden sm:flex w-fit gap-2 justify-start items-end ">
                        {
                            actions.map((action, index) => {
                                return (
                                    <Button
                                        variant="outline"
                                        asChild
                                        key={index}
                                        className="border rounded-3xl font-normal cursor-pointer"
                                    >
                                        <span className="flex items-center gap-2">
                                            <action.icon />
                                            {action.label}
                                        </span>
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <div className="sm:hidden block relative  p-2 rounded-sm hover:bg-zinc-50">
                        <PlusIcon className="text-black font-thin cursor-pointer" onClick={trigger} />
                        <Wrapper className="absolute">
                            {
                                actions.map((action, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border font-normal cursor-pointer"
                                        >
                                            <span className="flex items-center gap-2">
                                                <action.icon />
                                                {action.label}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </Wrapper>

                    </div>

                    <div className="w-full sm:w-auto flex justify-end">
                        {
                            input.length > 0 ?
                                <button className="p-2 rounded-full bg-black flex items-center justify-center">
                                    <FaArrowUp className="text-white" />
                                </button> :
                                <Button className={`border  font-normal cursor-pointer !rounded-full`}>
                                    <span className="flex gap-2 items-center">
                                        <RiVoiceAiFill />
                                        Voice
                                    </span>
                                </Button>
                        }
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Input

