const { Telegraf } = require('telegraf');
require('dotenv').config();
const { pool } = require('../db');
const bot = new Telegraf(process.env.BOT_TOKEN);

const isAdmin = (userId) => {
  return userId == process.env.ADMIN_ID;
};
const forwardToAdmin = (ctx) => {
  if (isAdmin(ctx.message.from.id)) {
    ctx.reply('Для ответа пользователю используйте функцию Ответить/Reply.');
  } else {
    ctx.forwardMessage(process.env.ADMIN_ID, ctx.from.id, ctx.message.id);
  }
};
bot.on('text', (ctx) => {
  if (
    ctx.message.reply_to_message &&
    ctx.message.reply_to_message.forward_from &&
    isAdmin(ctx.message.from.id)
  ) {
    ctx.telegram.sendMessage(
      ctx.message.reply_to_message.forward_from.id,
      ctx.message.text,
    );
  } else {
    forwardToAdmin(ctx);
  }
});
bot.on('voice', (ctx) => {
  if (
    ctx.message.reply_to_message &&
    ctx.message.reply_to_message.forward_from &&
    isAdmin(ctx.message.from.id)
  ) {
    ctx.telegram.sendVoice(
      ctx.message.reply_to_message.forward_from.id,
      ctx.message.voice.file_id,
      {
        caption: ctx.message.caption,
      },
    );
  } else {
    forwardToAdmin(ctx);
  }
});
bot.on('audio', (ctx) => {
  if (
    ctx.message.reply_to_message &&
    ctx.message.reply_to_message.forward_from &&
    isAdmin(ctx.message.from.id)
  ) {
    ctx.telegram.sendAudio(
      ctx.message.reply_to_message.forward_from.id,
      ctx.message.audio.file_id,
      {
        caption: ctx.message.caption,
      },
    );
  } else {
    forwardToAdmin(ctx);
  }
});
bot.on('document', (ctx) => {
  if (
    ctx.message.reply_to_message &&
    ctx.message.reply_to_message.forward_from &&
    isAdmin(ctx.message.from.id)
  ) {
    ctx.telegram.sendDocument(
      ctx.message.reply_to_message.forward_from.id,
      ctx.message.document.file_id,
      {
        caption: ctx.message.caption,
      },
    );
  } else {
    forwardToAdmin(ctx);
  }
});

bot.on('pre_checkout_query', async (ctx) => {
  try {
    await ctx.answerPreCheckoutQuery(true);
  } catch (err) {
    throw new Error(err);
  }
});

bot.on('successful_payment', async (ctx) => {
  try {
    const orderData = {
      name: ctx.update.message.from,
      order: ctx.update.message.successful_payment.order_info,
    };

    const sql = `INSERT INTO orders ("data")
      VALUES('{ "order": ${JSON.stringify(orderData, null, 2)}
    }')`;

    pool.query(sql);

    const message_html = `<b>Новый заказ</b>
<span class='tg-spoiler'>${orderData.name.username}</span> 
<span class='tg-spoiler'>${orderData.name.first_name}</span>
<span class='tg-spoiler'>${orderData.name.last_name}</span>
<strong class='tg-spoiler'>Адрес доставки</strong>
<span class='tg-spoiler'>${orderData.order.shipping_address.state}</span>
<span class='tg-spoiler'>${orderData.order.shipping_address.city}</span>
<span class='tg-spoiler'>${orderData.order.shipping_address.street_line1}</span>
<span class='tg-spoiler'>${orderData.order.shipping_address.street_line2}</span>`;

    return await bot.telegram.sendMessage(process.env.ADMIN_ID, message_html, {
      parse_mode: 'html',
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { bot };
