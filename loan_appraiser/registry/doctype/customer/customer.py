# -*- coding: utf-8 -*-
# Copyright (c) 2019, reworq and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import requests
import json

class Customer(Document):
	def validate(self):
		self.create_customer()


	def create_customer(self):
		url = frappe.db.get_value("Patascore API Settings",None,"url")
		token = frappe.db.get_value("Patascore API Settings",None,"token")
		data = {
		"full_name": self.customer_name,
		"national_id": self.national_id,
		"phone": self.phone_number
		}
		headers = {
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		}
		response = requests.post(str(url)+"api/v1/customer/mfi/register", headers = headers, data=json.dumps(data))
		
		frappe.msgprint(str(json.loads(response.text)["message"]))
		# frappe.msgprint(str(json.loads(response.text)["status"]))
		# frappe.msgprint(str(json.loads(response.text)["message"]))
		# frappe.msgprint(str(json.loads(response.text)["data"]))
		if str(json.loads(response.text)["status"]) == "200":
			self.customer_created_mpesa = 1
			self.mpesa_id = str(json.loads(response.text)["data"]["id"])
		else:
			frappe.throw("Problem Creating Customer On Patascore")

