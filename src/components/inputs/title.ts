import { Conversation } from "@/store/user";
import axios from "axios";

export const getTitle = async (chats: Conversation[] | undefined, setTitle: (value: string) => void) => {
    try {
        const result = await axios.post('/api/header', {
            "chats": chats
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await result.data
        setTitle(response)
    } catch (error) {
        console.log(error)
    }
}