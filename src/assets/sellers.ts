import companyConfig from "../config/companConfig.js";

export const getSellerIdByCode = (sellerCode: number): string | null => {
  const sellersId = companyConfig.sellersId;
  if (sellersId && sellersId[sellerCode]) {
    return sellersId[sellerCode];
  }
  return sellersId[5536] || null; // Retorna o ID do vendedor padrão
};
