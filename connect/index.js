/*
  •> Script By FxSx
  •> Ini Sc Bot Masih Beta Dari Multi Device [Baileys]
  •> Jika Fitur Ada Yang Error Harap Maklumin Saja
  •> Dan Jangan Hapus Nama Yang Punya Script!
*/
require('../settings')
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, AnyMessageContent, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const cfonts = require('cfonts')
const axios = require('axios')
const FileType = require('file-type')
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const {Boom} = require("@hapi/boom")

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('../lib/myfunc')
const { state, saveState } = useSingleFileAuthState(`./${global.sessionName}.json`)

const store = makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) })

const ddate = moment.tz('Asia/Jakarta').format('DD/MM/YY')
// Starting BoT
async function startR(){
    cfonts.say('R O F 3 X',{
       font: 'block',
       gradient: ['red','magenta'],
       align: 'center'
    })
    cfonts.say('Whatsapp Bot By FxSx',{
       font: 'console',
       gradient: ['red','magenta'],
       align: 'center'
    })

    try{
    const xcaa = makeWASocket({
       logger: pino({ level: 'silent' }),
       printQRInTerminal: true,
       browser: ["RoF3X-MD", "Safari", "3.0"],
       auth: state
    })

    store.bind(xcaa.ev)
    
    xcaa.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    let rof = await xcaa.sendContact(callerId, global.ownerNumber)
    xcaa.sendMessage(callerId, { text: `Sistem Block Otomatis\nJangan Menelpon Bot!,\nJika Memang Tidack Disengaja Hubungi Owner`}, { quoted : rof })
    await sleep(8000)
    await xcaa.updateBlockStatus(callerId, "block")
    }
    })

    xcaa.ev.on('messages.upsert', async chatUpdate => {
    try {
       mek = chatUpdate.messages[0]
       if (!mek.message) return
       mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
       if (mek.key && mek.key.remoteJid === 'status@broadcast') return
       if (!xcaa.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
       if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
       m = smsg(xcaa, mek, store)
       require("../command/xcaa.js")(xcaa, m, chatUpdate, store)
      } catch (err) {
       console.log(err)
     }
    })

    //Group Update
    xcaa.ev.on('group-participants.update', async (anu) => {
    console.log(anu)
    try {
    let metadata = await xcaa.groupMetadata(anu.id)
    let participants = anu.participants
    for (let num of participants) {
    try {
       ppuser = await xcaa.profilePictureUrl(num, 'image') 
    } catch {
       ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
    }
    if (anu.action == 'add') {
    let butff = fs.readFileSync('./media/wellcom.mp3')
    teks1 = `Welcome @${num.split("@")[0]} 👋`
    xcaa.sendMessage(anu.id, {audio: butff, ptt:true, contextInfo: { mentionedJid: [num], mimetype: "audio/mp4", "forwardingScore": 1000000000, isForwarded: true, sendEphemeral: true, externalAdReply: {"title": teks1, "body": `${ddate}`, "previewType": "PHOTO", "thumbnailUrl": {url: ppuser}, "thumbnail": {url: ppuser}, "sourceUrl": "https://wa.me/6283818221226"}}})
    } else if (anu.action == 'remove') {
    teksbye = `Sayonara @${num.split("@")[0]} 👋`
    xcaa.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: teksbye })
    }
    }
    } catch (err) {
      console.log(err)
    }
    })

    //add detek pesan react emoji by FERDIZ AFK
    const _0x533233=_0x493e;function _0x493e(_0x361483,_0x3a2200){const _0x2bd6d5=_0x2bd6();return _0x493e=function(_0x493e61,_0x5ab4d8){_0x493e61=_0x493e61-0xb7;let _0x1314dc=_0x2bd6d5[_0x493e61];return _0x1314dc;},_0x493e(_0x361483,_0x3a2200);}function _0x2bd6(){const _0x5ccc35=['messages.reaction','738456BeZqHt','1679270umtHpU','error\x20di\x20funtion\x20detek\x20pesan\x20react\x20::\x20\x20','sendMessage','\x20REACTION\x20】*\x0a\x0a*_Tagged:_*\x20@','ADD','user','split','133yhCKVN','participant','7352802ScVvdo','BAE5','text','208612IXTkvd','add','@g.us','66qDKhyJ','reaction','remoteJid','length','decodeJid','operation','255832MTZbGb','loadMessage','12750930TwDhpO','10MBJMeV','startsWith','fromMe','endsWith','6137755xvktoA','key'];_0x2bd6=function(){return _0x5ccc35;};return _0x2bd6();}(function(_0x393624,_0x20da0e){const _0x1b4fab=_0x493e,_0x218e30=_0x393624();while(!![]){try{const _0x2b16d0=parseInt(_0x1b4fab(0xc1))/0x1+parseInt(_0x1b4fab(0xc2))/0x2+-parseInt(_0x1b4fab(0xd1))/0x3*(-parseInt(_0x1b4fab(0xce))/0x4)+parseInt(_0x1b4fab(0xbe))/0x5+-parseInt(_0x1b4fab(0xcb))/0x6+parseInt(_0x1b4fab(0xc9))/0x7*(-parseInt(_0x1b4fab(0xb7))/0x8)+parseInt(_0x1b4fab(0xb9))/0x9*(-parseInt(_0x1b4fab(0xba))/0xa);if(_0x2b16d0===_0x20da0e)break;else _0x218e30['push'](_0x218e30['shift']());}catch(_0x15b0d4){_0x218e30['push'](_0x218e30['shift']());}}}(_0x2bd6,0xabac2),xcaa['ev']['on'](_0x533233(0xc0),async _0x4cd027=>{const _0x5229bc=_0x533233;try{conn=xcaa;if(_0x4cd027[_0x5229bc(0xd2)]['key']['id'][_0x5229bc(0xbb)](_0x5229bc(0xcc))&&_0x4cd027[_0x5229bc(0xd2)]['key']['id'][_0x5229bc(0xd4)]===0x10)return;let _0x3dcb87=await store[_0x5229bc(0xb8)](_0x4cd027[_0x5229bc(0xd2)][_0x5229bc(0xbf)][_0x5229bc(0xd3)],_0x4cd027[_0x5229bc(0xbf)]['id'],conn),_0x552cdb=_0x4cd027['reaction'][_0x5229bc(0xbf)][_0x5229bc(0xd3)][_0x5229bc(0xbd)](_0x5229bc(0xd0))?_0x4cd027[_0x5229bc(0xd2)][_0x5229bc(0xbf)][_0x5229bc(0xca)]:_0x4cd027[_0x5229bc(0xd2)]['key']['remoteJid'],_0x55acf9=_0x4cd027[_0x5229bc(0xbf)][_0x5229bc(0xd3)][_0x5229bc(0xbd)](_0x5229bc(0xd0))?_0x4cd027['key'][_0x5229bc(0xca)]:_0x4cd027[_0x5229bc(0xbf)][_0x5229bc(0xd3)];await xcaa[_0x5229bc(0xc4)](_0x4cd027[_0x5229bc(0xd2)][_0x5229bc(0xbf)][_0x5229bc(0xd3)],{'text':'*【\ufeff\x20'+(_0x4cd027[_0x5229bc(0xd6)]==_0x5229bc(0xcf)?_0x5229bc(0xc6):'DELETE')+_0x5229bc(0xc5)+(_0x4cd027[_0x5229bc(0xd2)][_0x5229bc(0xbf)][_0x5229bc(0xbc)]?xcaa[_0x5229bc(0xd5)](xcaa[_0x5229bc(0xc7)]['id']):xcaa[_0x5229bc(0xd5)](_0x552cdb))[_0x5229bc(0xc8)]('@')[0x0]+'\x0a*_To:_*\x20'+(_0x55acf9?'@'+_0x55acf9['split']('@')[0x0]:'-')+'\x0a*_Emoji:_*\x20'+(_0x4cd027['operation']==_0x5229bc(0xcf)?_0x4cd027[_0x5229bc(0xd2)][_0x5229bc(0xcd)]:'-'),'withTag':!![],'mentions':[_0x4cd027[_0x5229bc(0xd2)][_0x5229bc(0xbf)][_0x5229bc(0xca)],_0x4cd027[_0x5229bc(0xbf)][_0x5229bc(0xca)]]},{'quoted':_0x3dcb87});}catch(_0x2e28a3){console['log'](JSON['stringify'](_0x5229bc(0xc3)+_0x2e28a3,undefined,0x2));}})); // Script Bot By FxSx

    xcaa.decodeJid = (jid) => {
       if (!jid) return jid
       if (/:\d+@/gi.test(jid)) {
       let decode = jidDecode(jid) || {}
       return decode.user && decode.server && decode.user + '@' + decode.server || jid
      } else return jid
    }
    
    xcaa.ev.on('contacts.update', update => {
       for (let contact of update) {
       let id = xcaa.decodeJid(contact.id)
       if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
      }
    })

    xcaa.getName = (jid, withoutContact  = false) => {
       id = xcaa.decodeJid(jid)
       withoutContact = xcaa.withoutContact || withoutContact 
       let v
       if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
       v = store.contacts[id] || {}
       if (!(v.name || v.subject)) v = xcaa.groupMetadata(id) || {}
       resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
       })
       else v = id === '0@s.whatsapp.net' ? {
       id,
       name: 'WhatsApp'
       } : id === xcaa.decodeJid(xcaa.user.id) ?
       xcaa.user :
       (store.contacts[id] || {})
       return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
   
     xcaa.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
        list.push({
        displayName: 'Owner Bot',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await xcaa.getName(i + '@s.whatsapp.net')}\nFN:${await xcaa.getName(i + '@s.whatsapp.net')}\nNICKNAME:Kalo Chat Bot Jangan Spam Bang\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.ADR:;;Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD`
       })
      }
     xcaa.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }

    xcaa.setStatus = (status) => {
       xcaa.query({
          tag: 'iq',
          attrs: {
          to: '@s.whatsapp.net',
          type: 'set',
          xmlns: 'status',
       },
       content: [{
          tag: 'status',
          attrs: {},
          content: Buffer.from(status, 'utf-8')
        }]
      })
     return status
    }

    xcaa.public = true

    xcaa.serializeM = (m) => smsg(xcaa, m, store)
    
    //Connection Active
    xcaa.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startR(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startR(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startR(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startR(); }
            else xcaa.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        console.log('Connected...', update)
    })

    xcaa.ev.on('creds.update', saveState)

    // Send File
    xcaa.sendFile = async (jid, url, caption, quoted, options = {}) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
    return xcaa.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
    }
    let type = mime.split("/")[0]+"Message"
    if(mime === "application/pdf"){
    return xcaa.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
    }
    if(mime.split("/")[0] === "image"){
    return xcaa.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
    }
    if(mime.split("/")[0] === "video"){
    return xcaa.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
    }
    if(mime.split("/")[0] === "audio"){
    return xcaa.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
    }
    }

    // Send List Message
    xcaa.sendList = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
    let sections = sects
    var listMes = {
    text: text,
    footer: footer,
    title: title,
    buttonText: butText,
    sections
    }
    xcaa.sendMessage(jid, listMes, { quoted: quoted })
    }

    // Send Button 5 Document
    xcaa.sendButtonDocumen = (jid, text = '' , footer = '', but = [], quoted = {}) => {
    let templateButtons = but
    var templateMessage = {
    document: global.thumb,
    fileName: 'RoF3X-BoT',
    mimetype: 'application/pptx',
    fileLength: 0,
    jpegThumbnail: global.thumb,
    caption: text,
    footer: footer,
    templateButtons: templateButtons
    }
    xcaa.sendMessage(jid, templateMessage)
    }

    // Send Button 5 Image
    xcaa.sendButtonImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
    let message = await prepareWAMessageMedia({ image: img }, { upload: xcaa.waUploadToServer })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
    templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    "hydratedContentText": text,
    "hydratedFooterText": footer,
    "hydratedButtons": but
    }
    }
    }), options)
    xcaa.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    // Send Button 5 Video
    xcaa.sendButtonVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
    let message = await prepareWAMessageMedia({ video: vid }, { upload: xcaa.waUploadToServer })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
    templateMessage: {
    hydratedTemplate: {
    videoMessage: message.videoMessage,
    "hydratedContentText": text,
    "hydratedFooterText": footer,
    "hydratedButtons": but
    }
    }
    }), options)
    xcaa.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    // Send Button 5 Gif
    xcaa.sendButtonGif = async (jid , text = '' , footer = '', gif, but = [], options = {}) =>{
    let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: xcaa.waUploadToServer })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
    templateMessage: {
    hydratedTemplate: {
    videoMessage: message.videoMessage,
    "hydratedContentText": text,
    "hydratedFooterText": footer,
    "hydratedButtons": but
    }
    }
    }), options)
    xcaa.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    // Send Button Text
    xcaa.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
    let buttonMessage = {
    text,
    footer,
    buttons,
    headerType: 2,
    ...options
    }
    xcaa.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
     
    // Send Text
    xcaa.sendText = (jid, text, quoted = '', options) => xcaa.sendMessage(jid, { text: text, ...options }, { quoted })

    // Send Image
    xcaa.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await xcaa.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
    
    // Send Video
    xcaa.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await xcaa.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    // Send Audio
    xcaa.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await xcaa.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    // Send Text With Mentions
    xcaa.sendTextWithMentions = async (jid, text, quoted, options = {}) => xcaa.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    // Send Image As Sticker
    xcaa.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    buffer = await writeExifImg(buff, options)
    } else {
    buffer = await imageToWebp(buff)
    }
    await xcaa.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    }

    // Send Video As Sticker
    xcaa.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    buffer = await writeExifVid(buff, options)
    } else {
    buffer = await videoToWebp(buff)
    }
    await xcaa.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    }
    
    // Download And Save Media Message
    xcaa.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
    }
    xcaa.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
    }
    
    // Send Media
    xcaa.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
    let types = await xcaa.getFile(path, true)
    let { mime, ext, res, data, filename } = types
    if (res && res.status !== 200 || file.length <= 65536) {
    try { throw { json: JSON.parse(file.toString()) } }
    catch (e) { if (e.json) throw e.json }
    }
    let type = '', mimetype = mime, pathFile = filename
    if (options.asDocument) type = 'document'
    if (options.asSticker || /webp/.test(mime)) {
    let { writeExif } = require('./lib/exif')
    let media = { mimetype: mime, data }
    pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
    await fs.promises.unlink(filename)
    type = 'sticker'
    mimetype = 'image/webp'
    }
    else if (/image/.test(mime)) type = 'image'
    else if (/video/.test(mime)) type = 'video'
    else if (/audio/.test(mime)) type = 'audio'
    else type = 'document'
    await xcaa.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
    return fs.promises.unlink(pathFile)
    }
    
    // Copy N Forward
    xcaa.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
    message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
    vtype = Object.keys(message.message.viewOnceMessage.message)[0]
    delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
    delete message.message.viewOnceMessage.message[vtype].viewOnce
    message.message = {
    ...message.message.viewOnceMessage.message
    }
    }
    let mtype = Object.keys(message.message)[0]
    let content = await generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = {}
    if (mtype != "conversation") context = message.message[mtype].contextInfo
    content[ctype].contextInfo = {
    ...context,
    ...content[ctype].contextInfo
    }
    const waMessage = await generateWAMessageFromContent(jid, content, options ? {
    ...content[ctype],
    ...options,
    ...(options.contextInfo ? {
    contextInfo: {
    ...content[ctype].contextInfo,
    ...options.contextInfo
    }
    } : {})
    } : {})
    await xcaa.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
    return waMessage
    }
    
    // C Mod
    xcaa.cMod = (jid, copy, text = '', sender = xcaa.user.id, options = {}) => {
    let mtype = Object.keys(copy.message)[0]
    let isEphemeral = mtype === 'ephemeralMessage'
    if (isEphemeral) {
    mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
    let content = msg[mtype]
    if (typeof content === 'string') msg[mtype] = text || content
    else if (content.caption) content.caption = text || content.caption
    else if (content.text) content.text = text || content.text
    if (typeof content !== 'string') msg[mtype] = {
    ...content,
    ...options
    }
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
    else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
    copy.key.remoteJid = jid
    copy.key.fromMe = sender === xcaa.user.id
    return proto.WebMessageInfo.fromObject(copy)
    }
    
    // Get File
    xcaa.getFile = async (PATH, save) => {
    let res
    let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
    let type = await FileType.fromBuffer(data) || {
    mime: 'application/octet-stream',
    ext: '.bin'
    }
    filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
    if (data && save) fs.promises.writeFile(filename, data)
    return {
    res,
    filename,
    size: await getSizeMedia(data),
    ...type,
    data
    }
    }

    return xcaa
} catch (err) {
console.log(err)
startR()
}
}

startR()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
