const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function getCashierTransactionDisplayCode(transaction) {
  return getDisplayCode(transaction.receiptNumber || transaction.id, "Tanpa nomor struk");
}
function getCashierReceiptDisplayCode(receipt) {
  return getDisplayCode(receipt.receiptNumber || receipt.id, "Struk digital");
}
function isUuidLike(value) {
  return uuidPattern.test((value ?? "").trim());
}
function getDisplayCode(value, fallback) {
  const normalizedValue = (value ?? "").trim();
  if (!normalizedValue || isUuidLike(normalizedValue)) {
    return fallback;
  }
  return normalizedValue;
}

export { getCashierReceiptDisplayCode as a, getCashierTransactionDisplayCode as g };
//# sourceMappingURL=cashier-display-BleBnxPh.mjs.map
