export enum SellerId {
  DEFAULT = "62990442a8e97e000e3879a4",
  VENDEDOR_20 = "6298c72336602e001b7e61c3",
  VENDEDOR_23 = "62979ff880d64c000d8f7db9",
  VENDEDOR_25 = "63e11f55c8e5ba000c5de3b2",
  VENDEDOR_26 = "661fc4d0404309000f32e6ff",
  VENDEDOR_27 = "6683d60e6a652a000fae8214",
  VENDEDOR_29 = "677d45689f124d001b14805d",
  VENDEDOR_31 = "689e12b01812e90014a3ec8a",
}

const SELLER_BY_CODE: Record<number, SellerId> = {
  14: SellerId.DEFAULT,
  20: SellerId.VENDEDOR_20,
  23: SellerId.VENDEDOR_23,
  25: SellerId.VENDEDOR_25,
  26: SellerId.VENDEDOR_26,
  27: SellerId.VENDEDOR_27,
  29: SellerId.VENDEDOR_29,
  31: SellerId.VENDEDOR_31,
};

export const getSellerIdByCode = (sellerCode: number): SellerId | null => {
  return SELLER_BY_CODE[sellerCode] ?? null;
};
