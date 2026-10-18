const $=id=>document.getElementById(id);
const sections=[
 {key:"vocab",name:"Part 1 · Vocabulary choice",label:"PART 1",start:1},
 {key:"translation",name:"Part 2 · Sentence translation",label:"PART 2",start:26},
 {key:"reading",name:"Part 3 · Reading arrangement",label:"PART 3",start:51},
 {key:"blank",name:"Part 4 · Fill in the blank",label:"PART 4",start:76}
];
let bank=null,questions=[],answers={},current=0,seconds=3600,clockTimer=null,finished=false;
function shuffle(a){let b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function norm(s){return String(s||"").toLowerCase().replace(/[.,!?，。？！]/g,"").replace(/\s+/g," ").trim()}
function meaningMM(s){const i=String(s).indexOf(" / ");return i>=0?String(s).slice(i+3):String(s)}
function makeTiles(target,extras=[]){return shuffle([...target,...shuffle(extras.filter(x=>!target.includes(x))).slice(0,3)])}
function makeExam(){
 const vocabPool=bank.vocabulary;
 const vocabQs=shuffle(vocabPool).slice(0,25).map((v,i)=>{
  const wrong=shuffle(vocabPool.filter(x=>x.meaning!==v.meaning)).slice(0,3).map(x=>x.meaning);
  return {id:0,section:"vocab",type:"mc",kind:"Vocabulary meaning",prompt:`“${v.pinyin}” ၏ မြန်မာအဓိပ္ပာယ်ကို ရွေးပါ။`,options:shuffle([v.meaning,...wrong]),answer:v.meaning,marks:1};
 });
 const transQs=shuffle(bank.translations).slice(0,25).map(t=>{
  const target=t.target;
  const distractors=shuffle(vocabPool.map(v=>v.pinyin).filter(w=>!target.includes(w))).slice(0,4);
  return {id:0,section:"translation",type:"tiles",kind:"Sentence translation",prompt:t.my,tiles:makeTiles(target,distractors),answer:target,marks:1};
 });
 const readSentences=[];
 bank.readings.forEach(r=>r.sentences.forEach((s,i)=>readSentences.push({title:r.title,instruction:r.instruction,myanmar:s.myanmar,target:s.target})));
 const readingQs=shuffle(readSentences).slice(0,25).map(r=>{
  const extras=shuffle(vocabPool.map(v=>v.pinyin).filter(w=>!r.target.includes(w))).slice(0,4);
  return {id:0,section:"reading",type:"tiles",kind:"Part 3 · Translate Myanmar into Chinese",title:r.title,prompt:"အောက်ပါ မြန်မာဝါကျကို တရုတ်ဘာသာ Pinyin ဖြင့် အဓိပ္ပာယ်မပျက် မှန်ကန်သော အစီအစဉ်အတိုင်း စီပါ။",passage:`ဖတ်စာခေါင်းစဉ်: ${r.title}\n\nမြန်မာဝါကျ: ${r.myanmar}\n\nအဓိပ္ပာယ်ကို ဖတ်ပြီး သင့်တော်သော Pinyin အပိုင်းများကို စီပါ။`,tiles:makeTiles(r.target,extras),answer:r.target,marks:1};
 });
 const blankQs=makeBlankQuestions();
 const parts=[vocabQs,transQs,readingQs,blankQs];
 questions=[];
 parts.forEach((part,idx)=>{
   let list=JSON.parse(JSON.stringify(part));
   if($("order").value==="mixed")list=shuffle(list);
   list.forEach(q=>{q.id=questions.length; if(q.options){const correct=q.answer;q.options=shuffle(q.options);q.answer=correct} if(q.tiles)q.tiles=shuffle(q.tiles);questions.push(q)});
 });
 if(questions.length!==100){alert("Exam setup error: question count is "+questions.length+", not 100.");return false}
 return true;
}
function makeBlankQuestions(){
 const raw=[
 ["Wǒ ____ píngguǒ. (I eat apples.)","chī",["hē","tīng","mǎi"]],
 ["Wǒ ____ shuǐ. (I drink water.)","hē",["chī","mǎi","tīng"]],
 ["Nǐ jiào shénme ____? (What is your name?)","míng zi",["tiān qì","shēn tǐ","hào mǎ"]],
 ["Tā shì xué sheng, wǒ ____ xué sheng. (He is a student; I am also a student.)","yě shì",["méi yǒu","zài jiàn","guān mén"]],
 ["Zhè běn shū bù tài ____. (This book is not very expensive.)","guì",["kě ài","máng","shuài"]],
 ["Wǒ ____ jiā rén. (I love my family.)","ài",["mài","mǎi","děng"]],
 ["Nǐ yǒu ____ ma? (Do you have free time?)","yǒu kòng",["bái sè","shēng rì","qiān bǐ"]],
 ["Tā zuì jìn hěn ____. (He has been busy recently.)","máng",["pián yi","bái sè","kě ài"]],
 ["Xiè xie! — ____! (Thank you! — You're welcome!)","bú kè qì",["wǎn ān","guān mén","duō shǎo"]],
 ["Wǒ méi yǒu ____. (I don't have money.)","qián",["tiān qì","yán sè","shēng rì"]],
 ["Zhè ge duō shǎo ____? (How much is this?)","qián",["shū","gǒu","jiā"]],
 ["Wǒ xiǎng mǎi yì ____ shū. (I want to buy one book.)","běn",["zhī","bēi","shuāng"]],
 ["Wǒ jiā yǒu yì zhī ____. (My family has a dog.)","gǒu",["shū","shuǐ","lǎo shī"]],
 ["Míng tiān wǒ qù ____. (Tomorrow I go to work.)","shàng bān",["mǎi dān","wǎn ān","shēng qì"]],
 ["Tā shì Miǎn diàn ____. (He is Burmese.)","rén",["sè","běn","diǎn"]],
 ["Qǐng wèn, nǐ jǐ ____? (May I ask, how old are you?)","suì",["běn","zhī","kuài"]],
 ["Wǒ de mèi mei hěn ____. (My younger sister is cute.)","kě ài",["guì","màn","wú liáo"]],
 ["Wǒmen dōu xǐ huān ____ shuǐ. (We all like drinking water.)","hē",["mài","kū","tíng"]],
 ["Shāng diàn xiàn zài kāi ____. (The shop is open now.)","mén",["mǎi","yú","yán"]],
 ["Wǒ bù ____ tā zài nǎ lǐ. (I don't know where he is.)","zhī dào",["gāo xìng","pián yi","yǒu kòng"]],
 ["Nǐ xiǎng hē shén me? — Wǒ xiǎng hē yì bēi ____.","shuǐ",["qiān bǐ","shū","gǒu"]],
 ["Wǒmen xià wǔ qù lǚ yóu, zǎo shàng zài jiā ____. (We travel in the afternoon and play at home in the morning.)","wán",["guì","mài","dǒng"]],
 ["Tā shēn tǐ bú tài hǎo, tā fā ____. (He is not well; he has a fever.)","wēi",["sè","qián","běn"]],
 ["Zhè ge bēi zi shì fěn hóng ____. (This cup is pink.)","sè",["rén","mén","jiā"]],
 ["Wǒmen xià cì zài ____. (See you next time.)","jiàn",["mǎi","chī","zuò"]]
 ];
 return shuffle(raw).map((x)=>({id:0,section:"blank",type:"mc",kind:"Fill in the blank",prompt:x[0],options:shuffle([x[1],...x[2]]),answer:x[1],marks:1}));
}
function start(){
 if(!bank){alert("The question bank is still loading. Please try again.");return}
 if(!makeExam())return;
 answers={};current=0;finished=false;seconds=Number($("duration").value)*60;
 $("setup").classList.add("hidden");$("results").classList.add("hidden");$("exam").classList.remove("hidden");
 $("studentDisplay").textContent=$("studentName").value.trim()?"Student: "+$("studentName").value.trim():"";
 renderTabs();render();clearInterval(clockTimer);tick();clockTimer=setInterval(()=>{seconds--;tick();if(seconds<=0)submit(true)},1000);
}
function tick(){let m=Math.floor(seconds/60),s=seconds%60;$("clock").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")}
function sectionFor(q){return sections.find(s=>s.key===q.section)}
function isCorrect(q){let a=answers[q.id];if(a==null)return false;if(q.type==="tiles")return Array.isArray(a)&&a.map(i=>q.tiles[i]).join(" ")===q.answer.join(" ");return a===q.answer}
function isAnswered(q){let a=answers[q.id];return Array.isArray(a)?a.length>0:a!==undefined&&a!==""}
function score(){return questions.reduce((n,q)=>n+(isCorrect(q)?1:0),0)}
function stats(){$("progressFill").style.width=(questions.filter(isAnswered).length/100*100)+"%"}
function renderTabs(){$("sectionTabs").innerHTML=sections.map(s=>`<button data-key="${s.key}">${s.name}</button>`).join("");$("sectionTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{let n=questions.findIndex(q=>q.section===b.dataset.key);if(n>=0){current=n;render()}})}
function render(){
 let q=questions[current],sec=sectionFor(q);$("partPill").textContent=sec.label;$("qTitle").textContent=q.kind;$("studentDisplay").textContent=$("studentName").value.trim()?"Student: "+$("studentName").value.trim():"";$("qInstruction").textContent=q.prompt;$("qCounter").textContent=`Question ${current+1} of 100`;$("markPill").textContent="1 mark";
 $("passage").textContent=q.passage||"";$("passage").classList.toggle("hidden",!q.passage);
 $("sectionTabs").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.key===q.section));
 let area=$("answerArea");area.innerHTML="";
 if(q.type==="mc"){
  let grid=document.createElement("div");grid.className="choice-grid";
  q.options.forEach((opt,i)=>{let b=document.createElement("button");b.className="choice"+(answers[q.id]===opt?" selected":"");let letter=document.createElement("span");letter.className="letter";letter.textContent=String.fromCharCode(65+i);let text=document.createElement("span");text.textContent=opt;b.append(letter,text);b.onclick=()=>{answers[q.id]=opt;render();stats()};grid.append(b)});area.append(grid);
 }else if(q.type==="tiles"){
  let hint=document.createElement("p");hint.className="hint";hint.textContent="စကားလုံးအပိုင်းများကို အစီအစဉ်မှန်အောင် ဆွဲချပါ။ ဖုန်းတွင် tile ကိုနှိပ်၍ ထည့်နိုင်ပြီး ထည့်ထားသော tile ကိုနှိပ်၍ ပြန်ဖယ်နိုင်သည်။";
  let bankEl=document.createElement("div");bankEl.className="tile-bank";let drop=document.createElement("div");drop.className="sentence-drop";
  let placed=Array.isArray(answers[q.id])?[...answers[q.id]]:[];
  function draw(){bankEl.innerHTML="";drop.innerHTML="";
   q.tiles.forEach((word,i)=>{if(placed.includes(i))return;let b=document.createElement("button");b.className="tile";b.textContent=word;b.draggable=true;b.onclick=()=>{placed.push(i);answers[q.id]=[...placed];draw();stats()};b.ondragstart=e=>{e.dataTransfer.setData("tile",String(i));e.dataTransfer.setData("from","bank")};bankEl.append(b)});
   placed.forEach((i,pos)=>{let b=document.createElement("button");b.className="tile placed";b.textContent=q.tiles[i];b.draggable=true;b.onclick=()=>{placed.splice(pos,1);answers[q.id]=[...placed];draw();stats()};b.ondragstart=e=>{e.dataTransfer.setData("tile",String(i));e.dataTransfer.setData("from","drop");e.dataTransfer.setData("pos",String(pos))};drop.append(b)});
  }
  [bankEl,drop].forEach(el=>{el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();let i=Number(e.dataTransfer.getData("tile"));if(!Number.isFinite(i))return;if(e.dataTransfer.getData("from")==="drop")placed.splice(Number(e.dataTransfer.getData("pos")),1);if(!placed.includes(i))placed.push(i);answers[q.id]=[...placed];draw();stats()}});
  area.append(hint,bankEl,drop);draw();
 }
 $("previous").disabled=current===0;$("next").textContent=current===99?"Submit / results →":"Next question →";stats();
}
function submit(auto=false){
 if(finished)return;
 if(!auto&&!confirm("စာမေးပွဲတင်သွင်းမလား။ မဖြေထားသောမေးခွန်းများကို ၀ မှတ်ပေးပါမည်။"))return;
 finished=true;clearInterval(clockTimer);$("exam").classList.add("hidden");$("results").classList.remove("hidden");
 let got=score(),right=questions.filter(isCorrect).length,pct=got;
 $("resultTitle").textContent=($("studentName").value.trim()||"Student")+" — Exam report";$("finalScore").textContent=got;$("correctTotal").textContent=right;$("wrongTotal").textContent=100-right;$("percentTotal").textContent=pct+"%";
 $("grade").textContent=pct>=85?"အလွန်ကောင်းသည်":pct>=70?"ကောင်းသည်":pct>=50?"ဆက်လက်လေ့ကျင့်ပါ":"ထပ်မံလေ့ကျင့်ရန်လိုသည်";
 $("summaryText").textContent=auto?"အချိန်ပြည့်သွား၍ စာမေးပွဲကို အလိုအလျောက်တင်သွင်းလိုက်သည်။":"စာမေးပွဲတင်သွင်းပြီးပါပြီ။ အဖြေမှန်များကို ပြန်လည်စစ်ဆေးနိုင်ပါသည်။";
 $("answerReview").innerHTML=questions.map((q,i)=>{let a=answers[q.id];if(q.type==="tiles"&&Array.isArray(a))a=a.map(n=>q.tiles[n]).join(" ");if(!isAnswered(q))a="မဖြေထားပါ";let ans=q.type==="tiles"?q.answer.join(" "):q.answer;return `<div class="review-item"><strong>${i+1}. ${esc(q.prompt)}</strong><p class="${isCorrect(q)?"right":"wrong"}">သင့်အဖြေ: ${esc(a)} ${isCorrect(q)?"✓":"✗"}</p><p>အဖြေမှန်: <strong>${esc(ans)}</strong></p></div>`}).join("");
}
$("start").addEventListener("click",start);$("previous").addEventListener("click",()=>{if(current>0){current--;render()}});$("next").addEventListener("click",()=>{if(current<99){current++;render()}else submit(false)});
$("unanswered").addEventListener("click",()=>{let i=questions.findIndex(q=>!isAnswered(q));if(i<0)alert("မေးခွန်းအားလုံး ဖြေပြီးပါပြီ။");else{current=i;render()}});
$("submit").addEventListener("click",()=>submit(false));$("print").addEventListener("click",()=>window.print());$("again").addEventListener("click",()=>{clearInterval(clockTimer);$("results").classList.add("hidden");$("setup").classList.remove("hidden");$("clock").textContent="60:00"});
fetch("data/testbank.json").then(r=>r.json()).then(d=>{bank=d;$("clock").textContent="60:00"}).catch(e=>{console.error(e);alert("Could not load data/testbank.json. Please run the website through a local server; see README.txt.")});
