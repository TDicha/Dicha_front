import { useNavigate } from "react-router-dom";

import { useAppStore } from "@/app/store";
import {
  QrHeroSection,
  QrManualCodePanel,
  QrPermissionNotice,
  QrScannerPanel,
  QrUseCaseSection,
} from "@/features/qr";
import { ROUTES } from "@/shared/constants/routes";
import { env } from "@/shared/lib/env";

export function QrPage() {
  const navigate = useNavigate();
  const qrCode = useAppStore((state) => state.qrDraft.code);
  const qrTargetId = useAppStore((state) => state.qrDraft.targetId);
  const resolvedTarget = useAppStore((state) => state.qrResolvedTarget);
  const setQrCode = useAppStore((state) => state.setQrCode);
  const resolveQrCode = useAppStore((state) => state.resolveQrCode);
  const clearQrResult = useAppStore((state) => state.clearQrResult);

  function handleResolve() {
    const normalized = qrCode.trim();

    if (!normalized) {
      return;
    }

    resolveQrCode();

    const target = normalized.toLowerCase().includes("blend")
      ? ROUTES.myBlend
      : env.enableMock
        ? `${ROUTES.products}/${qrTargetId ?? "ethiopia-yirgacheffe"}`
        : ROUTES.products;

    navigate(target);
  }

  return (
    <div className="bg-[var(--surface-app)] pb-8">
      <QrHeroSection />
      <QrScannerPanel />
      <QrUseCaseSection />
      <QrManualCodePanel
        onChangeQrCode={setQrCode}
        onClearResult={clearQrResult}
        onResolve={handleResolve}
        qrCode={qrCode}
        resolvedTarget={resolvedTarget}
      />
      <QrPermissionNotice />
    </div>
  );
}
