import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { Button } from '../ui/button'
import { RiVoiceAiFill } from 'react-icons/ri'
import Wrapper from '../dropdown'
import { actions } from '@/data'
import { PlusIcon } from 'lucide-react'
import { useInput } from '@/store/input'
import { useWrapperControl } from '@/store/utils'

function Actions({ send }: { send: () => Promise<void> }) {
    const input = useInput((state) => state.input)
    const trigger = useWrapperControl((state) => state.trigger)

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        send()
    }

    return (
        <div className="flex  items-center justify-between  w-full  ">
            <div className="hidden sm:flex w-fit gap-2 justify-start items-end ">
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
                <Wrapper className="absolute">
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

            </div>

            <div className="w-full sm:w-auto flex justify-end">
                {
                    input.length > 0 ?
                        <button className="p-2 rounded-full bg-black flex items-center justify-center" onClick={handleSend}>
                            <FaArrowUp className="text-white" />
                        </button> :
                        <Button className={`border  font-normal cursor-pointer !rounded-full`}>
                            <span className="flex gap-2 items-center">
                                <RiVoiceAiFill />
                                Voice
                            </span>
                        </Button>
                }
            </div>
        </div>
    )
}

export default Actions