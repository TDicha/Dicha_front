export function getDeliveryDayLabel(dateLabel?: string) {
  if (!dateLabel) {
    return "";
  }

  const today = new Date();
  const deliveryDate = new Date(dateLabel.replace(/\./g, "-"));
  const dayMs = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil(
    (deliveryDate.getTime() - today.getTime()) / dayMs,
  );

  if (Number.isNaN(diffDays)) {
    return "";
  }

  if (diffDays === 0) {
    return "D-Day";
  }

  return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
}
