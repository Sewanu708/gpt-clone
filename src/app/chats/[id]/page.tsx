import ChatRoom from "./main"

 async function ChatRoomWrapper({ params }: { params: Promise<any> }) {
    const { id } = await params
    
    return (
        <ChatRoom chatId={id}/>

    )
}

export default ChatRoomWrapper