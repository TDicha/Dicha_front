import { env } from "@/shared/lib/env";

export function resolveApiMediaUrl(mediaUrl?: string | null) {
  if (!mediaUrl) {
    return undefined;
  }

  if (/^(?:https?:|blob:|data:)/i.test(mediaUrl)) {
    return mediaUrl;
  }

  return new URL(mediaUrl, env.apiBaseUrl).toString();
}
