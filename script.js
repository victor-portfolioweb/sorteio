var jogadores = [];
var numerosSorteados = []

/* Função inicial para Conseguir Fazer a intro */
function Start() {
    var Video = document.getElementById("Video");
    var VideoStarter = document.getElementById("Video-Starter");

    VideoStarter.play();

    setTimeout(PlayMusic, 6000);

    setTimeout(ColorChange, 0);

    function ColorChange() {
        var ColorH1 = document.getElementById("tela_inicial");

        ColorH1.style.color = "#00000000";
    }

    VideoStarter.addEventListener("ended", function () {
        Video.style.display = "none";
    });
}

/* Função para fazer Refresh */
function Refresh() {
    location.reload();
}

/* Chamando e Criando a função de pausar e iniciar a musica */
var BingoMusic = document.getElementById("music");
var PausePlay = document.getElementById("PlayPause");

function PlayMusic() {
    BingoMusic.play();
}

function PauseMusic() {
    if (BingoMusic.paused) {
        BingoMusic.play();
        PausePlay.src =
            "https://img.uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/pause-button-red-icon.png";
    } else {
        BingoMusic.pause();
        PausePlay.src = "https://cdn.pixabay.com/photo/2016/02/01/12/33/play-1173551_1280.png";
    }
}

var verificacao = false;

function Dialogo() {
    var DialogoDiv = document.getElementById("Perguntas");
    var DialogoP = document.getElementById("falas");

    if (DialogoDiv.style.display === "none") {
        DialogoDiv.style.display = "flex";

        if (!verificacao) {
            // Textos do diálogo
            var texto1 = "Bem-vindo, marujo! Sente-se e deixe-me contar uma história dos mares que você ainda não conhece. Sou Jack Marés Profundas McGregor, o orgulhoso capitão deste estabelecimento conhecido como O Barril do Tesouro. Aqui, além de um bom gole, você encontrará diversão de sobra.";
            var texto2 = "Vejo que você é novo por estas águas, um rosto fresco navegando pelo desconhecido. Permita-me apresentar-lhe o tesouro escondido nas brincadeiras que temos a bordo. Hoje, lhe convido para embarcar em uma aventura diferente, um jogo que nos faz sentir a emoção de ganhar como se estivéssemos encontrando uma ilha cheia de ouro: o bingo pirata!";
            var texto3 = "Ouça bem, jovem aventureiro, pois neste bingo você descobrirá um universo repleto de números misteriosos e prêmios que farão seu coração bater mais forte. Junte-se a nós nesta noite e teste sua sorte. Será como atirar um dado contra as ondas revoltas do mar. Quem sabe se, com um pouco de astúcia, você não irá se tornar o mais temido vencedor do bingo dos sete mares?";

            // Dividindo os textos em palavras
            var palavras1 = texto1.split(" ");
            var palavras2 = texto2.split(" ");
            var palavras3 = texto3.split(" ");

            var contador1 = 0;
            var contador2 = 0;
            var contador3 = 0;

            // Intervalo para exibir as palavras do texto 1
            var intervalo1 = setInterval(function () {
                if (contador1 < palavras1.length) {
                    DialogoP.innerHTML += palavras1[contador1] + " ";
                    contador1++;
                } else {
                    clearInterval(intervalo1);
                }
            }, 100);

            // Intervalo para exibir as palavras do texto 2
            setTimeout(function () {
                DialogoP.innerHTML = "";
                var intervalo2 = setInterval(function () {
                    if (contador2 < palavras2.length) {
                        DialogoP.innerHTML += palavras2[contador2] + " ";
                        contador2++;
                    } else {
                        clearInterval(intervalo2);
                    }
                }, 100);
            }, 9000);

            // Intervalo para exibir as palavras do texto 3
            setTimeout(function () {
                DialogoP.innerHTML = "";
                var intervalo3 = setInterval(function () {
                    if (contador3 < palavras3.length) {
                        DialogoP.innerHTML += palavras3[contador3] + " ";
                        contador3++;
                    } else {
                        clearInterval(intervalo3);
                    }
                }, 200);
            }, 18000);

            // Limpar o conteúdo do elemento DialogoP
            setTimeout(function () {
                DialogoP.innerHTML = "";
            }, 29000);

            verificacao = true;

            // Chamando a função bottons após 29 segundos
            setTimeout(function () {
                bottons(DialogoP);
            }, 29000);
        } else {
            bottons(DialogoP, DialogoDiv);
        }
    } else {
        DialogoDiv.style.display = "none";
    }
}

function bottons(DialogoP) {
    var butoes = document.getElementById("butoes");

    DialogoP.style.display = "none";
    butoes.style.height = "60%";
    butoes.style.display = "flex";
}

function Adicinar() {
    var PopUP = document.getElementById("Adicinar");
    if (PopUP.style.display === "none") {
        PopUP.style.display = "flex";
    } else {
        PopUP.style.display = "none";
    }
}

function novaCartela() {
    var cartela = [
        gerarNumerosAleatorios(5, 1, 15),
        gerarNumerosAleatorios(5, 16, 30),
        gerarNumerosAleatorios(5, 31, 45),
        gerarNumerosAleatorios(5, 46, 60),
        gerarNumerosAleatorios(5, 61, 75),
    ];

    return cartela;
}

