let tamanhoSenha = 12;

const senhaInput =
document.getElementById("senha");

const tamanhoTexto =
document.getElementById("tamanho");

function tocarSomGerar(){

    const audioContext =
    new(window.AudioContext ||
    window.webkitAudioContext)();

    const osc =
    audioContext.createOscillator();

    const gain =
    audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.value = 700;

    gain.gain.value = 0.1;

    osc.start();

    osc.stop(
        audioContext.currentTime + 0.08
    );
}

function tocarSomCopiar(){

    const audioContext =
    new(window.AudioContext ||
    window.webkitAudioContext)();

    const osc =
    audioContext.createOscillator();

    const gain =
    audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.value = 1000;

    gain.gain.value = 0.1;

    osc.start();

    osc.stop(
        audioContext.currentTime + 0.12
    );
}

function alterarTamanho(valor){

    tamanhoSenha += valor;

    if(tamanhoSenha < 4){
        tamanhoSenha = 4;
    }

    if(tamanhoSenha > 50){
        tamanhoSenha = 50;
    }

    tamanhoTexto.textContent =
    tamanhoSenha;

    verificarForca();
}

function gerarSenha(){

    const maiusculas =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const minusculas =
    "abcdefghijklmnopqrstuvwxyz";

    const numeros =
    "0123456789";

    const simbolos =
    "!@#$%&*()-_=+";

    let caracteres = "";

    if(maiusculas &&
       document.getElementById("maiusculas").checked)
    {
        caracteres += maiusculas;
    }

    if(document.getElementById("minusculas").checked)
    {
        caracteres += minusculas;
    }

    if(document.getElementById("numeros").checked)
    {
        caracteres += numeros;
    }

    if(document.getElementById("simbolos").checked)
    {
        caracteres += simbolos;
    }

    if(caracteres === ""){

        alert(
        "Selecione ao menos uma opção."
        );

        return;
    }

    let senha = "";

    for(let i=0;i<tamanhoSenha;i++){

        const indice =
        Math.floor(
        Math.random() *
        caracteres.length
        );

        senha += caracteres[indice];
    }

    senhaInput.value = senha;

    verificarForca();

    tocarSomGerar();
}

function verificarForca(){

    const barra =
    document.getElementById("nivel");

    const texto =
    document.getElementById("textoForca");

    let pontos = 0;

    if(tamanhoSenha >= 8) pontos++;
    if(tamanhoSenha >= 12) pontos++;
    if(document.getElementById("numeros").checked) pontos++;
    if(document.getElementById("simbolos").checked) pontos++;

    if(pontos <= 2){

        barra.style.width = "33%";
        barra.style.background = "#ff2b45";

        texto.innerText = "Fraca";
    }

    else if(pontos === 3){

        barra.style.width = "66%";
        barra.style.background = "#ffd500";

        texto.innerText = "Média";
    }

    else{

        barra.style.width = "100%";
        barra.style.background = "#00ff84";

        texto.innerText = "Forte";
    }
}

function copiarSenha(){

    if(!senhaInput.value) return;

    navigator.clipboard.writeText(
    senhaInput.value
    );

    tocarSomCopiar();

    alert("Senha copiada!");
}

gerarSenha();