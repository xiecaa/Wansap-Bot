require('../settings')
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const axios = require('axios')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { fromBuffer } = require('file-type')
const fs = require('fs')
const moment = require('moment-timezone')
const util = require('util')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const qrcode = require('qrcode')
const similarity = require('similarity')
const yts = require('yt-search');

//Waktu
const date = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")

//Lib
const { pinterest, wallpaper, wikimedia, quotesAnime } = require('../lib/scraper')
const { bytesToSize, TelegraPh, UploadFileUgu, webp2mp4File} = require('../lib/uploader')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom} = require('../lib/myfunc')

//Module Exports
module.exports = xcaa = async(xcaa, m, chatUpdate, store) => {
try {
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = xcaa.user.id ? xcaa.user.id.split(":")[0]+"@s.whatsapp.net" : xcaa.user.id
const isOwner = [xcaa.user.id, ...global.ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == xcaa.user.id ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const from = m.key.remoteJid
const { type, quotedMsg, mentioned, now, fromMe } = m
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const isGroup = m.key.remoteJid.endsWith('@g.us')
const groupMetadata = m.isGroup ? await xcaa.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupOwner.includes(m.sender) || groupAdmins.includes(m.sender) : false
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
const isNumber = x => typeof x === 'number' && !isNaN(x)

const reply = (texto) => {
			xcaa.sendMessage(m.chat, { text: texto, mentions: [m.sender] }, {	quoted: m })
		}

//database
global.db = JSON.parse(fs.readFileSync('./storage/db.json'))
if (global.db) global.db = {
chats: {},
...(global.db || {})
}

try {
let chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {}
if (chats) {
if (!('antilink' in chats)) chats.antilink = false
} else global.db.chats[m.chat] = {
antilink: false
}
} catch (err) {
console.error(err)
}

// Antilink
if (db.chats[m.chat].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
m.reply(`*Link Grup Lain Terdeteksi\nMaaf Kamu Akan Di Kick Dari Grup*`)
if (!isBotAdmins) return 
var gclink = (`https://chat.whatsapp.com/`+await xcaa.groupInviteCode(m.chat))
var isLinkThisGc = new RegExp(gclink, 'i')
var isgclink = isLinkThisGc.test(m.text)
if (isgclink) return m.reply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`)
if (isAdmins) return m.reply(`Ehh Maaf Ternyata Kamu Admin 😁`)
if (isOwner) return m.reply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
xcaa.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

		if (m.isGroup && m.mtype == 'viewOnceMessage') {
			let teks = `╭「 *Anti ViewOnce* 」\n├ *Name* : ${pushname}\n├ *User* : @${m.sender.split("@")[0]}\n├ *Clock* : ${wib} WIB\n└ *Message* : ${m.mtype}`
     reply(teks)
			await sleep(500)
			m.copyNForward(m.chat, true, {
				readViewOnce: true
			}, {
				quoted: mek
			}).catch(_ => m.reply('Mungkin dah pernah dibuka bot'))
		}

if (!xcaa.public) {
if (!m.key.fromMe && !isOwner) return
}

//Push Message To Console
if (m.message) {
console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m XCAA \x1b[1;37m]', time, chalk.green(budy || m.mtype), 'Dari', chalk.blue(pushname), 'Di', chalk.yellow(groupName ? groupName : 'Private Chat' ), 'args :', chalk.white(args.length))
}

switch(command) {

case 'menu': case 'help': {
  let menunya = `╭「 *INFO BOT* 」
├ Name : RoF3X-Bot
├ Author : FxSx
├ Library : Bailyes-MD
├ Language : JavaScript
├ Device : Android
├ Time : ${time}
├ Date : ${date}
├ Wib : ${wib}
├ Wita : ${wita}
└ Wit : ${wit}
${readmore}
╭「 *OTHER* 」
├ ${prefix}delete
├ ${prefix}owner
├ ${prefix}ping
├ ${prefix}listpc
└ ${prefix}listgc

╭「 *RANDOM* 」
├ ${prefix}pinterest
├ ${prefix}wallpaper
├ ${prefix}quotesanime
└ ${prefix}wikimedia

╭「 *DOWNLOAD* 」
├ ${prefix}play
├ ${prefix}yts
├ ${prefix}ytmp3
└ ${prefix}ytmp4

╭「 *MKR & CNVRT* 」
├ ${prefix}sticker
├ ${prefix}toimg
├ ${prefix}tovideo
├ ${prefix}toaudio
├ ${prefix}tomp3
├ ${prefix}tovn
├ ${prefix}togif
├ ${prefix}tourl
├ ${prefix}removebg
├ ${prefix}estetik
└ ${prefix}ktpmaker

╭「 *GROUPS* 」
├ ${prefix}antilink
├ ${prefix}linkgroup
├ ${prefix}revoke
├ ${prefix}kick
├ ${prefix}add
├ ${prefix}promote
├ ${prefix}demote
├ ${prefix}setname
├ ${prefix}setdesk
├ ${prefix}setppgrup
├ ${prefix}tagall
├ ${prefix}hidetag
└ ${prefix}ephemeral

╭「 *OWNER* 」
├ ${prefix}bc
├ ${prefix}bcgc
├ ${prefix}join
├ ${prefix}leave
├ ${prefix}block
├ ${prefix}unblock
├ ${prefix}setppbot
├ ${prefix}self
├ ${prefix}public
└ ${prefix}eval
`
  let buttons = [
      {buttonId: `${prefix}owner`, buttonText: {displayText: 'Owner Bot'}, type: 1},
      {buttonId: `${prefix}ping`, buttonText: {displayText: 'Status Bot'}, type: 1}
  ]
  let buttonMessage = {
      document: global.thumb,
      fileName: 'RoF3X-BoT',
      mimetype: 'application/pptx',
      fileLength: 99999999,
      jpegThumbnail: global.thumb,
      caption: `${menunya}`,
      footer: 'Bot Ini Masih Tahap Perkembangan\nMohon Bantuannya, Jika Fitur Ada Yang Error Hubungi Owner\n\n© FxSx',
      buttons: buttons,
      headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
  }
  break
case 'owner': {
  xcaa.sendContact(m.chat, global.ownerNumber, m)
  }
  break
case 'listpc': {
  let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
  let teks = `╭「 *LIST CHAT* 」\n└ Total Chat : ${anu.length}\n\n`
  for (let i of anu) {
  let nama = store.messages[i].array[0].pushName
      teks += `╭ *Nama :* ${nama}\n├ *User :* @${i.split('@')[0]}\n└ *Chat :* https://wa.me/${i.split('@')[0]}\n\n──────────────────\n\n`
  }
  xcaa.sendTextWithMentions(m.chat, teks, m)
  }
  break
case 'listgc': {
  let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
  let teks = `╭「 *LIST GRUP* 」\n└ Total Group : ${anu.length} Group\n\n`
  for (let i of anu) {
  let metadata = await xcaa.groupMetadata(i)
      teks += `╭ *Nama :* ${metadata.subject}\n├ *Owner Grup :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : 'Tidak diketahui'}\n├ *ID :* ${metadata.id}\n├ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n└ *Member :* ${metadata.participants.length}\n\n──────────────────\n\n`
  }
  xcaa.sendTextWithMentions(m.chat, teks, m)
  }
  break
case 'ping': case 'botstatus': case 'statusbot': case 'speed': case 'tes': {
  const used = process.memoryUsage()
  const cpus = os.cpus().map(cpu => {
  cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
  return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
  last.total += cpu.total
  last.speed += cpu.speed / length
  last.times.user += cpu.times.user
  last.times.nice += cpu.times.nice
  last.times.sys += cpu.times.sys
  last.times.idle += cpu.times.idle
  last.times.irq += cpu.times.irq
  return last
  }, {
  speed: 0,
  total: 0,
  times: {
  user: 0,
  nice: 0,
  sys: 0,
  idle: 0,
  irq: 0
  }
  })
  let timestamp = speed()
  let latensi = speed() - timestamp
  neww = performance.now()
  oldd = performance.now()
  respon = `
️Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
  `.trim()
  m.reply(respon)
  }
  break

//Owner Menu
case 'bcgc': case 'bcgroup': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) throw `*Contoh : ${prefix + command} Teks*`
  let getGroups = await xcaa.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anu = groups.map(v => v.id)
  m.reply(mess.wait)
  for (let i of anu) {
  await sleep(1500)
  let btn = [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+62 83815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Status Bot',
       id: 'ping'
     }
  }, {
     quickReplyButton: {
       displayText: 'Owner Bot',
       id: 'owner'
     }  
  }]
  let txt = `「 *BROADCAST* 」\n\n${text}`
  xcaa.send5ButLoc(i, txt, xcaa.user.name, global.thumb, btn)
  }
  m.reply(mess.sukses)
  }
  break
