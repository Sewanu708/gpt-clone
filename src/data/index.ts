import { GrAttachment } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { LuLightbulb } from "react-icons/lu";
import gemini from '../../public/google-gemini-icon.svg'
import chatgpt from '../../public/chatgpt-icon.svg'
import cluade from '../../public/claude-ai-icon.svg'
import grok from '../../public/grok-icon.svg'

export const actions = [
    { id: 'attach', label: 'Attach', icon: GrAttachment },
    { id: 'search', label: 'Search', icon: TfiWorld },
    { id: 'reason', label: 'Reason', icon: LuLightbulb },
];

export const models = [
    {
        name: "Gemini",
        provider: "Google DeepMind",
        icon: gemini,
    },
    {
        name: "ChatGPT",
        provider: "OpenAI",
        icon: chatgpt,
    },
    {
        name: "Claude",
        provider: "Anthropic",
        icon: cluade,
    }, {
        name: "Grok",
        provider: "X ai",
        icon: grok,
    }
];
