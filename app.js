function openChat(){
document
.getElementById(
"chatBox"
)
.classList
.remove(
"hidden"
);
}

function closeChat(){
document
.getElementById(
"chatBox"
)
.classList
.add(
"hidden"
);
}



function showProject(name){

if(
name==="AI Portfolio"
){

window.location.href=
"projects/ai-portfolio.html";

return;

}

}


function sendMessage(){

const input =
document.getElementById("userInput");

const text = input.value.trim();

if(!text) return;

const messages =
document.getElementById("chatMessages");

// show user
messages.innerHTML += `
<div>
<b>You</b><br>${text}
</div>
`;

input.value = "";

// placeholder (loading feel)
messages.innerHTML += `
<div id="loading">
<b>BHAVYA AI</b><br>Thinking...
</div>
`;

fetch("http://localhost:3000/chat", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ message: text })
})
.then(res => res.json())
.then(data => {

// remove loading
document.getElementById("loading").remove();

// show AI response
messages.innerHTML += `
<div>
<b>BHAVYA AI</b><br>${data.reply}
</div>
`;

});

}

async function getAIResponse(text){

const res = await fetch("http://localhost:3000/chat", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ message: text })
});

const data = await res.json();
return data.reply;

}