case 'bc': case 'broadcast': case 'bcall': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) throw `Contoh : ${prefix + command} Teks`
  let anu = await store.chats.all().map(v => v.id)
  let getGroups = await xcaa.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anuan = groups.map(v => v.id)
  m.reply(mess.wait)
  for (let yoi of anu && anuan) {
  await sleep(1500)
  let btn = [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+62 83815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Status Bot',
       id: 'ping'
     }
  }, {
     quickReplyButton: {
       displayText: 'Owner Bot',
       id: 'owner'
     }  
  }]
  let txt = `「 *BROADCAST* 」\n\n${text}`
  xcaa.send5ButLoc(yoi, txt, xcaa.user.name, global.thumb, btn)
  }
  m.reply(mess.sukses)
  }
  break
case 'join': {
  if (!isOwner) return m.reply(mess.botOwner)
  if (!text) return m.reply('Masukkan Link Group!')
  if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
  m.reply(mess.wait)
  let result = args[0].split('https://chat.whatsapp.com/')[1]
  await xcaa.groupAcceptInvite(result).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(mess.error))
  }
  break
case 'leave': {
  if (!isOwner) return m.reply(mess.botOwner)
  await xcaa.groupLeave(m.chat).then((res) => m.reply('Sampai Jumpa Kembali\nRoF3X-Bot Akan Segera Keluar\nKarna Disuruh Owner')).catch((err) => m.reply(mess.error))
  }
  break
