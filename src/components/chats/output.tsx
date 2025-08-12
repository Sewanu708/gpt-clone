import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';

function ModelOutput({ modelResponse }: { modelResponse: string }) {
    return (
        <div
            className="w-full flex items-center justify-start mt-2 relative"
        >
            <div className="select-text">
                {modelResponse}
            </div>

            <div
                className="absolute left-0 bottom-[-30px] flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200">
                {/* {copied ? <FaCheck /> : <IoCopyOutline />} */} <FaCheck />
            </div>

            <div
                className="absolute left-10 bottom-[-30px] flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200" >
                <RiEdit2Line />
            </div>
        </div>
    )
}

export default ModelOutput