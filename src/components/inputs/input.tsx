'use client'
import { useEffect, useRef } from "react";
import { useInput } from "@/store/input";
import Actions from "./actions";
import Textbox from "./textbox";
import { useRouter } from "next/navigation";
import { useChat } from "@/store/user";
import { useShallow } from "zustand/shallow";


function Input({ newChat = false }: { newChat?: boolean }) {
    console.log(newChat)
    const router = useRouter()
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)
    const { createNewChat, chatId, getChat, storeUserInputs, storeModelResponse, newChatId, saveChatId } = useChat(
        useShallow((state) => ({
            createNewChat: state.createNewChat,
            chatId: state.getLatestId,
            storeUserInputs: state.storeUserInputs,
            storeModelResponse: state.storeModelOutput,
            getChat: state.getChat,
            newChatId: state.newChat,
            saveChatId: state.setNewChatId
        }))
    )


    if (newChat) {
        createNewChat()
        const id = chatId()
        if (!id) return;
        saveChatId(id)
    }
    async function send() {
        const id = newChatId
        storeUserInputs(input, id)
        router.replace(`/chats/${id}`)
        // get conversation id 
        const con_id = getChat(id)?.at(-1)?.id
        if (!con_id) return;
        try {
            const result = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    "input": input
                })
            });
            const response = await result.json()
            storeModelResponse(response, id, con_id)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="md:max-w-3xl sm:w-[60%] w-[90%] sm:max-w-lg rounded-3xl shadow-sm flex flex-col items-start justify-center">
            <form className="w-full px-3 pb-3">
                <Textbox input={input} send={send} saveInput={saveInput} />
                <Actions send={send} />

            </form>
        </div>
    )
}

export default Input

