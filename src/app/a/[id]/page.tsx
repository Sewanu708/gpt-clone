'use client'
import Userinput from "@/components/chats/input"
import ModelOutput from "@/components/chats/output"
import Input from "@/components/inputs/input"
import { useState } from "react";

async function ChatRoom({ params }: { params: Promise<any> }) {
    const { id } = await params

    const [response, setResponse] = useState<string>('')
    
    return (
        <>
            <div className="flex h-[77%] flex-col w-full  px-4 md:px-12 scrollbar-hide overflow-y-auto space-y-8 py-8 ">
                <Userinput />
                <ModelOutput modelResponse={response} />
            </div >
            <div className="w-full  flex items-end justify-center">
                <Input  />
            </div>
        </>

    )
}

export default ChatRoom