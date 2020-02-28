/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/m/ListItemBaseRenderer",
	"sap/ui/core/Renderer"
], function(
	ListItemBaseRenderer,
	Renderer
) {
	"use strict";

	var PersonListItemRenderer = Renderer.extend(ListItemBaseRenderer);

	PersonListItemRenderer.renderLIAttributes = function(oRM, oLI) {
		oRM.addClass("sapSportsPersonListItem");
		if (oLI.getSelectMode()) {
			oRM.addClass("sapSportsPersonListItemSelectMode");
		}
		if (oLI.getDeleteMode()) {
			oRM.addClass("sapSportsPersonListItemDeleteMode");
		}
	};

	PersonListItemRenderer.renderLIContent = function(oRM, oLI) {

		oRM.write("<div");
		oRM.addClass("sapSportsPersonListItemContent");
		oRM.writeClasses();
		oRM.write(">");

		if (oLI.getShowPicture()) {
			oRM.write("<div");
			oRM.addClass("sapSportsPersonListItemImage");
			if (oLI.getIsDuplicate()){
				oRM.addClass("sapSportsPersonListItemPictureBorder");
			}
			oRM.writeClasses();
			oRM.addStyle("background-image", "url(" + oLI.getPictureURL() + ")");
			oRM.writeStyles();
			oRM.write("></div>");
		}

		if (oLI.getIsDuplicate()) {
			//div punch
			oRM.write("<div");
			oRM.addClass("sapSportsPersonListItemPunch");
			oRM.writeClasses();
			oRM.write("></div>");

			//deup icon
			oRM.write("<div");
			oRM.addClass("sapSportsPersonListItemDedupIcon");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oLI.getAggregation("_dedupIcon"));
			oRM.write("</div>");
		}

		oRM.write("<div");
		oRM.addClass("sapSportsPersonListItemText");
		oRM.writeClasses();
		oRM.write(">");
		oRM.write("<span");
		oRM.addClass("sapSportsPersonListItemName");
		oRM.writeClasses();
		oRM.write(">");
		oRM.writeEscaped(oLI.getFirstName() + " " + oLI.getLastName());
		oRM.write("</span>");

		if (oLI.getTeam() || oLI.getPosition()) {
			oRM.write("<span");
			oRM.addClass("sapSportsPersonListItemTeamPosition");
			oRM.writeClasses();
			oRM.write(">");
			if (oLI.getTeam() && oLI.getPosition()) {
				oRM.writeEscaped(oLI.getTeam() + "|" + oLI.getPosition());
			} else if (oLI.getTeam()) {
				oRM.writeEscaped(oLI.getTeam());
			} else {
				oRM.writeEscaped(oLI.getPosition());
			}
			oRM.write("</span>");
		}

		if (oLI.getStatus()){
			oRM.write("<span");
			oRM.addClass("sapSportsPersonListItemStatus");
			oRM.writeClasses();
			oRM.addStyle("background-color", oLI.getStatusColor());
			oRM.writeStyles();
			oRM.write(">");
			oRM.writeEscaped(oLI.getStatus());
			oRM.write("</span>");
		}
		oRM.write("</div>");

		if (oLI.getToolIcon()) {
			oRM.write("<div");
			oRM.addClass("sapSportsPersonListItemDeleteIcon");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oLI.getAggregation("_toolIcon"));
			oRM.write("</div>");
		}

		if (oLI.getDeleteMode()) {
			oRM.write("<div");
			oRM.addClass("sapSportsPersonListItemDeleteIcon");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oLI.getAggregation("_deleteIcon"));
			oRM.write("</div>");
		}

		if (oLI.getIsSelected()) {
			oRM.write("<div");
			oRM.addClass("sapSportsPersonListItemSelectIcon");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oLI.getAggregation("_selectIcon"));
			oRM.write("</div>");
		}

		oRM.write("</div>");

	};

	return PersonListItemRenderer;
}, true);