case 'block': {
  if (!isOwner) return m.reply(mess.botOwner)
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.updateBlockStatus(users, 'block').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(mess.error))
  }
  break
case 'unblock': {
  if (!isOwner) return m.reply(mess.botOwner)
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.updateBlockStatus(users, 'unblock').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(mess.error))
  }
  break
case 'setppbot': {
  if (!isOwner) return m.reply(mess.botOwner)
  if (!quoted) throw `Kirim/m.reply Image Dengan Caption ${prefix + command}`
  if (!/image/.test(mime)) throw `Kirim/m.reply Image Dengan Caption ${prefix + command}`
  if (/webp/.test(mime)) throw `Kirim/m.reply Image Dengan Caption ${prefix + command}`
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  await xcaa.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply(mess.sukses)
  }
  break
case 'public': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  xcaa.public = true
  m.reply(mess.sukses)
  }
  break
case 'self': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  xcaa.self = false
  m.reply(mess.sukses)
  }
  break
case 'eval': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  function Return(sul) {
  sat = JSON.stringify(sul, null, 2)
  bang = util.format(sat)
  if (sat == undefined) {
  bang = util.format(sul)
  }
  return m.reply(bang)
  }
  try {
  m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
  } catch (e) {
  m.reply(String(e))
  }
  }
  break

//Group Menu
case 'antilink':
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (args[0] === "on") {
  if (db.chats[m.chat].antilink) return m.reply(`Sudah Aktif Sebelumnya`)
  db.chats[m.chat].antilink = true
  m.reply(mess.sukses)
  } else if (args[0] === "off") {
  if (!db.chats[m.chat].antilink) return m.reply(`Sudah Nonaktif Sebelumnya`)
  db.chats[m.chat].antilink = false
  m.reply(mess.sukses)
  } else {
  let buttonsantilink = [
  { buttonId: `${prefix + command} on`, buttonText: { displayText: 'Enable' }, type: 1 },
  { buttonId: `${prefix + command} off`, buttonText: { displayText: 'Disable' }, type: 1 }
  ]
  await xcaa.sendButtonText(m.chat, buttonsantilink, `Mode ${command}️`, `Silahkan Klik Button Dibawah, Jika Button Tidak Muncul Ketik ${prefix + command} on/off`, m)
  }
  break
case 'linkgc': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  let response = await xcaa.groupInviteCode(m.chat)
  xcaa.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
  }
  break
case 'revoke': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  await xcaa.groupRevokeInvite(from)
  m.reply(mess.sukses)
  }
  break
