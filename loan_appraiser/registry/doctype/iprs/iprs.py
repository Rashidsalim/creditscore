# # -*- coding: utf-8 -*-
# # Copyright (c) 2019, reworq and contributors
# # For license information, please see license.txt

# from __future__ import unicode_literals
# import frappe
# from frappe.model.document import Document
# import requests
# import json

# class IPRS(Document):
# 	def validate(self):
# 		self.create_iprs()

# 	def create_iprs(self):
# 		url = frappe.db.get_value("Patascore API Settings",None,"url")
# 		token = frappe.db.get_value("Patascore API Settings",None,"token")
# 		data = {
# 			"national_id": '37692112'
# 			"callback_url": ''
# 		}
# 		headers = {"Content-Type":"application/json",
# 		"Authorization":"Bearer "+token
# 		}
# 		r = requests.post(str(url)+"api/v1/verification", headers = headers, data =json.dumps(data))

# 		frappe.msgprint(str(json.loads(response.text)["message"]))
		
# 		# if str(json.loads(response.text)["status"]) == "202":
# 		# 	self.
