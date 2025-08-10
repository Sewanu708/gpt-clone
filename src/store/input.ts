import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface inputProp {
    input: string,
    saveInput: (value: string) => void
}
export const useInput = create<inputProp>()(
    persist(
        (set) => ({
            input: '',
            saveInput: (value: string) => set({ input: value })
        }),
        {
            name: 'input'
        }
    )
)

