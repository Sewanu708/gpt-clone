import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';
import Markdown from 'react-markdown'
function ModelOutput({ modelResponse }: { modelResponse: string }) {
    return (
        <div
            className="w-full   flex items-center justify-start mt-2 relative"
        >
            <div className="select-text">
                <Markdown>{modelResponse}</Markdown>
            </div>

        </div>
    )
}

export default ModelOutput