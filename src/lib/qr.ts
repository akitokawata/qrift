import QRCode from "qrcode";

export type QRDesignConfig = {
  fgColor: string;
  bgColor: string;
  logoUrl: string | null;
  width: number;
  margin: number;
};

export const defaultDesignConfig: QRDesignConfig = {
  fgColor: "#000000",
  bgColor: "#ffffff",
  logoUrl: null,
  width: 400,
  margin: 2,
};

export async function generateQRDataURL(
  url: string,
  config: Partial<QRDesignConfig> = {}
): Promise<string> {
  const merged = { ...defaultDesignConfig, ...config };
  return QRCode.toDataURL(url, {
    width: merged.width,
    margin: merged.margin,
    color: {
      dark: merged.fgColor,
      light: merged.bgColor,
    },
    errorCorrectionLevel: "H",
  });
}

export async function generateQRBuffer(
  url: string,
  config: Partial<QRDesignConfig> = {}
): Promise<Buffer> {
  const merged = { ...defaultDesignConfig, ...config };
  return QRCode.toBuffer(url, {
    width: merged.width,
    margin: merged.margin,
    color: {
      dark: merged.fgColor,
      light: merged.bgColor,
    },
    errorCorrectionLevel: "H",
    type: "png",
  });
}
