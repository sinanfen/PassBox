/*
 Template: Crovex - Bootstrap 4 Admin Dashboard
 Author: Mannatthemes
 File: Treeview
 */


$(function () {
	"use strict";

	//// Default
	//$('#jstree').jstree();

	$('#jstree').jstree({
		'core': {
			'check_callback': true
		}
	});
	
	//Check Box
	$('#jstree-checkbox').jstree({
		"checkbox" : {
			"keep_selected_style" : false
		  },
		  "plugins" : [ "checkbox" ]
	});
});