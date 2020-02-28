/*
 * ! ${copyright}
 */
sap.ui.define([
	"sap/m/library",
	"sap/m/ComboBox",
	"sap/m/MultiComboBox",
	"sap/m/Input",
	"sap/m/StandardListItem",
	"sap/m/GroupHeaderListItem",
	"sap/m/DisplayListItem",
	"./control/SportsListItem"
], function (
	library,
	ComboBox,
	MultiComboBox,
	Input,
	StandardListItem,
	GroupHeaderListItem,
	DisplayListItem,
	SportsListItem) {
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
				// } else if (aItems[i].isA("sap.ui.demo.todo.controls.SportsItem")) {
				// 	/* Sports Item -> sap.m.StandardListItem */
				// 	oListItem = new StandardListItem(oItem.getId() + "-sli");
				// 	oListItem.setTitle(`${oItem.getFirstName()} ${oItem.getLastName()}`);
				// 	oListItem.setIcon(oItem.getPictureURL());
				} else if (aItems[i].isA("sap.ui.demo.todo.control.SportsItem")) {
					/* Sports Item -> Sports List Item */
					oListItem = new SportsListItem(oItem.getId() + "-sportsli");
					oListItem.setFirstName(oItem.getFirstName());
					oListItem.setLastName(oItem.getLastName());
					oListItem.setTeam(oItem.getTeam());
					oListItem.setPictureURL(oItem.getPictureURL());
				} else if (aItems[i].isA("sap.m.SuggestionItem")) {
					/* sap.m.SuggestionItem -> sap.m.StandardListItem */
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

	/**
	 * Maps an item type of sap.ui.core.Item to an item type of sap.m.StandardListItem.
	 *
	 * @param {sap.ui.core.Item} oItem The item to be matched
	 * @returns {sap.m.StandardListItem | null} The matched StandardListItem
	 * @private
	 */

	// shortcut for sap.m.ListType
	var ListType = library.ListType;

	ComboBox.prototype._mapItemToListItem = function(oItem) {
		var oListItem, sListItem, sListItemSelected, sAdditionalText;
		var oRenderer = this.getRenderer();

		if (!oItem) {
			return null;
		}
		sAdditionalText = (oItem.getAdditionalText && this.getShowSecondaryValues()) ? oItem.getAdditionalText() : "";

		sListItem = oRenderer.CSS_CLASS_COMBOBOXBASE + "Item";
		sListItemSelected = (this.isItemSelected(oItem)) ? sListItem + "Selected" : "";

		if (oItem.isA("sap.ui.core.SeparatorItem")) {
			oListItem = this._mapSeparatorItemToGroupHeader(oItem, oRenderer);

			oListItem.setTitle(oItem.getText());

		} else if (oItem.isA("sap.ui.demo.todo.control.SportsItem")) {
			/* Sports Item -> Sports List Item */
			oListItem = new SportsListItem({
				type: ListType.Active,
				firstName: oItem.getFirstName(),
				lastName: oItem.getLastName(),
				team: oItem.getTeam(),
				pictureURL: oItem.getPictureURL()
			})
		} else {
			oListItem = new StandardListItem({
				type: ListType.Active,
				info: sAdditionalText,
				visible: oItem.getEnabled()
			}).addStyleClass(sListItem + " " + sListItemSelected);

			oListItem.setTitle(oItem.getText());
		}
		
		this.setSelectable(oItem, oItem.getEnabled());
		oListItem.setTooltip(oItem.getTooltip());
		oItem.data(oRenderer.CSS_CLASS_COMBOBOXBASE + "ListItem", oListItem);

		oItem.getCustomData().forEach(function(oCustomData){
			oListItem.addCustomData(oCustomData.clone());
		});

		this._oItemObserver.observe(oItem, {properties: ["text", "additionalText", "enabled", "tooltip"]});

		return oListItem;
	};

	/**
	 * TODO: correction in ComboBoxBase regarding 'this.getSelectedItem()'
	 *
	 * Map an item type of sap.ui.core.Item to an item type of sap.m.StandardListItem.
	 *
	 * @param {sap.ui.core.Item} oItem The item to be matched
	 * @returns {sap.m.StandardListItem | null} The matched StandardListItem
	 * @private
	 */
	MultiComboBox.prototype._mapItemToListItem = function(oItem) {
		var oListItem, sListItem, sListItemSelected, sAdditionalText;
		var oRenderer = this.getRenderer();

		if (!oItem) {
			return null;
		}
		
		if (oItem.isA("sap.ui.core.SeparatorItem")) {
			oListItem = this._mapSeparatorItemToGroupHeader(oItem, oRenderer);
			oItem.data(oRenderer.CSS_CLASS_COMBOBOXBASE + "ListItem", oListItem);
			this._decorateListItem(oListItem);
			
			return oListItem;
		}
		
		
		sListItem = oRenderer.CSS_CLASS_MULTICOMBOBOX + "Item";
		sListItemSelected = (this.isItemSelected(oItem)) ? sListItem + "Selected" : "";
		
		if (oItem.isA("sap.ui.demo.todo.control.SportsItem")) {
			/* Sports Item -> Sports List Item */
			oListItem = new SportsListItem({
				type: ListType.Active,
				visible: oItem.getEnabled(),
				firstName: oItem.getFirstName(),
				lastName: oItem.getLastName(),
				team: oItem.getTeam(),
				pictureURL: oItem.getPictureURL()
			})
		} else {
			oListItem = new StandardListItem({
				type: ListType.Active,
				visible: oItem.getEnabled()
			}).addStyleClass(sListItem + " " + sListItemSelected);
			
			sAdditionalText = (oItem.getAdditionalText && this.getShowSecondaryValues()) ? oItem.getAdditionalText() : "";
			oListItem.setTitle(oItem.getText());
			oListItem.setInfo(sAdditionalText);
		}
		

		oListItem.setTooltip(oItem.getTooltip());

		oItem.data(oRenderer.CSS_CLASS_COMBOBOXBASE + "ListItem", oListItem);

		if (sListItemSelected) {
			var oToken = new Token({
				key: oItem.getKey()
			});

			oToken.setText(oItem.getText());

			oItem.data(oRenderer.CSS_CLASS_COMBOBOXBASE + "Token", oToken);
			// TODO: Check this invalidation
			this._oTokenizer.addToken(oToken, true);
		}

		this.setSelectable(oItem, oItem.getEnabled());
		this._decorateListItem(oListItem);
		return oListItem;
	};

	return UI5Enhancements;
});
