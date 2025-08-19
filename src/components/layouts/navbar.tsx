import { PiSidebarLight } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "../ui/button";

function Navbar() {
    return (
        < nav className="w-full flex items-center justify-between py-4 px-4 md:px-12  bg-white" >
            <div className="flex gap-1.5 items-center justify-center">
                {/* <PiSidebarLight className="text-[18px] text-zinc-800  flex" />
                <RiEdit2Line className="text-[18px] text-zinc-800 " /> */}
                <div className="flex items-center justify-center font-semibold hover:bg-zinc-50 px-2 py-1 rounded-sm cursor-pointer">
                    <span className="text-[18px] ">ChatGPT</span>
                    <IoIosArrowDown className="text-[20px] text-zinc-500 ml-1" />
                </div>
            </div>
            <div className="hidden sm:flex gap-2 items-center">
                <Button className="rounded-3xl">Log in</Button>
                <Button variant="outline" className="rounded-3xl">Sign up</Button>
                <GoQuestion className="text-2xl ml-2 text-zinc-700" />
            </div>
            <div className="flex sm:hidden">
                <HiOutlineDotsVertical />
            </div>
        </nav >)
}

export default Navbar

