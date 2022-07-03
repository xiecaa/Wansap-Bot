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
const maker = require('mumaker')
const xfar = require('xfarr-api');
const util = require('util')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const qrcode = require('qrcode')

//Lib
const { igDownloader } = require("../lib/igdown")
const { y2mateA, y2mateV } = require('../lib/y2mate')
const { pinterest, wallpaper, wikimedia, quotesAnime, styletext, aiovideodl, mediafire } = require('../lib/scraper')
const { bytesToSize, TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('../lib/uploader')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom} = require('../lib/myfunc')

//Storage Rpg
const { addInventoriDarah, cekDuluJoinAdaApaKagaDiJson, addDarah, kurangDarah, getDarah }  = require('./storage/user/darah.js')
const { cekInventoryAdaAtauGak, addInventori, addBesi, addEmas, addEmerald, addUmpan, addPotion, kurangBesi, kurangEmas, kurangEmerald, kurangUmpan, kurangPotion, getBesi, getEmas, getEmerald, getUmpan, getPotion } = require('./storage/user/alat_tukar.js')
const { addInventoriMonay, cekDuluJoinAdaApaKagaMonaynyaDiJson, addMonay, kurangMonay, getMonay } = require('./storage/user/monay.js')
const { addInventoriLimit, cekDuluJoinAdaApaKagaLimitnyaDiJson, addLimit, kurangLimit, getLimit } = require('./storage/user/limit.js')
const { cekDuluHasilBuruanNya, addInventoriBuruan, addIkan, addAyam, addKelinci, addDomba, addSapi, addGajah, kurangIkan, kurangAyam, kurangKelinci, kurangDomba, kurangSapi, kurangGajah, getIkan, getAyam, getKelinci, getDomba, getSapi, getGajah } = require('./storage/user/buruan.js')

let DarahAwal =  global.rpg.darahawal
const isDarah = cekDuluJoinAdaApaKagaDiJson(m.sender)
const isCekDarah = getDarah(m.sender)
const isUmpan = getUmpan(m.sender)
const isPotion = getPotion(m.sender)
const isIkan = getIkan(m.sender)
const isAyam = getAyam(m.sender)
const isKelinci = getKelinci(m.sender)
const isDomba = getDomba(m.sender)
const isSapi = getSapi(m.sender)
const isGajah = getGajah(m.sender)
const isMonay = getMonay(m.sender)
const isLimit = getLimit(m.sender)
const isBesi = getBesi(m.sender)
const isEmas = getEmas(m.sender)
const isEmerald = getEmerald(m.sender)
const isInventory = cekInventoryAdaAtauGak(m.sender)
const isInventoriBuruan = cekDuluHasilBuruanNya(m.sender)
const isInventoryLimit = cekDuluJoinAdaApaKagaLimitnyaDiJson(m.sender)
const isInventoryMonay = cekDuluJoinAdaApaKagaMonaynyaDiJson(m.sender)
const ikan = ['🐬','🐡','🐠']

let _limit = JSON.parse(fs.readFileSync('./storage/user/limit.json'));
let _buruan = JSON.parse(fs.readFileSync('./storage/user/hasil_buruan.json'));
let _darahOrg = JSON.parse(fs.readFileSync('./storage/user/darah.json'))

//Waktu
const date = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")

