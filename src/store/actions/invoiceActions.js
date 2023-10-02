import { ADD_INVOICE, EDIT_INVOICE, DELETE_INVOICE } from "../constants/invoiceConstants";
  
export function addInvoice(invoice) {
  return {
      type: ADD_INVOICE,
      payload: invoice,
  };
}

export function editInvoice(id, updatedInvoice) {
  return {
      type: EDIT_INVOICE,
      payload: {id, updatedInvoice},
  };
}

export function deleteInvoice(id) {
  return {
      type: DELETE_INVOICE,
      payload: id,
  };
}