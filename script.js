function calcularIMC() {

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const resultado = document.getElementById("resultado");


    // Verificar se os campos estão preenchidos

    if (isNaN(peso) || isNaN(altura)) {

        resultado.innerHTML = `
            <div class="erro">
                ⚠️ Preencha seu peso e sua altura.
            </div>
        `;

        return;
    }


    // Verificar valores inválidos

    if (peso <= 0 || altura <= 0) {

        resultado.innerHTML = `
            <div class="erro">
                ⚠️ Digite valores maiores que zero.
            </div>
        `;

        return;
    }


    // Calcular IMC

    const imc = peso / (altura * altura);

    const imcFormatado = imc.toFixed(2);


    // Classificação

    let classificacao;

    let classe;


    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        classe = "baixo";

    } 
    
    else if (imc < 25) {

        classificacao = "Peso normal";

        classe = "normal";

    } 
    
    else if (imc < 30) {

        classificacao = "Sobrepeso";

        classe = "sobrepeso";

    } 
    
    else {

        classificacao = "Obesidade";

        classe = "obesidade";
    }


    // Mostrar resultado

    resultado.innerHTML = `

        <div class="resultado-topo">

            <span>Seu IMC</span>

            <strong>${imcFormatado}</strong>

        </div>


        <div class="classificacao ${classe}">

            ${classificacao}

        </div>


        <div class="barra-imc">

            <div class="categoria baixo-barra">
                <span>&lt; 18.5</span>
                <small>Abaixo</small>
            </div>

            <div class="categoria normal-barra">
                <span>18.5 - 24.9</span>
                <small>Normal</small>
            </div>

            <div class="categoria sobrepeso-barra">
                <span>25 - 29.9</span>
                <small>Sobrepeso</small>
            </div>

            <div class="categoria obesidade-barra">
                <span>30+</span>
                <small>Obesidade</small>
            </div>

        </div>


        <button class="btn-novamente" onclick="recalcular()">

            Calcular novamente

        </button>

    `;
}


function recalcular() {

    document.getElementById("peso").value = "";

    document.getElementById("altura").value = "";

    document.getElementById("resultado").innerHTML = `

        <p>Digite seu peso e sua altura para calcular.</p>

    `;

    document.getElementById("peso").focus();

}