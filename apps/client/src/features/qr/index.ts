import type { QrResultDraft } from "@/shared/types/models";

export const initialQrDraft: QrResultDraft = {
  code: "",
  target: "product-detail",
};

export { QrHeroSection } from "@/features/qr/components/QrHeroSection";
export { QrManualCodePanel } from "@/features/qr/components/QrManualCodePanel";
export { QrPermissionNotice } from "@/features/qr/components/QrPermissionNotice";
export { QrScannerPanel } from "@/features/qr/components/QrScannerPanel";
export { QrUseCaseSection } from "@/features/qr/components/QrUseCaseSection";
