'use client'
import Userinput from "@/components/chats/input"
import ModelOutput from "@/components/chats/output"
import Input from "@/components/inputs/input"
import { useChat } from "@/store/user"
import { Fragment, useEffect } from "react"
import { useShallow } from "zustand/shallow"

interface Conversation {
    id: string;
    model: string;
    user: string;
}
function ChatRoom({ chatId }: { chatId: string }) {

    const {  user, getChat } = useChat(
        useShallow((state) => ({
            getChat: state.getChat,
            user: state.user
        }))
    )

 
    let chats: Conversation[] | undefined = [];
    useEffect(() => {
        chats = getChat(chatId)
    }, [user])
    console.log(getChat(chatId))
    return (
        <>

            <div className="flex h-[77%] flex-col w-full  px-4 md:px-12 scrollbar-hide overflow-y-auto space-y-8 py-8 ">
                {
                    getChat(chatId)?.map((chat, index) => {
                        return <Fragment key={index}>
                            <Userinput />
                            <ModelOutput modelResponse={chat.model} />
                        </Fragment>
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