import { models } from "@/data";
import { useModel } from "@/store/model";
import { Check } from "lucide-react";
import Image from "next/image";

function Models() {
    const selectedmodel = useModel(state => state.ai)
    const selectmodel = useModel(state => state.saveResponse)


    return (
        <div className="w-64 p-2 rounded-lg bg-white shadow-sm">
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Models
            </div>

            {
                models.map((model, index) => {
                    const matchedmodel = model.name === selectedmodel
                    return <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full' key={index} onClick={() => selectmodel(model.name)}>
                        <div className="flex items-center justify-start gap-2">
                            <div className="w-4 h-4  rounded-sm">
                                <Image src={model.icon} alt={model.name}/>
                            </div>
                            <div className="text-sm font-500">
                                {model.name}
                            </div>
                        </div>

                        {
                            matchedmodel && <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center">
                                <Check color="white" className="w-3 h-3" />
                            </div>

                        }
                    </div>
                })
            }
        </div>
    )
}

export default Models