case 'kick': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di kick siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'add': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di add siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'promote': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di promote siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'demote': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di demote siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'setname': case 'setsubject': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) throw 'Text ?'
  await xcaa.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'setdesc': case 'setdesk': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) throw 'Text ?'
  await xcaa.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'setppgroup': case 'setppgrup': case 'setppgc': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  await xcaa.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply(mess.sukses)
  }
  break
case 'tagall': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  let teks = `╭ *Tag All*\n└ *Pesan : ${q ? q : 'Kosong'}*\n\n`
  for (let mem of participants) {
  teks += `•> @${mem.id.split('@')[0]}\n`
  }
  xcaa.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
  }
  break
case 'hidetag': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  xcaa.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
  }
  break
case 'ephemeral': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return m.reply('Masukan Value enable/disable')
  if (args[0] === 'enable') {
  await xcaa.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'disable') {
  await xcaa.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  }
  break
case 'group': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return m.reply('Masukan Value open/close')
  if (args[0] === 'close'){
  await xcaa.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'open'){
  await xcaa.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } else {
  let buttonsgroup = [
  { buttonId: `${prefix + command} open`, buttonText: { displayText: 'Open' }, type: 1 },
  { buttonId: `${prefix + command} close`, buttonText: { displayText: 'Close' }, type: 1 }
  ]
  await xcaa.sendButtonText(m.chat, buttonsgroup, `Mode Buka/Tutup Grup️`, `Silahkan Klik Button Dibawah, Jika Button Tidak Muncul Ketik ${command} open/close`, m)
  }
  }
  break
case 'editinfo': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return m.reply('Masukan Value open/close')
  if (args[0] === 'open'){
  await xcaa.groupSettingUpdate(m.chat, 'unlocked').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'close'){
  await xcaa.groupSettingUpdate(m.chat, 'locked').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } else {
  let buttonsinfo = [
  { buttonId: `${prefix + command} open`, buttonText: { displayText: 'Open' }, type: 1 },
  { buttonId: `${prefix + command} close`, buttonText: { displayText: 'Close' }, type: 1 }
  ]
  await xcaa.sendButtonText(m.chat, buttons, `Mode Edit Info Grup`, `Silahkan Klik Button Dibawah, Jika Button Tidak Muncul Ketik ${command} open/close`, m)
  }
  }
  break

