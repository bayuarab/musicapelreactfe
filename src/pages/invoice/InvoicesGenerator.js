import generateCurrentDate from "../../utilities/generateCurrentDate";

export function generateNewInvoice(registeredInvoice, auth) {
  const getResnum = (resNum = 0) => {
    registeredInvoice?.forEach((invoices) => {
      const refNum = parseInt(invoices.substring(3, invoices.length));
      resNum = resNum <= refNum ? refNum + 1 : resNum;
    });
    return resNum;
  };

  const getRef = () => {
    return registeredInvoice?.length <= 0
      ? {
          resNum: 0,
          refToken: auth?.nama.substring(0, 3).toUpperCase(),
        }
      : {
          resNum: getResnum(),
          refToken: registeredInvoice[0]?.substring(0, 3),
        };
  };

  const getInvoiceSepNum = (i) => {
    if (i === 0) return "";
    return "0" + getInvoiceSepNum(i - 1);
  };

  const invoiceLength = registeredInvoice[0] ? registeredInvoice[0].length : 8;
  const { resNum, refToken } = getRef();
  // console.log(resNum, refToken, invoiceLength);
  const loop = invoiceLength - refToken.length - resNum.toString().length;
  const newInvoiceNum = getInvoiceSepNum(loop);
  // console.log(refToken + newInvoiceNum + resNum);
  return refToken + newInvoiceNum + resNum;
}

export function generateNewMasterInvoice({
  selectedCart,
  registeredInvoice,
  userID,
  selectedOp,
  auth,
  calculateTotalCost,
}) {
  return {
    NoInvoice: generateNewInvoice(registeredInvoice, auth),
    PurchaseDate: generateCurrentDate(),
    Qty: selectedCart.length,
    Cost: calculateTotalCost(selectedCart),
    UserId: auth.userId,
    Method: selectedOp,
  };
}
