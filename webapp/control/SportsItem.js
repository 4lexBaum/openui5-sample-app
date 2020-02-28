sap.ui.define([
    "sap/ui/core/Item"
], function (Item) {
    "use strict";
    return Item.extend("sap.ui.demo.todo.control.SportsItem", {
        metadata: {
            properties: {
                firstName: {
					type: "string",
					group: "Data",
					defaultValue: ""
				},
				lastName: {
					type: "string",
					group: "Data",
					defaultValue: ""
				},
				team: {
					type: "string",
					group: "Data",
					defaultValue: ""
				},
                pictureURL: { 
                    type: "string",
                    defaultValue: ""
                }
            }
        },
        init: function () {
            console.log(">>>>>>>>>>>>>>>");
            console.log("I'm a sports item :)");
            console.log("<<<<<<<<<<<<<<<");
        }
    });
});
