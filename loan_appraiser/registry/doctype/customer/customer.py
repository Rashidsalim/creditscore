# -*- coding: utf-8 -*-
# Copyright (c) 2019, reworq and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import requests
import json


class Customer(Document):
    def after_insert(self):
        self.create_customer()

    def create_customer(self):
        url = frappe.db.get_value("Patascore API Settings", None, "url")
        token = frappe.db.get_value("Patascore API Settings", None, "token")
        data = {
            "full_name": self.customer_name,
            "national_id": self.national_id,
            "phone": self.phone_number
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
        data_statement = {
            "national_id": self.national_id
        }
        response = requests.post(
            str(url) + "api/v1/customer/mfi/register", headers=headers, data=json.dumps(data))

        frappe.msgprint(str(json.loads(response.text)["message"]))
        if str(json.loads(response.text)["status"]) == "200":
            self.customer_created_mpesa = 1
            self.mpesa_id = str(json.loads(response.text)["data"]["id"])
            # self.statement_response = str(
            #     json.loads(fetch_stc.text)["message"])
        else:
            frappe.throw("Problem Creating Customer On Patascore")


@frappe.whitelist()
def check_statement_exist(national_id):
    url = frappe.db.get_value("Patascore API Settings", None, "url")
    token = frappe.db.get_value("Patascore API Settings", None, "token")

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }

    response = requests.get(str(
        url) + "api/v1/statement/check?national_id={}".format(national_id), headers=headers, verify=False)
    return (response.json())
    # if str(json.dumps(response.json)["status"]) == "200":
    #     self.statement_analytics_successfully_fetched = 1
    # else:
    #     frappe.throw("Statement has not been uploaded.")


@frappe.whitelist()
def check_statement_analytics(national_id):
    url = frappe.db.get_value("Patascore API Settings", None, "url")
    token = frappe.db.get_value("Patascore API Settings", None, "token")

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }

    response = requests.get(str(
        url) + "api/v1/mpesa/analytics?national_id={}".format(national_id), headers=headers, verify=False)
    frappe.msgprint("Statement Analytics fetched Successfully")
    return (response.json())

# IPRS Verification
@frappe.whitelist()
def fetch_iprs_verification(national_id):
    url = frappe.db.get_value("Patascore API Settings", None, "url")
    token = frappe.db.get_value("Patascore API Settings", None, "token")

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }
    data = {
        "identifier_type": "national_id",
        "identifier": national_id
    }
    response = requests.post(str(
        url) + "api/v1/sync/verification", json=data, headers=headers, verify=False)
    frappe.msgprint(str(response))
    return (response.json())