import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface UserInput {
    user: Map<string, string>
    id: string[],
    storeInputs: (input: string) => void
}
export const useUserInput = create<UserInput>()(
    persist(
        (set) => ({
            user: new Map(),
            id: [],
            storeInputs: (input) => set((state) => {
                const newId = crypto.randomUUID()
                const newUser = new Map(state.user)
                newUser.set(newId, input)
                return {
                    id: [...state.id, newId],
                    user: newUser
                }
            })

        }), {
        name: 'userinput'
}))