import { TelegramWebApps } from "telegram-webapps-types";

export {};

declare global {
  interface Window {
    Telegram: TelegramWebApps;
  }
}
