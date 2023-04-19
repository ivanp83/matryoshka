const tg = window.Telegram.WebApp;
tg.expand();
export const useTelegram = () => {
  return {
    tg,
    user: tg.initDataUnsafe?.user,
    init_data: tg.initData,
    queryId: tg.initDataUnsafe?.query_id,
    chat: tg.initDataUnsafe?.chat,
  };
};