//Maker Menu
case 'sticker': case 's': case 'stickergif': case 'sgif': {
  if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
  m.reply(mess.wait)
  if (/image/.test(mime)) {
  let media = await quoted.download()
  let encmedia = await xcaa.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
  let media = await quoted.download()
  let encmedia = await xcaa.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else {
  throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
  }
  }
  break


//removebg
case 'imagenobg': case 'removebg': case 'remove-bg': {
	if (!quoted) throw m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (!/image/.test(mime)) throw m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (/webp/.test(mime)) throw m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	let remobg = require('remove.bg')
	let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU', 'S258diZhcuFJooAtHTaPEn4T', '5LjfCVAp4vVNYiTjq9mXJWHF', 'aT7ibfUsGSwFyjaPZ9eoJc61', 'BY63t7Vx2tS68YZFY6AJ4HHF', '5Gdq1sSWSeyZzPMHqz7ENfi8', '86h6d6u4AXrst4BVMD9dzdGZ', 'xp8pSDavAgfE5XScqXo9UKHF', 'dWbCoCb3TacCP93imNEcPxcL']
	let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]
	hmm = await './src/remobg-' + getRandom('')
	localFile = await xcaa.downloadAndSaveMediaMessage(quoted, hmm)
	console.log(localFile)
	outputFile = await './src/hremo-' + getRandom('.png')
	m.reply(mess.wait)
	try {
		remobg.removeBackgroundFromImageFile({
			path: localFile,
			apiKey: apinobg,
			size: "regular",
			type: "auto",
			scale: "100%",
			outputFile
		}).then(async (result) => {
			console.log(`File saved to ${outputFile}`);
			await xcaa.sendMessage(m.chat, {
				image: fs.readFileSync(outputFile),
				caption: global.mess.sukses
			}, {
				quoted: m
			})
			const base64img = result.base64img;
			await sleep(7000)
			await fs.unlinkSync(localFile)
			await fs.unlinkSync(outputFile)
		}).catch((errors) => {
			console.log(JSON.stringify(errors));
		});
	} catch (err) {
		m.reply(util.format(err))
		await fs.unlinkSync(localFile)
	}
}
break

		            case 'estetik': {
		            	if (!quoted) throw reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		            	if (!/image/.test(mime)) throw reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		            	if (/webp/.test(mime)) throw reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		            	let remobg = require('remove.bg')
		            	let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU', 'S258diZhcuFJooAtHTaPEn4T', '5LjfCVAp4vVNYiTjq9mXJWHF', 'aT7ibfUsGSwFyjaPZ9eoJc61', 'BY63t7Vx2tS68YZFY6AJ4HHF', '5Gdq1sSWSeyZzPMHqz7ENfi8', '86h6d6u4AXrst4BVMD9dzdGZ', 'xp8pSDavAgfE5XScqXo9UKHF', 'dWbCoCb3TacCP93imNEcPxcL']
		            	let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]

		            	hmm = await './src/remobg-' + getRandom('')
		            	localFile = await xcaa.downloadAndSaveMediaMessage(quoted, hmm)
		            	outputFile = './src/hremo-' + getRandom('.png')
		            	m.reply(mess.wait)
		            	try {
		            		remobg.removeBackgroundFromImageFile({
		            			path: localFile,
		            			apiKey: apinobg,
		            			size: "regular",
		            			type: "auto",
		            			scale: "100%",
		            			outputFile
		            		}).then(async result => {
		            			console.log(outputFile)
		            			let tes = await fs.readFileSync(outputFile)
		            			let anu = await TelegraPh(outputFile)
		            			console.log(anu)
		            			let hsil = await getBuffer(`https://oni-chan.my.id/api/Fmake/estetik?picturl=${anu}`)
		            			await sleep(9000)
		            			await xcaa.sendMessage(m.chat, {
		            				image: hsil,
		            				caption: global.mess.sukses
		            			}, {
		            				quoted: m
		            			})
		            			await sleep(15000)
		            			await fs.unlinkSync(localFile)
		            			await fs.unlinkSync(outputFile)
		            		})
		            	} catch (err) {
		            		m.reply(util.format(err))
		            		await fs.unlinkSync(localFile)
		            	}
		            }
		            break

		case 'ktpmaker': {
			if (args.length == 0) return m.reply(`*Pengunaan :*\n${prefix+command} Nik|Provinsi|Kabupaten|Nama|TempatTanggalLahir|JenisKel|Alamat|RtRw|KelDesa|Kecamatan|Agama|Statu|Pekerjaan|Region|Berlaku|golongan darah|LinkGambar`)
			get_args = args.join(" ").split("|")
			nik = get_args[0]
			if (!nik) return m.reply('nomor induk keluaga kak pastikan jangan mirip NIK yang asli ya')
			prov = get_args[1]
			if (!prov) return m.reply('probinsi mana kak')
			kabu = get_args[2]
			if (!kabu) return m.reply('kabupaten mana kak')
			name = get_args[3]
			if (!name) return m.reply('nama nya siapa kak')
			ttl = get_args[4]
			if (!ttl) return m.reply('tempat tanggal lahir nya kak')
			jk = get_args[5]
			if (!jk) return m.reply('jenis kelamin pria atau wanita kak')
			jl = get_args[6]
			if (!jl) return m.reply('alamat rumah nya mana kak')
			rtrw = get_args[7]
			if (!rtrw) return m.reply('RT / RW berapa kak')
			lurah = get_args[8]
			if (!lurah) return m.reply('kelurahan mana kak')
			camat = get_args[9]
			if (!camat) return m.reply('kecamatan mana kak')
			agama = get_args[10]
			if (!agama) return m.reply('agama nya apa kak')
			nikah = get_args[11]
			if (!nikah) return m.reply('status belum ada')
			kerja = get_args[12]
			if (!kerja) return m.reply('pekerjaan belum ada')
			warga = get_args[13]
			if (!warga) return m.reply('region belum ada')
			until = get_args[14]
			if (!until) return m.reply('waktu berlaku belum ada')
			gd = get_args[15]
			if (!gd) return m.reply('golongan darah belum ada')
			img = get_args[16]
			if (!img) return m.reply('url image belum ada')
      m.reply(mess.wait)
			bikin = (`https://oni-chan.my.id/api/Fmake/ktpmaker?nik=${nik}&nama=${name}&ttl=${ttl}&jk=${jk}&gd=${gd}&almt=${jl}&rtw=${rtrw}&kel=${lurah}&kc=${camat}&agm=${agama}&st=${nikah}&krj=${kerja}&ngr=${warga}&blk=${until}&prv=${prov}&kab=${kabu}&picturl=${img}`)
			console.log(bikin)
			ardaktp = await getBuffer(bikin)
		  await sleep(8000)
			await xcaa.sendMessage(from, { image: ardaktp, caption: global.mess.sukses }, { quoted: m })
		}
			break;

