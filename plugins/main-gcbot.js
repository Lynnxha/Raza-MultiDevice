let handler = async (m, { conn }) => {
conn.reply(m.chat, gc, m) 
}
handler.help = ['gcbot']
handler.tags = ['main']
handler.command = /^(gcbot)$/i
handler.register = true;
module.exports = handler
