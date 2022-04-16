
let nome = "";
let chat = [];



function loginNome(){
    
    nome = document.querySelector(".nome-usuario").value;  

    const nomeUsuario = {
        name: nome
    }
    
    const promiseNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    promiseNome.then(manterConectado)
    promiseNome.catch(tratarErro)

    
    
    if (nome !== ""){          
    
    document.querySelector(".container-login").classList.add("escondido");
    document.querySelector(".container").classList.remove("escondido");


    setInterval(manterConectado, 4000)

    }else{
        alert("Insira um nome para entrar!")
    }  
    
}


function tratarErro(error){
    console.log("Status code: " + error.response.status);
    console.log("Mensagem de erro: " + error.response.data);
    if(error.response.status === 400){
        alert("Esse nome ja existe, escolha outro para conseguir entrar!");        
    }
    window.location.reload();
}



function manterConectado(){
    
    const nomeUsuario = {
        name: nome
    }
    console.log(nome)
    const promiseStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario);    
    promiseStatus.then()
    promiseStatus.catch(tratarErro)
    console.log("Você está online")
    

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
            <p class="estilo-texto-tempo">${time}</p>
            <p class="estilo-texto-pessoa">${from}</p>
            <p>para</p>
            <p class="estilo-texto-pessoa">${to}:</p>
            <p>${text}</p>
        </div>   
        `
    }

    if(type === "status"){
    
        divMensagens.innerHTML += `
    <div class="box-mensagem fundo-cinza"> 
        <p class="estilo-texto-tempo">${time}</p>
        <p class="estilo-texto-pessoa">${from}</p>
        <p>${text}</p>
    </div>   
    `
    }

    if((type === "private_message") && (to === nome)){
        
        divMensagens.innerHTML += `
        <div class="box-mensagem fundo-rosa"> 
            <p class="estilo-texto-tempo">${time}</p>
            <p class="estilo-texto-pessoa">${from}</p>
            <p>para</p>
            <p class="estilo-texto-pessoa">${to}:</p>
            <p>${text}</p>
        </div>   
        `
    }
    
}

function adicionarMensagens(){
    const mensagemDigitada = document.querySelector(".mensagem").value;

    const novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada,
        type: "message" 
    }

    const promiseAddMensagens = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    console.log(promiseAddMensagens);

    document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter') {    
            let btn = document.querySelector("#send");      
            btn.click();    
        }
    });
    
    refreshChat();
}
  
function refreshChat(){
    let divMensagens = document.querySelector(".conteudo");
    divMensagens.innerHTML = "";
    pegarMensagens();
}

/* setInterval(refreshChat, 5000) */


  