case 'toimage': case 'toimg': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) return m.reply(`Balas sticker dengan caption *${prefix + command}*`)
  m.reply(mess.wait)
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let ran = await getRandom('.png')
  exec(`ffmpeg -i ${media} ${ran}`, (err) => {
  fs.unlinkSync(media)
  if (err) throw err
  let buffer = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, { image: buffer }, { quoted: m })
  fs.unlinkSync(ran)
  })
  }
  break
case 'tomp4': case 'tovideo': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) throw `Balas stiker dengan caption *${prefix + command}*`
  m.reply(mess.wait)
  let { webp2mp4File } = require('../lib/uploader')
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await xcaa.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
  await fs.unlinkSync(media)
  }
  break
case 'toaud': case 'toaudio': {
  if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
  if (!quoted) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toAudio } = require('../lib/converter')
  let audio = await toAudio(media, 'mp4')
  xcaa.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
  }
  break
case 'tomp3': {
  if (/document/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
  if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
  if (!quoted) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toAudio } = require('../lib/converter')
  let audio = await toAudio(media, 'mp4')
  xcaa.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${xcaa.user.name}.mp3`}, { quoted : m })
  }
  break
case 'tovn': case 'toptt': {
  if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
  if (!quoted) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toPTT } = require('../lib/converter')
  let audio = await toPTT(media, 'mp4')
  xcaa.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
  }
  break
case 'togif': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) throw `Balas stiker dengan caption *${prefix + command}*`
  m.reply(mess.wait)
  let { webp2mp4File } = require('../lib/uploader')
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await xcaa.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
  await fs.unlinkSync(media)
  }
  break
case 'tourl': {
  m.reply(mess.wait)
  let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../lib/uploader')
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  if (/image/.test(mime)) {
  let anu = await TelegraPh(media)
  m.reply(util.format(anu))
  } else if (!/image/.test(mime)) {
  let anu = await UploadFileUgu(media)
  m.reply(util.format(anu))
  }
  await fs.unlinkSync(media)
  }
  break

//Random Menu
case 'pinterest': {
  if (!text) return m.reply(`Contoh : ${prefix + command} Naruto`)
  m.reply(mess.wait)
  let anu = await pinterest(text)
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonspinterest = [{buttonId: `${prefix + command} ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}]
  xcaa.sendMessage(m.chat, { image: { url: result }, caption: 'Source Url : '+result, buttons: buttonspinterest }, { quoted: m })
  }
  break
