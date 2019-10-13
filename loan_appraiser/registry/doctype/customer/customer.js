// Copyright (c) 2019, reworq and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	// refresh: function(frm) {


	// }
	"get_statement_score":function(frm){

		// $.ajax({
		// 	type: "GET",
		// 	url: "https://dev.api.patascore.com/api/v1/statement/check?national_id=37692112",
		// 	cache: false,
			
		// 	success: function(data){
		// 	console.log(data)
			
		// 	if(data.data.exists){
		// 		$.ajax({
		// 			type: "GET",
		// 			url: "https://dev.api.patascore.com/api/v1/mpesa/analytics?national_id=37692112",
		// 			cache: false,
		// 			crossDomain: true,
		// 			beforeSend: function(xhr){
		// 				xhr.withCredentials = true;
		// 		  	},
		// 			headers:{
		// 				"Authorization":"Bearer 1801b7e6-f2e1-46b6-a228-61a664e85b16"
		// 			},
					
		// 			success: function(data){
					
		// 			if(data.data.exists){
		
		// 			}
		// 			}
		// 			});

		// 	}
		// 	}
		// 	});

		frappe.call({
			method: "loan_appraiser.registry.doctype.customer.customer.check_statement_exist",
			args: {"national_id":frm.doc.name},
			callback: function(r) {
				console.log(r)
				if(r.message.data.exists){

					frappe.call({
						method: "loan_appraiser.registry.doctype.customer.customer.check_statement_analytics",
						args: {"national_id":frm.doc.name},
						callback: function(r) {
							console.log(r)
							frm.set_value("current_score",r.message.score_output.current_score)
							frm.set_value("loan_range",r.message.score_output.loan_range.toString())
							frm.set_value("betting_expenses",r.message.summary.betting_expenditure)
							frm.refresh_field("current_score","loan_range","betting_expenses")
						}
							
					});
				}else{
					frappe.throw("Statement is not attached.")
				}
			}
		});
	
	}
});



