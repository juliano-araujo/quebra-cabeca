const X = 6;
const Y = 4;
const TamanhoPeca = 200;

var escolhido1 = null;
var escolhido2 = null;

function mount() {
	const grade = document.querySelector("#grade");

	for (let i = 0; i < Y; i++) {
		for (let j = 0; j < X; j++) {
			let novaPeca = document.createElement("div");
			novaPeca.id = "x" + j + "y" + i;

			novaPeca.style.width = TamanhoPeca + "px";
			novaPeca.style.height = TamanhoPeca + "px";
			novaPeca.style.border = "1px solid #fff";

			novaPeca.style.position = "absolute";
			novaPeca.style.top = i * TamanhoPeca + "px";
			novaPeca.style.left = j * TamanhoPeca + "px";

			novaPeca.style.background = "url(img.jpg)";
			novaPeca.style.backgroundSize =
				X * TamanhoPeca + "px " + Y * TamanhoPeca + "px";
			novaPeca.style.backgroundPositionX =
				((j * 25) / (X - 1)) * 100 + "%";
			novaPeca.style.backgroundPositionY =
				((i * 25) / (Y - 1)) * 100 + "%";

			novaPeca.setAttribute("onclick", "clickPiece(this)");

			grade.appendChild(novaPeca);
		}
	}
}

function validar() {
	let ok = true;
	for (let i = 0; i < Y; i++) {
		for (let j = 0; j < X; j++) {
			let posEsperadaX = j * TamanhoPeca + "px";
			let posEsperadaY = i * TamanhoPeca + "px";
			let peca = document.querySelector("#x" + j + "y" + i);
			if (
				peca.style.left != posEsperadaX ||
				peca.style.top != posEsperadaY
			) {
				ok = false;
				break;
			}
		}
	}

	if (ok) {
		window.alert("Você terminou o quebra cabeça!!");
	}
}

function clickPiece(element) {
	if (escolhido1 == null) {
		escolhido1 = element;
	} else if (escolhido2 == null) {
		escolhido2 = element;

		movePiece(escolhido1, escolhido2);

		escolhido1 = null;
		escolhido2 = null;
		validar();
	}
}

function shuffle(iterations) {
	for (let i = 0; i < iterations; i++) {
		let escolhido1X = 0;
		let escolhido1Y = 0;
		let escolhido2X = 0;
		let escolhido2Y = 0;

		while (escolhido1X == escolhido2X && escolhido1X == escolhido2X) {
			escolhido1X = Math.round(Math.random() * (X - 1));
			escolhido1Y = Math.round(Math.random() * (Y - 1));
			escolhido2X = Math.round(Math.random() * (X - 1));
			escolhido2Y = Math.round(Math.random() * (Y - 1));
		}
		escolhido1 = document.querySelector(
			"#x" + escolhido1X + "y" + escolhido1Y
		);
		escolhido2 = document.querySelector(
			"#x" + escolhido2X + "y" + escolhido2Y
		);

		movePiece(escolhido1, escolhido2);
		escolhido1 = null;
		escolhido2 = null;
	}
}

function movePiece(peca1, peca2) {
	let pecaTrocadoTop = peca1.style.top;
	let pecaTrocadoLeft = peca1.style.left;

	peca1.style.top = peca2.style.top;
	peca1.style.left = peca2.style.left;
	peca2.style.top = pecaTrocadoTop;
	peca2.style.left = pecaTrocadoLeft;
}

window.onload = () => {
	mount();
	shuffle(100);
};
