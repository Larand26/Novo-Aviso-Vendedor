import dotenv from "dotenv";
dotenv.config();

const getSellersId = (companyId: string): { [key: number]: string } => {
  if (companyId === "1") {
    return {
      14: "62990442a8e97e000e3879a4", // FABIO
      20: "6298c72336602e001b7e61c3", // SERGIO
      23: "62979ff880d64c000d8f7db9", // JOAO VITOR
      25: "63e11f55c8e5ba000c5de3b2", // BEATRIZ
      26: "661fc4d0404309000f32e6ff", // SHEILA
      27: "6683d60e6a652a000fae8214", // HENRIQUE
      29: "677d45689f124d001b14805d", // BRENDA
      31: "689e12b01812e90014a3ec8a", // SITE
      5536: "62990442a8e97e000e3879a4", // FABIO -> Default
    };
  }
  if (companyId === "2") {
    return {
      5: "667eae2551bbd0000f2c6cf9", // EDUARDO
      16: "5be75dc1d19a45003459b41f", // ADOLFO / VITOR
      28: "651beaea26ceed0012362d94", // KLEBER
      32: "6620109a3691eb000fb5bd97", // KALIL
      24: "63f6687c2f154d0011e967e5", // MARCELO
      25: "651bebbd09157d000d3a30cb", // ALEX
      36: "67a4ea94b6f1d90014d9af83", // WELLINGTON
      5536: "5be75dc1d19a45003459b41f", // ADOLFO / VITOR -> Default
    };
  }
  return {};
};

const companyConfig = {
  companyId: process.env.COMPANY_ID || "", // ID da empresa para a qual as tarefas serão criadas
  sellersId: getSellersId(process.env.COMPANY_ID || ""),
};

export default companyConfig;
