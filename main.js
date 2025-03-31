const {Telegraf, Markup, replyWithMarkdown} = require('telegraf');
const {User, connect} = require("./model")
let token = '7809580387:AAEwUVXSKT3pECY3vyYrzl3Tq1O_RSMdSco'
let channels = ['@rumiyy_daxoo', '@nakrutkachi_bolaaa' ]
const bot = new Telegraf(token);
const ADMIN_ID = 7559868170;
const ADMIN_ID2 = 5740402591;

connect()


async function checkSubscription(userId) {
  let notSubscribed = [];

  try {
    for (const channel of channels) {
      try {
        const member = await bot.telegram.getChatMember(channel, userId);
        if (!['member', 'administrator', 'creator'].includes(member.status)) {
          notSubscribed.push(channel);
        }
      } catch (error) {
        console.error(`Kanalga ulanishda xatolik: ${channel}`, error);
        notSubscribed.push(channel);
      }
    }
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }

  return notSubscribed;
}


bot.use(async (ctx, next) => {
  try {
    console.log(ctx.from.id);
    
    const userId = ctx.from.id;
    let notSubscribed = [];

    for (const channel of channels) {
      const member = await bot.telegram.getChatMember(channel, userId);
      if (!['member', 'administrator', 'creator'].includes(member.status)) {
        notSubscribed.push(channel);
      }
    }

    if (notSubscribed.length === 0) {
      return next();
    } else {
      return ctx.reply(
        '⚠️ Botdan foydalanish uchun quyidagi kanallarga obuna bo‘ling va « ✅ Tasdiqlash » tugmasini bosing!',
        Markup.inlineKeyboard([
          [Markup.button.url('Obuna bo‘lish', `https://t.me/nakrutkachi_bolaaa`)],
          [Markup.button.url('Obuna bo‘lish', `https://t.me/rumiyy_daxoo`)],
          [Markup.button.callback('Tasdiqlash✅', 'try')]
        ])
      );
    }
  } catch (error) {
    console.error(error);
    return ctx.reply('Xatolik yuz berdi! Iltimos, keyinroq urinib ko‘ring.');
  }
});

bot.action('try', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const notSubscribed = await checkSubscription(userId);

    if (notSubscribed.length === 0) {
      await ctx.answerCbQuery();
      await ctx.deleteMessage(); 
      // return ctx.reply('✅ Siz kanalga obuna bo‘lgansiz! Endi botdan foydalanishingiz mumkin.');
      ctx.reply('Telefon raqamingizni yuboring', Markup.keyboard([
        [Markup.button.contactRequest('Telefon raqamni yuborish')]
      ]).resize().oneTime())
    } else {
      return ctx.answerCbQuery('❌ Siz hali barcha kanallarga obuna bo‘lmadingiz!', { show_alert: true });
    }
  } catch (error) {
    console.error(error);
    return ctx.reply('Xatolik yuz berdi! Iltimos, keyinroq urinib ko‘ring.');
  }
});

bot.start((ctx) => {
  try {
    ctx.reply('Telefon raqamingizni yuboring', Markup.keyboard([
      [Markup.button.contactRequest('Telefon raqamni yuborish')]
    ]).resize().oneTime())
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }
})

bot.on('contact', async(ctx) => {
  try {
    await User.create({phone: ctx.message.contact.phone_number,tg_id: ctx.from.id, username: ctx.message.from.username, time: new Date()})
  ctx.reply(`Siz asosiy menudasiz`, Markup.keyboard([
    [Markup.button.callback('Buyurtma')], [Markup.button.callback('Yordam')],
  ]).resize())
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }
})

