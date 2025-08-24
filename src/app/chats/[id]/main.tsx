'use client'
import Userinput from "@/components/chats/input"
import ModelOutput from "@/components/chats/output"
import Input from "@/components/inputs/input"
import { useChat } from "@/store/user"
import { useMount } from "@/store/utils"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { useShallow } from "zustand/shallow"

function ChatRoom({ chatId }: { chatId: string }) {
    const router = useRouter()
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
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    })

    useEffect(() => {
        const chats = getChat(chatId)
        if (!chats) router.replace('/')
    }, [])

    if (isMounted) return <h1>Loading</h1>
    const chats = getChat(chatId)

    if (!chats?.at(0)?.user) return <div className="flex flex-col h-full items-center justify-center">
        <h2 className="text-3xl text-center mb-8">What can I help with?</h2>
        <Input newChat={false} existingID={chatId}/>
    </div>
    return (
        <>
            <div className="flex flex-1 w-full flex-col items-center justify-center px-4 md:px-12 scrollbar-hide overflow-y-scroll space-y-8 py-8 ">
                {
                    getChat(chatId)?.map((chat, index) => {
                        return <div key={index} className="flex flex-col lg:w-3xl md:w-2xl xl:w-4xl w-full items-start justify-center">
                            <Userinput input={chat.user} />
                            <ModelOutput modelResponse={chat.model} loading={!(chat.model.length > 1)} agent={chat.agent} />
                            <div ref={bottomRef}></div>
                        </div>
                    })
                }
            </div >

            <div className="w-full flex items-end justify-center">
                <Input existingID={chatId}/>
            </div>
        </>
    )
}

export default ChatRoom