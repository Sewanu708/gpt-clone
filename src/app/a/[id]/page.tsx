async function ChatRoom({ params }: { params: Promise<any> }) {
    const { id } = await params
    return (
        <h1>{id}</h1>
    )
}