const SUPABASE_URL = "https://yufrahuljwwixxporwbu.supabase.co";
const SUPABASE_KEY = "sb_publishable_NIxmPKE5JjG4KbtdfwpUyQ_A9u4-Ndi";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarAvaliacoes() {
    const { data, error } = await supabaseClient
        .from("avaliacoes")
        .select("*")
        .order("data", { ascending: false });

    if (error) {
        console.error("Erro ao carregar avaliações:", error);
        document.getElementById("tabelaAvaliacoes").innerHTML = `
            <tr>
                <td colspan="5">Erro ao carregar avaliações.</td>
            </tr>
        `;
        return;
    }

    atualizarResumo(data);
    mostrarUltimaAvaliacao(data);
    mostrarTabela(data);

    document.getElementById("ultimaAtualizacao").textContent =
        "Última atualização: " + new Date().toLocaleTimeString("pt-BR");
}

function atualizarResumo(avaliacoes) {
    document.getElementById("totalAvaliacoes").textContent = avaliacoes.length;

    const normal = avaliacoes.filter(
        item => item.classificacao === "Peso normal"
    ).length;

    const sobrepeso = avaliacoes.filter(
        item => item.classificacao === "Sobrepeso"
    ).length;

    const obesidade = avaliacoes.filter(
        item => item.classificacao === "Obesidade"
    ).length;

    document.getElementById("totalNormal").textContent = normal;
    document.getElementById("totalSobrepeso").textContent = sobrepeso;
    document.getElementById("totalObesidade").textContent = obesidade;
}

function mostrarUltimaAvaliacao(avaliacoes) {
    if (avaliacoes.length === 0) {
        return;
    }

    const ultima = avaliacoes[0];

    document.getElementById("ultimoPeso").textContent =
        `${ultima.peso} kg`;

    document.getElementById("ultimaAltura").textContent =
        `${ultima.altura} m`;

    document.getElementById("ultimoIMC").textContent =
        Number(ultima.imc).toFixed(2);

    document.getElementById("ultimaClassificacao").textContent =
        ultima.classificacao;

    document.getElementById("horarioUltima").textContent =
        formatarHora(ultima.data);
}

function mostrarTabela(avaliacoes) {
    const tabela = document.getElementById("tabelaAvaliacoes");

    if (avaliacoes.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5">Nenhuma avaliação cadastrada.</td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = avaliacoes.map(avaliacao => `
        <tr>
            <td>${formatarHora(avaliacao.data)}</td>
            <td>${avaliacao.peso} kg</td>
            <td>${avaliacao.altura} m</td>
            <td>${Number(avaliacao.imc).toFixed(2)}</td>
            <td>${avaliacao.classificacao}</td>
        </tr>
    `).join("");
}

function formatarHora(data) {
    if (!data) {
        return "--:--";
    }

    return new Date(data).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

carregarAvaliacoes();

setInterval(carregarAvaliacoes, 5000);