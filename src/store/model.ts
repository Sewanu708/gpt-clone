import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelResponse {
    ai: Map<string, string>,
    saveResponse: (response: string, id: string) => void
}
export const useModel = create<ModelResponse>()(
    persist(
        (set) => ({
            ai: new Map(),
            saveResponse: (response, id) => set(state => {
                const newResponse = new Map(state.ai)
                newResponse.set(id, response)
                return {
                    ai: newResponse
                }
            })
        }), {
        name: "model"
    }
    )
)