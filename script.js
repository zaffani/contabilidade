// --- COLE A URL DO SEU APP DA WEB AQUI ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNDeV_nj0BU5h_w4l5RudW8S3Pd_OkXxQKyTxTDxu2z7q21foYxlzpgBsKqNghGluAdw/exec";

// --- DADOS DO QUIZ ---
const quizData = [
    {
        pergunta: "Em qual estágio você está na sua jornada empreendedora?",
        opcoes: [
            "(A) Tenho apenas uma ideia de negócio",
            "(B) Já comecei informalmente, mas ainda não abri CNPJ",
            "(C) Tenho CNPJ, mas ainda estou me estruturando",
            "(D) Já tenho empresa ativa e quero crescer"
        ],
        chave: "pergunta1"
    },
    {
        pergunta: "Qual é o seu principal desafio hoje?",
        opcoes: [
            "(A) Saber por onde começar",
            "(B) Entender qual é o melhor tipo de empresa para abrir",
            "(C) Pagar menos impostos dentro da lei",
            "(D) Organizar as finanças e entender meus números",
            "(E) Aumentar o faturamento e escalar o negócio"
        ],
        chave: "pergunta2"
    },
    {
        pergunta: "Você já tem um contador ou consultoria para te orientar?",
        opcoes: [
            "(A) Ainda não, estou procurando",
            "(B) Sim, mas não estou satisfeito",
            "(C) Sim, e estou satisfeito",
            "(D) Não vejo necessidade"
        ],
        chave: "pergunta3"
    },
    {
        pergunta: "Você sabe quanto paga de impostos e se está no regime tributário mais vantajoso?",
        opcoes: [
            "(A) Não faço ideia",
            "(B) Tenho alguma noção, mas não sei se é o melhor",
            "(C) Sim, meu contador já analisou isso",
            "(D) Não tenho empresa ainda"
        ],
        chave: "pergunta4"
    },
    {
        pergunta: "Onde está localizada sua empresa (ou onde pretende abrir)?",
        opcoes: [
            "(A) São Sebastião",
            "(B) São Jose dos Campos",
            "(C) Campos do Jordão",
            "(D) São Paulo",
            "(E) Outra cidade"
        ],
        chave: "pergunta5"
    },
    {
        pergunta: "Qual é o seu segmento de atuação?",
        opcoes: [
            "(A) Prestação de serviços",
            "(B) Comércio",
            "(C) Indústria",
            "(D) Profissional liberal (médico, dentista, psicólogo, etc.)",
            "(E) Outro"
        ],
        chave: "pergunta6"
    },
    {
        pergunta: "Você gostaria de receber uma análise gratuita do seu negócio ou ideia de empresa?",
        opcoes: [
            "(A) Sim, quero entender como pagar menos impostos e crescer",
            "(B) Quero apenas conhecer mais sobre empreendedorismo",
            "(C) Talvez depois"
        ],
        chave: "pergunta7"
    }
];

// --- LÓGICA DO QUIZ ---
const quizContainer = document.getElementById('quiz-container');
let indicePerguntaAtual = 0;
let respostasUsuario = {};

// Função para carregar a pergunta
function carregarPergunta(indice) {
    // Limpa o container
    quizContainer.innerHTML = '';

    const dadosPergunta = quizData[indice];

    // Adiciona título e pergunta
    const titulo = document.createElement('h2');
    titulo.className = 'quiz-titulo';
    titulo.textContent = `Quiz Empreenda Vale — Pergunta ${indice + 1} de ${quizData.length}`;
    quizContainer.appendChild(titulo);

    const pergunta = document.createElement('p');
    pergunta.className = 'quiz-pergunta';
    pergunta.textContent = dadosPergunta.pergunta;
    quizContainer.appendChild(pergunta);

    // Adiciona lista de opções
    const listaOpcoes = document.createElement('ul');
    listaOpcoes.className = 'opcoes-lista';
    
    dadosPergunta.opcoes.forEach(opcao => {
        const itemOpcao = document.createElement('li');
        const botaoOpcao = document.createElement('button');
        botaoOpcao.className = 'opcao-btn';
        botaoOpcao.textContent = opcao;
        
        botaoOpcao.addEventListener('click', () => {
            selecionarResposta(dadosPergunta.chave, opcao);
        });

        itemOpcao.appendChild(botaoOpcao);
        listaOpcoes.appendChild(itemOpcao);
    });

    quizContainer.appendChild(listaOpcoes);
}