bot.command('admin', async (ctx) => {
  try {
    if (ctx.message.from.id == ADMIN_ID || ctx.message.from.id == ADMIN_ID2) {
      const users = await User.findAll();

      if (users.length === 0) {
          return ctx.reply("❌ Hech qanday foydalanuvchi topilmadi.");
      }

      let message = "📋 Foydalanuvchilar ro‘yxati: \n\n";
      users.forEach((user, index) => {
          const username = user.username ? `@${user.username}` : "Noma’lum";
          message += `👤 #${index + 1}\n`;
          message += `🆔 ID: ${user.tg_id}\n`;
          message += `👤 Username: ${username}\n`;
          message += `📞 Telefon: ${user.phone}\n`;
          message += `📅 Qo‘shilgan vaqti: ${new Date(user.createdAt).toLocaleString("uz-UZ")}\n`;
          message += `----------------------\n`;
      });

      ctx.reply(message);
  }
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }
});



bot.hears('Yordam', (ctx) => {
  try {
    ctx.reply(`❕ Sizga yordam kerakmi ?

      ☎️ Qo'llab quvvatlash xizmati orqali bot haqidagi istalgan savolingizga javob topishingiz olishingiz mumkin!`, Markup.inlineKeyboard([
        [Markup.button.url('☎️ Qollab-Quvvatlash', 'https://t.me/xojiakbar2270')]
      ]))
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }
})


bot.hears('Buyurtma', (ctx) => {
  try {
    ctx.reply(`Xizmatlardan keraklisini tanlang`, Markup.keyboard([
      [Markup.button.callback('Instagram'), Markup.button.callback('Telegram')], [Markup.button.callback('Youtube'), Markup.button.callback('Tolov uchun karta💳')], [ Markup.button.callback('Orqaga🔙')],
    ]).resize())
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }
})

bot.hears('Tolov uchun karta💳', (ctx) => {
  ctx.reply(`CARD 💳

8600 5103 6091 8333  Usmanova (UZCARD)

To'lov cheksiz qabul qilinmaydi❗️📄

To'lov qilgandan keyin chekni botga yuboring. ❗️

Iltimos to'lov qilganizdan so'ng qaysi xizmat kerakligini birdaniga yozib keting. ❗️`)
})

