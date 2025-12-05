import axios from "axios";

interface SendNotificationParams {
  playerIds: string[];
  title: string;
  message: string;
  data?: Record<string, string>;
}

interface OneSignalNotificationResponse {
  id: string;
  recipients: number;
  external_id: string | null;
}

export class OneSignalService {
  private appId: string;
  private apiKey: string;
  private apiUrl = "https://onesignal.com/api/v1/notifications";

  constructor() {
    this.appId = process.env.ONESIGNAL_APP_ID || "";
    this.apiKey = process.env.ONESIGNAL_API_KEY || "";
  }

  async sendNotification({
    playerIds,
    title,
    message,
    data,
  }: SendNotificationParams): Promise<OneSignalNotificationResponse | null> {
    if (!this.appId || !this.apiKey) {
      console.warn(
        "[OneSignal] App ID or API Key not configured. Skipping notification."
      );
      return null;
    }

    if (playerIds.length === 0) {
      console.warn("[OneSignal] No player IDs provided. Skipping notification.");
      return null;
    }

    try {
      const response = await axios.post<OneSignalNotificationResponse>(
        this.apiUrl,
        {
          app_id: this.appId,
          include_player_ids: playerIds,
          headings: { en: title },
          contents: { en: message },
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${this.apiKey}`,
          },
        }
      );

      console.log("[OneSignal] Notification sent successfully:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "[OneSignal] Error sending notification:",
          error.response?.data || error.message
        );
      } else {
        console.error("[OneSignal] Error sending notification:", error);
      }
      return null;
    }
  }

  async sendPriceDropNotification({
    playerIds,
    productName,
    oldPrice,
    newPrice,
    productId,
  }: {
    playerIds: string[];
    productName: string;
    oldPrice: number;
    newPrice: number;
    productId: number;
  }): Promise<OneSignalNotificationResponse | null> {
    const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

    return this.sendNotification({
      playerIds,
      title: "Preço baixou!",
      message: `${productName} agora está ${discount}% mais barato! De R$ ${(oldPrice / 100).toFixed(2)} por R$ ${(newPrice / 100).toFixed(2)}`,
      data: {
        type: "price_drop",
        productId: String(productId),
        deeplink: `marketplace://product/${productId}`,
      },
    });
  }
}