case 'wallpaper': {
  if (!text) return m.reply(`Contoh : ${prefix + command} Naruto HD`)
  m.reply(mess.wait)
  let anu = await wallpaper(text)
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonswallpaper = [{buttonId: `${prefix + command} ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}]
  xcaa.sendMessage(m.chat, { image: { url: result.image[0] }, caption: `Source Url : ${result.image[2] || result.image[1] || result.image[0]}`, buttons: buttonswallpaper }, { quoted: m })
  }
  break
case 'quotesanime': {
  m.reply(mess.wait)
  let anu = await quotesAnime()
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonsquotes = [{buttonId: `${prefix + command}`, buttonText: {displayText: 'Next Quotes'}, type: 1}]
  xcaa.sendButtonText(m.chat, buttonsquotes, `${result.quotes}\n\nBy : ${result.karakter}`, global.ownerName, m)
  }
  break
case 'wikimedia': {
  if (!text) throw 'Masukkan Query Title'
  let wiki = await wikimedia(text)
  result = wiki[Math.floor(Math.random() * wiki.length)]
  let buttons = [{buttonId: `${prefix + command} ${text}`, buttonText: {displayText: 'Next Wiki'}, type: 1}]
  let buttonMessage = {
  image: { url: result.image },
  caption: `╭ Title : ${result.title}\n├ Source : ${result.source}\n└ Media Url : ${result.image}`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
  }
  break

//Downloader
case 'ytmp4': case 'ytvideo': case 'ytv': {
  let { ytv } = require('../lib/y2mate')
  if (!q) return m.reply(`Contoh : ${prefix + command} linknya`)
  if (!isUrl(q)) return m.reply('*Link Invalid*')
  if (!q.includes('youtube')/('youtu.be')) return m.reply('*Link Invalid*')
  await m.reply(mess.wait)
  let quality = args[1] ? args[1] : '360p'
  let media = await ytv(text, quality)
  if (media.filesize >= 100000) return m.reply('File Melebihi Batas Silahkan Download Sendiri : '+media.dl_link)
  var caption = `╭ Judul : ${media.title}\n├ Size : ${media.filesizeF}\n├ Url : ${isUrl(text)}\n├ Format : MP4\n└ Resolusi : ${args[1] || '360p'}`
  xcaa.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: caption }, { quoted: m })
  }
  break
case 'ytmp3': case 'ytaudio': case 'yta': {
  let { yta } = require('../lib/y2mate')
  if (!q) return m.reply(`Contoh : ${prefix + command} linknya`)
  if (!isUrl(q)) return m.reply('*Link Invalid*')
  if (!q.includes('youtube')/('youtu.be')) return m.reply('*Link Invalid*')
  await m.reply(mess.wait)
  let quality = args[1] ? args[1] : '128kbps'
  let media = await yta(text, quality)
  if (media.filesize >= 100000) return m.reply('File Melebihi Batas Silahkan Download Sendiri : '+media.dl_link)
  var caption = `╭ Title : ${media.title}\n├ Size : ${media.filesizeF}\n├ Url : ${isUrl(text)}\n├ Format : MP3\n└ Resolusi : ${args[1] || '128kbps'}`
  xcaa.sendImage(m.chat, media.thumb, caption, m)
  xcaa.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
  }
  break
case 'yts': case 'ytsearch': {
  m.reply(mess.wait)
  if (!text) throw `Contoh : ${prefix + command} Mamamontu`
  let yts = require("yt-search")
  let search = await yts(text)
  let teks = '╭「 *Data Diproleh* 」\n└ Keywords : '+text+'\n\n'
  let no = 1
  for (let i of search.all) {
  teks += `╭ No : ${no++}\n├ Type : ${i.type}\n├ Video ID : ${i.videoId}\n├ Title : ${i.title}\n├ Views : ${i.views}\n├ Duration : ${i.timestamp}\n├ Upload : ${i.ago}\n├ Author : ${i.author.name}\n└ Url : ${i.url}\n\n────────────\n\n`
  }
  xcaa.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: m })
  }
  break
case 'play':
  if (!text) throw `Contoh : ${prefix + command} Sholawat Ibadahallah`
  let yts = require("yt-search")
  let search = await yts(text)
  let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
  let buttons = [{buttonId: `${prefix}ytmp3 ${anu.url}`, buttonText: {displayText: 'Audio'}, type: 1}, {buttonId: `${prefix}ytmp4 ${anu.url}`, buttonText: {displayText: 'Video'}, type: 1}]
  let buttonMessage = {
  image: { url: anu.thumbnail },
  caption: `╭ *Title :* ${anu.title}\n├ *Duration :* ${anu.timestamp}\n├ *Viewers :* ${anu.views}\n├ *Upload :* ${anu.ago}\n├ *Channel :* ${anu.author.url}\n└ *Url :* ${anu.url}`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
  break

//Eval
default:
if (budy.startsWith('=>')) {
  if (!isOwner) return m.reply(mess.botOwner)
  function Return(sul) {
  sat = JSON.stringify(sul, null, 2)
  bang = util.format(sat)
  if (sat == undefined) {
  bang = util.format(sul)
  }
  return m.reply(bang)
  }
  try {
  m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
  } catch (e) {
  m.reply(String(e))
  }
  }  
if (budy.startsWith('>')) {
  if (!isOwner) return m.reply(mess.botOwner)
  try {
  let evaled = await eval(budy.slice(2))
  if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
  await m.reply(evaled)
  } catch (err) {
  m = String(err)
  await m.reply(m)
  }
  }
if (budy.startsWith('$')) {
  if (!isOwner) return m.reply(mess.botOwner)
  exec(budy.slice(2), (err, stdout) => {
  if(err) return reply(err)
  if (stdout) return m.reply(stdout)
  })
  }

  }
  } catch (err) {
    console.log("error di bagian xcaa.js "+util.format(err))
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
