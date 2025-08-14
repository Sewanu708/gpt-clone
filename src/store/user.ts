import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserInput {
    user: Record<string, Conversation[]>,
    chatIds: string[],
    createNewChat: () => void
    storeUserInputs: (input: string, chatId: string) => void,
    storeModelOutput: (input: string, chatId: string, conversationId: string) => void,
    getChat: (chatId: string) => Conversation[] | undefined,
    getLatestId: () => string | undefined,
    newChat: string,
    setNewChatId: (id: string) => void,
    setIsWriting: (bool: boolean) => void,
    isWriting: boolean
}

interface Conversation {
    id: string;
    model: string;
    user: string;
}

const noopstorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { }
}
export const useChat = create<UserInput>()(
    persist(
        (set, get) => ({
            user: {},
            chatIds: [],
            createNewChat: () => set((state) => {
                const id = crypto.randomUUID()
                const newChat = [...state.chatIds, id]
                const newUser = { ...state.user, [id]: [] }
                return {
                    chatIds: newChat,
                    user: newUser
                }
            }),

            storeUserInputs: (input, chatId) => set((state) => {
                const newId = crypto.randomUUID()
                const conversation = { id: newId, user: input, model: '' }
                const chat = state.user[chatId]
                const newChat = [...chat, conversation]

                return {
                    user: { ...state.user, [chatId]: newChat }
                }
            }),
            storeModelOutput: (input, chatId, conversationId) => set((state) => {
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => item.id === conversationId)
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const updatedConversation = {
                    ...currentConversation[index], model: input
                }
                currentConversation[index] = updatedConversation

                return {
                    user: { ...state.user, [chatId]: currentConversation }
                }
            }),

            getChat: (chatId) => {
                const state = get()
                return state.user[chatId]
            },
            getLatestId: () => {
                const state = get()
                return state.chatIds.at(-1) || undefined
            },
            newChat: '',
            setNewChatId: (id) => set({
                newChat: id
            }),
            isWriting:false,
            setIsWriting:(bool:boolean)=>set({
                isWriting:bool
            })

        }), {
        name: 'userinput',
        storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : noopstorage
        )
    }))

