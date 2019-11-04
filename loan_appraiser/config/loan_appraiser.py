
from __future__ import unicode_literals
from frappe import _


def get_data():
    return [
        {
            "label": _("Appraiser"),
            "icon": "octicon octicon-file-directory",
            "items": [
                {
                    "doctype": "doc",
                    "type": "doctype",
                    "name": "Customer",
                    "label": _("Customer"),
                    "description": _("Register Customers"),
                },
                {
                    "doctype": "doc",
                    "type": "doctype",
                    "name": "Statement",
                    "label": _("Statement"),
                    "description": _("Upload and View Statements"),
                },
            ]
        }
    ]
