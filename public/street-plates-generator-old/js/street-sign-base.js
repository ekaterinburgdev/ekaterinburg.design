$(document).ready(function(){
	$("#createPDF").click(function(){
		createPDF();
	});

	signWidth();

	map();
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
	let streetType = $('#streetType').val().toUpperCase();
	let streetName = $('#streetName').val().toUpperCase();
			streetName = streetName.replace('-', ''); // замена обычного дефиса на капсовый
	let streetLatin = $('#streetLatin').val();
	let buildingNumber = $('#buildingNumber').val().toUpperCase();
	let numberLeftVal = $('#numberLeft').val();
	let numberRightVal = $('#numberRight').val();
	let numberLeft
	let numberRight

	let fileName = streetLatin.replace(/ /ig, '-') + '-' + buildingNumber + '.pdf';


	// длина названия улицы и номера дома
	let streetNameLength = $('#streetName').val().length;
	let buildingNumberLength = $('#buildingNumber').val().length;


	// размеры таблички
	let signNameWidth
	let signNumberWidth = 330;
	let signHeight = 320;



	// разная длина таблички в зависимости от длины названия улицы
	if (streetNameLength <= 8) {
		signNameWidth = 1000;
	}
	else if (streetNameLength >= 9 && streetNameLength <= 13) {
		signNameWidth = 1300;
	}
	else if (streetNameLength >= 14) {
		signNameWidth = 1600;
	}


	let i, word;

	// параметры для текстовых блоков
	let words = [
		{
			'isRequired': true,
			'contents': streetType,
			'fontSize': 170,
			'fontTracking': 110,
			'align': 'center',
			'position': {
				'x': (signNameWidth/2)-8,
				'y': 80,
			},
			'baseline': 'bottom',
			'font': 'IsetSansBold',
			'fontStyle': 'normal',
			'color': {
				'c': 100,
				'm': 100,
				'y': 30,
				'k': 25,
			},
		},
		{
			'isRequired': true,
			'contents': streetName,
			'fontSize': 385,
			'fontTracking': 50,
			'align': 'center',
			'position': {
				'x': (signNameWidth/2)-15,
				'y': signHeight/2,
			},
			'baseline': 'middle',
			'font': 'IsetSansBold',
			'fontStyle': 'normal',
			'color': {
				'c': 100,
				'm': 100,
				'y': 30,
				'k': 25,
			},
		},
		{
			'isRequired': true,
			'contents': buildingNumber,
			'fontSize': 720,
			'fontTracking': 0,
			'align': 'center',
			'position': {
				'x': signNameWidth+(signNumberWidth/2),
				'y': signHeight/2,
			},
			'baseline': 'middle',
			'font': 'IsetSansNumber',
			'fontStyle': 'normal',
			'color': {
				'c': 0,
				'm': 0,
				'y': 0,
				'k': 0,
			},
		},
		{
			'isRequired': true,
			'contents': streetLatin,
			'fontSize': 165,
			'fontTracking': 0,
			'align': 'center',
			'position': {
				'x': signNameWidth/2,
				'y': 299,
			},
			'baseline': 'bottom',
			'font': 'IsetSansItalic',
			'fontStyle': 'normal',
			'color': {
				'c': 100,
				'm': 100,
				'y': 30,
				'k': 25,
			},
		},
		{
			'isRequired': false,
			'contents': numberLeftVal,
			'addContents': {
				'before': '⟵ ',
				'after': '',
			},
			'fontSize': 150,
			'fontTracking': 0,
			'align': 'left',
			'position': {
				'x': 32,
				'y': 298,
			},
			'baseline': 'bottom',
			'font': 'IsetSansRegular',
			'fontStyle': 'normal',
			'color': {
				'c': 100,
				'm': 100,
				'y': 30,
				'k': 25,
			},
		},
		{
			'isRequired': false,
			'contents': numberRightVal,
			'addContents': {
				'before': '',
				'after': ' ⟶',
			},
			'fontSize': 150,
			'fontTracking': 0,
			'align': 'right',
			'position': {
				'x': signNameWidth-32,
				'y': 298,
			},
			'baseline': 'bottom',
			'font': 'IsetSansRegular',
			'fontStyle': 'normal',
			'color': {
				'c': 100,
				'm': 100,
				'y': 30,
				'k': 25,
			},
		}
	];

	// когда название слишком длинное, кегль уменьшается
	if (streetNameLength >= 14 && streetNameLength <= 16) {
		words[1].fontSize = 360;
	}
	else if (streetNameLength == 17) {
		words[1].fontSize = 350;
	}
	else if (streetNameLength == 18) {
		words[1].fontSize = 340;
	}
	else if (streetNameLength == 19) {
		words[1].fontSize = 330;
	}
	else if (streetNameLength == 20) {
		words[1].fontSize = 320;
	}
	else if (streetNameLength == 21) {
		words[1].fontSize = 310;
	}


	// убираем стрелочки, если значения не заданы
	if (numberLeftVal == 0) {
		words.splice(4, 1);
	}

	if (numberRightVal == 0) {
		words.pop();
	}


	// разный кегль для номера дома
	if (buildingNumberLength == 1) {
		words[2].fontSize = 720;
	}
	else if (buildingNumberLength == 2) {
		words[2].fontSize = 600;
	}
	else if (buildingNumberLength == 3) {
		words[2].fontSize = 470;
	}
	else if (buildingNumberLength == 4) {
		words[2].fontSize = 380;
	}
	else if (buildingNumberLength == 5) {
		words[2].fontSize = 320;
	}
	else if (buildingNumberLength == 6) {
		words[2].fontSize = 250;
	}



	// создаем новый пдф
	let doc = new jsPDF({
		orientation: 'l',
		unit: 'mm',
		format: [(signNameWidth+signNumberWidth) * PT_TO_MM, signHeight * PT_TO_MM],
		putOnlyUsedFonts: true,
	});

	// рисуем белый прямоугольник, чтобы они был ниже всех в слоях
	doc.setDrawColor(0);
	doc.setFillColor('0', '0', '0', '0');
	doc.rect(0, 0, signNameWidth, signHeight, 'F');
				// x, y, width, height

	// рисуем синий прямоугольник под номер, чтобы они был ниже всех в слоях
	doc.setDrawColor(0);
	doc.setFillColor('1.00', '1.00', '0.30', '0.25');
	doc.rect(signNameWidth, 0, signNumberWidth, signHeight, 'F');
				// x, y, width, height

	let isError = false
	// через цикл создаем текстовые блоки из массива выше
	for (i = 0; i < words.length; i++) {
		word = words[i]

		if ('' === word.contents && true === word.isRequired) {
			isError = true
			continue
		}

		if (word.addContents) {
			if (word.addContents.before) {
				word.contents = word.addContents.before + word.contents
			}
			if (word.addContents.after) {
				word.contents += word.addContents.after
			}
		}

		doc.internal.write('q');
		doc.setFont(word.font);
		doc.setFontStyle(word.fontStyle);
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
		doc.rect(0, 0, signNameWidth+signNumberWidth, 320, 'F');
		doc.internal.write('Q');
	}

	let errorDiv = document.getElementById('div-error-message')
	if (isError) {
		if (errorDiv) {
			errorDiv.style.display = 'block'
		}
		return
	} else {
		if (errorDiv) {
			errorDiv.style.display = 'none'
		}
	}

	doc.save(fileName);
}

function signWidth() {

	// разная ширина таблички в зависимости от длины названия улицы на фронте
	var signAddressWidthS = 700;
	var signAddressWidthM = 900;
	var signAddressWidthL = 1100;
	var signNumberWidth = 200;

	var streetName = $("#streetName");
	var signWrap = $("#sign-wrap");
	var signAddress = $("#sign-address");
	var signAddressPhantom = $("#sign-address-phantom");
	var signBuildingNumberPhantom = $("#sign-building-number-phantom");

	streetName.on("change paste keyup", function() {
		if (streetName.val().length <= 10) {
			signWrap.css("width", signAddressWidthS+signNumberWidth);
			signAddress.css("width", signAddressWidthS);
			signAddressPhantom.css("width", signAddressWidthS);
			signBuildingNumberPhantom.css("left", signAddressWidthS);
		}
		else if (streetName.val().length > 10 && streetName.val().length <= 15) {
			signWrap.css("width", signAddressWidthM+signNumberWidth);
			signAddress.css("width", signAddressWidthM);
			signAddressPhantom.css("width", signAddressWidthM);
			signBuildingNumberPhantom.css("left", signAddressWidthM);
		}
		else if (streetName.val().length > 15 && streetName.val().length <= 18) {
			signWrap.css("width", signAddressWidthL+signNumberWidth);
			signAddress.css("width", signAddressWidthL);
			signAddressPhantom.css("width", signAddressWidthL);
			signBuildingNumberPhantom.css("left", signAddressWidthL);
		}
		else if (streetName.val().length >= 19) {
			signWrap.css("width", signAddressWidthL+signNumberWidth);
			signAddress.css("width", signAddressWidthL);
			signAddressPhantom.css("width", signAddressWidthL);
			signBuildingNumberPhantom.css("left", signAddressWidthL);
			streetName.css("font-size", "75px");
		}
	});
	streetName.keyup();



	// уменьшение номера дома в зависимости от длины

	let buildingNumberInput = $('#buildingNumber');

	buildingNumberInput.on("change paste keyup", function() {
		if ($('#buildingNumber').val().length < 3) {
			buildingNumberInput.css("font-size", '110px');
		}
		else if ($('#buildingNumber').val().length == 3) {
			buildingNumberInput.css("font-size", '90px');
		}
		else if ($('#buildingNumber').val().length == 4) {
			buildingNumberInput.css("font-size", '70px');
		}
		else if ($('#buildingNumber').val().length == 5) {
			buildingNumberInput.css("font-size", '60px');
		}
		else if ($('#buildingNumber').val().length == 6) {
			buildingNumberInput.css("font-size", '50px');
		}
	});
}

function map() {
	let streetNameInput = $('#streetName');
	let streetNameValue = $('#streetName').val();

	let buildingNumberInput = $('#buildingNumber');
	let buildingNumberValue = $('#buildingNumber').val();

	streetNameInput.on("change paste keyup", function() {
		$('.ymaps-2-1-77-searchbox-input__input').val($('#streetName').val());
	});

	buildingNumberInput.on("change paste keyup", function() {
		$('.ymaps-2-1-77-searchbox-input__input').val($('#streetName').val() + ' ' + $('#buildingNumber').val());
	});
}
