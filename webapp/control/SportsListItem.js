sap.ui.define([
    "sap/m/ListItemBase"
], function (Item) {
    "use strict";
    return ListItemBase.extend("sap.ui.demo.todo.controls.SportsListItem", {
        metadata: {
            properties: {
                imageUrl: { type: "string", defaultValue: "" }
            }
        },
        init: function () {
            console.log(">>>>>>>>>>>>>>>");
            console.log("I'm a sports item :)");
            console.log("<<<<<<<<<<<<<<<");
        },
        renderer: function () {
            // TODO
        }
    });
});
