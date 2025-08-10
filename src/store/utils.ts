import { create } from "zustand"

interface WrapperProps {
    isOpen: boolean,
    trigger: () => void
}
export const useWrapperControl = create<WrapperProps>()((set) => ({
    isOpen: false,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

