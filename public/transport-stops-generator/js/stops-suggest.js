var options = {
	url: "js/transport-stops-names.json",

	getValue: "nameRu",

	list: {
		maxNumberOfElements: 10,
		match: {
			enabled: true
		},
		onSelectItemEvent: function() {
			var nameRu = $("#nameRu").getSelectedItemData().nameRu;
			$("#nameRu").val(nameRu).trigger("change");

			var nameEn = $("#nameRu").getSelectedItemData().nameEn;
			$("#nameEn").val(nameEn).trigger("change");
		}
	},

	// template: {
	// 	type: "custom",
	// 	method: function(value, item) {
	// 		return item.streetType + " " + value;
	// 	}
	// }
};

$("#nameRu").easyAutocomplete(options);
