'use client'
import { useEffect } from "react";
import { useInput } from "@/store/input";
import Actions from "./actions";
import Textbox from "./textbox";
import { useRouter } from "next/navigation";
import { useChat } from "@/store/user";
import { useShallow } from "zustand/shallow";
import axios from 'axios'


function Input({ newChat = false }: { newChat?: boolean }) {
    const router = useRouter()
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)
    const { createNewChat, chatId, getChat, storeUserInputs, storeModelResponse, newChatId, saveChatId, setWriting, isWriting } = useChat(
        useShallow((state) => ({
            createNewChat: state.createNewChat,
            chatId: state.getLatestId,
            storeUserInputs: state.storeUserInputs,
            storeModelResponse: state.storeModelOutput,
            getChat: state.getChat,
            newChatId: state.newChat,
            saveChatId: state.setNewChatId,
            setWriting: state.setIsWriting,
            isWriting: state.isWriting
        }))
    )

    useEffect(() => {
        if (newChat) {
            createNewChat()
            const id = chatId()
            if (id) {
                saveChatId(id)
            }
        }
    }, [newChat, createNewChat, chatId, saveChatId])

    function send() {
        let first_chat = newChat;
        return async function () {
            setWriting(true)
            const id = newChatId
            storeUserInputs(input, id)
            saveInput('')
            if (first_chat) router.replace(`/chats/${id}`)
            first_chat = false
            // get chat context
            const chats = getChat(id)
            // get present conversation id 
            const con_id = getChat(id)?.at(-1)?.id
            if (!con_id) return;
            try {
                const result = await axios.post('/api/gemini', {
                    "input": input,
                    "chats": chats
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const response = await result.data
                storeModelResponse(response, id, con_id)
                setTimeout(() => setWriting(false), 10)
            } catch (error) {
                console.log(error)
            }
        }

    }


    return (
        <div className="md:max-w-3xl sm:w-[60%] w-[90%] sm:max-w-lg rounded-3xl shadow-sm flex flex-col items-start justify-center">
            <form className="w-full px-3 pb-3">
                <Textbox isWriting={isWriting} input={input} send={send()} saveInput={saveInput} />
                <Actions send={send()} />
            </form>
        </div>
    )
}

export default Input