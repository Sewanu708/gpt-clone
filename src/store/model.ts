import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelResponse {
    ai: string,
    saveResponse: (response: string) => void
}
export const useModelResponse = create<ModelResponse>()(
    (set) => ({
        ai: '',
        saveResponse: (response) => set({
            ai: response
        })
    })
)