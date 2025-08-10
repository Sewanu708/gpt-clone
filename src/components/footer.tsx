function Footer() {

    const initialFooter = <div className="text-[12px] sm:text-[14px]">
        By messaging ChatGPT, you agree to our  <span className="underline">Terms</span> and have read our  <span className="underline">
            Privacy Policy </span>
    </div>

    const mainFooter = <div className="text-[12px] sm:text-[14px]"> 
        ChatGPT can make mistakes. Check important info
    </div>

    const startChat = false
    if (startChat) return mainFooter
    return initialFooter
}

export default Footer