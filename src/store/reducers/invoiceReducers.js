import { ADD_INVOICE, EDIT_INVOICE, DELETE_INVOICE } from "../constants/invoiceConstants";
  
  const initialState = {
    invoices: []
  };
  
  const invoiceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ADD_INVOICE:
        const id = state.invoices.length > 0 ? state.invoices[state.invoices.length - 1].id + 1 : 1;
        return {
          ...state,
          invoices: [...state.invoices, {id, ...payload}],
        };
      case EDIT_INVOICE:
        const updatedInvoice = state.invoices.map((invoice) => invoice.id == payload.id ? {id: payload.id, ...payload.updatedInvoice} : invoice)
        return {
          ...state,
          invoices: updatedInvoice,
        };
      case DELETE_INVOICE:
        const filterInvoice = state.invoices.filter((invoice) => invoice.id !== payload)
        return {
          ...state,
          invoices: filterInvoice,
        };
      default:
        return state;
    }
  };

  export default invoiceReducer;