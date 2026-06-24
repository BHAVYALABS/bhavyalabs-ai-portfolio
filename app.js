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

}

}



async function sendMessage(){

const input=
document
.getElementById(
"userInput"
);

const text=
input
.value
.trim();

if(!text)
return;

const messages=
document
.getElementById(
"chatMessages"
);

messages.innerHTML+=
`
<div>

<b>You</b>

<br>

${text}

</div>
`;

input.value="";

messages.innerHTML+=
`
<div
id="typing"
>

<b>BHAVYA AI</b>

<br>

Thinking...

</div>
`;

messages.scrollTop=
messages.scrollHeight;

try{

const response=
await fetch(
"http://localhost:3000/chat",
{
method:
"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
message:text
})

}
);

const data=
await response
.json();

document
.getElementById(
"typing"
)
.remove();

messages.innerHTML+=
`
<div>

<b>BHAVYA AI</b>

<br>

${data.reply}

</div>
`;

}
catch{

document
.getElementById(
"typing"
)
.remove();

messages.innerHTML+=
`
<div>

<b>BHAVYA AI</b>

<br>

Connection failed.

</div>
`;

}

messages.scrollTop=
messages.scrollHeight;

}



document
.getElementById(
"userInput"
)
.addEventListener(
"keydown",
function(e){

if(
e.key==="Enter"
){

sendMessage();

}

}
);