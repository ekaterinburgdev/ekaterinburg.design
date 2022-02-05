$(document).ready(function(){
	$("#createPDF").click(function(){
		createPDF();
	});

	signWidth();
});

const PT_TO_MM = 2.8346456692913;
const EM_TO_MM = 0.3514598035146;
function getCharSpace(fontSize, trackingValue) {
	return fontSize * EM_TO_MM * trackingValue / 1000;
}

function cmykVal(num) {
	return (num / 100).toString();
}

function createPDF() {
	// значения из инпутов
	let nameRu = $('#nameRu').val();
	let nameEn = $('#nameEn').val();

	let fileName = nameEn.replace(/ /ig, '-') + '.pdf';


	// длина названия улицы и номера дома
	let nameRuLength = $('#nameRu').val().length;

	// размеры таблички
	let signWidth = 3090;
	let signHeight = 230;

	let nameRuX
	let nameEnX

	// разная длина таблички в зависимости от длины названия улицы
	if (nameRuLength <= 23) {
		nameRuX = signWidth/2-10;
		nameEnX = signWidth/2-6;
	}
	else if (nameRuLength >= 24 && nameRuLength <= 29) {
		nameRuX = signWidth/3-10;
		nameEnX = signWidth/3-6;
	}
	else if (nameRuLength >= 30) {
		nameRuX = signWidth/4-10;
		nameEnX = signWidth/4-6;
	}

	let i, word;

	// параметры для текстовых блоков
	let words = [
		{
			'contents': nameRu,
			'fontSize': 322,
			'fontTracking': 0,
			'align': 'left',
			'position': {
				'x': nameRuX,
				'y': signHeight/3-5,
			},
			'baseline': 'middle',
			'font': 'IsetSansBold',
			'fontStyle': 'normal',
			'color': {
				'c': 0,
				'm': 0,
				'y': 0,
				'k': 0,
			},
		},
		{
			'contents': nameEn,
			'fontSize': 190,
			'fontTracking': 0,
			'align': 'left',
			'position': {
				'x': nameEnX,
				'y': signHeight-21,
			},
			'baseline': 'bottom',
			'font': 'IsetSansItalic',
			'fontStyle': 'normal',
			'color': {
				'c': 0,
				'm': 0,
				'y': 0,
				'k': 50,
			},
		}
	];


	// создаем новый пдф
	const doc = new jsPDF({
		orientation: 'l',
		unit: 'mm',
		format: [signWidth, signHeight],
		putOnlyUsedFonts: true,
	});

	// рисуем черный прямоугольник, чтобы они был ниже всех в слоях
	doc.setDrawColor(0);
	doc.setFillColor('0.7', '0.5', '0.5', '1.0');
	doc.rect(0, 0, signWidth, signHeight, 'F');
				// x, y, width, height


	// ставим нужные иконки
	if ($('#bus-check').is(':checked') && $('#trol-check').is(':checked')) {
		doc.setDrawColor(0);
		doc.setFillColor('0.8', '0.0', '1.0', '0.0');
		doc.rect(62.275, 98.741, 13.879, 33.755, 'F'); // фара слева
		doc.rect(205.991, 98.741, 13.879, 33.755, 'F'); // фара справа
		doc.rect(83.205, 69.807, 115.519, 115.735, 'F'); // большой прямоугольник
		doc.rect(97.455, 55.557, 86.804, 16.905, 'F'); // малый прямоугольник сверху
		doc.ellipse(97.455, 69.807, 28.5/2, 28.5/2, 'F'); // кружок слева сверху
		doc.ellipse(184.473, 69.807, 28.5/2, 28.5/2, 'F'); // кружок справа сверху

		doc.setDrawColor(0);
		doc.setFillColor('0.7', '0.5', '0.5', '1.0');
		doc.rect(97.454, 69.807, 86.804, 15.288, 'F'); // черный прямоугольник сверху
		doc.rect(97.454, 98.74, 86.804, 38.579, 'F'); // лобовое стекло
		doc.rect(102.385, 175.898, 77.158, 11.47, 'F'); // черный прямоугольник снизу
		doc.ellipse(102.278, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
		doc.ellipse(179.436, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева

		doc.setDrawColor(0);
		doc.setFillColor('1.0', '0.0', '0.0', '0.0');
		doc.rect(265.87, 98.741, 13.879, 33.755, 'F'); // фара слева
		doc.rect(409.586, 98.741, 13.879, 33.755, 'F'); // фара справа
		doc.rect(286.8, 69.807, 115.519, 115.735, 'F'); // большой прямоугольник
		doc.rect(301.05, 55.557, 86.804, 16.905, 'F'); // малый прямоугольник сверху
		doc.ellipse(301.05, 69.807, 28.5/2, 28.5/2, 'F'); // кружок слева сверху
		doc.ellipse(388.068, 69.807, 28.5/2, 28.5/2, 'F'); // кружок справа сверху
		doc.triangle(315.608, 42.331, 336.067, 21.871, 346.296, 32.1, 'F') // ветка слева 1
		doc.triangle(315.608, 42.331, 325.837, 52.559, 346.296, 32.1, 'F') // ветка слева 2
		doc.triangle(351.851, 42.331, 372.311, 21.871, 382.541, 32.1, 'F') // ветка справа 1
		doc.triangle(351.851, 42.331, 362.081, 52.559, 382.541, 32.1, 'F') // ветка справа 2

		doc.setDrawColor(0);
		doc.setFillColor('0.7', '0.5', '0.5', '1.0');
		doc.rect(301.049, 69.807, 86.804, 15.288, 'F'); // черный прямоугольник сверху
		doc.rect(301.05, 98.74, 86.804, 38.579, 'F'); // лобовое стекло
		doc.rect(305.98, 175.898, 77.158, 11.47, 'F'); // черный прямоугольник снизу
		doc.ellipse(305.873, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
		doc.ellipse(383.031, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
	}
	else if ($('#bus-check').is(':checked')) {
		doc.setDrawColor(0);
		doc.setFillColor('0.8', '0.0', '1.0', '0.0');
		doc.rect(62.275, 98.741, 13.879, 33.755, 'F'); // фара слева
		doc.rect(205.991, 98.741, 13.879, 33.755, 'F'); // фара справа
		doc.rect(83.205, 69.807, 115.519, 115.735, 'F'); // большой прямоугольник
		doc.rect(97.455, 55.557, 86.804, 16.905, 'F'); // малый прямоугольник сверху
		doc.ellipse(97.455, 69.807, 28.5/2, 28.5/2, 'F'); // кружок слева сверху
		doc.ellipse(184.473, 69.807, 28.5/2, 28.5/2, 'F'); // кружок справа сверху

		doc.setDrawColor(0);
		doc.setFillColor('0.7', '0.5', '0.5', '1.0');
		doc.rect(97.454, 69.807, 86.804, 15.288, 'F'); // черный прямоугольник сверху
		doc.rect(97.454, 98.74, 86.804, 38.579, 'F'); // лобовое стекло
		doc.rect(102.385, 175.898, 77.158, 11.47, 'F'); // черный прямоугольник снизу
		doc.ellipse(102.278, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
		doc.ellipse(179.436, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
	}
	else if ($('#trol-check').is(':checked')) {
		doc.setDrawColor(0);
		doc.setFillColor('1.0', '0.0', '0.0', '0.0');
		doc.rect(62.275, 98.741, 13.879, 33.755, 'F'); // фара слева
		doc.rect(205.991, 98.741, 13.879, 33.755, 'F'); // фара справа
		doc.rect(83.205, 69.807, 115.519, 115.735, 'F'); // большой прямоугольник
		doc.rect(97.455, 55.557, 86.804, 16.905, 'F'); // малый прямоугольник сверху
		doc.ellipse(97.455, 69.807, 28.5/2, 28.5/2, 'F'); // кружок слева сверху
		doc.ellipse(184.473, 69.807, 28.5/2, 28.5/2, 'F'); // кружок справа сверху
		doc.triangle(112.013, 42.331, 132.472, 21.871, 142.701, 32.1, 'F') // ветка слева 1
		doc.triangle(112.013, 42.331, 122.242, 52.559, 142.701, 32.1, 'F') // ветка слева 2
		doc.triangle(148.257, 42.331, 168.716, 21.871, 178.946, 32.1, 'F') // ветка справа 1
		doc.triangle(148.257, 42.331, 158.486, 52.559, 178.946, 32.1, 'F') // ветка справа 2

		doc.setDrawColor(0);
		doc.setFillColor('0.7', '0.5', '0.5', '1.0');
		doc.rect(97.454, 69.807, 86.804, 15.288, 'F'); // черный прямоугольник сверху
		doc.rect(97.454, 98.74, 86.804, 38.579, 'F'); // лобовое стекло
		doc.rect(102.385, 175.898, 77.158, 11.47, 'F'); // черный прямоугольник снизу
		doc.ellipse(102.278, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
		doc.ellipse(179.436, 156.607, 19.29/2, 19.29/2, 'F'); // фара слева
	}
	else if ($('#tram-check').is(':checked')) {
		doc.setDrawColor(0);
		doc.setFillColor('0.0', '0.6', '1.0', '0.0');
		doc.rect(62.275, 98.741, 13.88, 33.755, 'F'); // фара слева
		doc.rect(205.992, 98.741, 13.879, 33.755, 'F'); // фара справа
		doc.rect(83.207, 69.807, 115.733, 62.69, 'F'); // большой средний прямоугольник
		doc.rect(97.672, 55.342, 86.804, 31.604, 'F'); // малый прямоугольник сверху
		doc.rect(102.495, 132.496, 77.158, 38.579, 'F'); // малый прямоугольник снизу
		doc.ellipse(97.672, 69.807, 28.93/2, 28.93/2, 'F'); // кружок слева сверху
		doc.ellipse(184.475, 69.807, 28.93/2, 28.93/2, 'F'); // кружок справа сверху
		doc.triangle(83.207, 132.497, 88.202, 157.41, 141.073, 132.496, 'F'); // треугольник слева
		doc.triangle(141.073, 132.496, 193.945, 157.41, 198.94, 132.497, 'F'); // треугольник справа
		doc.ellipse(102.495, 158.227, 25.695/2, 25.695/2, 'F'); // малый кружок слева
		doc.ellipse(179.652, 158.227, 25.695/2, 25.695/2, 'F'); // малый кружок справа
		doc.ellipse(103.341, 156.422, 29.307/2, 29.307/2, 'F'); // средний кружок слева
		doc.ellipse(178.806, 156.422, 29.307/2, 29.307/2, 'F'); // средний кружок справа
		doc.ellipse(104.678, 154.343, 33.464/2, 33.464/2, 'F'); // крупный кружок слева
		doc.ellipse(177.469, 154.343, 33.464/2, 33.464/2, 'F'); // крупный кружок справа
		doc.rect(102.495, 21.586, 77.156, 13.646, 'F'); // пантограф горизонталь
		doc.triangle(126.36, 42.331, 145.639, 23.052, 155.867, 33.281, 'F'); // пантограф диагональ 1
		doc.triangle(126.36, 42.331, 136.589, 52.559, 155.867, 33.281, 'F'); // пантограф диагональ 2
		doc.triangle(100.778, 195.358, 121.237, 174.898, 131.466, 185.127, 'F'); // шпала слева 1
		doc.triangle(100.778, 195.358, 111.007, 205.586, 131.466, 185.127, 'F'); // шпала слева 2
		doc.triangle(137.022, 195.358, 157.482, 174.898, 167.711, 185.127, 'F'); // шпала справа 1
		doc.triangle(137.022, 195.358, 147.251, 205.586, 167.711, 185.127, 'F'); // шпала справа 2


		doc.setDrawColor(0);
		doc.setFillColor('0.7', '0.5', '0.5', '1.0');
		doc.rect(97.672, 69.807, 86.804, 15.696, 'F'); // черный прямоугольник сверху
		doc.rect(97.672, 99.224, 86.804, 33.273, 'F'); // лобовое стекло
		doc.ellipse(116.961, 151.786, 19.29/2, 19.29/2, 'F'); // фара слева
		doc.ellipse(165.185, 151.786, 19.29/2, 19.29/2, 'F'); // фара справа
	}


	// через цикл создаем текстовые блоки из массива выше
	for (i = 0; i < words.length; i++) {
		word = words[i];
		doc.internal.write('q');
		doc.setFont(word.font, word.fontStyle);
		doc.setFontSize(word.fontSize);
		doc.setTextColor(
				cmykVal(word.color.c),
				cmykVal(word.color.m),
				cmykVal(word.color.y),
				cmykVal(word.color.k)
		);
		doc.text(
			word.contents,
			word.position.x,
			word.position.y,
			{
				'baseline': word.baseline,
				'charSpace': getCharSpace(word.fontSize, word.fontTracking),
				// 'lineHeightFactor': word.fontLeading / word.fontSize,
				'align': word.align,
				'renderingMode': 'addToPathForClipping'
			});
		doc.rect(0, 0, signWidth, signHeight, 'F');
		doc.internal.write('Q');
	}
	doc.save(fileName);
}

function signWidth() {
	// разная ширина таблички в зависимости от длины названия улицы на фронте
	var nameRu = $("#nameRu");
	var stopIcons = $("#stop-icons");
	var stopName = $("#stop-name");

	nameRu.on("change paste keyup", function() {
		if (nameRu.val().length <= 17) {
			stopName.css("margin-top", ".25vw");
			nameRu.css("font-size", "4vw");
			stopIcons.css("width", "50%");
			stopName.css("width", "50%");
		}
		else if (nameRu.val().length >= 18 && nameRu.val().length <= 24) {
			stopName.css("margin-top", ".25vw");
			nameRu.css("font-size", "4vw");
			stopIcons.css("width", "35%");
			stopName.css("width", "65%");
		}
		else if (nameRu.val().length >= 25 && nameRu.val().length <= 28) {
			stopName.css("margin-top", ".25vw");
			nameRu.css("font-size", "4vw");
			stopIcons.css("width", "25%");
			stopName.css("width", "75%");
		}
		else if (nameRu.val().length >= 29) {
			stopIcons.css("width", "25%");
			stopName.css("width", "75%");
			stopName.css("margin-top", ".5vw");
			nameRu.css("font-size", "3.3vw");
		}
	});
	nameRu.keyup();
}
