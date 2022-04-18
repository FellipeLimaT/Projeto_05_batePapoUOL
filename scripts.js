
let nome = "";
let chat = [];



//Botao Entrar na pagina Login//

function loginNome(){
    
    nome = document.querySelector(".nome-usuario").value;  

    const nomeUsuario = {
        name: nome
    }    
    const promiseNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    promiseNome.then(manterConectado)
    promiseNome.catch(tratarErro)    
    
    if (nome !== ""){  
    document.querySelector(".login").classList.add("escondido");
    document.querySelector(".login-loading").classList.remove("escondido");
    setTimeout(carregarChat, 3000); 
    setInterval(manterConectado, 4000)
    }else{
        alert("Insira um nome para entrar!")
    }      
}

function carregarChat(){
    document.querySelector(".login-loading").classList.add("escondido");
    document.querySelector(".container").classList.remove("escondido");
}

function tratarErro(error){
    console.log("Status code: " + error.response.status);
    console.log("Mensagem de erro: " + error.response.data);
    
    if(error.response.status === 400){
        window.location.reload();
        alert("Esse nome já esta sendo usado, escolha outro para conseguir entrar!");        
    }    
}

function manterConectado(){    
    const nomeUsuario = {
        name: nome
    }
    console.log(nome);
    const promiseStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario);    
    promiseStatus.then();
    promiseStatus.catch(tratarErro);
    console.log("Você está online");
}
 
pegarMensagens();

function pegarMensagens(){
    
    const promiseMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promiseMensagens);
    promiseMensagens.then(carregarDados);    
}

function carregarDados(response){
    console.log(response.data)
    chat = response.data;

    for(let i = 0; i < chat.length; i++){
    const time = response.data[i].time;
    const from = response.data[i].from;
    const to = response.data[i].to;
    const text = response.data[i].text;
    const type = response.data[i].type;
    
    renderizarMensagens(time, from, to, text, type);
    }    
}


function renderizarMensagens(time, from, to, text, type){
    let divMensagens = document.querySelector(".conteudo"); 

    if(type === "message"){
        
        divMensagens.innerHTML += `
        <div class="box-mensagem fundo-branco"> 
            <h3 class="estilo-texto-tempo">${time}</h3>
            <h2 class="estilo-texto-pessoa">${from}</h2>
            <h4>para</h4>
            <h2 class="estilo-texto-pessoa">${to}:</h2>
            <h4>${text}</h4>
        </div>   
        `
    }

    if(type === "status"){
    
        divMensagens.innerHTML += `
    <div class="box-mensagem fundo-cinza"> 
        <h3 class="estilo-texto-tempo">${time}</h3>
        <h2>${from}</h2>
        <h4>${text}</h4>
    </div>   
    `
    }

    if((type === "private_message") && (to === nome)){
        
        divMensagens.innerHTML += `
        <div class="box-mensagem fundo-rosa"> 
            <h3 class="estilo-texto-tempo">${time}</h3>
            <h2 class="estilo-texto-pessoa">${from}</h2>
            <h4>para</h4>
            <h2 class="estilo-texto-pessoa">${to}:</h2>
            <h4>${text}</h4>
        </div>   
        `
    }    
   
}

function adicionarMensagens(){
    let mensagemDigitada = document.querySelector(".mensagem").value;

    const novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada,
        type: "message" 
    }

    const promiseAddMensagens = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    promiseAddMensagens.then(refreshChat); 
    
    console.log(promiseAddMensagens);
    document.querySelector(".mensagem").value = "";
    
    enter();
}
  
function refreshChat(){
    let divMensagens = document.querySelector(".conteudo");
    divMensagens.innerHTML = "";
    pegarMensagens();
}

function enter(){
    document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter') {    
            let btn = document.querySelector("#send");      
            btn.click();    
        }
    });
}

function rolarFinal(){
    let ultimaMensagem = document.querySelector(".mensagem");
    ultimaMensagem.scrollIntoView();
}

function apagarMensagensAntigas(){
    let divMensagens = document.querySelector(".conteudo");
    divMensagens.innerHTML = "";
}
/* setInterval(refreshChat, 5000) */


  