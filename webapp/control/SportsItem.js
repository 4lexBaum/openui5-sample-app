sap.ui.define([
    "sap/ui/core/Item"
], function (Item) {
    "use strict";
    return Item.extend("sap.ui.demo.todo.controls.SportsItem", {
        metadata: {
            properties: {
                imageUrl: { type: "string", defaultValue: "" }
            }
        },
        init: function () {
            console.log(">>>>>>>>>>>>>>>");
            console.log("I'm a sports item :)");
            console.log("<<<<<<<<<<<<<<<");
        }
    });
});
