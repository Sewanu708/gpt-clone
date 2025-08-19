import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Model {
    ai: string,
    saveResponse: (response: string) => void
}

const noopstorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { }
}
export const useModel = create<Model>()(
    persist((set) => ({
        ai: 'Gemini',
        saveResponse: (response) => set({
            ai: response
        })
    }), {
        name: 'selected-model',
        storage: createJSONStorage(() => typeof window != undefined ? localStorage : noopstorage)
    })
)
