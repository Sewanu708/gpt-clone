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
    isWriting: boolean,
    title: { id: string, header: string }[],
    getTitle: (id: string) => string | undefined,
    setTitle: (id: string, title: string) => void

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
                state.setTitle(id, 'New chat')
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
                state.setTitle(chatId, input)
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
            isWriting: false,
            setIsWriting: (bool: boolean) => set({
                isWriting: bool
            }),
            title: [],
            getTitle: (id: string) => {
                const state = get()
                return state.title.find(chat => chat.id === id)?.header
            },
            setTitle: (id: string, title: string) => set((state) => {
                const chatIndex = state.title.findIndex(chat => chat.id === id)
                if (chatIndex < 0) return state
                const newTitleArray = [...state.title]
                newTitleArray[chatIndex] = { id, header: title }
                return {
                    title: newTitleArray
                }
            })

        }), {
        name: 'userinput',
        storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : noopstorage
        )
    }))

