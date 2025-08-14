import { create } from "zustand"

interface WrapperProps {
    isOpen: boolean,
    trigger: () => void
}
interface MountProps {
    isMounted: boolean,
    setIsMounted: (bool:boolean) => void
}
export const useWrapperControl = create<WrapperProps>()((set) => ({
    isOpen: false,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export const useMount = create<MountProps>((set)=>({
    isMounted:true,
    setIsMounted:(bool)=>set({isMounted:bool})
}))