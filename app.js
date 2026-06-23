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

const input=
document
.getElementById(
"userInput"
);

const text=
input.value.trim();

if(
!text
)
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

setTimeout(()=>{

messages.innerHTML+=
`
<div>

<b>BHAVYA AI</b>

<br>

Ask me about projects.

</div>
`;

},500);

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

});