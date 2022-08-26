import { emogiRegEx, randomElement, RNG, rng, shuffle } from "./util";

declare const S: SVGElement, Board: HTMLDivElement, Table: HTMLDivElement, Pins: HTMLDivElement, StringsPath, StringsShadow;

{
  type V2 = { x: number, y: number };

  RNG();

  const columns = 6;

  let update = (t: number) => {
    window.requestAnimationFrame(update)
  }

  update(0);

  window.onmousemove = e => { }

  window.onwheel = e => { };

  function splitEmojis(t){
    return t.split(emogiRegEx).filter(a=>a && a != ' ');
  }

  const photos = splitEmojis("🤵👰🤱👨‍⚕️👩‍⚕️👨‍🎓👩‍🎓👨‍⚖️👩‍⚖️👨‍🌾👩‍🌾👨‍🍳👩‍🍳👨‍🔧👩‍🔧👨‍🏭👩‍🏭👨‍💼👩‍💼👨‍🔬👩‍🔬👨‍💻👩‍💻👨‍🎤👩‍🎤👨‍🎨👩‍🎨👨‍✈️👩‍✈️👨‍🚀👩‍🚀👨‍🚒👩‍🚒👮‍♂️👮‍♀️🕵️‍♂️🕵️‍♀️💂‍♂️💂‍♀️👷‍♂️👷‍♀️🧙‍♀️🧙‍♂️🧚‍♀️🧚‍♂️🧛‍♀️🧛‍♂️🧜‍♀️🧜‍♂️🧝‍♀️🧝‍♂️🧞‍♀️🧞‍♂️🧟‍♀️🧟‍♂️");
  const places = splitEmojis("🗿🗽🗼🏰🏯🎡🎢🎠🌋🌇🌆🌃");
  const evidence = splitEmojis("🪓🔪🎎🎀🧸📿🧵💎📱💾📀📼🔦📓📒💵✏️ 🖌️ 🖋️✂️🔓🗡️🔑🗝️🔧⚙️💉🪒🚬");
  const documents = splitEmojis("🧧📰📃✉️🧾🗂️");

  //const emojis = photos;
    

  const words = Object.keys(window).filter(w=>w.length<10);
  const cards: HTMLElement[] = [];

  function randomText(len: number = 0) {    
    return len?[...new Array(len)].map(v => randomElement(words)).join(" "):""
  }

  let slotn = 0;
  let board = [], free = [];

  function addSlot(card, parent: HTMLElement = Board) {
    let slot = document.createElement("div")
    slot.classList.add("slot");
    slot.id = slotn++ as any;
    makeDroppable(slot);
    parent.appendChild(slot);
    if (card) {
      addCard(slot, card)
      board.push(card);
    }
  }

  let preventDoubleDrop = false;

  function makeDroppable(slot) {
    slot.ondragover = e => e.preventDefault();
    slot.ondrop = e => {
      e.preventDefault();
      if (preventDoubleDrop) {
        preventDoubleDrop = false;
        return;
      }
      let data = e.dataTransfer.getData("text");
      console.log("drop", slot.id, data);
      if (slot.id != "Table")
        preventDoubleDrop = true;
      let card = document.getElementById(data) as HTMLDivElement;
      moveCard(card, slot, e.screenX, e.screenY);
    }
  }

  function moveCard(card: HTMLDivElement, slot: HTMLDivElement, x, y) {
    if (slot.id != "Table" && slot.childNodes.length > 0) {
      let other = slot.childNodes[0] as HTMLDivElement;
      card.parentElement.appendChild(other);
      other.style.left = card.style.left;
      other.style.top = card.style.top;
    }
    slot.appendChild(card);
    card.style.left = `${x - card.getBoundingClientRect().width / 2}px`;
    card.style.top = `${y - card.getBoundingClientRect().height}px`;
    relink();
  }

  function addCard(slot: HTMLDivElement, {photo, type}) {
    type = type||"po";
    let card = document.createElement("div")
    slot.appendChild(card)
    cards.push(card);
    card.classList.add("card", type);
    let rot = rng() * 6 - 3;
    card.style.transform = `translate(${rng() * 10 - 5}px, ${rng() * 10 - 5}px) rotate(${rot}deg)`
    card.style.width = type=="np"?`${rng()*2+4}em`:type=="nt"?`${rng()*0.5+1}em`:"";    
    card.draggable = true;
    card.id = photo;
    card.ondragstart = e => e.dataTransfer.setData("text", photo);
    card.onmouseenter = () => highlightNeighbors(card);
    card.onmouseleave = () => highlightNeighbors(null);
    let words = {po:3, np:150, nt:3}[type] || 0;
    let title = {np:1, st:3}[type] || 0;
    let columns = {np:rng(2)+1}[type];
    let float = type=="np" && randomElement(["left","right", "center"]);
    let paper = type!="ev" && type !="do";
    console.log(type, paper);
    let style = `"
      background:hsl(${rng(360)}, 50%, 10%, ${paper?0:100}%); 
      float: ${float}; ${float=="center" && "width:100%;"};            
    "`;
    let cross = !paper && rng(8)==0;
    card.innerHTML = `<div class="note" style="columns: ${columns};">
      <h1>${randomText(rng(title) + title)}</h1>
      <div class="photo ${type=="nt" && ["invert", "green", "gray"][rng(10)]}" style=${style}>
      ${photo}
      </div>
      <span style="transform:rotate(${-rot + rng() * 3 - 1.5}deg)">${randomText(rng(~~(words/3)) + words)}</span>
    </div><div class="overlay">${cross?"✘":""}</class>`;
    if(paper)
      card.style.background = `hsl(${rng(360)}, ${type=="st"?100:20}%, 90%)`;
    board[slot.id] = card.id;
  }

  function highlightNeighbors(card) {
    for (let c of cards) {
      c.classList.remove("hl");
    }
    if (card)
      for (let l of links) {
        let connected = l[0] == card ? l[1] : l[1] == card ? l[0] : null;
        if (connected)
          connected.classList.add("hl")
      }
  }

  function toPath(linksAt, dy = 0) {
    return linksAt.map(([ap, bp]) => {
      ap = [ap[0], ap[1] + dy];
      bp = [bp[0], bp[1] + dy];
      let cp = [ap[0] / 2 + bp[0] / 2, ap[1] / 2 + bp[1] / 2 + Math.min(100, Math.abs(ap[0] - bp[0]) * 0.3)];
      return `M${ap[0]} ${ap[1]} Q${cp[0]} ${cp[1]} ${bp[0]} ${bp[1]}`
    });
  }

  function relink() {
    let linksAt = links.map(([a, b]) => [bat(a, b), bat(b, a)]);

    Pins.innerHTML = linksAt.flat(1).map(([x, y]) => 
      `<div class="pin" style="left:${x - 3}px;top:${y - 7}px">📍</div>`
    ).join(" ");

    StringsPath.setAttribute("d", toPath(linksAt).join(" "));
  }


  makeDroppable(Table)

  let shuffled = shuffle(photos, rng);
  let shuffledEvidence = shuffle(evidence, rng);
  let shuffledDocuments = shuffle(documents, rng);
  for (let i=0;i<72;i++) {
    let type = randomElement(["ev", "do", "po","np","nt","st"]);
    let photo = rng(3)?({ev:shuffledEvidence,do:shuffledDocuments}[type] || shuffled).pop():undefined;
    addSlot(photo && {photo, type});
  }

  let links: HTMLDivElement[][] = [];
  for (let i = 0; i < cards.length; i++) {
    let c1 = cards[i];
    let c2 = randomElement(cards);
    if (c1 != c2 && !links.find(l => l[0] == c1 && l[1] == c2))
      links.push([c1, c2]);
  }

  relink();

  function bat(div, other) {
    let margin = 10;
    let r = div.getBoundingClientRect();
    let o = other.getBoundingClientRect();
    return [
      o.left > r.left + 10 ? r.right - margin : r.left + margin,
      o.top > r.top + 10 ? r.bottom - margin : r.top + margin
    ];
  }

  function curve(a:V2, b:V2, c:V2, t:number) {
    let v = (1 - t) ** 2, w = t ** 2
    return [c.x + v * (a.x - c.x) + w * (b.x - c.x), c.y + v * (a.y - c.y) + w * (b.y - c.y)]
  }

  function topLeft(d: HTMLElement) {
    let br = d.getBoundingClientRect();
    return `${~~br.left + 10} ${~~br.top + 10}`
  }
}