//Module Exports
module.exports = xcaa = async(xcaa, m, chatUpdate, store) => {
  try {
  var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' // Script By FxSx
  var budy = (typeof m.text == 'string' ? m.text : '')
  var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
  const isCmd = body.startsWith(prefix)
  const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
  const args = body.trim().split(/ +/).slice(1)
  const pushname = m.pushName || "No Name"
  const botNumber = await xcaa.decodeJid(xcaa.user.id)
  const isOwner = [botNumber, ...global.ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
  const itsMe = m.sender == botNumber ? true : false
  const text = q = args.join(" ")
  const quoted = m.quoted ? m.quoted : m
  const mime = (quoted.msg || quoted).mimetype || ''
  const isMedia = /image|video|sticker|audio/.test(mime)
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
  const isPremium = isOwner || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
  const ftroli = {key: {fromMe: false, remoteJid: "0@s.whatsapp.net", participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 1, status: 10, thumbnail: global.thumb2, surface: 10, message: global.packname, orderTitle: global.ownerName, sellerJid: '0@s.whatsapp.net'} } }
  
  try {
  let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
  let user = global.db.data.users[m.sender]
  if (typeof user !== 'object') global.db.data.users[m.sender] = {}
  if (user) {
  if (!isNumber(user.afkTime)) user.afkTime = -1
  if (!('afkReason' in user)) user.afkReason = ''
  if (!isNumber(user.limit)) user.limit = limitUser
  } else global.db.data.users[m.sender] = {
    afkTime: -1,
    afkReason: '',
    limit: limitUser,
   }
  } catch (err) {
  console.error(err)
  }
  
//Get Case
  const rfx = `break`

//Anti Delete Otomatis
  if (m.message && m.message.protocolMessage && m.message.protocolMessage.type == 0) {
  let key = m.message.protocolMessage.key
  let msg = await xcaa.serializeM(await store.loadMessage(key.remoteJid, key.id))
  let teks = `╭「 *Anti Delete* 」\n├ User : @${msg.sender.split("@")[0]}\n├ Date : ${moment(msg.messageTimestamp * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB\n└ Type : ${msg.mtype}`
  xcaa.sendText(m.chat, teks, msg, { mentions: [msg.sender] })
  await xcaa.relayMessage(m.chat, msg.message, { messageId: msg.id })
  }

//Anti ViewOnce Otomatis
  if (m.isGroup && m.mtype == 'viewOnceMessage') {
  let teks = `╭「 *Anti ViewOnce* 」\n├ *Name* : ${pushname}\n├ *User* : @${m.sender.split("@")[0]}\n├ *Clock* : ${wib} WIB\n└ *Message* : ${m.mtype}`
  xcaa.sendMessage(m.chat, { text: teks, mentions: [m.sender] }, { quoted: m })
  await sleep(500)
  m.copyNForward(m.chat, true, {readViewOnce: true}, {quoted: m}).catch(_ => m.reply('Mungkin dah pernah dibuka bot'))
  }

//Public And Self
  if (!xcaa.public) {
  if (!m.key.fromMe && !isOwner) return
  }

//Push Message To Console
  if (m.message) {
  xcaa.sendReadReceipt(m.chat, m.sender, [m.key.id])
  console.log(chalk.black(chalk.bgWhite('[ MSG ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
  }

  if (command) {
  await xcaa.sendPresenceUpdate('recording', m.chat)
  }

//Sticker Cmd
  if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
  let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
  let { text, mentionedJid } = hash
  let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {userJid: xcaa.user.id, quoted: m.quoted && m.quoted.fakeObj})
  messages.key.fromMe = areJidsSameUser(m.sender, xcaa.user.id)
  messages.key.id = m.key.id
  messages.pushName = m.pushName
  if (m.isGroup) messages.participant = m.sender
  let msg = {
  ...chatUpdate,
  messages: [proto.WebMessageInfo.fromObject(messages)],
  type: 'append'
  }
  xcaa.ev.emit('messages.upsert', msg)
  }

//Afk
  for (let jid of mentionUser) {
  let user = global.db.data.users[jid]
  if (!user) continue
  let afkTime = user.afkTime
  if (!afkTime || afkTime < 0) continue
  let reason = user.afkReason || ''
  m.reply(`Jangan tag dia!\nDia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}\nSelama ${clockString(new Date - afkTime)}`.trim())
  }
  
  if (db.data.users[m.sender].afkTime > -1) {
  let user = global.db.data.users[m.sender]
  m.reply(`Kamu berhenti AFK ${user.afkReason ? ' setelah ' + user.afkReason : ''}\nSelama ${clockString(new Date - user.afkTime)}`.trim())
  user.afkTime = -1
  user.afkReason = ''
  }
  
switch(command) {

case 'menu': case 'help': {
  let menunya = `╭「 *INFO BOT* 」
├ Name : RoF3X-Bot
├ Author : FxSx
├ Library : Bailyes-MD
├ Language : JavaScript
├ Device : Android
├ User : ${userB.length}
├ Date : ${date}
├ Wib : ${wib}
├ Wita : ${wita}
└ Wit : ${wit}
${readmore}
╭「 *OTHER* 」
├ ${prefix}delete
├ ${prefix}owner
├ ${prefix}ping
├ ${prefix}rules
├ ${prefix}listpc
├ ${prefix}listgc
├ ${prefix}request
└ ${prefix}report

╭「 *ISLAMIC* 」
├ ${prefix}iqra
├ ${prefix}hadist
├ ${prefix}juzamma
├ ${prefix}alquran
└ ${prefix}tafsirsurah

╭「 *RANDOM* 」
├ ${prefix}jodohku
├ ${prefix}jadian
├ ${prefix}bebangc
├ ${prefix}yatim
├ ${prefix}ganteng
├ ${prefix}cantik
├ ${prefix}couple
├ ${prefix}pinterest
├ ${prefix}wallpaper
├ ${prefix}quotesanime
├ ${prefix}wikimedia
├ ${prefix}kucing
├ ${prefix}boneka
├ ${prefix}doraemon
├ ${prefix}meme
├ ${prefix}darkjokes
├ ${prefix}cewek
├ ${prefix}cowok
└ ${prefix}asupan

╭「 *DOWNLOAD* 」
├ ${prefix}play
├ ${prefix}yts
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}twdl
├ ${prefix}fbdl
├ ${prefix}igdl
└ ${prefix}mediafire

╭「 *TOOLS* 」
├ ${prefix}get
├ ${prefix}translate
├ ${prefix}volumereq
├ ${prefix}bassreq
└ ${prefix}temporeq

╭「 *DATABASE* 」
├ ${prefix}setcmd
├ ${prefix}listcmd
├ ${prefix}delcmd
├ ${prefix}lockcmd
├ ${prefix}addmsg
├ ${prefix}listmsg
├ ${prefix}delmsg
└ ${prefix}getmsg

╭「 *CONVERT* 」
├ ${prefix}sticker
├ ${prefix}stickerwm
├ ${prefix}smeme
├ ${prefix}emojimix
├ ${prefix}emojimix2
├ ${prefix}attp
├ ${prefix}styletext
├ ${prefix}toimg
├ ${prefix}tovideo
├ ${prefix}toaudio
├ ${prefix}tomp3
├ ${prefix}tovn
├ ${prefix}togif
├ ${prefix}tourl
├ ${prefix}bass
├ ${prefix}blown
├ ${prefix}deep
├ ${prefix}earrape
├ ${prefix}fast
├ ${prefix}fat
├ ${prefix}nightcore
├ ${prefix}reverse
├ ${prefix}robot
├ ${prefix}slow
├ ${prefix}smooth
├ ${prefix}tupai
├ ${prefix}imut
├ ${prefix}removebg
└ ${prefix}estetik

╭「 *ANIME* 」
├ ${prefix}akira
├ ${prefix}akiyama
├ ${prefix}ana
├ ${prefix}asuna
├ ${prefix}ayuzawa
├ ${prefix}boruto
├ ${prefix}chitoge
├ ${prefix}deidara
├ ${prefix}elaina
├ ${prefix}emilia
├ ${prefix}erza
├ ${prefix}gremory
├ ${prefix}hestia
├ ${prefix}hinata
├ ${prefix}inori
├ ${prefix}isuzu
├ ${prefix}itachi
├ ${prefix}itori
├ ${prefix}kaga
├ ${prefix}kagura
├ ${prefix}kakasih
├ ${prefix}kaori
├ ${prefix}keneki
├ ${prefix}kotori
├ ${prefix}kurumi
├ ${prefix}madara
├ ${prefix}mikasa
├ ${prefix}minato
├ ${prefix}naruto
├ ${prefix}nezuko
├ ${prefix}onepiece
├ ${prefix}pokemon
├ ${prefix}rize
├ ${prefix}sakura
├ ${prefix}sasuke
├ ${prefix}shina
├ ${prefix}shinka
├ ${prefix}shizuka
├ ${prefix}shota
├ ${prefix}toukachan
├ ${prefix}tsunade
├ ${prefix}yuki
├ ${prefix}sagiri
├ ${prefix}waifu
├ ${prefix}cry
├ ${prefix}kill
├ ${prefix}hug
├ ${prefix}pat
├ ${prefix}lick
├ ${prefix}kiss
├ ${prefix}bite
├ ${prefix}yeet
├ ${prefix}neko
├ ${prefix}bully
├ ${prefix}bonk
├ ${prefix}wink
├ ${prefix}poke
├ ${prefix}nom
├ ${prefix}slap
├ ${prefix}smile
├ ${prefix}wave
├ ${prefix}awoo
├ ${prefix}blush
├ ${prefix}smug
├ ${prefix}glomp
├ ${prefix}happy
├ ${prefix}dance
├ ${prefix}cringe
├ ${prefix}cuddle
├ ${prefix}highfive
├ ${prefix}shinobu
├ ${prefix}megumin
└ ${prefix}handhold

╭「 *MAKER* 」
├ ${prefix}ktpmaker
├ ${prefix}candy
├ ${prefix}christmas
├ ${prefix}3dchristmas
├ ${prefix}sparklechristmas
├ ${prefix}deepsea
├ ${prefix}scifi
├ ${prefix}rainbow
├ ${prefix}waterpipe
├ ${prefix}spooky
├ ${prefix}pencil
├ ${prefix}circuit
├ ${prefix}discovery
├ ${prefix}metalic
├ ${prefix}fiction
├ ${prefix}demon
├ ${prefix}transformer
├ ${prefix}berry
├ ${prefix}thunder
├ ${prefix}magma
├ ${prefix}3dstone
├ ${prefix}neonlight
├ ${prefix}glitch
├ ${prefix}harrypotter
├ ${prefix}brokenglass
├ ${prefix}papercut
├ ${prefix}watercolor
├ ${prefix}multicolor
├ ${prefix}neondevil
├ ${prefix}underwater
├ ${prefix}graffitibike
├ ${prefix}snow
├ ${prefix}cloud
├ ${prefix}honey
├ ${prefix}ice
├ ${prefix}fruitjuice
├ ${prefix}biscuit
├ ${prefix}wood
├ ${prefix}chocolate
├ ${prefix}strawberry
├ ${prefix}matrix
├ ${prefix}blood
├ ${prefix}dropwater
├ ${prefix}toxic
├ ${prefix}lava
├ ${prefix}rock
├ ${prefix}bloodglas
├ ${prefix}hallowen
├ ${prefix}darkgold
├ ${prefix}joker
├ ${prefix}wicker
├ ${prefix}firework
├ ${prefix}skeleton
├ ${prefix}blackpink
├ ${prefix}sand
├ ${prefix}glue
├ ${prefix}1917
└ ${prefix}leaves

╭「 *GROUPS* 」
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
├ ${prefix}hidetag2
├ ${prefix}totag
└ ${prefix}ephemeral

╭「 *OWNER* 」
├ ${prefix}bc
├ ${prefix}bcgc
├ ${prefix}bcpvtchat
├ ${prefix}chat
├ ${prefix}join
├ ${prefix}culik
├ ${prefix}leave
├ ${prefix}block
├ ${prefix}unblock
├ ${prefix}setppbot
├ ${prefix}setexif
├ ${prefix}self
├ ${prefix}public
├ ${prefix}reaction
└ ${prefix}getcs
`
  let btnn = [
     {callButton: {displayText: 'Number Owner', phoneNumber: '+6283815956151'}}, 
     {quickReplyButton: {displayText: 'Status Bot', id: 'ping'}}, 
     {quickReplyButton: {displayText: 'Owner Bot', id: 'owner'}},
     {quickReplyButton: {displayText: 'Thanks To', id: 'thankto'}}
  ]
  let templateMessage = {
  document: global.thumb,
  fileName: global.packname,
  mimetype: 'application/pptx',
  fileLength: 0,
  jpegThumbnail: global.thumb,
  caption: `${menunya}`,
  footer: 'Bot Ini Masih Beta MD\nMohon Bantuannya, Jika Fitur Ada Yang Error Hubungi Owner\n\n© FxSx',
  templateButtons: btnn
  }
  xcaa.sendMessage(m.chat, templateMessage)
  }
  break
case 'thankto': case 'thanksto': {
  try {
  let ingfo = `╭「 *THANK TO* 」
├ Allah SWT
├ Ortu
├ FxSx <base>
├ Fatih Arridho
├ Fadli
├ NathanDev
├ Dika Ardnt
├ Ferdiz Afk
└ Diva Uwu
`
  let btn = [
     {callButton: {displayText: 'Number Owner', phoneNumber: '+6283815956151'}},
     {quickReplyButton: {displayText: 'Rules Bot', id: 'rules'}}
  ]
  xcaa.sendButtonDocumen(m.chat, ingfo, global.ownerName, btn, m)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'rules': case 'rulesbot': case 'rulesb': {
  try {
  let tteck = `1. Jangan spam bot
•> Sanksi: *Warn/Soft Block*

2. Jangan telepon bot
•> Sanksi: *Soft Block*

3. Jangan mengeksploitasi bot
•> Sanksi: *Permanen Block*
`
  let buttons = [
      {buttonId: `faaajjjjrrriii`, buttonText: {displayText: 'Sudah Dimengerti'}, type: 1}
  ]
  let buttonMessage = {
  document: global.thumb2,
  fileName: 'RoF3X-BoT',
  mimetype: 'application/pptx',
  fileLength: 0,
  jpegThumbnail: global.thumb2,
  caption: `${tteck}`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4,
  contextInfo:{forwardingScore: 999999, isForwarded: true, externalAdReply: {title: `Hai ${pushname}`, body: `${wib}`, previewType: "PHOTO", thumbnailUrl: ``, thumbnail: global.thumb2, sourceUrl: global.linkgc}}
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'owner': {
  try {
  xcaa.sendContact(m.chat, global.ownerNumber, ftroli)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'listpc': {
  try {
  let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
  let teks = `╭「 *LIST CHAT* 」\n└ Total Chat : ${anu.length}\n\n`
  for (let i of anu) {
  let nama = store.messages[i].array[0].pushName
      teks += `╭ *Nama :* ${nama}\n├ *User :* @${i.split('@')[0]}\n└ *Chat :* https://wa.me/${i.split('@')[0]}\n\n──────────────────\n\n`
  }
  xcaa.sendTextWithMentions(m.chat, teks, m)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'listgc': {
  try {
  let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
  let teks = `╭「 *LIST GRUP* 」\n└ Total Group : ${anu.length} Group\n\n`
  for (let i of anu) {
  let metadata = await xcaa.groupMetadata(i)
      teks += `╭ *Nama :* ${metadata.subject}\n├ *Owner Grup :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : 'Tidak diketahui'}\n├ *ID :* ${metadata.id}\n├ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n└ *Member :* ${metadata.participants.length}\n\n──────────────────\n\n`
  }
  xcaa.sendTextWithMentions(m.chat, teks, m)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'delete': case 'del': case 'd': {
  if (!m.quoted) throw false
  let { chat, fromMe, id, isBaileys } = m.quoted
  if (!isBaileys) return m.reply('Pesan tersebut bukan dikirim oleh bot!')
  xcaa.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
  }
  break
case 'request': case 'reqfitur': case 'reqf': {
  if (!args.join(" ")) return m.reply(`Contoh : ${prefix + command} Tambahin Fitur Download`)
  try {
  teks = `╭「 *Request Fitur* 」\n├ Nomor : @${m.sender.split("@")[0]}\n└ Request : ${args.join(" ")}`
  for (let i of global.ownerNumber) {
  xcaa.sendMessage(i + "@s.whatsapp.net", {text: teks, mentions:[m.sender]}, {quoted:m})
  }
  xcaa.sendMessage(m.chat, {text: global.mess.sukses, mentions:[m.sender]}, {quoted: m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'report': case 'lapor': {
  if (!args.join(" ")) return m.reply(`Contoh : ${prefix + command} Fitur Download Play Error`)
  try {
  teks = `╭「 *Report Fitur* 」\n├ Nomor : @${m.sender.split("@")[0]}\n└ Report : ${args.join(" ")}`
  for (let i of global.ownerNumber) {
  xcaa.sendMessage(i + "@s.whatsapp.net", {text: teks, mentions:[m.sender]}, {quoted:m})
  }
  xcaa.sendMessage(m.chat, {text: global.mess.sukses, mentions:[m.sender]}, {quoted:m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'afk': {
  let user = global.db.data.users[m.sender]
  user.afkTime = + new Date
  user.afkReason = text
  m.reply(`${m.pushName} Telah Afk${text ? ': ' + text : ''}`)
  }
  break	
case 'ping': case 'botstatus': case 'statusbot': case 'speed': case 'tes': {
  try {
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
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Rpg Menu
case 'inventori': case 'inventory': case 'profile': case 'inv': case 'invent': {
  if (q.includes('--help')) return m.reply(examkosong)
  if (!isDarah){ addInventoriDarah(m.sender, DarahAwal) }
  if (!isInventory){ addInventori(m.sender) }
  if (!isInventoriBuruan){ addInventoriBuruan(m.sender) }
  try {
  let teksehmazeh = `_[ INFO USER ]_\n\n`
  teksehmazeh += `*🖤Your Blood* : ${getDarah(m.sender)}\n`
  teksehmazeh += `*◻️️Your Iron* : ${getBesi(m.sender)}\n`
  teksehmazeh += `*🌟Your Gold* : ${getEmas(m.sender)}\n`
  teksehmazeh += `*💎Your Emerald* : ${getEmerald(m.sender)}\n`
  teksehmazeh += `*⏺️Your Limit* : ${getLimit(m.sender)}\n`
  teksehmazeh += `*🧪Your Potion* : ${getPotion(m.sender)}\n\n`
  teksehmazeh += `_[ 🐺HUNT RESULT🐺 ]_\n`
  teksehmazeh += `*🐟Fish* : ${getIkan(m.sender)}\n`
  teksehmazeh += `*🐔Chicken* : ${getAyam(m.sender)}\n`
  teksehmazeh += `*🐇Rabbit* : ${getKelinci(m.sender)}\n`
  teksehmazeh += `*🐑Sheep* : ${getDomba(m.sender)}\n`
  teksehmazeh += `*🐄Cow* : ${getSapi(m.sender)}\n`
  teksehmazeh += `*🐘Elephant* : ${getGajah(m.sender)}\n\n`
  teksehmazeh += `_*${pushname}*_`
  m.reply(teksehmazeh)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'userlimit': {
  try {
  let txt = `「 *LIMIT USER* 」\n`
  for (let i of _limit){
  txt += `╭ *ID :* @${i.id.split("@")[0]}\n└ *Limit* : ${i.limit}\n`
  }
  m.reply(txt)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'leaderboard': case 'lb': case 'ldb': {
  try {
  let txt = `「 *LEADERBOARD* 」\n`
  for (let i of _buruan){
  txt += `╭ *ID :* ${i.id}\n`
  txt += `├ *🐟Fish* : ${i.ikan}\n`
  txt += `├ *🐔Chicken* : ${i.ayam}\n`
  txt += `├ *🐇Rabbit* : ${i.kelinci}\n`
  txt += `├ *🐑Sheep* : ${i.domba}\n`
  txt += `├ *🐄Cow* : ${i.sapi}\n`
  txt += `└ *🐘Elephant* : ${i.gajah}\n\n`
  }
  m.reply(txt)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'mining': case 'mine':{
  if (q.includes('--help')) return m.reply(examkosong) 
  if (!isInventory){ addInventori(m.sender) }
  if (isCekDarah < 1) return m.reply(`Kamu Lelah!, Coba Sembuhkan Menggunakan Potion`) 
  try {
  let besi = [1,2,5,0,3,0,1,1,4,1,5,0,0]
  let emas = [0,1,2,3,0,0,0,1,1,0,0,2]
  let emerald = [0,0,1,0,0,1,0,2,1,0,0,1]
  var besinya = besi[Math.floor(Math.random() * besi.length)]  
  var emasnya = emas[Math.floor(Math.random() * emas.length)]  
  var emeraldnya = emerald[Math.floor(Math.random() * emerald.length)]  
  let capton = `╭「 *Mining* 」\n├ *◻️️Iron* : ${besinya}\n├ *🌟Gold* : ${emasnya}\n└ *💎Emerald* : ${emeraldnya}`
  let buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: 'Mining'}, type: 1}]
  let buttonMessage = {
  image: { url: './storage/image/tambang.jpg' },
  caption: capton,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
  await sleep(7000)
  m.reply(`@${m.sender.split("@")[0]} Started Mining🎣`)     
  await sleep(1500)
  kurangDarah(m.sender, 10)
  addBesi(m.sender, besinya)
  addEmas(m.sended, emasnya)
  addEmerald(m.sender, emeraldnya)
  } catch (err) {
  m.reply(mess.error)
  }
  }   
  break
case 'beli': case 'buy': {
  try {
  if (q.includes('--help')) return m.reply(examkosong) 
  if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } 
  if (!isInventoryMonay){ addInventoriMonay(m.sender) }
  if (!isInventory){ addInventori(m.sender) }
  if (!q) return m.reply(`Contoh : ${prefix + command} potion/baitfood/limit`)
  var anu = args[1]
  if (args[0] === 'potion'){
  let noh = 1000 * anu
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} potion 2\n 1 Potion = 1000 Money`)
  if (isMonay < noh) return m.reply('Sisa Uang Anda Tidak Cukup Untuk Membeli Potion')
  kurangMonay(m.sender, noh)
  var apalu = anu * 1
  addPotion(m.sender, apalu)
  await sleep(2000)
  m.reply(`Transaksi Sukses️\n*Sisa Uangmu* : ${getMonay(m.sender)}\n*Potionmu* : ${getPotion(m.sender)}`)
  } else if (args[0] === 'baitfood'){
  let noh = 2500 * anu
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} baitfood 2\n 1 Bait Food = 2500 Money`)
  if (isMonay < noh) return m.reply('Sisa Uang Anda Tidak Cukup Untuk Membeli BaitFood')
  kurangMonay(m.sender, noh)
  var apalu = anu * 1
  addUmpan(m.sender, apalu)
  await sleep(2000)
  m.reply(`Transaksi Sukses️\n*Sisa Uangmu* : ${getMonay(m.sender)}\n*Bait Foodmu* : ${getUmpan(m.sender)}`)
  } else if (args[0] === 'limit'){
  let noh = 35000 * anu
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} limit 2\n 1 Limit = 35000 Money`)
  if (isMonay < noh) return m.reply('Sisa Uang Anda Tidak Cukup Untuh Membeli Limit')
  kurangMonay(m.sender, noh)
  var apalu = anu * 1
  addLimit(m.sender, apalu)
  m.reply(`Transaksi Sukses\n*Sisa Uangmu* : ${getMonay(m.sender)}\n*Limitmu* : ${getLimit(m.sender)}`)
  await sleep(2000)
  } else { m.reply("Format Salah") }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'sel': case 'jual':{
  if (!q) return m.reply(`Contoh : ${prefix + command} fish/chicken/rabbit/sheep/cow/elephant/iron/gold/emerald`)
  if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } 
  if (!isInventoryMonay){ addInventoriMonay(m.sender) }
  if (!isInventory){ addInventori(m.sender) }
  try {
  var anu = args[1]
  if (args[0] === 'fish'){
  if (isIkan < anu) return m.reply(`Anda Tidak Memiliki Cukup Ikan Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} fish 2\n 1 Fish = 1500 Money`)
  kurangIkan(m.sender, anu)
  let monaynya = 1500 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Ikanmu* : ${getIkan(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'chicken'){
  if (isAyam < anu) return m.reply(`Anda Tidak Memiliki Cukup Ayam Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} chicken 2\n 1 Chicken = 2500 Money`)
  kurangAyam(m.sender, anu)
  let monaynya = 2500 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Ayammu* : ${getAyam(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'rabbit'){
  if (isKelinci < anu) return m.reply(`Anda Tidak Memiliki Cukup Kelinci Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} rabbit 2\n 1 Rabbit = 3000 Money`)
  kurangKelinci(m.sender, anu)
  let monaynya = 3000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Kelincimu* : ${getKelinci(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'sheep'){
  if (isDomba < anu) return m.reply(`Anda Tidak Memiliki Cukup Domba Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} domba 2\n 1 Sheep = 5000 money`)
  kurangDomba(m.sender, anu)
  let monaynya = 5000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Dombamu* : ${getDomba(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'cow'){
  if (isSapi < anu) return m.reply(`Anda Tidak Memiliki Cukup Sapi Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} cow 2\n 1 Cow = 10000 Money`)
  kurangSapi(m.sender, anu)
  let monaynya = 10000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Sapimu* : ${getSapi(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'elephant'){
  if (isGajah < anu) return m.reply(`Anda Tidak Memiliki Cukup Gajah Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} elephant 2\n 1 Elephant = 15000 Money`)
  kurangGajah(m.sender, anu)
  let monaynya = 15000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Gajahmu* : ${getGajah(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'iron'){
  if (isBesi < anu) return m.reply(`Anda Tidak Memiliki Cukup Besi Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} iron 2\n 1 Iron = 16000 Money`)
  kurangBesi(m.sender, anu)
  let monaynya = 16000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Besimu* : ${getBesi(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'gold'){
  if (isEmas < anu) return m.reply(`Anda Tidak Memiliki Cukup Emas Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} gold 2\n 1 Gold = 50000 Money`)
  kurangEmas(m.sender, anu)
  let monaynya = 50000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Emasmu* : ${getEmas(m.sender)}`)
  }, 2000) 
  } else
  if (args[0] === 'emerald'){
  if (isEmerald < anu) return m.reply(`Anda Tidak Memiliki Cukup Zamrud Untuk Transaksi Ini`)
  if (!args[1]) return m.reply(`Contoh : ${prefix + command} emerald 2\n 1 Emerald = 100000 Money`)
  kurangEmerald(m.sender, anu)
  let monaynya = 100000 * anu
  addMonay(m.sender, monaynya)
  setTimeout( () => {
  m.reply(`Transaksi Sukses\n*Uangmu* : ${getMonay(m.sender)}\n*Sisa Zamrudmu* : ${getEmerald(m.sender)}`)
  }, 2000) 
  } else { m.reply("Format Salah") }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'heal': {
  if (q.includes('--help')) return m.reply(examkosong) 
  if (!isCekDarah < 1) return m.reply('Anda Hanya Dapat Menyembuhkan Saat Darah Anda 0')
  if (isCekDarah > 100) return m.reply('Darahmu Penuh')
  if (isPotion < 1) return m.reply(`Anda Tidak Punya Potion, Coba Beli Dengan Cara Ini #buypotion jumlah`) 
  try {
  addDarah(m.sender, 100)
  kurangPotion(m.sender, 1)
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'hunt': case 'hunting': case 'berburu': case 'memburu': {
  if (q.includes('--help')) return m.reply(examkosong) 
  if (!isDarah){ addInventoriDarah(m.sender, DarahAwal) }
  if (isCekDarah < 1) return m.reply('Darahmu Habis, Coba Sembuhkan Menggunakan Option') 
  if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } Ditusuk duri saat berburu
  let luka = ["Ditusuk Duri Saat Berburu","Tergelincir ke dalam jurang saat berburu","Digaruk oleh binatang buas","Kurang teliti","Terjerat akar","Jatuh saat berburu"]
  let location = ["Jungle","Amazon forest","Tropical forest","Meadow","African forest","Mountains"]
  var ikanmu = Math.ceil(Math.random() * 10)
  var ayam = Math.ceil(Math.random() * 8)
  var kelinci = Math.ceil(Math.random() * 7)
  var dombanya = [3,0,4,0,5,4,6,0,1,0,2,3,0,3,0,1]
  var sapinya = [2,0,3,0,4,0,5,0,1,0,2,0,3,0,1]
  var gajahnya = [1,0,4,0,2,0,1,0,2,1,3,0,1]
  var domba = dombanya[Math.floor(Math.random() * dombanya.length)] 
  var sapi = sapinya[Math.floor(Math.random() * sapinya.length)] 
  var gajah = gajahnya[Math.floor(Math.random() * gajahnya.length)]    
  var lukanya = luka[Math.floor(Math.random() * luka.length)]
  var lokasinya = location[Math.floor(Math.random() * location.length)]
  if (lokasinya === 'Jungle') {
  var image = './storage/image/rimba.jpg'
  } else
  if (lokasinya === 'Amazon forest') {
  var image =  './storage/image/amazon.jpg'
  } else
  if (lokasinya === 'Tropical forest') {
  var image = './storage/image/tropis.jpg'
  } else
  if (lokasinya === 'Meadow') {
  var image = './storage/image/padang_rumput.jpg'
  } else
  if (lokasinya === 'African forest') {
  var image = './storage/image/afrika.jpg'
  } else
  if (lokasinya === 'Mountains') {
  var image = './storage/image/pegunungan.jpg'
  }
  await sleep(5000)
  let teksehmazeh = `_[ HUNT RESULT ]_\n`
  teksehmazeh += `*🐟Fish* : ${ikanmu}\n`
  teksehmazeh += `*🐔Chicken* : ${ayam}\n`
  teksehmazeh += `*🐇Rabbit* : ${kelinci}\n`
  teksehmazeh += `*🐑Sheep* : ${domba}\n`
  teksehmazeh += `*🐄Cow* : ${sapi}\n`
  teksehmazeh += `*🐘Elephant* : ${gajah}\n\n`
  teksehmazeh += `_[ INFO ]_\n`
  teksehmazeh += `*Location* : ${lokasinya}\n`
  teksehmazeh += `*Wounded* : ${lukanya}, blood - 10\n`
  teksehmazeh += `*Remaining blood* : ${getDarah(m.sender)}\n`
  let buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: 'Memburu'}, type: 1}]
  let buttonMessage = {
  image: { url: image },
  caption: teksehmazeh,
  footer: pushname,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(from, buttonMessage, { quoted: m })      
  await sleep(1000)
  m.reply(`@${m.sender.split("@")[0]} Started Hunting In ${lokasinya}`)
  addIkan(m.sender, ikanmu) 
  addAyam(m.sender, ayam) 
  addKelinci(m.sender, kelinci)
  addDomba(m.sender, domba)
  addSapi(m.sender, sapi)
  addGajah(m.sender, gajah)
  kurangDarah(m.sender, 10)
  }
  break
//Owner Menu
case 'bcgc': case 'bcgroup': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  let getGroups = await xcaa.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anu = groups.map(v => v.id)
  for (let i of anu) {
  await sleep(1500)
  let tksbc = `「 *BROADCAST* 」\n\n${text}`
  let btnn = [
     {callButton: {displayText: 'Number Owner', phoneNumber: '+6283815956151'}},
     {quickReplyButton: {displayText: 'Status Bot', id: 'ping'}},
     {quickReplyButton: {displayText: 'Owner Bot', id: 'owner'}},
     {quickReplyButton: {displayText: 'Thanks To', id: 'thankto'}}
  ]
  let templateMessage = {
  document: global.thumb,
  fileName: global.packname,
  mimetype: 'application/pdf',
  fileLength: 0,
  jpegThumbnail: global.thumb,
  caption: `${tksbc}`,
  footer: global.ownerName,
  templateButtons: btnn
  }
  xcaa.sendMessage(i, templateMessage)
  }
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'bc': case 'broadcast': case 'bcall': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  let anu = await store.chats.all().map(v => v.id)
  let getGroups = await xcaa.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anuan = groups.map(v => v.id)
  for (let yoy of anu && anuan) {
  const template = generateWAMessageFromContent(yoy, proto.Message.fromObject({ 
   templateMessage: { 
    hydratedTemplate: { 
     hydratedContentText: `「 *BROADCAST* 」\n\n${text}`, 
     locationMessage: {
     jpegThumbnail: global.thumb }, 
     hydratedFooterText: global.ownerName, 
     hydratedButtons: [
     {callButton: {displayText: 'Number Owner', phoneNumber: '+6283815956151'}}, 
     {quickReplyButton: {displayText: 'Status Bot', id: 'ping'}}, 
     {quickReplyButton: {displayText: 'Owner Bot', id: 'owner'}}
     ]
    }
   }
  }), { userJid: m.chat });
  xcaa.relayMessage(yoy, template.message, { messageId: template.key.id } )
  }
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'bchat': case 'bcpvtchat': case 'bcchat': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  let anunuan = await store.chats.all().map(v => v.id)
  for (let yoi of anunuan) {
  const template = generateWAMessageFromContent(yoi, proto.Message.fromObject({ 
   templateMessage: { 
    hydratedTemplate: { 
     hydratedContentText: `「 *BROADCAST* 」\n\n${text}`, 
     locationMessage: {
     jpegThumbnail: global.thumb }, 
     hydratedFooterText: global.ownerName, 
     hydratedButtons: [
     {callButton: {displayText: 'Number Owner', phoneNumber: '+6283815956151'}},
     {quickReplyButton: {displayText: 'Status Bot', id: 'ping'}},
     {quickReplyButton: {displayText: 'Owner Bot', id: 'owner'}}
     ]
    }
   }
  }), { userJid: m.chat });
  xcaa.relayMessage(yoi, template.message, { messageId: template.key.id } )
  }
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'chat': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) return m.reply('*Contoh : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete*')
  try {
  if (args[0] === 'mute') {
    xcaa.chatModify({ mute: 'Infinity' }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'unmute') {
    xcaa.chatModify({ mute: null }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'archive') {
    xcaa.chatModify({ archive: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'unarchive') {
    xcaa.chatModify({ archive: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'read') {
    xcaa.chatModify({ markRead: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'unread') {
    xcaa.chatModify({ markRead: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'delete') {
    xcaa.chatModify({ clear: { message: { id: m.quoted.id, fromMe: true }} }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'join': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) return m.reply('Masukkan Link Group!')
  if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
  m.reply(mess.wait)
  try {
  let result = args[0].split('https://chat.whatsapp.com/')[1]
  await xcaa.groupAcceptInvite(result).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(mess.error))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'culik': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  let pantek = []
  for (let mem of participants) {
  pantek.push(mem.jid)
  }
  xcaa.groupParticipantsUpdate(args[0], pantek)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'leave': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  await xcaa.groupLeave(m.chat).then((res) => m.reply('Sampai Jumpa Kembali\nRoF3X-Bot Akan Segera Keluar\nKarna Disuruh Owner')).catch((err) => m.reply(mess.error))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'block': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.updateBlockStatus(users, 'block').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(mess.error))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'unblock': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.updateBlockStatus(users, 'unblock').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(mess.error))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'setppbot': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!quoted) throw `Kirim/m.reply Image Dengan Caption ${prefix + command}`
  if (!/image/.test(mime)) throw `Kirim/m.reply Image Dengan Caption ${prefix + command}`
  if (/webp/.test(mime)) throw `Kirim/m.reply Image Dengan Caption ${prefix + command}`
  m.reply(mess.wait)
  try {
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  await xcaa.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'setexif': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) return m.reply(`*Contoh : ${prefix + command} packname|author*`)
  try {
  global.packname = text.split("|")[0]
  global.author = text.split("|")[1]
  m.reply(`╭ Packname : ${global.packname}\n└ Author : ${global.author}`)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'public': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  xcaa.public = true
  m.reply(mess.sukses)
  xcaa.setStatus(`Mode : Public`)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'self': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  xcaa.self = false
  m.reply(mess.sukses)
  xcaa.setStatus(`Mode : Self`)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'react': case 'reaction': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  try {
  reactionMessage = {
    react: {
      text: args[0],
      key: { remoteJid: m.chat, fromMe: true, id: quoted.id }
    }
  }
  xcaa.sendMessage(m.chat, reactionMessage)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'getcase': case 'getcs': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!args[0]) return m.reply("Mau ngambil case apa?")
  try {
  m.reply('case ' + `'${args[0]}'` + fs.readFileSync('./command/xcaa.js').toString().split(`case '${args[0]}'`)[1].split(rfx)[0] + rfx)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Group Menu
case 'linkgc': case 'linkgrup': case 'linkgroup': case 'linkgroups': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  try {
  let response = await xcaa.groupInviteCode(m.chat)
  xcaa.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'revoke': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  try {
  await xcaa.groupRevokeInvite(from)
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kick': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di kick siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62')
  try {
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'add': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di add siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  try {
  let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'promote': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di promote siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  try {
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'demote': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Yang mau di demote siapa??')
  if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
  try {
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await xcaa.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'setname': case 'setsubject': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  await xcaa.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'setdesc': case 'setdesk': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  await xcaa.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'setppgroup': case 'setppgrup': case 'setppgc': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  try {
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  await xcaa.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply(mess.sukses)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'tagall': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  try {
  let teks = `╭ *Tag All*\n└ *Pesan : ${q ? q : 'Kosong'}*\n\n`
  for (let mem of participants) {
  teks += `•> @${mem.id.split('@')[0]}\n`
  }
  xcaa.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'hidetag': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  try {
  xcaa.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'hidetag2': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  try {
  if (/sticker/.test(mime)) {
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  xcaa.sendMessage(m.chat, { sticker : fs.readFileSync(media), mentions: participants.map(a => a.id)}, { quoted: ftroli })
  await fs.unlinkSync(media)
  } else if (/image/.test(mime)) {
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  xcaa.sendMessage(m.chat, { image : fs.readFileSync(media), caption:m.quoted ? m.quoted.caption : "", mentions: participants.map(a => a.id)}, { quoted: ftroli })
  await fs.unlinkSync(media)
  } else if (/video/.test(mime)) {
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  xcaa.sendMessage(m.chat, { video : fs.readFileSync(media), mimetype:"video/mp4", caption:m.quoted ? m.quoted.caption : "", mentions: participants.map(a => a.id)}, { quoted: ftroli })
  await fs.unlinkSync(media)
  } else if (/audio/.test(mime)) {
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  xcaa.sendMessage(m.chat, { audio : fs.readFileSync(media), mimetype:"audio/mp4", ptt:true, mentions: participants.map(a => a.id)}, { quoted: ftroli })
  await fs.unlinkSync(media)
  } else {
  xcaa.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: ftroli })
  }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'totag': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!m.quoted) return m.reply(`Reply pesan dengan caption ${prefix + command}`)
  try {
  xcaa.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'ephemeral': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!text) return m.reply('Masukan Value enable/disable')
  try {
  if (args[0] === 'enable') {
  await xcaa.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'disable') {
  await xcaa.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(mess.sukses)).catch((err) => m.reply(jsonformat(err)))
  }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'group': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!text) return m.reply('Masukan Value open/close')
  try {
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
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'editinfo': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins && !isOwner && !m.key.fromMe) return m.reply(mess.admin)
  if (!text) return m.reply('Masukan Value open/close')
  try {
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
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Converter Menu
case 'sticker': case 's': case 'stickergif': case 'sgif': case 'stiker': {
  if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
  m.reply(mess.wait)
  try {
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
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'stickerwm': case 'swm': case 'stickergifwm': case 'sgifwm': case 'stikerwm': {
  if (!m.quoted) throw m.reply(`Balas Video/Image Dengan Caption ${prefix + command} Teks|Teks`)
  let [teks1, teks2] = text.split`|`
  if (!teks1) return m.reply(`Kirim/reply image/video dengan caption ${prefix + command} teks1|teks2`)
  if (!teks2) return m.reply(`Kirim/reply image/video dengan caption ${prefix + command} teks1|teks2`)
  m.reply(mess.wait)
  try {
  if (/image/.test(mime)) {
  let media = await quoted.download()
  let encmedia = await xcaa.sendImageAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
  let media = await quoted.download()
  let encmedia = await xcaa.sendVideoAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
  await fs.unlinkSync(encmedia)
  } else {
    throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
  }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
  if (!/image/.test(mime)) return m.reply(`Kirim/reply Image/sticker Dengan Caption ${prefix + command} Teks|Teks`)
  if (!text) return m.reply(`Kirim/reply Image/sticker Dengan Caption ${prefix + command} Teks|Teks`)
  m.reply(mess.wait)
  try {
  atas = text.split('|')[0] ? text.split('|')[0] : '-'
  bawah = text.split('|')[1] ? text.split('|')[1] : '-'
  let dwnld = await quoted.download()
  let inni = await floNime(dwnld)
  let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${inni.result.url}`
  let encmedia = await xcaa.sendImageAsSticker(m.chat, smeme, m, { packname: global.packname, author: global.auhor })
  await fs.unlinkSync(encmedia)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break     
case 'emojimix': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} 😅+😊*`)
  let [emoji1, emoji2] = text.split`+`
  let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
  for (let res of anu.results) {
  let encmedia = await xcaa.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
  await fs.unlinkSync(encmedia)
  }
  }
  break 
case 'emojimix2': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} 😅*`)
  let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(text)}`)
  for (let res of anu.results) {
  let encmedia = await xcaa.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
  await fs.unlinkSync(encmedia)
  }
  }
  break
case 'attp': case 'ttp': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  await xcaa.sendMedia(m.chat, `https://xteam.xyz/${command}?file&text=${text}`, 'RoF3X-MD', '© FxSx', m, {asSticker: true})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'style': case 'styletext': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Text*`)
  try {
  let anu = await styletext(text)
  let teks = `Style Text From ${text}\n\n`
  for (let i of anu) {
  teks += `•> *${i.name}* : ${i.result}\n\n`
  }
  m.reply(teks)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'imagenobg': case 'removebg': case 'remove-bg': {
  if (!m.quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (/webp/.test(mime)) return m.reply(`Kirim/Reply Sticker Dengan Caption ${prefix + command}`)
  let remobg = require('remove.bg')
  let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU','S258diZhcuFJooAtHTaPEn4T','5LjfCVAp4vVNYiTjq9mXJWHF','aT7ibfUsGSwFyjaPZ9eoJc61','BY63t7Vx2tS68YZFY6AJ4HHF','5Gdq1sSWSeyZzPMHqz7ENfi8','86h6d6u4AXrst4BVMD9dzdGZ','xp8pSDavAgfE5XScqXo9UKHF','dWbCoCb3TacCP93imNEcPxcL']
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
  caption: '*Sukses*'
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
  if (!m.quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (/webp/.test(mime)) return m.reply(`Kirim/Reply Sticker Dengan Caption ${prefix + command}`)
  let remobg = require('remove.bg')
  let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU','S258diZhcuFJooAtHTaPEn4T','5LjfCVAp4vVNYiTjq9mXJWHF','aT7ibfUsGSwFyjaPZ9eoJc61','BY63t7Vx2tS68YZFY6AJ4HHF','5Gdq1sSWSeyZzPMHqz7ENfi8','86h6d6u4AXrst4BVMD9dzdGZ','xp8pSDavAgfE5XScqXo9UKHF','dWbCoCb3TacCP93imNEcPxcL']
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
  await xcaa.sendMessage(m.chat, {image: hsil, caption: global.mess.sukses}, {quoted: m})
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
case 'toimage': case 'toimg': {
  if (!m.quoted) return m.reply('Reply Stickernya')
  if (!/webp/.test(mime)) return m.reply(`Balas sticker dengan caption *${prefix + command}*`)
  m.reply(mess.wait)
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let ran = await getRandom('.png')
  exec(`ffmpeg -i ${media} ${ran}`, (err) => {
  fs.unlinkSync(media)
  if (err) throw err
  let buffer = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, { image: buffer, caption: global.mess.sukses}, { quoted: m })
  fs.unlinkSync(ran)
  })
  }
  break
case 'tomp4': case 'tovideo': {
  if (!m.quoted) return m.reply('Reply Sticker Gif')
  if (!/webp/.test(mime)) return m.reply(`Balas sticker gif dengan caption *${prefix + command}*`)
  m.reply(mess.wait)
  let { webp2mp4File } = require('../lib/uploader')
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await xcaa.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: global.mess.sukses} }, { quoted: m })
  await fs.unlinkSync(media)
  }
  break
case 'toaud': case 'toaudio': {
  if (m.quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
  if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toAudio } = require('../lib/converter')
  let audio = await toAudio(media, 'mp4')
  xcaa.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mp4'}, { quoted : m })
  }
  break
case 'tomp3': {
  if (!m.quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
  if (/document/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
  if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toAudio } = require('../lib/converter')
  let audio = await toAudio(media, 'mp4')
  xcaa.sendMessage(m.chat, {document: audio, mimetype: 'audio/mp4', fileName: `Convert By ${xcaa.user.name}.mp3`}, { quoted : m })
  }
  break
case 'tovn': case 'toptt': {
  if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
  if (!m.quoted) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toPTT } = require('../lib/converter')
  let audio = await toPTT(media, 'mp4')
  xcaa.sendMessage(m.chat, {audio: audio, mimetype:'audio/mp4', ptt:true }, {quoted: m})
  }
  break
case 'togif': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) throw `Balas stiker dengan caption *${prefix + command}*`
  m.reply(mess.wait)
  let { webp2mp4File } = require('../lib/uploader')
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await xcaa.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: global.mess.sukses}, gifPlayback: true }, { quoted: m })
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
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': 
case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': 
case 'smooth': case 'tupai': case 'imut': {
  try {
  let set
  if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
  if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
  if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
  if (/earrape/.test(command)) set = '-af volume=12'
  if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
  if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
  if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
  if (/reverse/.test(command)) set = '-filter_complex "areverse"'
  if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
  if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
  if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
  if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
  if (/imut/.test(command)) set = '-af atempo=3/4,asetrate=44500*4/3'
  if (/audio/.test(mime)) {
  m.reply(mess.wait)
  let media = await xcaa.downloadAndSaveMediaMessage(quoted)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(err)
  let buff = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
  fs.unlinkSync(ran)
  })
  } else m.reply(`Balas audio yang ingin diubah dengan caption *${prefix + command}*`)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Maker Menu
case 'ktpmaker': {
  if (args.length == 0) return m.reply(`*Contoh :\n${prefix+command} Nik|Provinsi|Kabupaten|Nama|TempatTanggalLahir|JenisKel|Alamat|RtRw|KelDesa|Kecamatan|Agama|Statu|Pekerjaan|Region|Berlaku|golongan darah|LinkGambar*`)
  try {
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
  await xcaa.sendMessage(m.chat, { image: ardaktp, caption: global.mess.sukses }, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'candy': case 'christmas': case '3dchristmas': case 'sparklechristmas':
case 'deepsea': case 'scifi': case 'rainbow': case 'waterpipe': case 'spooky': 
case 'pencil': case 'circuit': case 'discovery': case 'metalic': case 'fiction': case 'demon': 
case 'transformer': case 'berry': case 'thunder': case 'magma': case '3dstone': 
case 'neonlight': case 'glitch': case 'harrypotter': case 'brokenglass': case 'papercut': 
case 'watercolor': case 'multicolor': case 'neondevil': case 'underwater': case 'graffitibike':
case 'snow': case 'cloud': case 'honey': case 'ice': case 'fruitjuice': case 'biscuit': case 'wood': 
case 'chocolate': case 'strawberry': case 'matrix': case 'blood': case 'dropwater': case 'toxic': 
case 'lava': case 'rock': case 'bloodglas': case 'hallowen': case 'darkgold': case 'joker': case 'wicker':
case 'firework': case 'skeleton': case 'blackpink': case 'sand': case 'glue': case '1917': case 'leaves': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`) 
  m.reply(mess.wait)
  try {
  let link
  if (/candy/.test(command)) link = 'https://textpro.me/create-christmas-candy-cane-text-effect-1056.html'
  if (/christmas/.test(command)) link = 'https://textpro.me/christmas-tree-text-effect-online-free-1057.html'
  if (/3dchristmas/.test(command)) link = 'https://textpro.me/3d-christmas-text-effect-by-name-1055.html'
  if (/sparklechristmas/.test(command)) link = 'https://textpro.me/sparkles-merry-christmas-text-effect-1054.html'
  if (/deepsea/.test(command)) link = 'https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html'
  if (/scifi/.test(command)) link = 'https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html'
  if (/rainbow/.test(command)) link = 'https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html'
  if (/waterpipe/.test(command)) link = 'https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html'
  if (/spooky/.test(command)) link = 'https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html'
  if (/pencil/.test(command)) link = 'https://textpro.me/create-a-sketch-text-effect-online-1044.html'
  if (/circuit/.test(command)) link = 'https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html'
  if (/discovery/.test(command)) link = 'https://textpro.me/create-space-text-effects-online-free-1042.html'
  if (/metalic/.test(command)) link = 'https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html'
  if (/fiction/.test(command)) link = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html'
  if (/demon/.test(command)) link = 'https://textpro.me/create-green-horror-style-text-effect-online-1036.html'
  if (/transformer/.test(command)) link = 'https://textpro.me/create-a-transformer-text-effect-online-1035.html'
  if (/berry/.test(command)) link = 'https://textpro.me/create-berry-text-effect-online-free-1033.html'
  if (/thunder/.test(command)) link = 'https://textpro.me/online-thunder-text-effect-generator-1031.html'
  if (/magma/.test(command)) link = 'https://textpro.me/create-a-magma-hot-text-effect-online-1030.html'
  if (/3dstone/.test(command)) link = 'https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html'
  if (/neonlight/.test(command)) link = 'https://textpro.me/create-3d-neon-light-text-effect-online-1028.html'
  if (/glitch/.test(command)) link = 'https://textpro.me/create-impressive-glitch-text-effects-online-1027.html'
  if (/harrypotter/.test(command)) link = 'https://textpro.me/create-harry-potter-text-effect-online-1025.html'
  if (/brokenglass/.test(command)) link = 'https://textpro.me/broken-glass-text-effect-free-online-1023.html'
  if (/papercut/.test(command)) link = 'https://textpro.me/create-art-paper-cut-text-effect-online-1022.html'
  if (/watercolor/.test(command)) link = 'https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html'
  if (/multicolor/.test(command)) link = 'https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html'
  if (/neondevil/.test(command)) link = 'https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html'
  if (/underwater/.test(command)) link = 'https://textpro.me/3d-underwater-text-effect-generator-online-1013.html'
  if (/graffitibike/.test(command)) link = 'https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html'
  if (/snow/.test(command)) link = 'https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html'
  if (/cloud/.test(command)) link = 'https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html'
  if (/honey/.test(command)) link = 'https://textpro.me/honey-text-effect-868.html'
  if (/ice/.test(command)) link = 'https://textpro.me/ice-cold-text-effect-862.html'
  if (/fruitjuice/.test(command)) link = 'https://textpro.me/fruit-juice-text-effect-861.html'
  if (/biscuit/.test(command)) link = 'https://textpro.me/biscuit-text-effect-858.html'
  if (/wood/.test(command)) link = 'https://textpro.me/wood-text-effect-856.html'
  if (/chocolate/.test(command)) link = 'https://textpro.me/chocolate-cake-text-effect-890.html'
  if (/strawberry/.test(command)) link = 'https://textpro.me/strawberry-text-effect-online-889.html'
  if (/matrix/.test(command)) link = 'https://textpro.me/matrix-style-text-effect-online-884.html'
  if (/blood/.test(command)) link = 'https://textpro.me/horror-blood-text-effect-online-883.html'
  if (/dropwater/.test(command)) link = 'https://textpro.me/dropwater-text-effect-872.html'
  if (/toxic/.test(command)) link = 'https://textpro.me/toxic-text-effect-online-901.html'
  if (/lava/.test(command)) link = 'https://textpro.me/lava-text-effect-online-914.html'
  if (/rock/.test(command)) link = 'https://textpro.me/rock-text-effect-online-915.html'
  if (/bloodglas/.test(command)) link = 'https://textpro.me/blood-text-on-the-frosted-glass-941.html'
  if (/hallowen/.test(command)) link = 'https://textpro.me/halloween-fire-text-effect-940.html'
  if (/darkgold/.test(command)) link = 'https://textpro.me/metal-dark-gold-text-effect-online-939.html'
  if (/joker/.test(command)) link = 'https://textpro.me/create-logo-joker-online-934.html'
  if (/wicker/.test(command)) link = 'https://textpro.me/wicker-text-effect-online-932.html'
  if (/firework/.test(command)) link = 'https://textpro.me/firework-sparkle-text-effect-930.html'
  if (/skeleton/.test(command)) link = 'https://textpro.me/skeleton-text-effect-online-929.html'
  if (/blackpink/.test(command)) link = 'https://textpro.me/create-blackpink-logo-style-online-1001.html'
  if (/sand/.test(command)) link = 'https://textpro.me/write-in-sand-summer-beach-free-online-991.html'
  if (/glue/.test(command)) link = 'https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html'
  if (/1917/.test(command)) link = 'https://textpro.me/1917-style-text-effect-online-980.html'
  if (/leaves/.test(command)) link = 'https://textpro.me/natural-leaves-text-effect-931.html'
  let anu = await maker.textpro(link, text)
  xcaa.sendMessage(m.chat, { image: { url: anu }, caption: global.mess.sukses }, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Random
case 'jodohku': {
  if (!m.isGroup) return m.reply(mess.group)
  try {
  let member = participants.map(u => u.id)
  let me = m.sender
  let jodoh = member[Math.floor(Math.random() * member.length)]
  let jawab = `Jodoh Mu Adalah\n\n@${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}\n\nGaskeun Pepet Ae Ngap`
  let ments = [me, jodoh]
  let buttons = [{buttonId: 'jodohku', buttonText: {displayText: 'Jodohku' }, type: 1 }]
  xcaa.sendButtonText(m.chat, buttons, jawab, global.ownerName, m, {mentions: ments})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'jadian': {
  if (!m.isGroup) return m.reply(mess.group)
  try {
  let member = participants.map(u => u.id)
  let orang = member[Math.floor(Math.random() * member.length)]
  let jodoh = member[Math.floor(Math.random() * member.length)]
  let jawab = `Ehem Ada Yang Jadian Nih\n\n@${orang.split('@')[0]} ❤️ @${jodoh.split('@')[0]}\n\nBisa Kali Dapet Pajaknya`
  let menst = [orang, jodoh]
  let buttons = [{buttonId: 'jadian', buttonText: {displayText: 'Jadian' }, type: 1 }]
  xcaa.sendButtonText(m.chat, buttons, jawab, global.ownerName, m, {mentions: menst})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'beban': case 'bebangc': case 'bbngc': case 'bbn': {
  if (!m.isGroup) return m.reply(mess.group)
  try {
  let member = participants.map(u => u.id)
  let bn = member[Math.floor(Math.random() * member.length)]
  let jawab = `Mau Lihat Beban Group?${readmore}\n\n@${bn.split('@')[0]}`
  let menst = [bn]
  let buttons = [{buttonId: 'beban', buttonText: {displayText: 'Beban' }, type: 1 }]
  xcaa.sendButtonText(m.chat, buttons, jawab, global.ownerName, m, {mentions: ments})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'yatim': case 'ytem': case 'nggapunyabapak': {
  if (!m.isGroup) return m.reply(mess.group)
  try {
  let member = participants.map(u => u.id)
  let ytm = member[Math.floor(Math.random() * member.length)]
  let jawab = `Yahaha Yatim\n\n@${ytm.split('@')[0]}`
  let menst = [ytm]
  let buttons = [{buttonId: 'yatim', buttonText: {displayText: 'Yatim' }, type: 1 }]
  xcaa.sendButtonText(m.chat, buttons, jawab, global.ownerName, m, {mentions: menst})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'ganteng': {
  if (!m.isGroup) return m.reply(mess.group)
  try {
  let member = participants.map(u => u.id)
  let tng = member[Math.floor(Math.random() * member.length)]
  let jawab = `Ganteng Nih\n\n@${tng.split('@')[0]}\n\nYang Ciwi² Gas Pepet`
  let menst = [tng]
  let buttons = [{buttonId: 'ganteng', buttonText: {displayText: 'Ganteng' }, type: 1 }]
  xcaa.sendButtonText(m.chat, buttons, jawab, global.ownerName, m, {mentions: menst})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'cantik': {
  if (!m.isGroup) return m.reply(mess.group)
  try {
  let member = participants.map(u => u.id)
  let ctk = member[Math.floor(Math.random() * member.length)]
  let jawab = `Dede Gemes Nih\n\n@${ctk.split('@')[0]}\n\nYang Cwok Gas Pepet`
  let menst = [ctk]
  let buttons = [{buttonId: 'cantik', buttonText: {displayText: 'Cantik' }, type: 1 }]
  xcaa.sendButtonText(m.chat, buttons, jawab, global.ownerName, m, {mentions: menst})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'pinterest': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Naruto*`)
  m.reply(mess.wait)
  try {
  let anu = await pinterest(text)
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonspinterest = [{buttonId: `${prefix + command} ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}]
  xcaa.sendMessage(m.chat, { image: { url: result }, caption: 'Source Url : '+result, buttons: buttonspinterest }, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'wallpaper': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Naruto HD*`)
  m.reply(mess.wait)
  try {
  let anu = await wallpaper(text)
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonswallpaper = [{buttonId: `${prefix + command} ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}]
  xcaa.sendMessage(m.chat, { image: { url: result.image[0] }, caption: `Source Url : ${result.image[2] || result.image[1] || result.image[0]}`, buttons: buttonswallpaper }, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'quotesanime': {
  m.reply(mess.wait)
  try {
  let anu = await quotesAnime()
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonsquotes = [{buttonId: `${prefix + command}`, buttonText: {displayText: 'Next Quotes'}, type: 1}]
  xcaa.sendButtonText(m.chat, buttonsquotes, `${result.quotes}\n\nBy : ${result.karakter}`, global.ownerName, m)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'wikimedia': {
  if (!text) throw 'Masukkan Query Title'
  try {
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
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kucing': {
  m.reply(mess.wait)
  try {
  nnnyaa = fs.readFileSync('./lib/kucing.js');
  jsonData = JSON.parse(nnnyaa);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  cingall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: cingall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kucing'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'boneka': {
  m.reply(mess.wait)
  try {
  nyaa = fs.readFileSync('./lib/boneka.js');
  jsonData = JSON.parse(nyaa);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  boneall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: boneall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'boneka'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'couple': case 'ppcp': {
  m.reply(mess.wait)
  try {
  let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
  let random = anu[Math.floor(Math.random() * anu.length)]
  xcaa.sendMessage(m.chat, { image: { url: random.female }, caption: global.mess.sukses }, { quoted: m })
  let buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: 'Next Image'}, type: 1}]
  let buttonMessage = {
  image: { url: random.male },
  caption: global.mess.sukses,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'meme': {
  m.reply(mess.wait)
  try {
  nyaa = fs.readFileSync('./lib/meme.js');
  jsonData = JSON.parse(nyaa);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  memeall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: memeall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'meme'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'darkjokes': case 'darkjok': case 'darkjoke': {
  m.reply(mess.wait)
  try {
  nyyya = fs.readFileSync('./lib/darkjokes.js');
  jsonData = JSON.parse(nyyya);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  jokall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: jokall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'darkjokes'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'cowok': {
  m.reply(mess.wait)
  try {
  ennya = fs.readFileSync('./lib/cowok.js');
  jsonData = JSON.parse(ennya);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  wokall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: wokall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'cowok'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'cewek': {
  m.reply(mess.wait)
  try {
  nayyya = fs.readFileSync('./lib/cewek.js');
  jsonData = JSON.parse(nayyya);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  wekall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: wekall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'cewek'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'doraemon': {
  m.reply(mess.wait)
  try {
  natyya = fs.readFileSync('./lib/doraemon.js');
  jsonData = JSON.parse(natyya);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  emonall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: emonall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'doraemon'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'asupan': {
  m.reply(mess.wait)
  try {
  asupa = JSON.parse(fs.readFileSync('./lib/asupan.json'));
  hasil = pickRandom(asupa);
  let buttons = [
     {buttonId: 'asupan', buttonText: {displayText: 'Next Video'}, type: 1}
  ]
  let buttonMessage = {
  video: {url: hasil.url},
  caption: global.mess.sukses,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, {quoted: m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Downloader
case 'play': case 'ytplay': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Sholawat Ibadahallah*`)
  m.reply(mess.wait)
  try {
  let yts = require("yt-search")
  let search = await yts(text)
  let hasil = search.videos[Math.floor(Math.random() * search.videos.length)]
  let buttons = [
     {buttonId: `ytmp3 ${hasil.url}`, buttonText: {displayText: 'Audio'}, type: 1}, 
     {buttonId: `ytmp4 ${hasil.url}`, buttonText: {displayText: 'Video'}, type: 1}
  ]
  let buttonMessage = {
  image: { url: hasil.thumbnail },
  caption: `╭ *Title :* ${hasil.title}\n├ *Duration :* ${hasil.timestamp}\n├ *Viewers :* ${hasil.views}\n├ *Upload :* ${hasil.ago}\n├ *Channel :* ${hasil.author.url}\n└ *Url :* ${hasil.url}`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'yts': case 'ytsearch': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Dj 30 Detik*`)
  m.reply(mess.wait)
  try {
  let yts = require("yt-search")
  let search = await yts(text)
  let teks = '╭「 *Data Diproleh* 」\n└ Keywords : '+text+'\n\n'
  let no = 1
  for (let i of search.all) {
  teks += `╭ No : ${no++}\n├ Type : ${i.type}\n├ Video ID : ${i.videoId}\n├ Title : ${i.title}\n├ Views : ${i.views}\n├ Duration : ${i.timestamp}\n├ Upload : ${i.ago}\n├ Author : ${i.author.name}\n└ Url : ${i.url}\n\n────────────\n\n`
  }
  xcaa.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'ytmp4': {
  if (!text) return m.reply(`Contoh : ${prefix + command} Linknya`)
  if (!isUrl(text)) return m.reply(`Contoh : ${prefix + command} Linknya`)
  if (!text.includes('youtu.be') && !text.includes('youtube.com')) return m.reply('*Pastikan Link Sudah Benar*')
  m.reply(mess.wait)
  xfar.Youtube(text).then(data => {
  xcaa.sendMessage(m.chat, { video: { url: data.medias[1].url }, caption: global.mess.sukses}, { quoted: m })
  })
  }
  break
case 'ytmp3': {
  if (!text) return m.reply(`Contoh : ${prefix + command} Linknya`)
  if (!isUrl(text)) return m.reply(`Contoh : ${prefix + command} Linknya`)
  if (!text.includes('youtu.be') && !text.includes('youtube.com')) return m.reply('*Pastikan Link Sudah Benar*')
  m.reply(mess.wait)
  y2mateA(text).then(data => {
  xcaa.sendMessage(m.chat, { audio: { url: data[1].link }, mimetype: 'audio/mp3', ptt: false }, { quoted: m })
  })
  }
  break
case 'twitter': case 'twdl': case 'twmp4': {
  if (!args[0]) return m.reply(`*Contoh : ${prefix + command} Linknya*`)
  m.reply(mess.wait)
  try {
  let lotwit = await aiovideodl(args[0])
  let tekks = `╭ *Caption :* ${lotwit.title ? lotwit.title : "undefined"}\n├ *Type :* ${lotwit.medias[1].extension}\n├ *Size :* ${lotwit.medias[1].formattedSize}\n└ *Link :* ${lotwit.medias[1].url}`
  let buttons = [
     {buttonId: `twddl ${lotwit.medias[0].url}`, buttonText: {displayText: `Kualitas ${lotwit.medias[0].quality}`}, type: 1},
     {buttonId: `twddl ${lotwit.medias[2].url}`, buttonText: {displayText: `Kualitas ${lotwit.medias[2].quality}`}, type: 1}
  ]
  let buttonMessage = {
  video: {url:lotwit.medias[1].url},
  caption: tekks,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, {quoted:m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'twddl': {
  try {
  xcaa.sendMessage(m.chat, {video: {url: args[0]}, mimetype:"video/mp4", caption: global.mess.sukses}, {quoted: m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'facebook': case 'fbdl': case 'fbmp4': case 'fb': {
  if (!args[0]) return m.reply(`*Contoh : ${prefix + command} Linknya*`)
  try {
  let resd = await aiovideodl(args[0])
  let tekss = `╭ *Type :* video/${resd.medias[0].extension}\n├ *Quality :* ${resd.medias[0].quality}\n└ *Size :* ${resd.medias[0].formattedSize}`
  let buttons = [
     {buttonId: `fbddl ${resd.medias[1].url}`, buttonText: {displayText: 'Kualitas HD'}, type: 1}
  ]
  let buttonMessage = {
  video: {url:resd.medias[0].url},
  caption: tekss,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  xcaa.sendMessage(m.chat, buttonMessage, {quoted:m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'fbddl': {
  try {
  xcaa.sendMessage(m.chat, {video:{url:args[0]}, mimetype:"video/mp4", caption: global.mess.sukses}, {quoted: m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'mediafire': case 'mdf': {
  if (!args[0]) return m.reply(`*Contoh : ${prefix + command} Linknya*`)
  if (!isUrl(args[0])) return m.reply("Urlnya Mana?")
  try {
  let fmedi = await mediafire(args[0])
  teksss = `╭ Name : ${fmedi[0].name}\n├ MimeType : application/${fmedi[0].mime}\n├ Size : ${fmedi[0].size}\n└ Link : ${fmedi[0].link}`
  m.reply(teksss)
  xcaa.sendMessage(m.chat, {document: {url: fmedi[0].link}, mimetype: fmedi[0].mime, fileName: fmedi[0].name}, {quoted: m})
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'igdl': case 'instagram': case 'ig': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Linknya*`)
  if (!isUrl(args[1])) return m.reply(mess.error)
  if (!text.includes('instagram.com')) return m.reply(mess.error)
  m.reply(mess.wait)
  igDownloader(text).then( data => {
  for (let i of data.medias) {
  if (i.extension === "mp4") {
  xcaa.sendMessage(m.chat, { video: { url: i.result.link }, mimetype: "video/mp4", caption: global.mess.sukses}, {quoted: m})
  } else if (i.extension === "jpg") {
  xcaa.sendMessage(m.chat, { image: { url: i.result.link }, caption: global.mess.sukses}, {quoted: m})
  }
  }
  })
  }
  break
//Tools
case 'get': {
  if (!args[0]) return m.reply(`*Contoh : ${prefix + command} Linknya*`)
  if (!isUrl(text)) return m.reply(`*Contoh : ${prefix + command} Linknya*`)
  try {
  let gts = await fetchJson(args.join(" "))
  m.reply(gts)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'translate': case 'terjemahan': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} Teks*`)
  try {
  tes = await fetchJson(`https://megayaa.herokuapp.com/api/translate?to=id&kata=${text}`)
  ipo = tes.info
  dtk = tes.translate
  m.reply(`╭ Translate : ${dtk}\n└ Hasil : ${ipo}`)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'volumereq': {
  if (!args.join(" ")) return m.reply(`*Contoh : ${prefix + command} 10*`)
  try {
  media = await xcaa.downloadAndSaveMediaMessage(quoted, "volume")
  if (/audio/.test(mime)) {
  rname = getRandom('.mp3')
  exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(mess.error)
  jadie = fs.readFileSync(rname)
  xcaa.sendMessage(m.chat, {audio:jadie, mimetype: 'audio/mp4', ptt: false}, {quoted: m})
  fs.unlinkSync(rname)
  })
  } else if (/video/.test(mime)) {
  rname = getRandom('.mp4')
  exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(mess.error)
  jadie = fs.readFileSync(rname)
  xcaa.sendMessage(m.chat, {video: jadie, mimetype: 'video/mp4', caption: global.mess.sukses}, {quoted: m})
  fs.unlinkSync(rname)
  })
  } else {
  m.reply("Kirim video/audio")
  }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'bassreq': {
  if (!args.join(" ")) return m.reply(`*Contoh : ${prefix + command} 10*`)
  var req = args.join(' ')
  media = await xcaa.downloadAndSaveMediaMessage(quoted, "bass")
  if (/audio/.test(mime)) {
  ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} -af equalizer=f=${req}:width_type=o:width=2:g=20 ${ran}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(mess.error)
  hah = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, {audio:hah, mimetype: 'audio/mp4', ptt: false}, {quoted: m})
  fs.unlinkSync(ran)
  })
  } else if (/video/.test(mime)) {
  ran = getRandom('.mp4')
  exec(`ffmpeg -i ${media} -af equalizer=f=${req}:width_type=o:width=2:g=20 ${ran}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(mess.error)
  hah = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, {video: hah, mimetype: 'video/mp4', caption: global.mess.sukses}, {quoted: m})
  fs.unlinkSync(ran)
  })
  } else {
  m.reply("Kirim video/audio")
  }
  }
  break
case 'temporeq': {
  if (!args.join(" ")) return m.reply(`*Contoh : ${prefix + command} 10*`)
  var req = args.join(' ')
  media = await xcaa.downloadAndSaveMediaMessage(quoted, "tempo")
  if (/audio/.test(mime)) {
  ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(mess.error)
  hah = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, {audio:hah, mimetype:'audio/mp4', ptt: false}, {quoted:m})
  fs.unlinkSync(ran)
  })
  } else if (/video/.test(mime)) {
  ran = getRandom('.mp4')
  exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
  fs.unlinkSync(media)
  if (err) return m.reply(mess.error)
  hah = fs.readFileSync(ran)
  xcaa.sendMessage(m.chat, {video: hah, mimetype:'video/mp4', caption: global.mess.sukses}, {quoted:m})
  fs.unlinkSync(ran)
  })
  } else {
  m.reply("Kirim video/audio")
  }
  }
  break
//Database
case 'setcmd': {
  if (!m.quoted) return m.reply('*Reply Sticker!*')
  if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
  if (!text) return m.reply(`Untuk Command Apa?`)
  let hash = m.quoted.fileSha256.toString('base64')
  if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) throw 'You have no permission to change this sticker command'
  global.db.data.sticker[hash] = {
    text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: + new Date,
    locked: false,
  }
  m.reply(mess.sukses)
  }
  break
case 'delcmd': {
  let hash = m.quoted.fileSha256.toString('base64')
  if (!hash) throw `Tidak ada hash`
  if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) throw 'You have no permission to delete this sticker command'              
  delete global.db.data.sticker[hash]
  m.reply(mess.sukses)
  }
  break
case 'listcmd': {
  let teks = `*List Hash*\nInfo: *bold* hash is Locked\n${Object.entries(global.db.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}`.trim()
  xcaa.sendText(m.chat, teks, m, { mentions: Object.values(global.db.data.sticker).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], []) })
  }
  break
case 'lockcmd': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!m.quoted) return m.reply('*Reply Sticker!*')
  if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
  let hash = m.quoted.fileSha256.toString('base64')
  if (!(hash in global.db.data.sticker)) throw 'Hash not found in database'
  global.db.data.sticker[hash].locked = !/^un/i.test(command)
  m.reply(mess.sukses)
  }
  break
case 'addmsg': {
  if (!m.quoted) return m.reply('*Reply Message!*')
  if (!text) return m.reply(`*Contoh : ${prefix + command} FileName*`)
  let msgs = global.db.database
  if (text.toLowerCase() in msgs) throw `'${text}' telah terdaftar di list pesan`
  msgs[text.toLowerCase()] = quoted.fakeObj
  let buttons = [
      {buttonId: `${prefix}listmsg`, buttonText: {displayText: 'List Message'}, type: 1}
  ]
  let buttonMessage = {
  document: global.thumb2,
  fileName: 'RoF3X-BoT',
  mimetype: 'application/docx',
  fileLength: 0,
  jpegThumbnail: global.thumb2,
  caption: `Sukses Menambah List Pesan Sebagai : *${text}*\n\nAkses dengan ${prefix}getmsg ${text}\nAtau Klik Tombol Dibawah\n\nLihat List Pesan Dengan ${prefix}listmsg`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4,
  contextInfo:{forwardingScore: 999999, isForwarded: true, externalAdReply: {title: `Hai ${pushname}`, body: `${wib}`, previewType: "PHOTO", thumbnailUrl: ``, thumbnail: global.thumb2, sourceUrl: global.linkgc}}
  }
  xcaa.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
  }
  break
case 'getmsg': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} FileName\n\nLihat list pesan dengan ${prefix}listmsg*`)
  let msgs = global.db.database
  if (!(text.toLowerCase() in msgs)) throw `'${text}' tidak terdaftar di list pesan`
  xcaa.copyNForward(m.chat, msgs[text.toLowerCase()], true)
  }
  break
case 'listmsg': case 'listmess': case 'listmes': case 'listmessage': {
  try {
  let msgs = JSON.parse(fs.readFileSync('./storage/db.json'))
  let seplit = Object.entries(global.db.database).map(([nama, isi]) => { return { nama, ...isi } })
  listMsgs = []
  for (let i of seplit) {
  listMsgs.push({title: `${i.nama}`, rowId: `${i.nama}`, description: `${getContentType(i.message).replace(/Message/i, '')}`})
  }
  const sections = [
  {title: "Total Message " + seplit.length, rows: listMsgs}
  ]
  const listMessage = {
  text: "Silahkan Klik Dibawah, Untuh Melihat List Respon Message",
  footer: global.ownerName,
  title: "「 List Respon Message 」",
  buttonText: "List Message",
  sections,
  contextInfo:{forwardingScore: 999999, isForwarded: true, externalAdReply: {title: `Hai ${pushname}`, body: `${wib}`, previewType: "PHOTO", thumbnailUrl: ``, thumbnail: global.thumb2, sourceUrl: global.linkgc}}
  }
  xcaa.sendMessage(m.chat, listMessage, {quoted: ftroli})
  } catch {
  m.reply(`Belum ada respon message yang ditambahkan dalam list`)
  }
  }
  break
case 'delmsg': case 'deletemsg': {
  let msgs = global.db.database
  if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' tidak terdaftar didalam list pesan`)
  delete msgs[text.toLowerCase()]
  m.reply(`Berhasil menghapus '${text}' dari list pesan`)
  }
  break
//Islamic
  case 'iqra': {
  if (!text) return m.reply(`*Contoh : ${prefix + command} 3\n\nIQRA Yang tersedia : 1, 2, 3, 4, 5, 6*`)
  try {
  bufft = await getBuffer(`https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${text}`)
  xcaa.sendMessage(m.chat, {document: bufft, mimetype: 'application/pdf', fileName: `iqra${text}.pdf`}, {quoted: m}).catch ((err) => m.reply(`Contoh : ${prefix + command} 1\n\nIQRA Yang tersedia : 1, 2, 3, 4, 5, 6`))
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'juzamma': {
  try {
  if (args[0] === 'pdf') {
  m.reply(mess.wait)
  xcaa.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pdf'}, mimetype: 'application/pdf', fileName: 'juz-amma-arab-latin-indonesia.pdf'}, {quoted:m})
  } else if (args[0] === 'docx') {
  m.reply(mess.wait)
  xcaa.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.docx'}, mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', fileName: 'juz-amma-arab-latin-indonesia.docx'}, {quoted:m})
  } else if (args[0] === 'pptx') {
  m.reply(mess.wait)
  xcaa.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pptx'}, mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', fileName: 'juz-amma-arab-latin-indonesia.pptx'}, {quoted:m})
  } else if (args[0] === 'xlsx') {
  m.reply(mess.wait)
  xcaa.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.xlsx'}, mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName: 'juz-amma-arab-latin-indonesia.xlsx'}, {quoted:m})
  } else {
  m.reply(`*Contoh : ${prefix + command} pdf/docx/pptx/xlsx*`)
  }
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'hadis': case 'hadist': {
  if (!args[0]) return m.reply(`*Contoh :
${prefix + command} muslim 1

Pilihan Tersedia :

abu-daud
1 - 4590
ahmad
1 - 26363
bukhari
1 - 7008
darimi
1 - 3367
ibu-majah
1 - 4331
nasai
1 - 5662
malik
1 - 1594
muslim
1 - 5362*`)
  if (!args[1]) throw `Contoh : ${prefix + command} muslim 1`
  try {
  let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`)
  let { number, arab, id } = res.find(v => v.number == args[1])
  m.reply(`No. ${number}\n\n${arab}\n\n${id}`)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'alquran': {
  if (!args[0]) return m.reply(`*Contoh : ${prefix + command} 1 2\nMaka hasilnya surah Al-Fatihah ayat 2 beserta audionya*`)
  if (!args[1]) return m.reply(`*Contoh : ${prefix + command} 1 2\nMaka hasilnya surah Al-Fatihah ayat 2 beserta audionya*`)
  try {
  let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
  let txt = `「 *Al-Qur'an* 」

*Arab* : ${res.result.data.text.arab}

*English* : ${res.result.data.translation.en}

*Indonesia* : ${res.result.data.translation.id}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
  m.reply(txt)
  xcaa.sendMessage(m.chat, {audio: { url: res.result.data.audio.primary }, mimetype: 'audio/mpeg'}, { quoted : m })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'tafsirsurah': {
  if (!args[0]) return m.reply(`*Contoh : ${prefix + command} 1 2\nMaka hasilnya tafsir surah Al-Fatihah ayat 2*`)
  if (!args[1]) return m.reply(`*Contoh : ${prefix + command} 1 2\nMaka hasilnya tafsir surah Al-Fatihah ayat 2*`)
  try {
  let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
  let txt = `「 *Tafsir Surah*  」

*Pendek* : ${res.result.data.tafsir.id.short}

*Panjang* : ${res.result.data.tafsir.id.long}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
  m.reply(txt)
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Anime
case 'cry': case 'kill': case 'hug': case 'pat': case 'lick':
case 'kiss': case 'bite': case 'yeet': case 'neko': case 'bully':
case 'bonk': case 'wink': case 'poke': case 'nom': case 'slap':
case 'waifu': case 'smile': case 'wave': case 'awoo': case 'blush':
case 'smug': case 'glomp': case 'happy': case 'dance': case 'cringe':
case 'cuddle': case 'highfive': case 'shinobu': case 'megumin': case 'handhold': {
  m.reply(mess.wait)
  try {
  axios.get(`https://api.waifu.pics/sfw/${command}`)
  .then(({data}) => {
  xcaa.sendFile(m.chat, data.url, global.mess.sukses, m)
  })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'akira': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/akira.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'akira'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'akiyama': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/akiyama.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'akiyama'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'ana': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/ana.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'ana'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'asuna': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/asuna.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'asuna'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'ayuzawa': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/ayuzawa.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'ayuzawa'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'boruto': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/boruto.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'boruto'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'chitoge': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/chitoge.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'chitoge'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'deidara': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/deidara.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'deidara'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'elaina': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/elaina.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'elaina'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'emilia': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/emilia.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'emilia'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'erza': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/erza.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'erza'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'gremory': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/gremory.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'gremory'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'hestia': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/hestia.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'hestia'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'hinata': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/hinata.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'hinata'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'inori': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/inori.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'inori'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'isuzu': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/isuzu.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'isuzu'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'itachi': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/itachi.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'itachi'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'itori': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/itori.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'itori'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kaga': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/kaga.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kaga'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kagura': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/kagura.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kagura'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kakasih': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/kakasih.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kakasih'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kaori': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/kaori.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kaori'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'keneki': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/keneki.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'keneki'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kotori': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/kotori.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kotori'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'kurumi': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/kurumi.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'kurumi'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'madara': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/madara.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'madara'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'mikasa': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/mikasa.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'mikasa'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'minato': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/minato.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'minato'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'naruto': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/naruto.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'naruto'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'nezuko': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/nezukoi.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'nezuko'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'onepiece': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/onepiece.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'onepiece'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'pokemon': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/pokemon.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'pokemon'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'rize': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/rize.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'rize'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'sakura': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/sakura.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'sakura'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'sagiri': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/sagiri.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'sagiri'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'sasuke': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/sasuke.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'sasuke'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'shina': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/shina.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'shina'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'shinka': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/shinka.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'shinka'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'shizuka': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/shizuka.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'shizuka'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'shota': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/shota.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'shota'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'toukachan': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/toukachan.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'toukachan'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'tsunade': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/tsunade.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'tsunade'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
case 'yuki': {
  m.reply(mess.wait)
  try {
  jri = fs.readFileSync('./lib/yuki.js');
  jsonData = JSON.parse(jri);
  randIndex = Math.floor(Math.random() * jsonData.length);
  randKey = jsonData[randIndex];
  roall = await getBuffer(randKey.result)
  let message = await prepareWAMessageMedia({ image: roall }, { upload: xcaa.waUploadToServer })
  const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
   templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: global.mess.sukses,
    hydratedFooterText: global.ownerName,
     hydratedButtons: [{
     callButton: {
       displayText: 'Number Owner',
       phoneNumber: '+6283815956151'
     }
  }, {
     quickReplyButton: {
       displayText: 'Next Image',
       id: 'yuki'
     }
    }]
   }
  }
  }), { userJid: m.chat, quoted: m })
  xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
  } catch (err) {
  m.reply(mess.error)
  }
  }
  break
//Eval
default:
if (budy.startsWith('=>')) {
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
if (budy.startsWith('>')) {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
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
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  exec(budy.slice(2), (err, stdout) => {
  if(err) return m.reply(err)
  if (stdout) return m.reply(stdout)
  })
  }
if (isCmd && budy.toLowerCase() != undefined) {
  if (m.chat.endsWith('broadcast')) return
  if (m.isBaileys) return
  let msgs = global.db.database
  if (!(budy.toLowerCase() in msgs)) return
  xcaa.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
  }

  } // switch
  } /* try*/catch (err) {
    console.log(util.format(err))
  }
} // module


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
