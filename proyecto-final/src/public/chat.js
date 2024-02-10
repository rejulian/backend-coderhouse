const socket = io()
const chatBox = document.getElementById('chat-box')
const inputMessage = document.getElementById('message')

socket.on('message', (data) => {
    const message = data
    const newDiv = document.createElement('div')
    newDiv.className = 'message'

    newDiv.innerHTML += `
        <p><strong>${message.user}:</strong></p>
        <p>${message.message}</p>
    `
    chatBox.appendChild(newDiv)
    scroolToBottom()
})

const sendMessage = (e) => {
    e.preventDefault()
    const newMessage = inputMessage.value
    fetch(`http://localhost:8080/views/chat`, {
        method: 'POST',
        body: JSON.stringify({
            user:'Anonymous',
            message: newMessage
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(()=>{
        inputMessage.value = ''
        scrollToBottom();
    })
    .catch((error)=>console.log(error))
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}