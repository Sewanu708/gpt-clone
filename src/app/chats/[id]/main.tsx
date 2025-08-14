'use client'
import Userinput from "@/components/chats/input"
import ModelOutput from "@/components/chats/output"
import Input from "@/components/inputs/input"
import { useChat } from "@/store/user"
import { useMount } from "@/store/utils"
import { Fragment, useEffect, useRef } from "react"
import { useShallow } from "zustand/shallow"

interface Conversation {
    id: string;
    model: string;
    user: string;
}
function ChatRoom({ chatId }: { chatId: string }) {

    const { isMounted, setIsMounted } = useMount(useShallow((state) => ({
        isMounted: state.isMounted,
        setIsMounted: state.setIsMounted
    })))

    const { user, getChat } = useChat(
        useShallow((state) => ({
            getChat: state.getChat,
            user: state.user,
        }))
    )
    const bottomRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setIsMounted(false)
    }, [user])

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    })

    if (isMounted) return <h1>Loading</h1>


    return (    
        <>
            <div className="flex h-[77%] lg:w-3xl md:w-2xl xl:w-4xl w-full flex-col   justify-center px-4 md:px-12 scrollbar-hide overflow-y-auto space-y-8 py-8 ">
                {
                    getChat(chatId)?.map((chat, index) => {
                        return <div key={index} className="flex flex-col w-full items-center justify-center">
                            <Userinput input={chat.user} />
                            {chat.model.length >= 1 ? <ModelOutput modelResponse={chat.model} /> : <div className="w-[32px] h-[32px] rounded-sm bg-black animate-pulse">r</div>
                            }
                            <div ref={bottomRef}></div>
                        </div>
                    })
                }

            </div >

            <div className="w-full  flex items-end justify-center">
                <Input />
            </div>
        </>

    )
}

export default ChatRoom