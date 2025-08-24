'use client'
import React, { useCallback } from "react";
import { useInput } from "@/store/input";
import Actions from "./actions";
import Textbox from "./textbox";
import { useRouter } from "next/navigation";
import { useChat } from "@/store/user";
import { useShallow } from "zustand/shallow";
import axios from 'axios'
import { getTitle } from "./title";
import { useModels } from "@/store/model";


function Input({ newChat = false, existingID }: { newChat?: boolean, existingID?: string }) {
    const router = useRouter()
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)
    const selectedmodel = useModels(state => state.ai)
    const { createNewChat, chatId, getChat, storeUserInputs, storeModelResponse, newChatId, saveChatId, setWriting, isWriting, setTitle } = useChat(
        useShallow((state) => ({
            createNewChat: state.createNewChat,
            chatId: state.getLatestId,
            storeUserInputs: state.storeUserInputs,
            storeModelResponse: state.storeModelOutput,
            getChat: state.getChat,
            newChatId: state.newChat,
            saveChatId: state.setNewChatId,
            setWriting: state.setIsWriting,
            isWriting: state.isWriting,
            setTitle: state.setTitle
        }))
    )

    const handleSend = useCallback(async function send() {
        try {
            let id = existingID
            if (newChat && !existingID) {
                createNewChat()
                id = chatId()
                if (!id) throw new Error('Chat id not found')
            }
            if (!id) throw new Error('Chat id not found')
            router.replace(`/chats/${id}`)
            saveChatId(id)
            setWriting(true)
            console.log('first', input)
            storeUserInputs(input, id, selectedmodel)
            saveInput('')
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
                await handleChatTitle(id)
            } catch (error) {
                console.log(error)
            }
        } catch (error) {

        } finally {
            setWriting(false)
        }
    }, [storeModelResponse, getChat, setWriting, isWriting, storeUserInputs, saveChatId, saveInput, input, newChat])

    const handleChatTitle = useCallback(async function handleTitle(id: string) {
        try {
            const updatedchats = getChat(id)
            if (!updatedchats || updatedchats?.length >= 4) return
            const handleTitle = (value: string) => setTitle(newChatId, value)
            await getTitle(updatedchats, handleTitle)
        } catch (error) {
            console.error(error)
        }
    }, [getChat, setTitle, newChatId])


    return (
        <div className="md:max-w-3xl sm:w-[60%] mb-1 w-[90%] sm:max-w-lg rounded-3xl border-1 border-zinc-500 flex flex-col items-start justify-center">
            <form className="w-full px-3  flex  items-center justify-between">
                <Textbox isWriting={isWriting} input={input} send={handleSend} saveInput={saveInput} />
                <Actions send={handleSend} />
            </form>
        </div>
    )
}

export default React.memo(Input)