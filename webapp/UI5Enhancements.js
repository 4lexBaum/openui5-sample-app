/*
 * ! ${copyright}
 */
sap.ui.define([
	"sap/m/Input",
	"sap/m/StandardListItem",
	"sap/m/GroupHeaderListItem",
	"sap/m/DisplayListItem"
], function (
	Input,
	StandardListItem,
	GroupHeaderListItem,
	DisplayListItem) {
	"use strict";

	const UI5Enhancements = {};

	/**
		 * Filters list suggestions.
		 *
		 * @private
		 * @param {Array} aItems Array of items
		 * @param {string} sTypedChars The search term
		 * @return {object} Object containing the matched items and groups information
		 */
	Input.prototype._filterListItems = function (aItems, sTypedChars) {
		var i,
			oListItem,
			oItem,
			aGroups = [],
			aHitItems = [],
			bFilter = this.getFilterSuggests(),
			bIsAnySuggestionAlreadySelected = false;

		for (i = 0; i < aItems.length; i++) {
			oItem = aItems[i];

			if (aItems[i].isA("sap.ui.core.SeparatorItem")) {
				oListItem = new GroupHeaderListItem({
					id: oItem.getId() + "-ghli",
					title: aItems[i].getText()
				});

				aGroups.push({
					header: oListItem,
					visible: false
				});

				this._configureListItem(oItem, oListItem);
				aHitItems.push(oListItem);
			} else if (!bFilter || this._fnFilter(sTypedChars, oItem)) {
				// TODO: SWITCH?

				if (aItems[i].isA("sap.ui.core.ListItem")) {
					/* sap.ui.core.ListItem -> sap.m.DisplayListItem */
					oListItem = new DisplayListItem(oItem.getId() + "-dli");
					oListItem.setLabel(oItem.getText());
					oListItem.setValue(oItem.getAdditionalText());
				} else if (aItems[i].isA("sap.ui.demo.todo.controls.SportsItem")) {
					/* Sports Item -> sap.StandardListItem */
					oListItem = new StandardListItem(oItem.getId() + "-sli");
					oListItem.setTitle(oItem.getText());
					oListItem.setIcon(oItem.getImageUrl());
				} else if (aItems[i].isA("sap.m.SuggestionItem")) {
					/* sap.m.SuggestionItem -> sap.StandardListItem */
					oListItem = new StandardListItem(oItem.getId() + "-sli");
					oListItem.setTitle(oItem.getText());
					oListItem.setIcon(oItem.getIcon());
					// oListItem.setDescription(oItem.getDescription());
				} else {
					/* any -> sap.StandardListItem */
					oListItem = new StandardListItem(oItem.getId() + "-sli");
					oListItem.setTitle(oItem.getText());
				}

				if (!bIsAnySuggestionAlreadySelected && (this._oSuggPopover._sProposedItemText === aItems[i].getText())) {
					oListItem.setSelected(true);
					bIsAnySuggestionAlreadySelected = true;
				}

				if (aGroups.length) {
					aGroups[aGroups.length - 1].visible = true;
				}

				this._configureListItem(oItem, oListItem);
				aHitItems.push(oListItem);
			}
		}

		aGroups.forEach(function (oGroup) {
			oGroup.header.setVisible(oGroup.visible);
		});

		return {
			hitItems: aHitItems,
			groups: aGroups
		};
	};

	return UI5Enhancements;
});