bot.hears('Orqaga🔙', (ctx) => {
  try {
    ctx.reply(`Siz asosiy menudasiz`, Markup.keyboard([
      [Markup.button.callback('Buyurtma')], [Markup.button.callback('Yordam')],
    ]).resize())
  } catch (error) {
    console.log(error);
    ctx.reply("Xatolik yuz berdi iltimos keyinroq urining!")
  }
})
bot.hears('Telegram', (ctx) => {
  ctx.reply(`⚡️Sizga  tezlik  bilan  obunachi  qo'shib  berishda  yordam  beraman.Eslatib o'tamiz  bularning hammasi  "NAKRUTKA" !!

             ✅  TELEGRAM 

        📌 30 kun kafolat✅ 

👤 1k obunachi: 18.000 so'm.
👥 2k obunachi: 30.000 so'm.
👥 3k obunachi: 45.000 so'm.
👥 4k obunachi: 60.000 so'm.
👥 5k obunachi: 75.000 so'm.

       📌 60 kun kafolat✅ 

👤 1k obunachi: 20.000 so'm.
👥 2k obunachi: 35.000 so'm.
👥 3k obunachi: 55.000 so'm.
👥 4k obunachi: 75.000 so'm.
👥 5k obunachi: 85.000 so'm.

       📌 90 kun kafolat✅ 

👤 1k obunachi: 30.000 so'm.
👥 2k obunachi: 60.000 so'm.
👥 3k obunachi: 90.000 so'm.
👥 4k obunachi: 115.000 so'm.
👥 5k obunachi: 145.000 so'm.

      📌 180 kun kafolat✅ 

👤 1k obunachi: 50.000 so'm.
👥 2k obunachi: 95.000 so'm.
👥 3k obunachi: 140.000 so'm.
👥 4k obunachi: 180.000 so'm.
👥 5k obunachi: 210.000 so'm.

      📌 360 kun kafolat✅ 

👤 1k obunachi: 55.000 so'm.
👥 2k obunachi: 105.000 so'm.
👥 3k obunachi: 140.000 so'm.
👥 4k obunachi: 185.000 so'm.
👥 5k obunachi: 225.000 so'm.



ishim 💯 ishonchli.

SIFAT FOYDADAN USTUN😉`)
})
bot.hears('Instagram', (ctx) => {
  ctx.reply(`⚡️Sizga  tezlik  bilan INSTAGRAM  obunachi  qo'shib  berishda  yordam  beraman.Eslatib o'tamiz  bularning hammasi  "NAKRUTKA" !!

            INSTAGRAM ✅ 
          
         👤 Obunachi :
📌 300 ta obunachi - 18.000 so'm.
📌 500 ta obunachi - 25.000 so'm.
📌 1k obunachi - 40.000 so'm.  
📌 2k obunachi - 80.000 so'm.
📌 3k obunachi - 120.000 so'm.
                  
            ❤️ Layk : 
📌 300 ta Like - 2.000 so'm.
📌 500 ta Like - 3.000 so'm.
📌 1k Like - 6.000 so'm.  
📌 2k Like - 10.000 so'm.
📌 3k Like - 15.000 so'm
                
ishim 💯 ishonchli.

SIFAT FOYDADAN USTUN😉`)
})
bot.hears('Youtube', (ctx) => {
  ctx.reply(`⚡️Sizga tezlik bilan YouTube obunachi, layk, prasmotr va kommentariya qo‘shib berishda yordam beraman.
Eslatib o‘tamiz, bularning hammasi "NAKRUTKA" !!

        👤 Obunachilar:
📌 300 ta  Obunachi – 9.000 so‘m
📌 500 ta  Obunachi – 16.000 so‘m
📌 1K  Obunachi – 32.000 so‘m
📌 2K  Obunachi – 60.000 so‘m
📌 3K  Obunachi – 95.000 so‘m

        ❤️ Layklar:
📌 300 ta Layk - 1.000 so‘m
📌 500 ta Layk – 2.000 so‘m
📌 1K Layk – 4.000 so‘m
📌 2K Layk – 8.000 so‘m
📌 3K Layk – 10.000 so‘m

       👁 Prasmotrlar:
📌 300 ta Prasmotr - 5.000 so‘m
📌 500 ta Prasmotr - 8.000 so‘m
📌 1K Prasmotr - 16.000 so‘m
📌 2K Prasmotr - 30.000 so‘m
📌 3K Prasmotr - 40.000 so‘m

       💬 Kommentariyalar:
📌 300 ta Kommentariya - 5.000 so‘m
📌 500 ta Kommentariya - 8.000 so‘m
📌 1K Kommentariya - 12.000 so‘m
📌 2K Kommentariya - 24.000 so‘m
📌 3K Kommentariya - 35.000 so‘m

💯 Ishim 100% ishonchli
 SIFAT FOYDADAN USTUN 😉`)
})



bot.on('photo', async (ctx) => {
    try {
        if (ctx.from.id == ADMIN_ID && ctx.message.reply_to_message) {
            const userId = ctx.message.reply_to_message.forward_from.id;
            await bot.telegram.sendMessage(userId, `${ctx.message.photo}`);
        } else {
            await bot.telegram.forwardMessage(ADMIN_ID, ctx.chat.id, ctx.message.message_id);
            ctx.reply(`To'lovingiz ko'rib chiqilyapti, iltimos biroz kuting.`);
        }
    } catch (e) {
        console.error('Xabar yuborishda xatolik:', e);
        ctx.reply('Xatolik yuz berdi, iltimos qayta urinib ko‘ring.');
    }
});


bot.on('message', async (ctx) => {
    try {
        if (ctx.from.id == ADMIN_ID && ctx.message.reply_to_message) {
            const userId = ctx.message.reply_to_message.forward_from.id;
            await bot.telegram.sendMessage(userId, `${ctx.message.text}`);
        } else {
            await bot.telegram.forwardMessage(ADMIN_ID, ctx.chat.id, ctx.message.message_id);
            ctx.reply('Xabaringiz adminga yuborildi.');
        }
    } catch (e) {
        console.error('Xabar yuborishda xatolik:', e);
        ctx.reply('Xatolik yuz berdi, iltimos qayta urinib ko‘ring.');
    }
});

bot.launch()