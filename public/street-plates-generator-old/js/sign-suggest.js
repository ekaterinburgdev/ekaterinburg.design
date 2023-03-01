var options = {
	url: "js/sign-suggest-list.json",

	getValue: "streetName",

	list: {
		maxNumberOfElements: 10,
		match: {
			enabled: true
		},
		onSelectItemEvent: function() {
			var streetName = $("#streetName").getSelectedItemData().streetName;
			var streetType = $("#streetName").getSelectedItemData().streetType;
			var streetLatin = $("#streetName").getSelectedItemData().streetLatin;

			$("#streetName").val(streetName).trigger("change");
			$("#streetType").val(streetType).trigger("change");
			$("#streetLatin").val(streetLatin).trigger("change");
		}
	},

	template: {
		type: "custom",
		method: function(value, item) {
			return item.streetType + " " + value;
		}
	}
};

$("#streetName").easyAutocomplete(options);
