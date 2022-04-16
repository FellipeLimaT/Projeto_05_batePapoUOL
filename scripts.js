
let nome = "";
let chat = [];



function loginNome(){
    
    nome = document.querySelector(".nome-usuario").value;
    if (nome !== ""){    
    document.querySelector(".container-login").classList.add("escondido");
    document.querySelector(".container").classList.remove("escondido");
    }

    const nomeUsuario = {
        name: nome
    }
    
    const promiseNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    promiseNome.then(manterConectado)
    promiseNome.catch(tratarErro)
    setInterval(manterConectado, 4000)
}


function tratarErro(error){
    console.log("Status code: " + error.response.status)
    if(error.response.status === 400){
        alert("Esse nome ja existe, escolha outro para conseguir entrar!")
    }
}



function manterConectado(){
    
    const nomeUsuario = {
        name: nome
    }
    console.log(nome)
    const promiseStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario);    
    promiseStatus.then()
    promiseStatus.catch(tratarErro)
    

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

    renderizarMensagens(time, from, to, text);
    }
    
}


function renderizarMensagens(time, from, to, text){
    const divMensagens = document.querySelector(".conteudo");
    divMensagens.innerHTML = "";  

    
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

function adicionarMensagens(){
    const mensagemDigitada = document.querySelector(".mensagem").value;

    const novaMensagem = {
        from: nome,
        to: "destinatário",
        text: mensagemDigitada,
        type: "message" 
    }

    const promiseAddMensagens = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    console.log(promiseAddMensagens);
}
 


