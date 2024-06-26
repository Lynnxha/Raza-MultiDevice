let handler = async (m, { conn, text, args, command }) => {
  conn.duel = conn.duel || [];
  if (args.length !== 0) {
    let target = m.mentionedJid
      ? m.mentionedJid[0]
      : args[0].replace(/[@ .+-]/g, "").replace(" ", "") + "@s.whatsapp.net";
    conn.duel.push(target);
  }

  let who = conn.duel[0];
  let enemy = global.db.data.users[who];
  let user = global.db.data.users[m.sender];
  let count =
    args[1] && args[1].length > 0
      ? Math.min(100, Math.max(parseInt(args[1]), 1))
      : 1;
  let nama = await conn.getName(m.sender);

  let randomaku = Math.floor(Math.random() * 101);
  let randomkamu = Math.floor(Math.random() * 81);
  let Aku = randomaku;
  let Kamu = randomkamu;

  let __timers = new Date() - user.lastduel;
  let _timers = 300000 - __timers;
  let timers = clockString(_timers);

  try {
    if (/duel/.test(command)) {
      if (!who) return m.reply("Tag Yang Ingin Di Ajak Duel!");

      let pler = `@${m.sender.replace(/@.+/, "")} Mengajak Duel ${
        args[0]
      }\n\nPilih Gass Atau Skip`;
      let mentionedJid = [m.sender];

      if (new Date() - user.lastduel > 300000) {
        conn.reply(m.chat, pler, m, {
          mentions: conn.parseMention(mentionedJid),
        });
      } else {
        conn.reply(m.chat, `Kamu Sudah Berduel Tunggu Selama ${timers}`, m);
      }
    }

    if (/gass/.test(command)) {
      let kenal = !who.includes(m.sender);
      if (kenal) throw "Lu Siapa?\nLu Itu Ga Di Ajak";
      user.lastduel = new Date() * 1;
      if (Aku > Kamu) {
        user.money -= 900;
        enemy.money += 900;
        conn.duel = [];
        conn.reply(
          m.chat,
          `@${who.split("@")[0]} Menang Gelud\n*Hadiah:*\nUang: Rp.900`.trim(),
          m
        );
      } else if (Aku < Kamu) {
        user.money += 450;
        enemy.money -= 450;
        conn.duel = [];
        conn.reply(
          m.chat,
          `@${who.split("@")[0]} Kalah Gelud\n*Hadiah:*\nRp.450`.trim(),
          m
        );
      } else {
        user.money += 250;
        enemy.money += 250;
        conn.duel = [];
        conn.reply(
          m.chat,
          `@${
            who.split("@")[0]
          }\n *Seri*\n Masing Masing Mendapatkan Rp.250`.trim(),
          m
        );
      }
    }

    if (/skip/.test(command)) {
      let kenal = !who.includes(m.sender);
      if (kenal) return conn.reply(m.chat, `Lu Siapa?\nLu Itu Ga Di Ajak`, m);
      conn.reply(m.chat, `@${who.split("@")[0]} Membatalkan Ajakan Duel`, m);
      conn.duel = [];
    }
  } catch (e) {
    return m.reply(`${e}`);
  }
};

handler.help = ["duel"];
handler.tags = ["rpg"];
handler.command = /^(duel|dya|dno)/i;
handler.group = true;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    "\n" + d,
    " *Hari*\n ",
    h,
    " *Jam*\n ",
    m,
    " *Menit*\n ",
    s,
    " *Detik* ",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
