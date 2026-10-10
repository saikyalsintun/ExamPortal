const $=id=>document.getElementById(id);
const sections=[{key:"p1",name:"Part 1 · Meaning, blanks & conversation",label:"PART 1"},{key:"p2",name:"Part 2 · Translation & sentence order",label:"PART 2"},{key:"p3",name:"Part 3 · Reading",label:"PART 3"}];
const q1=[
["dà mén","တံခါးမကြီး",["စာအုပ်","သစ်တော","ပန်းကန်"]],
["shū běn","စာအုပ်",["ခေါက်ဆွဲ","ထီး","ကား"]],
["bāng máng","ကူညီသည်",["စိတ်ပူသည်","ရောင်းသည်","ကခုန်သည်"]],
["chéng gōng","အောင်မြင်သည်",["ညစ်ပတ်သော","ပျက်စီးသော","ကြောက်သည်"]],
["lán sè","အပြာရောင်",["အနီရောင်","အဖြူရောင်","အနက်ရောင်"]],
["chǒng wù","အိမ်မွေးတိရစ္ဆာန်",["သစ်သီး","ကျောင်းသား","ဆရာမ"]],
["mǎi","ဝယ်သည်",["ရောင်းသည်","စောင့်သည်","သောက်သည်"]],
["dān xīn","စိတ်ပူသည်",["ပျော်ရွှင်သည်","နားလည်သည်","အောင်မြင်သည်"]],
["yǔ sǎn","ထီး",["ခွက်","ကတ်ကြေး","ပန်းကန်"]],
["míng tiān","မနက်ဖြန်",["ဒီနေ့","မနေ့က","မနက်ခင်း"]]
];
const blanks=[
["Wǒ ____ píngguǒ, bù xǐhuan júzi.","xǐhuan",["guān mén","tiào wǔ","shā"]],
["Wǒ kěyǐ hē yì bēi ____. ","chá",["jiǎn dāo","shǒu","sēn lín"]],
["Tā de māo hěn ____, dàjiā dōu xǐhuan tā.","kě’ài",["zāng","pò","màn"]],
["Wǒmen míngtiān qù ____ kàn xiǎo niǎo.","sēn lín",["pán zi","shū běn","diànhuà"]],
["Wàimiàn xiàyǔ le, nǐ dài yǔ ____ ma?","sǎn",["yú","yá","gēge"]],
["Tā shì Zhōngguó rén, wǒ shì Miǎn diàn ____. ","rén",["yánsè","shēng rì","jiǎozi"]],
["Zhè jiàn yīfu tài ____, wǒ bù mǎi le.","guì",["gāo","hǎo","zǎo"]],
["Qǐng ____ mén, lǎoshī kuài lái le.","kāi",["mài","mǎi","péi"]],
["Wǒ dìdi xǐhuan ____ wǔ, tā měitiān liànxí.","tiào",["zhù","tíng","fàng"]],
["Nǐ yǒu kòng ma? Wǒ xiǎng ____ nǐ qù lǚyóu.","qǐng",["shā","pò","dǒng"]]
];
const conv=[
["A: Nǐ jiào shénme míngzi? B: ____","Wǒ jiào Lǐ Míng.",["Wǒ hē chá.","Míngtiān zài jiàn.","Wǒ yǒu yì zhī gǒu."]],
["A: Xièxie nǐ bāng wǒ! B: ____","Bú kèqi.",["Wǎn ān.","Duōshǎo qián?","Wǒ bù zhīdào nǐ."]],
["A: Nǐ xǐhuan hóngsè háishi lánsè? B: ____","Wǒ xǐhuan lánsè.",["Wǒ shí suì.","Tā zài jiā.","Qǐng guān mén."]],
["A: Zhè ge duōshǎo qián? B: ____","Shí kuài.",["Wǒ shì lǎoshī.","Wǒ hěn máng.","Tā shì wǒ mèimei."]],
["A: Nǐ dìdi jǐ suì? B: ____","Tā shí suì.",["Tā jiào gǒu.","Wǒ mǎi shuǐ.","Zài sēn lín lǐ."]],
["A: Nǐ xiǎng hē shénme? B: ____","Wǒ xiǎng hē chá.",["Wǒ xiǎng mǎi jiǎn dāo.","Tā shì nánshēng.","Míngtiān shì xīngqī yī."]],
["A: Nǐ wèishénme dānxīn? B: ____","Yīnwèi wǒ dìdi hái méi huí jiā.",["Yīnwèi tā hěn piàoliang.","Wǒ yǒu liǎng běn shū.","Qǐng zuò."]],
["A: Nǐ zài nǎlǐ? B: ____","Wǒ zài xuéxiào.",["Wǒ shì bái sè.","Wǒ shí chá.","Tā mài píngguǒ."]],
["A: Nǐ míngtiān yǒu kòng ma? B: ____","Yǒu, wǒmen qù lǚyóu ba.",["Wǒ jiào shénme?","Tā de shǒu hěn dà.","Zhège shū běn hěn zāng."]],
["A: Hǎojiǔ bú jiàn! Nǐ zuìjìn zěnmeyàng? B: ____","Hái xíng, xièxie.",["Wǒ shì yì zhī niú.","Qǐng mǎi yí gè.","Wǒmen guān mén le."]]
];
const p1=[...q1.map(a=>({type:"mc",kind:"စကားလုံးအဓိပ္ပာယ်",prompt:`“${a[0]}” ၏ မြန်မာအဓိပ္ပာယ်ကို ရွေးပါ။`,options:[a[1],...a[2]],answer:a[1],marks:1})),...blanks.map(a=>({type:"mc",kind:"ကွက်လပ်ဖြည့်",prompt:a[0],options:[a[1],...a[2]],answer:a[1],marks:1})),...conv.map(a=>({type:"mc",kind:"စကားပြောအဖြေရွေးချယ်ခြင်း",prompt:a[0],options:[a[1],...a[2]],answer:a[1],marks:1}))];
const trans=[
["ကျွန်မ ပန်းသီးစားချင်ပါတယ်။","Wǒ xiǎng chī píngguǒ."],
["ကျွန်တော် လက်ဖက်ရည်တစ်ခွက် သောက်တယ်။","Wǒ hē yì bēi chá."],
["ကျွန်မမှာ ခွေးလေးတစ်ကောင် ရှိတယ်။","Wǒ yǒu yì zhī xiǎo gǒu."],
["ကျွန်တော်တို့ မနက်ဖြန် ခရီးသွားမယ်။","Wǒmen míngtiān qù lǚyóu."],
["အစ်မက အပြာရောင်ကို ကြိုက်တယ်။","Jiějie xǐhuan lánsè."],
["ကျေးဇူးပြုပြီး တံခါးဖွင့်ပါ။","Qǐng kāi mén."],
["ကျွန်မရဲ့ ညီလေးက ကျောင်းသားပါ။","Wǒ de dìdi shì xuésheng."],
["သူတို့က သစ်တောထဲမှာ ငှက်ကလေးတွေကို တွေ့တယ်။","Tāmen zài sēnlín lǐ kànjiàn xiǎo niǎo."],
["ဒီခွက်က ပန်းရောင်ဖြစ်တယ်။","Zhè ge bēizi shì fěnhóngsè."],
["ကျွန်တော် မင်းကို ကူညီချင်တယ်။","Wǒ xiǎng bāngmáng nǐ."],
["အဖေက ငါးနဲ့ ထမင်းစားတယ်။","Bàba chī yú hé fàn."],
["မင်းရဲ့နာမည်က ဘာလဲ။","Nǐ jiào shénme míngzi?"],
["ကျွန်မ မိသားစုကို ချစ်တယ်။","Wǒ ài wǒ de jiārén."],
["သူမ အလုပ်များပေမယ့် အဆင်ပြေပါတယ်။","Tā hěn máng, dànshì hái xíng."],
["ဒီစာအုပ် ဘယ်နှအုပ်လိုချင်သလဲ။","Nǐ yào jǐ běn shū?" ]
];
const arrangements=[
["I like red. ",["wǒ","xǐhuan","hóngsè"]],["My younger sister is a student.",["wǒ de","mèimei","shì xuésheng"]],["Please wait a moment.",["qǐng","děng","yíxià"]],["Tomorrow we will travel.",["wǒmen","míngtiān","qù lǚyóu"]],["Who is that person?",["nà ge rén","shì","shéi"]],["I want to buy some fruit.",["wǒ xiǎng","mǎi","yìxiē shuǐguǒ"]],["The cat is inside the house.",["māo zài","jiā","lǐmiàn"]],["My older brother is very handsome.",["wǒ gēge","hěn","shuài"]],["Please close the door.",["qǐng","guān","mén"]],["I don't know.",["wǒ","bù zhīdào"]],["What time is it now?",["xiànzài","jǐ diǎn","le"]],["The boss sells shoes.",["lǎobǎn","mài","xiézi"]],["I thank the teacher.",["wǒ","gǎnxiè","lǎoshī"]],["There are many birds in the tree.",["shùshàng","yǒu","hěn duō niǎo"]],["My family eats together.",["wǒ de jiārén","yìqǐ","chī fàn"]]
];
const p2=[...trans.map(([prompt,answer])=>({type:"tiles",kind:"မြန်မာမှ Pinyin သို့",prompt,tiles:answer.replace(/[.?!,]/g,"").split(" "),answer:answer.replace(/[.?!,]/g,"").split(" "),marks:1})),...arrangements.map(([prompt,answer])=>({type:"tiles",kind:"ဝါကျအစီအစဉ်ပြန်စီပါ",prompt:"အင်္ဂလိပ်အဓိပ္ပာယ်: "+prompt+" ဝါကျကို မှန်ကန်သောအစီအစဉ်ဖြင့် ပြန်စီပါ။",tiles:answer,answer,marks:1}))];
const reading=[
["မိသားစု","Wǒ jiā yǒu sì ge rén: bàba, māma, gēge hé wǒ. Wǒmen dōu xǐhuan yìqǐ chī fàn.","ပြောသူ့မိသားစုမှာ လူဘယ်နှယောက်ရှိသလဲ။",["လေးယောက်","နှစ်ယောက်","သုံးယောက်","ငါးယောက်"],"လေးယောက်"],
["အိမ်မွေးတိရစ္ဆာန်","Xiǎo Lì jiā yǒu yì zhī māo hé yì zhī gǒu. Māo hěn kě’ài, gǒu xǐhuan zài wàimiàn wán.","Xiao Li အိမ်မှာ ဘယ်တိရစ္ဆာန်နှစ်မျိုးရှိသလဲ။",["ကြောင်နဲ့ ခွေး","ကြက်နဲ့ ငါး","ယုန်နဲ့ မြင်း","နွားနဲ့ ဆိတ်"],"ကြောင်နဲ့ ခွေး"],
["ဈေးဝယ်ခြင်း","Māma qù shāngdiàn mǎi píngguǒ hé xīguā. Píngguǒ shí kuài yì jīn, xīguā bǐ píngguǒ piányi.","ဘယ်သစ်သီးက ဈေးသက်သာသလဲ။",["ဖရဲသီး","ပန်းသီး","နှစ်မျိုးလုံးတူသည်","စာထဲမှာ မပြောထား"],"ဖရဲသီး"],
["ကျောင်း","Wǒmen de lǎoshī hěn hǎo. Tā měitiān bāngmáng xuésheng, yě péibàn wǒmen liànxí Hànyǔ.","ဆရာက ကျောင်းသားတွေကို ဘာလုပ်ပေးသလဲ။",["ကူညီပြီး အတူလေ့ကျင့်ပေးသည်","အစားအစာရောင်းသည်","ခရီးသွားသည်","တံခါးပိတ်သည်"],"ကူညီပြီး အတူလေ့ကျင့်ပေးသည်"],
["ရာသီဥတု","Jīntiān tiānqì hěn rè, wǒ xiǎng hē shuǐ. Míngtiān kěnéng xiàyǔ, suǒyǐ wǒ huì dài yǔsǎn.","မနက်ဖြန် ဘာယူသွားမလဲ။",["ထီး","စာအုပ်","ကတ်ကြေး","သကြားလုံး"],"ထီး"],
["ဖုန်းနံပါတ်","Wǒ xiǎng gěi lǎoshī dǎ diànhuà, dànshì wǒ wàngjì le tā de hàomǎ. Wǒ qù wèn tóngxué.","ပြောသူက ဘာကို မေ့သွားသလဲ။",["ဆရာ့ဖုန်းနံပါတ်","စာအုပ်အမည်","အိမ်လိပ်စာ","စာမေးပွဲရက်"],"ဆရာ့ဖုန်းနံပါတ်"],
["ညစာ","Bàba zuò jī hé cài, māma zhǔ fàn. Dìdi bǎ pánzi hé kuàizi fàng zài zhuōzi shàng.","ညီလေးက ဘာလုပ်သလဲ။",["ပန်းကန်နဲ့ တူကို စားပွဲပေါ်တင်သည်","ကြက်ချက်သည်","ထမင်းချက်သည်","ဈေးဝယ်သည်"],"ပန်းကန်နဲ့ တူကို စားပွဲပေါ်တင်သည်"],
["ပိတ်ရက်","Zhōurì wǒ yǒu kòng. Wǒ hé péngyou xiǎng qù sēnlín lǚxíng, kàn niǎo hé pāizhào.","သူတို့ ပိတ်ရက်မှာ ဘယ်ကိုသွားချင်သလဲ။",["သစ်တော","ကျောင်း","ဆေးရုံ","ဈေး"],"သစ်တော"],
["ဆိုင်","Lǎobǎn shuō zhè ge bēizi shì zhēn de, bú shì jiǎ de. Tā hěn piányi, wǒ juédìng mǎi yí gè.","ခွက်က အစစ်လား အတုလား။",["အစစ်","အတု","မသိရ","ပျက်နေသည်"],"အစစ်"],
["ကျန်းမာရေး","Xiǎo Míng fāwēi le, tā shēntǐ bú tài hǎo. Māma ràng tā zài jiā xiūxi, bù yào chūqù wán.","Xiao Ming ဘာကြောင့် အပြင်မထွက်သင့်သလဲ။",["အဖျားရှိပြီး နေမကောင်းလို့","အလုပ်များလို့","ခရီးသွားလို့","ဈေးဝယ်လို့"],"အဖျားရှိပြီး နေမကောင်းလို့"]
];
const fillRead=[
["Wǒ mèimei xǐhuan chànggē hé tiàowǔ. Tā měitiān zài jiā liànxí.","ညီမလေး ဘာလုပ်ရတာကြိုက်သလဲ။",["သီချင်းဆိုပြီး ကခုန်ခြင်း","စာအုပ်ရောင်းခြင်း","ကားမောင်းခြင်း","ရေကူးခြင်း"],"သီချင်းဆိုပြီး ကခုန်ခြင်း"],
["Zhè ge shūběn shì wǒ de. Nà ge shūběn shì gēge de.","ဘယ်စာအုပ်က အစ်ကို့စာအုပ်လဲ။",["ဟိုစာအုပ်","ဒီစာအုပ်","စာအုပ်နှစ်အုပ်လုံး","စာအုပ်မရှိ"],"ဟိုစာအုပ်"],
["Wǒmen diǎn le jiǎozi hé píjiǔ. Chī wán yǐhòu, fúwùyuán lái mǎidān.","စားပြီးနောက် ဘယ်သူက ငွေရှင်းဖို့လာသလဲ။",["စားပွဲထိုး","ဆရာ","သူငယ်ချင်း","သူဌေး"],"စားပွဲထိုး"],
["Wǒ yǒu yì bǎi kuài qián. Zhè shuāng xiézi bāshí kuài, wǒ hái yǒu èrshí kuài.","ဖိနပ်ဝယ်ပြီးနောက် ငွေဘယ်လောက်ကျန်သလဲ။",["နှစ်ဆယ်ယွမ်","ရှစ်ဆယ်ယွမ်","တစ်ရာယွမ်","ဆယ်ယွမ်"],"နှစ်ဆယ်ယွမ်"],
["Wǒ de péngyou shì Miǎndiàn rén. Tā huì shuō Miǎndiàn yǔ hé Hànyǔ.","သူငယ်ချင်းက ဘယ်ဘာသာစကားနှစ်မျိုး ပြောတတ်သလဲ။",["မြန်မာနဲ့ တရုတ်","တရုတ်နဲ့ အင်္ဂလိပ်","ထိုင်းနဲ့ မြန်မာ","ဂျပန်နဲ့ တရုတ်"],"မြန်မာနဲ့ တရုတ်"],
["Zǎoshang wǒ qù shàngbān, zhōngwǔ chī fàn, xiàwǔ huí jiā.","ပြောသူ ဘယ်အချိန် အိမ်ပြန်သလဲ။",["မွန်းလွဲပိုင်း","မနက်ခင်း","နေ့လယ်","ညသန်းခေါင်"],"မွန်းလွဲပိုင်း"],
["Zhè ge hóngsè bēizi tài guì le. Nà ge báisè bēizi piányi yìdiǎn.","ဘယ်ခွက်က ဈေးသက်သာသလဲ။",["အဖြူရောင်ခွက်","အနီရောင်ခွက်","နှစ်ခုလုံးတူ","ခွက်မရှိ"],"အဖြူရောင်ခွက်"],
["Wǒ xiǎng mǎi yì zhī gǒu, dànshì māma dānxīn gǒu tài dà.","အမေက ဘာကြောင့် စိတ်ပူသလဲ။",["ခွေးက အရမ်းကြီးမှာစိုးလို့","ခွေးက အပြာရောင်လို့","ခွေးက စာဖတ်လို့","ခွေးက ရောင်းလို့"],"ခွေးက အရမ်းကြီးမှာစိုးလို့"],
["Wǒmen xiàwǔ sān diǎn jiànmiàn. Qǐng nǐ zǎo yìdiǎn lái.","သူတို့ ဘယ်အချိန်တွေ့မလဲ။",["မွန်းလွဲ သုံးနာရီ","မနက် ခုနစ်နာရီ","ည ကိုးနာရီ","နေ့လယ် ဆယ့်နှစ်နာရီ"],"မွန်းလွဲ သုံးနာရီ"],
["Shùshàng yǒu sān zhī xiǎo niǎo, dìmiàn shàng yǒu liǎng zhī māo.","သစ်ပင်ပေါ်မှာ ငှက်ဘယ်နှကောင်ရှိသလဲ။",["သုံးကောင်","နှစ်ကောင်","ငါးကောင်","တစ်ကောင်"],"သုံးကောင်"]
];
const headings=[
["Wǒ zǎoshang hē chá, chī píngguǒ, ránhòu qù shàngbān.","မနက်ခင်းလုပ်ရိုးလုပ်စဉ်","တိရစ္ဆာန်များ","ဈေးဝယ်ခြင်း","မိသားစု","ကျောင်းစာ"],
["Wǒmen yào mǎi shuǐguǒ. Wǒ mǎi píngguǒ, tā mǎi xīguā.","သစ်သီးဝယ်ခြင်း","ကျန်းမာရေး","ကျောင်း","အိမ်မွေးတိရစ္ဆာန်","ဖုန်းဆက်ခြင်း"],
["Wǒ jiā yǒu māma, bàba, gēge, jiějie hé wǒ.","မိသားစုဝင်များ","ဈေးဝယ်ခြင်း","ရာသီဥတု","အစားအစာမှာယူခြင်း","တိရစ္ဆာန်"],
["Xiǎo gǒu zài mén wàimiàn wán, māo zài jiā lǐ shuìjiào.","အိမ်မွေးတိရစ္ဆာန်များ","ဖုန်းနံပါတ်","ကျောင်း","ခရီးသွားခြင်း","ငွေကြေး"],
["Wǒ qù shāngdiàn mǎi yì shuāng xiézi. Xiézi hěn piányi.","ဖိနပ်ဝယ်ခြင်း","စာဖတ်ခြင်း","တိရစ္ဆာန်များ","ကျန်းမာရေး","မိသားစု"],
["Lǎoshī zài xuéxiào jiāo wǒmen Hànyǔ. Wǒmen hěn gāoxìng.","ကျောင်းတွင် တရုတ်စာသင်ခြင်း","ဈေးဝယ်ခြင်း","ခရီးသွားခြင်း","မိုးရွာခြင်း","အစားအစာ"],
["Jīntiān tiānqì hěn rè, míngtiān kěnéng xiàyǔ. Wǒ dài yǔsǎn.","ရာသီဥတုနှင့် ထီး","မိသားစုအခမ်းအနား","ငွေကြေး","ကျောင်းစာ","အိမ်မွေးတိရစ္ဆာန်"],
["Wǒ dǎ diànhuà wèn péngyou de hàomǎ, ránhòu gěi tā dǎ diànhuà.","ဖုန်းဆက်ခြင်း","သစ်သီးဝယ်ခြင်း","ချက်ပြုတ်ခြင်း","ခရီးသွားခြင်း","တိရစ္ဆာန်"],
["Wǒmen diǎn le jiǎozi, miàntiáo hé chá. Fúwùyuán bǎ fàn sòng lái.","စားသောက်ဆိုင်တွင် အစားအစာမှာယူခြင်း","ကျောင်း","ရာသီဥတု","မိသားစု","တိရစ္ဆာန်"],
["Wǒ shēntǐ bú tài hǎo, yǒudiǎn fāwēi, suǒyǐ zài jiā xiūxi.","နေမကောင်း၍ အနားယူခြင်း","ဈေးဝယ်ခြင်း","ခရီးသွားခြင်း","ကျောင်းစာ","ဖုန်းနံပါတ်"],
["Bàba mǎi le yú, māma zuò fàn, wǒmen yìqǐ chī wǎnfàn.","မိသားစုညစာ","ကျောင်းစာ","ဈေးဝယ်ခြင်း","ခရီးသွားခြင်း","ရာသီဥတု"],
["Wǒ yǒu yì qiān kuài qián. Wǒ xiǎng duìhuàn yìxiē měiyuán.","ငွေလဲလှယ်ခြင်း","တိရစ္ဆာန်များ","ကျောင်း","မိသားစု","ရာသီဥတု"],
["Wǒmen míngtiān qù sēnlín lǚxíng, kàn niǎo hé zhàopiàn.","သစ်တောသို့ ခရီးသွားခြင်း","အစားအစာမှာယူခြင်း","ကျန်းမာရေး","ကျောင်းစာ","ငွေလဲခြင်း"],
["Dìdi bǎ pánzi fàng zài zhuōzi shàng, jiějie bǎ shuǐ bēizi ná lái.","စားပွဲပြင်ဆင်ခြင်း","ခရီးသွားခြင်း","တိရစ္ဆာန်များ","ဖုန်းနံပါတ်","ရာသီဥတု"],
["Wǒmen zǎoshang qī diǎn chūmén, xiàwǔ sì diǎn huí jiā.","တစ်နေ့တာအချိန်များ","အစားအစာ","ကျောင်းစာ","ငွေကြေး","တိရစ္ဆာန်"],
["Zhè ge shū běn shì wǒ de, nà ge qiānbǐ shì dìdi de.","ပစ္စည်းပိုင်ဆိုင်မှု","တိရစ္ဆာန်များ","ခရီးသွားခြင်း","ရာသီဥတု","အစားအစာ"],
["Lǎobǎn shuō zhè ge shì zhēn de, bú shì jiǎ de.","အစစ်နှင့် အတု","မိသားစု","ကျန်းမာရေး","ကျောင်းစာ","တိရစ္ဆာန်"],
["Wǒ xǐhuan chànggē, tiàowǔ, yě xǐhuan tīng gē.","ဂီတနှင့် ဝါသနာ","ဈေးဝယ်ခြင်း","ငွေကြေး","ကျောင်းစာ","အိမ်သန့်ရှင်းရေး"],
["Wǒmen xiàwǔ qù gōngyuán wán, hái kànjiàn hěn duō xiǎo niǎo.","ပန်းခြံတွင် အပန်းဖြေခြင်း","ကျောင်းစာ","အစားအစာမှာယူခြင်း","ငွေလဲခြင်း","ကျန်းမာရေး"],
["Wǒ qǐng lǎoshī hē chá, tā shuō xièxie, bú kèqi.","ယဉ်ကျေးစွာ ဧည့်ခံခြင်း","တိရစ္ဆာန်များ","ငွေကြေး","ရာသီဥတု","ခရီးသွားခြင်း"]
];
const p3=[...reading.map(a=>({type:"mc",kind:"ဖတ်စာနားလည်မှု",title:a[0],passage:a[1],prompt:a[2],options:a[3],answer:a[4],marks:1})),...fillRead.map(a=>({type:"mc",kind:"ဖတ်စာနားလည်မှု",passage:a[0],prompt:a[1],options:a[2],answer:a[3],marks:1})),...headings.map((a,i)=>({type:"mc",kind:"ခေါင်းစဉ်နှင့်ဖတ်စာတွဲခြင်း",title:`ခေါင်းစဉ်တွဲခြင်း ${i+1}`,passage:a[0],prompt:"ဖတ်စာနှင့် အကိုက်ညီဆုံး မြန်မာခေါင်းစဉ်ကို ရွေးပါ။",options:a.slice(1),answer:a[1],marks:1}))];
let questions=[],answers={},current=0,seconds=3600,clockTimer=null,finished=false;
function shuffle(a){let b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function start(){questions=[];[[p1,"p1"],[p2,"p2"],[p3,"p3"]].forEach(([list,key])=>{let items=JSON.parse(JSON.stringify(list));if($("order").value==="mixed")items=shuffle(items);items.forEach(q=>{q.section=key;q.id=questions.length;if(q.options){const correct=q.answer;const options=shuffle(q.options);q.options=options;q.answer=correct}if(q.tiles)q.tiles=shuffle(q.tiles);questions.push(q)})});if(questions.length!==100){alert("Exam setup error: question count is "+questions.length+", not 100.");return}answers={};current=0;finished=false;seconds=Number($("duration").value)*60;$("setup").classList.add("hidden");$("results").classList.add("hidden");$("exam").classList.remove("hidden");$("studentDisplay").textContent=$("studentName").value.trim()?"Student: "+$("studentName").value.trim():"";$("partPill").textContent="PART 1";renderTabs();render();clearInterval(clockTimer);tick();clockTimer=setInterval(()=>{seconds--;tick();if(seconds<=0)submit(true)},1000)}
function tick(){let m=Math.floor(seconds/60),s=seconds%60;$("clock").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")}
function isCorrect(q){let a=answers[q.id];if(a==null)return false;if(q.type==="tiles")return Array.isArray(a)&&a.map(i=>q.tiles[i]).join(" ")===q.answer.join(" ");return a===q.answer}
function isAnswered(q){let a=answers[q.id];return Array.isArray(a)?a.length>0:a!==undefined&&a!==""}
function score(){return questions.reduce((n,q)=>n+(isCorrect(q)?q.marks:0),0)}
function stats(){$("progressFill").style.width=(questions.filter(isAnswered).length/100*100)+"%"}
function renderTabs(){$("sectionTabs").innerHTML=sections.map(s=>`<button data-key="${s.key}">${s.name}</button>`).join("");$("sectionTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{let n=questions.findIndex(q=>q.section===b.dataset.key);if(n>=0){current=n;render()}})}
function render(){let q=questions[current];$("partPill").textContent=sections.find(s=>s.key===q.section).label;$("qTitle").textContent=q.title||q.kind;$("qInstruction").textContent=q.prompt;$("qCounter").textContent=`Question ${current+1} of 100`;$("markPill").textContent="1 mark";$("passage").textContent=q.passage||"";$("passage").classList.toggle("hidden",!q.passage);$("sectionTabs").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.key===q.section));let area=$("answerArea");area.innerHTML="";
if(q.type==="mc"){let grid=document.createElement("div");grid.className="choice-grid";q.options.forEach((opt,i)=>{let b=document.createElement("button");b.className="choice"+(answers[q.id]===opt?" selected":"");let letter=document.createElement("span");letter.className="letter";letter.textContent=String.fromCharCode(65+i);let text=document.createElement("span");text.textContent=opt;b.append(letter,text);b.onclick=()=>{answers[q.id]=opt;render();stats()};grid.append(b)});area.append(grid)}
if(q.type==="tiles"){let hint=document.createElement("p");hint.className="hint";hint.textContent="စကားလုံးအပိုင်းများကို အစီအစဉ်မှန်အောင် ဆွဲချပါ။ ဖုန်းတွင် tile ကိုနှိပ်၍ ထည့်နိုင်ပြီး ထည့်ထားသော tile ကိုနှိပ်၍ ပြန်ဖယ်နိုင်သည်။";area.append(hint);let bank=document.createElement("div");bank.className="tile-bank";let drop=document.createElement("div");drop.className="sentence-drop";let placed=Array.isArray(answers[q.id])?[...answers[q.id]]:[];function draw(){bank.innerHTML="";drop.innerHTML="";q.tiles.forEach((word,i)=>{if(placed.includes(i))return;let b=document.createElement("button");b.className="tile";b.textContent=word;b.draggable=true;b.onclick=()=>{placed.push(i);answers[q.id]=[...placed];draw();stats()};b.ondragstart=e=>{e.dataTransfer.setData("tile",String(i));e.dataTransfer.setData("from","bank")};bank.append(b)});placed.forEach((i,pos)=>{let b=document.createElement("button");b.className="tile placed";b.textContent=q.tiles[i];b.draggable=true;b.onclick=()=>{placed.splice(pos,1);answers[q.id]=[...placed];draw();stats()};b.ondragstart=e=>{e.dataTransfer.setData("tile",String(i));e.dataTransfer.setData("from","drop");e.dataTransfer.setData("pos",String(pos))};drop.append(b)})} [bank,drop].forEach(el=>{el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();let i=Number(e.dataTransfer.getData("tile"));if(!Number.isFinite(i))return;if(e.dataTransfer.getData("from")==="drop")placed.splice(Number(e.dataTransfer.getData("pos")),1);if(!placed.includes(i))placed.push(i);answers[q.id]=[...placed];draw();stats()}});area.append(bank,drop);draw()}
$("previous").disabled=current===0;$("next").textContent=current===99?"Submit / results →":"Next question →";stats()}
function submit(auto=false){if(finished)return;if(!auto&&!confirm("စာမေးပွဲတင်သွင်းမလား။ မဖြေထားသောမေးခွန်းများကို ၀ မှတ်ပေးပါမည်။"))return;finished=true;clearInterval(clockTimer);$("exam").classList.add("hidden");$("results").classList.remove("hidden");let got=score(),right=questions.filter(isCorrect).length,pct=got; $("resultTitle").textContent=($("studentName").value.trim()||"Student")+" — Exam report";$("finalScore").textContent=got;$("correctTotal").textContent=right;$("wrongTotal").textContent=100-right;$("percentTotal").textContent=pct+"%";$("grade").textContent=pct>=85?"အလွန်ကောင်းသည်":pct>=70?"ကောင်းသည်":pct>=50?"ဆက်လက်လေ့ကျင့်ပါ":"ထပ်မံလေ့ကျင့်ရန်လိုသည်";$("summaryText").textContent=auto?"အချိန်ပြည့်သွား၍ စာမေးပွဲကို အလိုအလျောက်တင်သွင်းလိုက်သည်။":"စာမေးပွဲတင်သွင်းပြီးပါပြီ။ အဖြေမှန်များကို ပြန်လည်စစ်ဆေးနိုင်ပါသည်။";$("answerReview").innerHTML=questions.map((q,i)=>{let a=answers[q.id];if(q.type==="tiles"&&Array.isArray(a))a=a.map(n=>q.tiles[n]).join(" ");if(!isAnswered(q))a="မဖြေထားပါ";let ans=q.type==="tiles"?q.answer.join(" "):q.answer;return `<div class="review-item"><strong>${i+1}. ${esc(q.prompt)}</strong><p class="${isCorrect(q)?"right":"wrong"}">သင့်အဖြေ: ${esc(a)} ${isCorrect(q)?"✓":"✗"}</p><p>အဖြေမှန်: <strong>${esc(ans)}</strong></p></div>`}).join("")}
$("start").addEventListener("click",start);$("previous").addEventListener("click",()=>{if(current>0){current--;render()}});$("next").addEventListener("click",()=>{if(current<99){current++;render()}else submit(false)});$("unanswered").addEventListener("click",()=>{let i=questions.findIndex(q=>!isAnswered(q));if(i<0)alert("မေးခွန်းအားလုံး ဖြေပြီးပါပြီ။");else{current=i;render()}});$("submit").addEventListener("click",()=>submit(false));$("print").addEventListener("click",()=>window.print());$("again").addEventListener("click",()=>{clearInterval(clockTimer);$("results").classList.add("hidden");$("setup").classList.remove("hidden")});
