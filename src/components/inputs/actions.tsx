import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { Button } from '../ui/button'
import { RiVoiceAiFill } from 'react-icons/ri'
// import Wrapper from '../dropdown'
// import { actions } from '@/data'
// import { PlusIcon } from 'lucide-react'
import { useInput } from '@/store/input'
import { useWrapperControl } from '@/store/utils'
import { useChat } from '@/store/user'
import { useShallow } from 'zustand/shallow'

function Actions({ send, }: { send: () =>  Promise<void> }) {
    const input = useInput((state) => state.input)
    const trigger = useWrapperControl((state) => state.trigger)
    const isOpen = useWrapperControl((state) => state.isOpen)
    const { isWriting, setIsWriting } = useChat(useShallow((state) => ({
        isWriting: state.isWriting,
        setIsWriting: state.setIsWriting
    })))
    const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await send()
    }

    return (<div className="w-full sm:w-auto flex justify-end">
        {
            isWriting ? <button className='p-2 rounded-full cursor-pointer bg-zinc-800 flex items-center justify-center' onClick={() => setIsWriting(false)}>
                <div className='bg-zinc-50 rounded-[4px] w-3 h-3'>
                </div>
            </button> :
                <button disabled={!(input.length > 0)} className={`p-2 cursor-pointer rounded-full bg-zinc-800 flex items-center justify-center ${input.length > 0 ? '' : 'opacity-40'}`} onClick={handleSend}>
                    <FaArrowUp className="text-white" />
                </button>
        }
    </div>
    )
    // <div className="flex  items-center justify-between  w-full  ">
    {/* <div className="hidden sm:flex w-fit gap-2 justify-start items-end ">
                {
                    actions.map((action, index) => {
                        return (
                            <Button
                                variant="outline"
                                asChild
                                key={index}
                                className="border rounded-3xl font-normal cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <action.icon />
                                    {action.label}
                                </span>
                            </Button>
                        )
                    })
                }
            </div>
            <div className="sm:hidden block relative  p-2 rounded-sm hover:bg-zinc-50">
                <PlusIcon className="text-black font-thin cursor-pointer" onClick={trigger} />
                <Wrapper className="absolute" trigger={trigger} isOpen={isOpen}>
                    {
                        actions.map((action, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border font-normal cursor-pointer"
                                >
                                    <span className="flex items-center gap-2">
                                        <action.icon />
                                        {action.label}
                                    </span>
                                </div>
                            )
                        })
                    }
                </Wrapper>

            </div> */}


    {/* </div> */ }

}

export default Actions