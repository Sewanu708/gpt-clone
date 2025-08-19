import Wrapper from "@/components/dropdown"
import { models } from "@/data"
import Image from "next/image"
import { RiExpandUpDownLine } from "react-icons/ri"
import Models from "./models"
import gemini from '../../../../public/google-gemini-icon.svg'

interface Headerprops {
    trigger: () => void,
    isWrapperOpen: boolean,
    isOpen: boolean,
    selectedmodel: string

}

function Header({ trigger, isWrapperOpen, isOpen, selectedmodel }: Headerprops) {


    // fetch model details
    const modeldetails = models.find(model => model.name === selectedmodel) ?? {
        name: 'Gemini',
        icon: gemini,
        provider: 'Google Deepmind'
    }

    return (
        <div className="p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between" onClick={trigger}>
            <div className="flex items-center justify-start gap-2">

                <div className="w-8 h-8">
                    <Image src={modeldetails?.icon} alt={modeldetails?.name} />
                </div>
                {
                    isOpen && <div className="">
                        <div className="font-[500]">
                            {modeldetails?.name}
                        </div>
                        <div className="font-[400] text-sm">
                            {modeldetails?.provider}
                        </div>
                    </div>
                }

            </div>

            {
                isOpen && <div>
                    <RiExpandUpDownLine />
                </div>
            }


            <Wrapper className="absolute z-20 top-10" isOpen={isWrapperOpen} trigger={trigger}>
                <Models />
            </Wrapper>
        </div>
    )
}

export default Header