let valor = 200000;
let prazo_anos = 20;
let juros_ano = 0.08;
let prazo_meses = 0;
let juros_mes = 0;
let juros_ac = 0;

let prestacoes = [];

let p = {
	prestacao: 0,
	amortizacao: 0.0,
	juros: 0.0,
	total_mes: 0.0,
	acumulado: 0.0,
};

window.addEventListener('load', () => {
	inicializar();
	atualizar();
	calcular();
	preencher_juros_acumulado();
});

function setFieldValue(campo, valor) {
	campo = '#' + campo;
	let element = document.querySelector(campo);
	element.value = valor;
}

function inicializar() {
	setFieldValue('valor', 200000);
	setFieldValue('prazo_anos', 20);
	setFieldValue('juros_ano', 0.08);
}

function calcular_juros_mes(ja) {
	ja = parseFloat(ja);
	jm = (1 + ja) ** (1.0 / 12.0) - 1;
	return jm;
}

function atualizar() {
	let element_valor = document.querySelector('#valor');
	let element_prazo_anos = document.querySelector('#prazo_anos');
	let element_juros_ano = document.querySelector('#juros_ano');

	let element_prazo_meses = document.querySelector('#prazo_meses');
	prazo_meses = parseInt(element_prazo_anos.value) * 12;
	element_prazo_meses.value = prazo_meses;

	let element_juros_mes = document.querySelector('#juros_mes');
	jm = calcular_juros_mes(element_juros_ano.value);
	juros_mes = jm;
	element_juros_mes.value = juros_mes;
}

function preencher_juros_acumulado() {
	let element_juros_ac = document.querySelector('#juros_ac');
	let total_pago = prestacoes[prestacoes.length - 1].acumulado;
	element_juros_ac.value = total_pago - valor;
}

function parseValor(valor) {
	return parseFloat(valor.toFixed(2));
}

function calcular() {
	// let valor = 200000;
	// let prazo_anos = 20;
	// let juros_ano = 0.08;
	// let prazo_meses = 0;
	// let juros_mes = 0;
	// let juros_ac = 0;

	// acumulado: 0.0,

	valor_prestacao = valor / prazo_meses;

	// atualizar amortizacao
	p.amortizacao = parseValor(valor_prestacao);

	let valor_acumulado = 0.0;

	for (let x = 0; x < prazo_meses; x++) {
		prestacao_corrente = x + 1;
		// console.log(x, valor, prazo_anos, juros_ano, prazo_meses, juros_mes);

		// clonar objeto (desconsiderar referência)
		let pn = Object.assign({}, p);

		// atualizar prestação corrente
		pn.prestacao = prestacao_corrente;

		// calcular juros
		saldo_devedor = valor - (pn.prestacao - 1) * pn.amortizacao;
		pn.juros = saldo_devedor * juros_mes;
		pn.juros = parseValor(pn.juros);

		// calculo to total mes
		pn.total_mes = pn.amortizacao + pn.juros;
		pn.total_mes = parseValor(pn.total_mes);

		// calculo acumulado
		valor_acumulado += pn.total_mes;
		pn.acumulado = parseValor(valor_acumulado);

		console.log(prestacao_corrente, pn);

		prestacoes.push(pn);
	}
}