// Função ao selecionar resposta
function selecionarResposta(chave, valor) {
    respostasUsuario[chave] = valor;
    indicePerguntaAtual++;

    if (indicePerguntaAtual < quizData.length) {
        carregarPergunta(indicePerguntaAtual);
    } else {
        carregarFormularioFinal();
    }
}

// Função para carregar o formulário final
function carregarFormularioFinal() {
    quizContainer.innerHTML = `
        <div class="mensagem-final">
            <h2>Parabéns por concluir o Quiz Empreenda Vale! 🎉</h2>
            <p>A Zaffani Assessoria Contábil está ajudando empreendedores como você a estruturar seus negócios com segurança e pagar menos impostos dentro da lei.</p>
            <p>👉 Deixe seu nome, e-mail e WhatsApp para receber uma análise gratuita personalizada do seu perfil empreendedor.</p>
        </div>
        <form id="form-final">
            <div class="campo-form">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome">
            </div>
            
            <div class="campo-form">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="campo-form">
                <label for="telefone">WhatsApp (obrigatório):</label>
                <input type="tel" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" required 
                       pattern="\\(?[0-9]{2}\\)?\\s?[0-9]{4,5}-?[0-9]{4}">
                <span class="erro-validacao">Por favor, insira um telefone válido.</span>
            </div>

            <button type="submit" id="btn-enviar">Receber Análise Gratuita</button>
        </form>
    `;

    // Adiciona a máscara/formatação de telefone
    const inputTelefone = document.getElementById('telefone');
    inputTelefone.addEventListener('input', formatarTelefone);

    // Adiciona o listener de envio do formulário
    const form = document.getElementById('form-final');
    form.addEventListener('submit', enviarDados);
}

// Função simples para formatar telefone enquanto digita
function formatarTelefone(e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (valor.length > 11) valor = valor.substring(0, 11); // Limita a 11 dígitos
    
    if (valor.length > 10) {
        // (XX) XXXXX-XXXX
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length > 6) {
        // (XX) XXXX-XXXX
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) {
        // (XX) XXXX
        valor = valor.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else if (valor.length > 0) {
        // (XX
        valor = valor.replace(/^(\d*)/, '($1');
    }
    e.target.value = valor;
}

// Função para enviar os dados para o Google Script
async function enviarDados(e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    const btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    // Pega os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    // Monta o objeto final com todas as respostas
    const dadosFinais = {
        ...respostasUsuario,
        nome: nome,
        email: email,
        telefone: telefone
    };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosFinais)
        });

        const result = await response.json();

        if (result.result === "success") {
            // Sucesso! Mostra mensagem final
            quizContainer.innerHTML = `
                <div class="mensagem-final">
                    <h2>Obrigado! 🎉</h2>
                    <p>Seus dados foram enviados com sucesso. Em breve, nossa equipe entrará em contato com sua análise gratuita.</p>
                </div>
            `;
        } else {
            throw new Error(result.error || "Erro desconhecido ao enviar.");
        }

    } catch (error) {
        console.error("Erro no envio:", error);
        quizContainer.innerHTML = `
            <div class="mensagem-final">
                <h2>Ops! Algo deu errado.</h2>
                <p>Não foi possível enviar suas respostas. Por favor, tente novamente mais tarde ou entre em contato conosco diretamente.</p>
                <p>Erro: ${error.message}</p>
            </div>
        `;
    }
}

// Inicia o quiz quando a página carregar
window.addEventListener('load', () => {
    carregarPergunta(indicePerguntaAtual);

});



