import { emogiRegEx, randomElement, RNG, rng, shuffle } from "./util";
import { plot } from "./plot"

declare const
  Table: HTMLDivElement,
  Board: HTMLDivElement,
  CST: HTMLDivElement,
  Talk: HTMLDivElement,
  Char: HTMLDivElement,
  Pins: HTMLDivElement,
  StringsPath: SVGPathElement,
  StringsWrongPath: SVGPathElement,
  HighlightPath: SVGPathElement,
  Input: HTMLInputElement
{
  type V2 = { x: number, y: number };
  const v2 = (x: number, y: number) => ({ x, y })
  const sum = (a: V2, b: V2) => ({ x: a.x + b.x, y: a.y + b.y })
  const sub = (a: V2, b: V2) => ({ x: a.x - b.x, y: a.y - b.y })
  const dist = (a: V2, b: V2) => length(sub(a, b));
  const length = (a: V2) => (a.x ** 2 + a.y ** 2) ** 0.5;


  let levels = plot.split("=").map(s => s.trim().split("\n"));
  let seed;
  let level;
  let line = 1;
  let leveln = 0;
  let maxLevel = 0;
  let win = false;
  const FinalLevel = 5;

  const slots: HTMLDivElement[] = [];
  let cards: { [id: string]: Card } = {};
  let links: Link[] = [];
  let board: Card[] = [];
  let slotn = 0;

  const columns = 12, rows = 6, totalSlots = columns * rows;

  class Link {
    ap: V2;
    bp: V2;
    cp: V2;
    a: Card;
    b: Card;
    length: number;

    constructor(aId: string, bId: string) {
      this.a = cards[aId];
      this.b = cards[bId];
      links.push(this);
    }

    update(ap: V2, bp: V2) {
      this.ap = ap;
      this.bp = bp;
      this.length = this.a.slot != null && this.b.slot != null ? dist(idToCoord(this.a.slot), idToCoord(this.b.slot)) : 0;
      this.cp = v2(ap.x / 2 + bp.x / 2, ap.y / 2 + bp.y / 2 + Math.min(100, Math.abs(ap.x - bp.x) * 0.3));
    }

    curve(t: number) {
      let { ap, bp, cp } = this;
      let v = (1 - t) ** 2, w = t ** 2
      return v2(cp.x + v * (ap.x - cp.x) + w * (bp.x - cp.x), cp.y + v * (ap.y - cp.y) + w * (bp.y - cp.y));
    }

    toPath() {
      let { ap, bp, cp } = this;
      let covered = this.overlapping()
      return [covered, `M${ap.x} ${ap.y} Q${cp.x} ${cp.y} ${bp.x} ${bp.y}`, this] as [Card, string, Link];
    }

    overlapping() {

      if (slotDistance(this.a.slot, this.b.slot) < 2)
        return null;

      let steps = this.length*2;
      for (let i = 1; i < steps - 1; i++) {
        let p = this.curve(i / steps);
        for (let c of allCards()) {
          if (c == this.a || c == this.b)
            continue;
          if (c.contains(p))
            return c;
        }
      }
      return null;
    }

  }

  class Generator {
    shuffled = shuffle(photos, rng);
    shuffledEvidence = shuffle(evidence, rng);

    constructor() {
    }

    nextCard(slot?: number, type?: string) {
      let id: string;
      if (slot != null && landmarkIn[slot] && rng(3) == 0 || type == "lm") {
        id = landmarkIn[slot].icon;
        type = "lm";
      } else {
        type = type || randomElement(["ev", "po", "np", "nt", "st"]);
        id = (type == "ev" ? this.shuffledEvidence : this.shuffled).pop();
      }
      return { type, id };
    }

    simpleCards(chance: number, guaranteed?: number) {
      let cards = []
      let slots = shuffle([...new Array(totalSlots)].map((_, i) => i), rng);
      slots = slots.slice(0, ~~(totalSlots * chance));
      if (guaranteed && !slots.includes(guaranteed))
        slots.push(guaranteed);
      slots = slots.sort();
      for (let slot of slots) {
        let { type, id } = this.nextCard(slot, slot == guaranteed && landmarkIn[slot] && "lm");
        if (id)
          cards.push({ id, type, slot })
      }
      return cards;
    }

    neighborLinks(cards: any[], linkChance: number, hub?: number) {
      let b: string[] = [];
      let links: [string, string][] = [];
      for (let c of cards)
        b[c.slot] = c.id;

      for (let slot = 0; slot < totalSlots - columns; slot++) {
        if (!b[slot])
          continue;
        if ((slot + 1) % columns == 0)
          continue;
        for (let other of [1, columns, 1 + columns]) {
          if (b[slot] && b[slot + other] && other && (hub == slot || hub == slot + other))
            links.push([b[slot], b[slot + other]]);
        }

        if (rng() < linkChance && b[slot + 1])
          links.push([b[slot], b[slot + 1]]);
        if (rng() < linkChance && b[slot + columns])
          links.push([b[slot], b[slot + columns]]);
        if (rng() < linkChance && b[slot + columns + 1])
          links.push([b[slot], b[slot + columns + 1]]);
        if (slot % columns > 0 && rng() < linkChance && b[slot + columns - 1])
          links.push([b[slot], b[slot + columns - 1]]);
      }
      return links;
    }

    randomLinks(cards: { id: string }[]) {
      let links: [string, string][] = [];
      for (let c1 of cards.map(c => c.id)) {
        let c2 = randomElement(cards).id;
        if (c1 != c2 && !links.find(l => l[0] == c1 && l[1] == c2 || l[1] == c1 && l[0] == c2)) {
          links.push([c1, c2]);
        }
      }
      return links;
    }

    generate(lseed: string) {
      RNG(Number(lseed));
      console.log({ seed: lseed });
      let density = Number(lseed.substring(1, 3)) / 100 || 0;
      let density2 = Number(lseed.substring(3, 5)) / 100;
      let landmark = Number(lseed[5])-1 + (Number(lseed[6])-1)*columns;
      let cards, links;
      switch (lseed[0]) {
        case "2":
          cards = this.simpleCards(density);
          links = this.neighborLinks(cards, density2);
          cards = shuffleSlots(cards);
          break;
        case "3":
          cards = this.simpleCards(density, landmark);
          links = this.neighborLinks(cards, density2, landmark);
          cards = shuffleSlots(cards);
          break;
        default:
          cards = this.simpleCards(density);
          links = this.randomLinks(cards);
          break;
      }

      return { cards, links, seed: lseed };
    }


  }

  class Card {
    div: HTMLDivElement;
    id: string;
    type: string;
    slot: number;
    points: V2[] = [];
    at: V2;
    r: DOMRect;

    constructor({ id, type, slot, at }) {
      let div: HTMLDivElement;
      type = type || "po";
      this.type = type;
      this.id = id;

      div = document.createElement("div")
      if (type == "lm") {
        let m = landmarks.find(lm => lm.icon == id)
        div.style.marginLeft = `calc(-2rem + ${fract(m.x / 100 * columns) * 100}%)`;
        div.style.marginTop = `calc(-1.5rem + ${fract(m.y / 100 * rows) * 100}%)`;
        div.innerHTML = "O";
        div.style.fontSize = `${rng(4) + 3}rem;`
        div.classList.add("lm", type);
      } else {
        div.classList.add("card", type);
        if (!rng(4))
          div.classList.add("warp");
        let rot = rng() * 6 - 3;
        div.style.transform = `translate(${rng() * 10 - 5}px, ${rng() * 10 - 5}px) rotate(${rot}deg)`
        div.style.width = type == "nt" ? `${rng() * 0.5 + 1}em` : "";
        div.draggable = true;
        div.ondragstart = e => e.dataTransfer.setData("text", id);
        let words = { po: 3, np: 150, nt: 3 }[type] || 0;
        let title = { np: 1, st: 3 }[type] || 0;
        let columns = { np: rng(2) + 1 }[type];
        let float = type == "np" && randomElement(["left", "right", "center"]);
        let paper = type != "ev" && type != "do";
        let style = `background:hsla(${rng(360)}, 50%, 10%, ${paper ? 100 : 0}%); 
        float: ${float}; ${float == "center" ? "width:100%;" : ""};`;
        if (type == "ev") {
          let evInd = evidence.indexOf(id);
          style += `transform: rotateZ(${evInd < 4 ? -45 : evInd < 7 ? 45 : 0}deg);`
        }
        let mark = paper && rng(8) == 0;
        div.innerHTML = `
        <div class="note" style="columns: ${columns};">
          ${title > 0 ? `<h1>${randomText(rng(title) + title)}</h1>` : ""}
          <div class="${type == "nt" && ["invert", "green", "gray"][rng(10)]} photo" style="${style}">
            ${id}
          </div>
          <span style="transform:rotate(${-rot + rng() * 3 - 1.5}deg)">${randomText(rng(~~(words / 3)) + words)}</span>
        </div>
        <div class="overlay">${mark ? "??????!?"[rng(4)] : type == "do" ? "" : ""}</div>`;
        if (paper)
          div.style.background = `hsl(${rng(360)}, ${type == "st" ? 100 : 20}%, 90%)`;
      }
      this.div = div;
      div.id = id;
      div.onmouseenter = () => highlightNeighbors(div);
      div.onmouseleave = () => highlightNeighbors(null);
      div.setAttribute("type", type);

      cards[id] = this;

      this.addToSlot(slot);
      this.setAt(at);
      this.recalculate();
    }

    recalculate() {
      let r = this.div.getBoundingClientRect();
      this.at = v2(r.left, r.top);
      this.r = r;

      for (let i = 0; i < 4; i++) {
        let margin = 10;
        let p: V2;
        if (this.type == "lm") {
          p = v2(r.width / 2, r.height / 2);
        } else {

          p = v2(i % 2 == 1 ? r.width - margin : margin,
            i < 2 ? margin : r.height - (this.type == "nt" ? 0 : margin))
        }
        if (this.type == "ev") {
          p[4] = v2(r.width / 2, 20);
        }
        this.points[i] = p;
      }
    }

    setAt(at) {
      if (at) {
        this.div.style.left = at[0];
        this.div.style.top = at[1];
      }
    }

    move(slot: number, x: number, y: number) {
      if (this.type == "lm")
        return;

      if (slot != null && board[slot] != null) {
        let other = board[slot];
        if (other.type == "lm")
          return;
        other.addToSlot(this.slot);
        other.div.style.left = this.div.style.left;
        other.div.style.top = this.div.style.top;
      }

      this.addToSlot(slot);
      this.div.style.left = `${x - this.div.getBoundingClientRect().width / 2}px`;
      this.div.style.top = `${y - this.div.getBoundingClientRect().height / 2}px`;
    }

    addToSlot(slot: number) {

      (slot == null ? Table : slots[slot]).appendChild(this.div);
      if (this.slot != null && board[this.slot] == this)
        delete board[this.slot];
      this.slot = slot;
      if (slot != null)
        board[slot] = this;
    }


    point(ind: number) {
      return sum(this.points[ind], this.at);
    }

    contains(p: V2) {
      return this.at.x <= p.x && this.at.y <= p.y && this.at.x + this.r.width >= p.x && this.at.y + this.r.height >= p.y;
    }
  }

  function allCards() {
    return Object.values(cards);
  }

  function bp(card: Card, other: Card): V2 {
    let pointInd = (other.at.x > card.at.x + 10 ? 1 : 0) + (other.at.y > card.at.y + 10 ? 2 : 0);
    return card.point(pointInd);;
  }


  let update = (t: number) => {
    window.requestAnimationFrame(update)
  }

  update(0);

  window.onmousemove = e => { }

  window.onwheel = e => { };

  function splitEmojis(t): string[] {
    return t.split(emogiRegEx).filter(a => a && a != ' ');
  }

  function fract(n: number) {
    return n - ~~n;
  }

  function splitLandmarks(t) {
    let array = t.split(" ");
    let r = [];
    const chunkSize = 3;
    for (let i = 0; i < array.length; i += chunkSize) {
      r.push({ icon: array[i], x: array[i + 1] - 8, y: array[i + 2] - 12 });
    }
    let html = "<div id=WorldIcon>????</div>";
    for (let m of r) {
      m.cell = ~~(m.x / 100 * columns) + ~~((m.y + 3) / 100 * rows) * columns;
      landmarkIn[m.cell] = m;
      html += `<div class="lmi" id=${m.icon} style="left:${m.x}%;top:${m.y}%;">${m.icon}</div>`
    }
    document.getElementById("World").innerHTML = html;

    return r;
  }

  for (let i = 0; i < columns * rows; i++) {
    addSlot();
  }

  const photos = splitEmojis("??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????");
  const evidence = splitEmojis("????????????????????????????????????????????????????????????????????????????????????????????????????????????????");
  const landmarkIn = {};
  const landmarks = splitLandmarks("???? 38 52 ???? 79 74 ???? 86 54 ???? 63 58 ???? 71 65 ???? 61 40 ???? 68 51 ??? 43 85 ???? 80 52 ???? 96 70 ???? 27 52 ??? 54 66 ???? 60 85 ???? 87 86 ???? 45 23");

  const words = Object.keys(window).filter(w => w.length < 10);

  function randomText(len: number = 0) {
    return len ? [...new Array(len)].map(v => randomElement(words)).join(" ") : ""
  }

  function addSlot() {
    let slot = document.createElement("div")
    slot.classList.add("slot");
    slot.id = slotn++ as any;
    slots[slot.id] = slot;
    makeDroppable(slot);
    Board.appendChild(slot);
  }

  let preventDoubleDrop = false;

  function makeDroppable(div: HTMLDivElement) {
    div.ondragover = e => e.preventDefault();
    div.ondrop = e => {
      e.preventDefault();
      if (preventDoubleDrop) {
        preventDoubleDrop = false;
        return;
      }
      let data = e.dataTransfer.getData("text");
      let slotId = div.id == "Table" ? null : div.id as any;
      if (slotId != null)
        preventDoubleDrop = true;
      let card = cards[data];
      card.move(slotId, e.clientX, e.clientY);
      relink();
    }
  }


  function connectedTo(card: Card) {
    let cc = links.map(l => l.a == card ? l.b : l.b == card ? l.a : null).filter(c => c);
    return cc;
  }

  function connectedLinks(card: Card) { return links.filter(l => l.a == card || l.b == card) }

  function highlightNeighbors(cardDiv) {
    let card = cards[cardDiv?.id];
    for (let c of allCards())
      if (c.slot)
        slots[c.slot].classList.remove("hl");
    if (card)
      for (let connected of connectedTo(card))
        if (connected.slot)
          slots[connected.slot].classList.add("hl")
    relink(connectedLinks(card));
  }


  function relink(highlighted: Link[] = []) {
    for (let c of allCards())
      c.recalculate();

    links.forEach(l => l.update(bp(l.a, l.b), bp(l.b, l.a)));

    Pins.innerHTML = links.map(l => [l.ap, l.bp]).flat().map(v =>
      `<div class="pin" style="left:${v.x - 3}px;top:${v.y - 7}px">????</div>`
    ).join(" ");

    let path = links.map(l => l.toPath());

    win = (level < 5 || seed != "100") && path.every(p => !p[0]) && allCards().every(c => c.slot != null);

    StringsPath.setAttribute("d", path.filter(v => !v[0]).map(v => v[1]).join(" "));
    StringsWrongPath.setAttribute("d", path.filter(v => v[0]).map(v => v[1]).join(" "));
    HighlightPath.setAttribute("d", path.filter(v => highlighted.includes(v[2])).map(v => v[1]).join(" "));
    savePosition();
    showLine();
  }

  function shuffleSlots(cards: { slot: number, type: string }[]) {
    for (let card of cards) {
      if (card.type == "lm")
        continue;
      let other = randomElement(cards);
      if (other.type == "lm")
        continue;
      let s = other.slot;
      other.slot = card.slot;
      card.slot = s;
    }
    return cards;
  }

  function initPosition(s: number) {
    RNG(s);
    let p = new Generator().generate(s.toString());
    loadPosition(p)
  }

  function divPosition(div: HTMLDivElement) {
    return [div.style.left, div.style.top];
  }

  function savePosition() {
    let data = {
      seed,
      leveln,
      line,
      maxLevel,
      cards: allCards().map(c => ({
        id: c.id,
        type: c.type,
        slot: c.slot,
        at: divPosition(c.div)
      })),
      links: links.map(l => [l.a.id, l.b.id])
    }
    localStorage.mumamo = JSON.stringify(data);
  }

  function loadPosition(data) {
    for(let c of allCards()){
      c.div.remove();
    }
    cards = {};
    links = [];
    board = [];
    if (data.line != null)
      line = data.line;
    if (data.maxLevel != null)
      maxLevel = data.maxLevel;
    if (data.leveln != null)
      leveln = data.leveln;
    if (data.seed != null)
      seed = data.seed;
    level = levels[leveln];
    for (let s of slots) {
      s.innerHTML = "";
    }
    RNG(seed);
    console.log("R", data.seed, rng(10));
    for (let c of data.cards)
      new Card(c);
    for (let l of removeDuplicateLinks(data.links))
      new Link(l[0], l[1]);
    relink();
    Input.value = seed;
  }


  window.onresize = () => relink();
  window.onkeydown = (e: KeyboardEvent) => {
    if (e.target == Input) {
      if(leveln != FinalLevel){
        e.preventDefault();
        return;      
      }

      setTimeout(() => {
        Input.value = Input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        if(Input.value.length>=3){
          initPosition(Number(Input.value));      
        }
      }, 1);
    } else {
      if (e.code.substring(0, 5) == "Digit") {
        playLevel(Number(e.key) - 1);
      }
      if(e.key == " "){
        line = line==level.length?1:level.length;
        showLine();
      }      
    }
  }

  function playLevel(n) {
    if(n>FinalLevel)
      return;
    leveln = n;
    level = levels[n];
    line = 1;
    seed = Number(level[0]);
    initPosition(seed);    
  }

  function showLine(increment = false) {
    if (increment)
      line++;
    if (level[line] == "*")
      line++;
    Char.innerHTML = line % 2 ? "???????" : "????????????????";
    CST.innerHTML = win ? "<div class='WD'>Well done!</div>" : level[line];
    Talk.style.display = line >= level.length && !win ? "none" : "flex";
    savePosition();
    Input.style.pointerEvents = leveln == FinalLevel?"all":"none";    
    Input.style.border =  leveln == FinalLevel?"":"none";
  }

  function removeDuplicateLinks(links: [string, string][]) {
    let h = {};
    for (let l of links)
      h[l[0] + l[1]] = l;
    return Object.values(h);
  }

  function idToCoord(id: number) {
    return { x: id % columns, y: ~~(id / columns) }
  }

  function slotDistance(a: number, b: number) {
    return dist(idToCoord(a), idToCoord(b));
  }

  Talk.onclick = () => {
    if (win && leveln < levels.length - 1)
      playLevel(leveln + 1);
    else
      showLine(true);
  }

  makeDroppable(Table)

  if (localStorage.mumamo) {
    loadPosition(JSON.parse(localStorage.mumamo));
    showLine();
  } else {
    playLevel(0);
  }



}