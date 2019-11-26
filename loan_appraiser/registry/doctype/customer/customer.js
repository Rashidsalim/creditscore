// Copyright (c) 2019, reworq and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	 refresh: function(frm) {
	// 	frm.custom_button(__("Approve for Loan"), function() {
	// 		frappe.msgprint("Approved");
	// 	});
	// };
		frm.page.add_action_item(__('Approve For Loan'), function () {
			frappe.msgprint("Approved");
			cur_frm.trigger('approve');
			 });
		frm.page.add_action_item(__('Deny Loan'), function () {
			frappe.msgprint("Denied");
			frm.trigger('deny');
		})
			},
	"get_statement_score": function (frm) {

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
			method: 'loan_appraiser.registry.doctype.customer.customer.check_statement_exist',
			args: {
				'national_id': frm.doc.name
			},
			callback: function (r) {
				console.log(r)
				if (r.message.data.exists) {
					frappe.call({
						method: "loan_appraiser.registry.doctype.customer.customer.check_statement_analytics",
						args: {
							"national_id": frm.doc.name
						},
						callback: function (r) {
							console.log(r)
							frm.set_value("current_score", r.message.score_output.current_score)
							frm.set_value("loan_range", r.message.score_output.loan_range.toString())
							frm.set_value("betting_expenses", r.message.summary.betting_expenditure)
							frm.set_value("cash_received", r.message.summary.received_money)
							frm.set_value("airtime_purchase", r.message.summary.airtime_purchase)
							frm.set_value("cash_sent_out", r.message.summary.sent_out)
							frm.set_value("loan_repayment", r.message.summary.loan_repayment)
							frm.set_value("key_reasons", JSON.stringify(r.message.score_output.reasons_v2, null, '\t'))
							frm.set_value("risk", r.message.score_output.risk)
							//frm.set_value("Grade", r.message.score_output.grade),
							frm.set_value("loan_taken", r.message.summary.loan_taken)
							frm.set_value("peer_to_peer_transfers", r.message.summary.peer_to_peer_transfer)
							frm.set_value("peer_to_peer_received", r.message.summary.peer_to_peer_received)
							frm.set_value("pay_bills", r.message.summary.pay_bills)
							frm.set_value("mpesa_withdrawal", r.message.summary.mpesa_withdrawal)
							frm.set_value("bank_transfers", r.message.summary.bank_transfers)
							//frm.set_vale("bank_withdrawal", r.message.summary.bank_withdrawal)


							frm.refresh_field("current_score", "loan_range", "betting_expenses", "cash_received", "cash_sent_out", "loan_repayment", "key_reasons", "risk", "loan_taken", "pay_bills", "peer_to_peer_transfers", "peer_to_peer_received", "pay_bills", "mpesa_withdrawal", "bank_transfers", "airtime_purchase")
						}
					});
				} else {
					frappe.throw('Statement is not Uploaded.')
				}
			}
		});
	},
	// "get_iprs_verification": function (frm) {

	// 	frappe.call({
	// 		method: "loan_appraiser.registry.doctype.customer.customer.fetch_iprs_verification",
	// 		args: {
	// 			'national_id': frm.doc.name
	// 		},
	// 		callback: function (r) {
	// 			console.log(r)
	// 			if (r.message.data.exists) {
	// 				frappe.call({
	// 					method: "loan_appraiser.registry.doctype.customer.customer.fetch_iprs_verification",
	// 					args: {
	// 						"national_id": frm.doc.name
	// 					},
	// 					callback: function (r) {
	// 						console.log(r)
	// 						frm.set_value("iprs_full_name", r.message.data.full_name)

	// 						frm.refresh_field("iprs_full_name")
	// 					}
	// 				});
	// 			} else {
	// 				frappe.throw("IPRS Data does not Exist.")
	// 			}
	// 		}
	// 	});
	// }
});
