'use client'
import { useSidebarToggle, useSidebarWrapperControl } from "@/store/utils";
import { Book, Search } from "lucide-react";
import { useModel } from "@/store/model";
import Header from "./header";
import { BsLayoutSidebar } from "react-icons/bs";

const feats = [{
    name: 'Search chats',
    icon: Search,
}, {
    name: 'New chat',
    icon: Book,
}]


function Features({ isOpen }: { isOpen: boolean }) {
    return <div className="w-full mt-8">
        {
            isOpen && <div className="text-sm  text-zinc-600 px-2 mb-1">
                Feats
            </div>
        }
        {
            feats.map((feat, index) => <div className={`p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center ${isOpen ? 'justify-start' : 'justify-center'} gap-2`} key={index}>
                <div>
                    <feat.icon className="w-4 h-4 text-zinc-600" />

                </div>
                {
                    isOpen && <div className="text-sm font-500">
                        {feat.name}
                    </div>
                }

            </div>)
        }


    </div>
}


function Chats() {
    return (
        <div className="w-full mt-8">
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Chats
            </div>
        </div>
    )
}



export default function Sidebar() {
    const trigger = useSidebarWrapperControl((state) => state.trigger)
    const isWrapperOpen = useSidebarWrapperControl((state) => state.isOpen)
    const isOpen = useSidebarToggle((state) => state.isOpen)
    const closeSidebar = useSidebarToggle((state) => state.trigger)
    const selectedmodel = useModel(state => state.ai)
    const sidebartriggerstyles = isOpen?' left-64 w-4 top-4 h-4 ':'w-8 h-8 top-4 left-[18px] flex items-center justify-center group'
    return (
        <div className={` p-2  h-[100dvh] z-10 l-0  bg-zinc-50 border-l-2 ${isOpen ? 'w-64' : 'w-16'}`}>
            <Header trigger={trigger} isWrapperOpen={isWrapperOpen} isOpen={isOpen} selectedmodel={selectedmodel} />
            <Features isOpen={isOpen} />
            {
                isOpen && <Chats />
            }

            {/* sidebar trigger */}
            <div className={`rounded-sm hover:bg-zinc-100 cursor-pointer absolute ${sidebartriggerstyles}` } onClick={closeSidebar}>
                <BsLayoutSidebar className={`${!isOpen && 'hidden group-hover:flex'}`}/>
            </div>

        </div>
    )
}


// learnt how react works bts today. Heads up to all the engineers involved, cause that's a whole lot of abstraction