function gerarCartela() {
    var nome = document.getElementById("nome").value;

    // Gerando a cartela com números aleatórios
    var cartela = novaCartela();

    // Adicionando o jogador e a cartela ao array jogadores
    jogadores.push({
        nome: nome,
        cartela: cartela,
        imagem: sabio,
    });

    // Chamando a função Criar para exibir a cartela na tela    
    carregarJogadores()
    Adicinar();

    console.log(jogadores);
}

function gerarNumerosAleatorios(quantidade, min, max) {
    if (quantidade > max - min) {
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min) + min);

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }

    return numeros;
}

function reiniciarJogo() {
    var caixa = document.querySelectorAll("#caixa table");

    // Removendo todas as tabelas da div caixa
    Array.from(caixa).forEach(function (elemento) {
        elemento.remove();
    });

    jogadores = [];
    numerosSorteados = [];
}

function Criar(jogador) {
    var div = document.getElementById("caixa");
    var tabela = document.createElement("table");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var td_icone = document.createElement("td");
    td_icone.id = "icone";
    var img = document.createElement("img");
    img.id = "personagem_icone";
    img.src = jogador.imagem;
    img.alt = "Ícone do personagem";
    var td_nickname = document.createElement("td");
    td_nickname.id = "Nickname";
    td_nickname.innerText = jogador.nome;
    var tbody = document.createElement("tbody");

    // Criando as células da tabela com os números da cartela
    for (var i = 0; i < 5; i++) {
        var tr_body = document.createElement("tr");
        for (var j = 0; j < 5; j++) {
            var td = document.createElement("td");

            td.innerText = jogador.cartela[j][i];
            tr_body.appendChild(td);
            if (numerosSorteados.includes(jogador.cartela[j][i])) {
            td.style.backgroundColor = "green";
            }
        }
        tbody.appendChild(tr_body);
    }

    div.appendChild(tabela);
    tabela.appendChild(thead);
    thead.appendChild(tr);
    tr.appendChild(td_icone);
    td_icone.appendChild(img);
    tr.appendChild(td_nickname);
    tabela.appendChild(tbody);
}

var sabio =
    "https://www.mundodeportivo.com/alfabeta/hero/2021/02/chopper.jpeg?width=768&aspect_ratio=16:9&format=nowebp";

function getCharacterImage(characterName) {

    switch (characterName) {
        case 'lufi':
            sabio = "Imagens/Personagens/Screenshot_2.png";
            break;
        case 'sanji':
            sabio = "Imagens/Personagens/Screenshot_3.png";
            break;
        case 'zoro':
            sabio = "Imagens/Personagens/Screenshot_4.png";
            break;
        case 'robin':
            sabio = "Imagens/Personagens/Screenshot_5.png";
            break;
        case 'nami':
            sabio = "Imagens/Personagens/Screenshot_1.png";
            break;
        default:
            sabio = "Imagens/Personagens/Default.png";
    }

    return sabio;
}


var intervalId;

function sortearNumero(numerosSorteados) {
    var numero = Math.floor(Math.random() * 75) + 1;
    if (numerosSorteados.includes(numero)) {
        return sortearNumero(numerosSorteados);
    }
    if (numero !== null) {
        numerosSorteados.push(numero);
    }
    return numero;
}

function criarElementoP() {
    var p = document.createElement("p");
    p.id = "numeros-sorteados";
    var div = document.getElementById("os_numeros");
    div.appendChild(p);
    return p;
}

function atualizarNumeroSorteado(p, numero) {
    p.textContent = numero;
}

function limparNumerosSorteados() {
    var div = document.getElementById("os_numeros");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function limparTabelas() {
    var caixa = document.querySelectorAll("#caixa table");

    // Removendo todas as tabelas da div caixa
    Array.from(caixa).forEach(function (elemento) {
        elemento.remove();
    });
}

function carregarJogadores () {
    limparTabelas();
    for (let jogador of jogadores) {
        Criar(jogador);
    }
}

function ganhouNessaPorra() {
    for (let jogador of jogadores) {
        // Verificar se tem todos os itens da tabela.
        var ganhou = true;
        for (let i = 0; i < 5; i++) {
            var linha = jogador.cartela[i];
            for (let j = 0; j < 5; j++) {
                if (!numerosSorteados.includes(linha[j])) {
                    ganhou = false;
                }
            }
        }
        if (ganhou) {
            alert(`O Jogador ${jogador.nome} foi um arrombado!`)
            clearInterval(intervalId);
        }
    }
}

function iniciarSorteio() {
    limparNumerosSorteados();
    numerosSorteados = [];

    var xd = document.getElementById("divisor");
    xd.style.display = "flex";

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(function () {
        limparNumerosSorteados();
        limparTabelas();
        if(jogadores.length < 1) {
            return clearInterval(intervalId);
        }
        var theNumber = sortearNumero(numerosSorteados);
        // Numeros
        for (let numero of numerosSorteados) {
            let p = criarElementoP();
            atualizarNumeroSorteado(p, numero);
        }
        carregarJogadores()
        if (numerosSorteados.length === 75) {
            return clearInterval(intervalId);
        }
        ganhouNessaPorra();
        console.log(numerosSorteados);
    }, 500);
}