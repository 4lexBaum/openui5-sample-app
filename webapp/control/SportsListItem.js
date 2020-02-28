/*
 * ! ${copyright}
 */
sap.ui.define([
    "sap/m/ListItemBase",
    "sap/ui/core/Icon"
], function (
    ListItemBase,
    Icon
) {
	"use strict";

	var PersonListItem = ListItemBase.extend("sap.ui.demo.todo.control.SportsListItem", {
		metadata: {
			library: "sap.sports.ui",
			properties: {
				key: {
					type: "string",
					group: "Misc",
					defaultValue: ""
				},
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
				position: {
					type: "string",
					group: "Data",
					defaultValue: ""
				},
				status: {
					type: "string",
					group: "Data",
					defaultValue: ""
				},
				statusColor: {
					type: "string",
					group: "Data",
					defaultValue: "#2ebf68"
				},
				pictureURL: {
					type: "sap.ui.core.URI",
					group: "Data",
					defaultValue: ""
				},
				toolIcon: {
					type: "sap.ui.core.URI",
					group: "Appearance",
					defaultValue: "sap-icon://sap-sports/icon-calendar"
				},
				selectMode: {
					type: "boolean",
					group: "Appearance",
					defaultValue: false
				},
				deleteMode: {
					type: "boolean",
					group: "Appearance",
					defaultValue: false
				},
				type: {
					type: "sap.m.ListType",
					group: "Misc",
					defaultValue: sap.m.ListType.Active
				},
				allowed: {
					type: "boolean",
					group: "Appearance",
					defaultValue: true
				},
				showPicture: {
					type: "boolean",
					group: "Appearance",
					defaultValue: true
				},
				isDuplicate: {
					type: "boolean",
					group: "Appearance",
					defaultValue: false
				},
				isSelected: {
					type: "boolean",
					group: "Appearance",
					defaultValue: false
				}
			},
			aggregations: {
				"_toolIcon": {
					type: "sap.ui.core.Icon",
					multiple: false,
					visibility: "hidden"
				},
				"_selectIcon": {
					type: "sap.ui.core.Icon",
					multiple: false,
					visibility: "hidden"
				},
				"_dedupIcon": {
					type: "sap.ui.core.Icon",
					multiple: false,
					visibility: "hidden"
				},
				"_deleteIcon": {
					type: "sap.ui.core.Icon",
					multiple: false,
					visibility: "hidden"
				}
			},
			events: {
				itemDeleted: {},
				itemToolPress: {}
			}
		}
	});

	PersonListItem.prototype.init = function () {

		ListItemBase.prototype.init.apply(this, arguments);

		this.setAggregation("_selectIcon", new Icon({
			src: "sap-icon://sap-sports/icon-checkmark"
		}));

		this.setAggregation("_dedupIcon", new Icon({
			src: "sap-icon://sap-sports/icon-dedup"
		}));

		this.setAggregation("_deleteIcon", new Icon({
			src: "sap-icon://sap-sports/icon-cancel",
			press: [
				this.fireItemDeleted, this
			]
		}));

		this.setAggregation("_toolIcon", new Icon({
			press: [
				this.fireItemToolPress, this
			]
		}));
	};

	/**
	 * Overwrite protected method to avoid dom access of sap.m.ListBase before rendering
	 */
	PersonListItem.prototype.getContentAnnouncement = function () {
	};

	PersonListItem.prototype.setToolIcon = function (sUri) {
		return this.getAggregation("_toolIcon").setSrc(sUri);
	};

	PersonListItem.prototype.getToolIcon = function () {
		return this.getAggregation("_toolIcon").getSrc();
	};

	PersonListItem.prototype.exit = function () {
		if (this.deleteIcon) {
			this.deleteIcon.destroy();
		}

		ListItemBase.prototype.exit.apply(this, arguments);
	};

	PersonListItem.prototype.getText = function () {
		return this.getFirstName() + " " + this.getLastName();
	};

	PersonListItem.prototype.getTitle = function () {
		return this.getFirstName() + " " + this.getLastName();
	};

	PersonListItem.prototype.getEnabled = function () {
		return false;
	};

	return PersonListItem;
});
