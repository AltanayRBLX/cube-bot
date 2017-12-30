const Discord = require("discord.js");
const request = require("request");
const os = require("os")
const url = require("url")
const delay = require("delay")

const Token = "Mzg2OTEzMzkwNzc5NDMyOTYw.DSF5Yg.S2NRVQUBPUJBv30CKfw21NfTMqU";
const Prefix = "c!";

var bot = new Discord.Client();

bot.on("ready", function(login) {
    console.log("Hazır!");
    console.log(bot.user.username + "#5681 ismiyle giriş yapıldı!");
    bot.user.setGame("c!yardim | " + bot.guilds.size + " sunucu!", 'https://www.twitch.tv/lirik', 1);
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(Prefix)) return;

    var args = message.content.substring(Prefix.length).split(" ")

    switch (args[0].toLowerCase()) {
        case "adminduyuru":
            const mesaj = args.join(" ").replace("adminduyuru").replace(" ", "").replace("undefined", "")
            if (message.author.id == "273453450019471361" || message.author.id == "293006152692662273" || message.author.id == "225925576551038977") {
                bot.guilds.forEach(function(guild) {
                    guild.channels.first().send(mesaj);
                });
            }
            else {
                message.delete()
            }
            break
        case "yasakla":
            const kullanici = args[1]
            let member = message.mentions.members.first();
            if (!message.member.roles.some(r=>["Administrator"].includes(r.name))) {
                if (!args[1] == "") {
                    const sebep = args.join(" ").replace("yasakla", "").replace(args[1], "")
                    if (!args[2] == "") {
                        if (!member) {
                            return message.channel.send("**Kullanıcı bulunamadı!**");
                        }
                        if (member.bannable) {
                            member.ban(sebep)
                            message.channel.send("<@" + member.id + ">, **sunucudan başarıyla" + sebep + " sebebiyle yasaklandı!**");
                        }
                        else {
                            message.channel.send("**Kullanıcı yasaklanamıyor. Kullanıcının yetkisi daha yüksek olabilir!**");
                        }
                    }
                    else {
                        message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                    }
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            break
        case "avatar":
            var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(3447003)
                .setImage(message.author.avatarURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
            message.channel.send(embed)
            break
        case "bilgi":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .addField("Yapımcı", "OS S. | SametTurkey#0286")
                .addField("Yapımcılar", "Console.Owner === Altanay#3606 ve xDuz/13/Polat#8526")
                .addField("Altyapı", "Discord.JS (hydrabolt)")
                .addField("Sürüm", "Yok")
                .addField("Cube Resmi Sunucu", "https://discord.gg/eEm46bW")
                .addField("Cube Davet Linki", "https://bit.ly/CubeDiscord")
                .setColor(3447003)
                .setThumbnail(bot.user.avatarURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
            message.channel.send(embed)
            break 
        case "bol":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] / args[2]
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "carp":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] * args[2]
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "cikar":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] - args[2]
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "davetolustur":
            if (!message.member.roles.some(r=>["CreateInstantInvite"].includes(r.name))) {
                message.channel.createInvite().then(invite =>
                    message.channel.send(":white_check_mark: **Başarılı! **" + invite.url)
                );
            }
            break
        case "hastebin":
            if (!args[1] == "") {
                request.post({
                    headers: {"content-type":"text/plain"},
                    url: "https://hastebin.com/documents",
                    form: args.join(" ").replace("hastebin", "")
                }, function(error, response, body){
                    const result = JSON.parse(body)
                    message.channel.send(":white_check_mark: **Başarıyla Yüklendi: **`" + result.key + "`");
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "host":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .addField("Bit", os.arch(), true)
                .addField("Sürüm", os.release(), true)
                .addField("Platform", os.type(), true)
                .setColor(3447003)
                .setThumbnail(bot.user.avatarURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
            message.channel.send(embed)
            break
        case "kagit":
            message.react("📄")
            var randomresponse = ["Taş", "Kağıt", "Makas"]
            if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Taş") {
                message.channel.send(":new_moon: Taş. | **Sen Kazandın**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Kağıt") {
                message.channel.send(":page_facing_up: Kağıt. | **Eşitiz**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Makas") {
                message.channel.send(":scissors: Makas. | **Ben Kazandım**");
            }
            break
        case "kanalbilgisi":
            var embed = new Discord.RichEmbed()
                .setAuthor(message.channel.name, message.guild.iconURL)
                .addField("ID", message.channel.id)
                if (message.channel.nsfw) {
                    embed.addField("Uygunsuz", "Evet", true)
                }
                else {
                    embed.addField("Uygunsuz", "Hayır", true)
                }
                embed.addField("Oluşturuldu", message.channel.createdAt, true)
                .setColor(3447003)
                .setThumbnail(message.guild.iconURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
            message.channel.send(embed)
            break
        case "konustur":
            var konustur = args.join(" ").replace("konustur", "")
            if (!args[1] == "") {
                message.delete()
                message.channel.send(konustur);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "kullanicibilgisi":
            //let memberinfo = message.mentions.members.first();
            //if (memberinfo) {
            //    var embed = new Discord.RichEmbed()
            //        .setAuthor(message.channel.name, message.guild.iconURL)
            //        .addField("ID", memberinfo.id, true)
            //        .addField("Kullanıcı Adı", memberinfo.username, true)
            //        .addField("Kayıt Tarihi", memberinfo.createdAt, true)
            //        if (memberinfo.client.status.toString() == "0") {
            //            embed.addField("Durun", "Çevrimiçi", true)
            //        }
            //        else {
            //        embed.addField("Uygunsuz", "Hayır")
            //        }
            //        embed.addField("Oluşturuldu", message.channel.createdAt)
            //        .setColor(3447003)
            //        .setThumbnail(message.guild.iconURL)
            //        .setFooter("Cube | SametTurkey#0286 | " + new Date())
            //    message.channel.send(embed)
            //}
            //else {
            //    return message.channel.send("**Kullanıcı bulunamadı!**");
            //}
            break
        case "kurallar":
            var embed = new Discord.RichEmbed()
                .setTitle(":closed_book: Kurallar")
                .addField(":point_right: Küfür Yasaktır", "**---------------------------------**")
                .addField(":point_right: Argo Yasaktır", "**---------------------------------**")
                .addField(":point_right: Reklam Yasaktır", "**---------------------------------**")
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
            message.channel.send(embed)
            break
        case "makas":
            message.react("✂")
            var randomresponse = ["Taş", "Kağıt", "Makas"]
            if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Taş") {
                message.channel.send(":new_moon: Taş. | **Ben Kazandım**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Kağıt") {
                message.channel.send(":page_facing_up: Kağıt. | **Sen Kazandın**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Makas") {
                message.channel.send(":scissors: Makas. | **Eşitiz**");
            }
            break
        case "mcavatar":
            if (!args[1] == "") {
                var username = args.join(" ").replace("mcavatar", "").replace(" ", "").replace(" ", "_")
                var embed = new Discord.RichEmbed()
                    .setImage("https://minotar.net/cube/" + username + "/100.png")
                    .setColor(3447003)
                message.channel.send(embed);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "mcbasarim":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    var title = args[1].replace("ş", "s").replace("ç", "c").replace("ğ", "g").replace("ü", "u").replace("ı", "i").replace("Ş", "S").replace("Ç", "C").replace("Ğ", "G").replace("Ü", "U")
                    var description = args.join(" ").replace("mcbasarim", "").replace(args[1], "").replace(" ", "").replace(" ", "").replace("ş", "s").replace("ç", "c").replace("ğ", "g").replace("ü", "u").replace("ı", "i").replace("Ş", "S").replace("Ç", "C").replace("Ğ", "G").replace("Ü", "U")
                    var embed = new Discord.RichEmbed()
                        .setImage(url.parse("https://achievecraft.net/i/19.1/" + title + "/" + description + ".png").href)
                        .setColor(3447003)
                    message.channel.send(embed);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "mcskin":
            if (!args[1] == "") {
                var oyuncu = args.join(" ").replace("mcskin").replace(" ", "").replace(" ", "_").replace("undefined", "")
                var embed = new Discord.RichEmbed()
                    .setImage(url.parse("https://minotar.net/armor/body/" + oyuncu + "/" + "100.png").href)
                    .setColor(3447003)
                message.channel.send(embed);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "mcsunucu":
            if (!args[1] == "") {
                var ip = args.join(" ").replace("mcsunucu").replace(" ", "").replace(" ", ".").replace("undefined", "")
                request.get("https://api.mcsrvstat.us/1/" + ip, {"host": "https://api.mcsrvstat.us/1/" + ip}, function(err,res,body) { 
                    var json = JSON.parse(body)
                    if (!json.offline) {
                        var serverIP = json.ip
                        var serverPort = json.port
                        var serverMotd = json.motd.clean
                        var serverPlayers = json.players.online
                        var serverMaxPlayers = json.players.max
                        var serverIcon = json.icon
                        var serverVersion = json.version
                        var serverSoftware
                        if (json.software) {
                            serverSoftware = json.software
                        }
                        else {
                            serverSoftware = "Algılanmadı"
                        }
                        var embed = new Discord.RichEmbed()
                            .setAuthor("Minecraft Sunucusu", "https://use.gameapis.net/mc/query/icon/" + ip)
                            .setTitle("Sunucu Aktif!")
                            .addField("Motd", serverMotd, false)
                            .addField("Oyuncular", serverPlayers + "/" + serverMaxPlayers, true)
                            .addField("Sürüm", serverVersion, true)
                            .addField("Yazılım", serverSoftware, true)
                            .addField("Port", serverPort, true)
                            .setColor(3447003)
                            .setFooter("Cube | SametTurkey#0286 | " + new Date())
                            .setThumbnail("https://use.gameapis.net/mc/query/icon/" + ip)
                        message.channel.send(embed)
                    }
                    else {
                        message.channel.send("**Sunucu Aktif Değil!**");
                    }
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "robloxavatar":
            if (!args[1] == "") {
                var oyuncu = args.join(" ").replace("robloxavatar").replace(" ", "").replace(" ", "_").replace("undefined", "")
                request.get("https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=" + oyuncu, {"host": "https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=" + oyuncu, "followAllRedirects": true}, function(err,res,body) {
                    var embed = new Discord.RichEmbed()
                        .setImage(res.request.uri.href)
                        .setColor(3447003)
                    message.channel.send(embed);
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "sarkiturkce":
            var songs = ["Manuş Baba - Eteği Belinde",
                "Ziynet Sali - Ağlar Mıyım? Ağlamam",
                "Mabel Matiz - Ya Bu İşler Ne",
                "İrem Derici - Bazı Aşklar Yarım Kalmalı",
                "Murat Dalkılıç & Oğuzhan Koç - Aşinayız",
                "Mustafa Ceceli - Geçti O Günler",
                "Hadise - Sıfır Tolerans",
                "Aleyna Tilki - Sen Olsan Bari",
                "Tuğba Yurt - İnceden İnceden",
                "Oğuzhan Koç - Vermem Seni Ellere",
                "Buhay - Sahiden",
                "Hande Yener - Benden Sonra",
                "Bahadır Tatlıöz - Takvim",
                "Ozan Doğulu feat Ece Seçkin - Sayın Seyirciler",
                "Ferhat Göçer feat Volga Tamöz - Günah (Slow Versiyon)",
                "Emre Aydın - Beni Vurup Yerde Bırakma",
                "İlyas Yalçıntaş - Gel Be Gökyüzüm",
                "Edis - Çok Çok",
                "Erdem Kınay Feat Merve Özbey - Boynun Borcu",
                "Derya Uluğ - Nabız 180"]
            var embed = new Discord.RichEmbed()
                .setTitle(songs[Math.floor(Math.random() * songs.length)])
                .setDescription("Türkçe Şarkı")
                .setColor(3447003)
            message.channel.send(embed);
            break
        case "sarkiturkce":
            var songs = ["Super Sako Feat Spitakci Hayko - Mi Gna",
                "Sean Paul Feat Dua Lipa - No Lie",
                "Jason Derulo Feat Nicki Minaj & TY Dolla Sign - Swalla",
                "Luis Fonsi & Daddy Yankee feat Justin Bieber - Despacito",
                "Massari - Done Da Da",
                "No Method - Let Me Go",
                "Anne Marie - Ciao Adios",
                "Inna - Gimme Gimme",
                "Mahmut Orhan Feat Eneli - Save Me",
                "Jax Jones Feat Raye - You Don't Know Me",
                "Pitbull & J Balvin Feat Camila Cabello - Hey Ma",
                "A - Wa Feat Pitbull - Habib Galbi",
                "Charlie Puth - Attention",
                "Artistic Raw Feat Ida - In The Middle",
                "Arilena Ara - Nentori - Bess Remix",
                "ED Sheeran - Shape Of You",
                "Katy Perry Feat Skip Marley - Chained To The Rhythm",
                "Marian Hill - Down",
                "Ofenbach - Be Mine",
                "Arash Feat Mohombi - Se Fue"]
            var embed = new Discord.RichEmbed()
                .setTitle(songs[Math.floor(Math.random() * songs.length)])
                .setDescription("Yabancı Şarkı")
                .setColor(3447003)
            message.channel.send(embed);
            break
        case "slots":
            var esyalar = [
                ":moneybag: ",
                ":dollar: ",
                ":euro: ",
                ":pound: ",
                ":money_with_wings: ",
                ":gem: ",
                ":yen: "
            ]
            var item1 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item2 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item3 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item4 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item5 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item6 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item7 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item8 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item9 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var slots = message.channel.send(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "----------").then((msg) =>
            {
                delay(750).then(() => {
                    msg.edit(item4 + item5 + item6 + os.EOL + item7 + item8 + item9 + "<" + os.EOL + item1 + item2 + item3 + os.EOL + "----------")
                    delay(750).then(() => {
                        msg.edit(item7 + item8 + item9 + os.EOL + item1 + item2 + item3 + "<" + os.EOL + item4 + item5 + item6 + os.EOL + "----------")
                        delay(750).then(() => {
                            msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "----------")
                            delay(750).then(() => {
                                if (item4 == item5 && item5 == item6) {
                                    msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "KAZANDIN")
                                }
                                else {
                                    msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "KAYBETTIN")
                                }
                            })
                        })
                    })
                })
            });
            break
        case "sorusor":
            if (!args[1] == "") {
                var soru = args.join(" ").replace("sorusor").replace(" ", "").replace("undefined", "")
                var cevaplar = [
                    "Evet",
                    "Hayır",
                    "Belki",
                    "Olabilir"
                ]
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .addField("Soru", soru, false)
                    .addField("Cevap", cevaplar[Math.floor(Math.random() * cevaplar.length)], true)
                    .setColor(3447003)
                    .setFooter("Cube | SametTurkey#0286 | " + new Date())
                message.channel.send(embed)
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "sunucubilgisi":
            var embed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .addField("ID", message.guild.id, true)
                .addField("İsim", message.guild.name, true)
                .addField("Sahibi", message.guild.owner.displayName, true)
                .addField("Bölge", message.guild.region, true)
                .addField("Kanallar", message.guild.channels.size, true)
                .addField("Üyeler", message.guild.memberCount, true)
                .addField("Roller", message.guild.roles.size, true)
                .addField("Oluşturulma Tarihi", message.guild.createdAt, false)
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
                .setThumbnail(message.guild.iconURL)
            message.channel.send(embed)
            break
        case "sunucuduyuru":
            if (!args[1] == "") {
                var duyuru = args.join(" ").replace("sunucuduyuru").replace(" ", "").replace("undefined", "")
                if (!message.member.roles.some(r=>["ManageChannels"].includes(r.name))) {
                    message.guild.channels.forEach(function(channel) {
                        if (channel.type == "text") {
                            channel.send(duyuru);
                        }
                    });
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "sunucuikon":
            var embed = new Discord.RichEmbed()
                .setImage(message.guild.iconURL)
                .setColor(3447003)
            message.channel.send(embed);
            break
        case "topla":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] - -Math.abs(args[2])
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "temizle":
            if (!args[1] == "") {
                if (!message.member.roles.some(r=>["ManageMessages"].includes(r.name))) {
                    var temizle = parseInt(args[1])
                    if (temizle > 100)
                    return message.channel.send("**Mesaj silme sınırı 100'dür!**");
                    if (temizle < 2)
                    return message.channel.send("**Minimum 2 mesaj silinebilir!**");
                    message.channel.bulkDelete(temizle)
                    message.channel.send(":white_check_mark: **" + temizle + "**");
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "twitch":
            if (!args[1] == "") {
                var yayinci = args.join(" ").replace("twitch").replace(" ", "").replace("undefined", "")
                request.get("https://api.twitch.tv/kraken/streams/" + yayinci, {"host": "https://api.twitch.tv/kraken/streams/" + yayinci, headers: {"content-type": "application/vnd.twitchtv.v5+json", "Client-ID": "ds1ln5ziugn2v3yb44bhjf7mx24i8l"}}, function(err,res,body) { 
                    var json = JSON.parse(body)
                    if (json.stream !== null) {
                        var channelUsername = json.stream.channel.display_name
                        var channelURL = json.stream.url
                        var channelUserImage = json.stream.channel.logo
                        var channelStreamName = json.stream.channel.status
                        var channelStreamGame = json.stream.game
                        var channelStreamViewers = json.stream.viewers
                        var channelStreamPreview = json.stream.preview.large
                        var embed = new Discord.RichEmbed()
                            .setAuthor(channelUsername, channelUserImage)
                            .setTitle("Şimdi Yayında!")
                            .addField("Yayın", channelStreamName, false)
                            .addField("Oyun", channelStreamGame, true)
                            .addField("İzleyici", channelStreamViewers, true)
                            .setImage(channelStreamPreview)
                            .setColor(3447003)
                            .setFooter("Cube | SametTurkey#0286 | " + new Date())
                            .setThumbnail(channelUserImage)
                        message.channel.send(embed)
                    }
                    else {
                        message.channel.send("**Kullanıcı Aktif Değil!**");
                    }
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "yazitura":
            var yazitura = message.channel.send("<:yazi:383974767742418949>").then((msg) => {
                var cevaplar = [
                    "Yazı",
                    "Tura"
                ]
                delay(500).then(() => {
                    msg.edit("<:tura:389159536277323776>")
                    delay(500).then(() => {
                        msg.edit("<:yazi:389159538957352962>")
                        delay(500).then(() => {
                            msg.edit("<:tura:389159536277323776>")
                            delay(500).then(() => {
                                msg.edit("<:yazi:389159538957352962>")
                                delay(500).then(() => {
                                    msg.edit("<:tura:389159536277323776>")
                                    delay(500).then(() => {
                                        if (cevaplar[Math.floor(Math.random() * cevaplar.length)] == "Yazı") {
                                            msg.edit("<:yazi:389159538957352962> **| Sonuç: Yazı**")
                                        }
                                        else if (cevaplar[Math.floor(Math.random() * cevaplar.length)] == "Tura") {
                                            msg.edit("<:tura:389159536277323776> **| Sonuç: Tura**")
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
            break
        case "zaman":
            var embed = new Discord.RichEmbed()
                .setTitle("Zaman")
                .addField("Saat", new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), true)
                .addField("Tarih", new Date(), false)
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date())
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            break
        default:
            message.channel.send("**Bilinmeyen komut!**");
    }

    if (message.content.toLowerCase() == "merhaba") {
        message.react("👋")
        message.channel.send("**Merhaba**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase() == "sa") {
        message.react("👋")
        message.channel.send("**Aleyküm Selam**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase() == "iyi geceler") {
        message.react("🌝")
        message.channel.send("**İyi Geceler**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase().startsWith("teyzen")) {
        message.react("😂")
        message.channel.send("**Yok Baban** :smile:, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase().indexOf("discord.gg/") > -1) {
        if (!message.author.bot) {
            message.react("😡")
            message.delete()
            message.channel.send("<@" + message.author.id + ">, **lütfen reklam yapma!**");
        }
    }

    if (message.content.toLowerCase().indexOf("https") > -1 || message.content.toLowerCase().indexOf("http") > -1) {
        if (message.content.toLowerCase().indexOf("discord.gg/") > -1) {
            if (message.author != bot.user || message.author.bot == false) {
                message.react("😡")
                message.delete()
                message.channel.send("<@" + message.author.id + ">, **lütfen reklam yapma!**");
            }
        }
        else {
            if (message.author.bot == false) {
                message.react("😡")
                message.delete()
                message.channel.send("<@" + message.author.id + ">, **lütfen URL'leri özelden paylaş!**");
            }
        }
    }

    if (message.content.toLowerCase().indexOf("küfür") > -1 ||
    message.content.toLowerCase().indexOf("siktir") > -1 ||
    message.content.toLowerCase().indexOf("sikerim") > -1 ||
    message.content.toLowerCase().indexOf("amına") > -1 ||
    message.content.toLowerCase().indexOf("amina") > -1 ||
    message.content.toLowerCase().indexOf("amcık") > -1 ||
    message.content.toLowerCase().indexOf("amcik") > -1 ||
    message.content.toLowerCase().indexOf("ananı") > -1 ||
    message.content.toLowerCase().indexOf("ecdadını") > -1 ||
    message.content.toLowerCase().indexOf("sikiyim") > -1 ||
    message.content.toLowerCase().indexOf("orospu") > -1 ||
    message.content.toLowerCase().indexOf("orospu çocuğu") > -1 ||
    message.content.toLowerCase().indexOf("yarrak") > -1 ||
    message.content.toLowerCase().indexOf("pipi") > -1 ||
    message.content.toLowerCase().indexOf("göt") > -1 ||
    message.content.toLowerCase().indexOf("götveren") > -1 ||
    message.content.toLowerCase().indexOf("göt veren") > -1 ||
    message.content.toLowerCase().indexOf("bok") > -1 ||
    message.content.toLowerCase().indexOf("piç") > -1) {
        if (message.author.bot == false) {
            message.react("😠")
            message.delete()
            message.channel.send("<@" + message.author.id + ">, **lütfen küfür etme!**");
        }
    }
});

bot.login(process.env.BOT_TOKEN);

