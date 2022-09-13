(() => {
  // src/util.ts
  var maxN = 2 ** 31;
  var rng;
  function RNG(seed) {
    if (seed == null)
      seed = Math.random();
    if (0 < seed && seed < 1)
      seed = ~~(seed * maxN);
    let rngi = (n) => {
      return (seed = seed * 16807 % 2147483647) % n;
    };
    rng = (n) => {
      return n == -1 ? seed : n == null ? rngi(maxN) / maxN : rngi(n);
    };
    return rng;
  }
  function randomElement(list, gen = rng) {
    if (!list)
      return null;
    let n = gen(list.length);
    return list[n];
  }
  function shuffle(arr, rng2) {
    arr = [...arr];
    let l = arr.length;
    for (let i = 1; i < l; i++) {
      let r = rng2(l);
      if (r != i) {
        [arr[i], arr[r]] = [
          arr[r],
          arr[i]
        ];
      }
    }
    return arr;
  }
  var emogiRegEx = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;

  // src/plot.ts
  var plot = `1301
*
So, Detective, what will be my first task as your Assistant?
Hmm hmm hmm yes! See this board? It's so called Evidence Board, also known as the MURDER MAP!
Eeek!
Do not fret. It's mostly harmless. It just helps me to visualise evidence I have and connections between the pieces of it.
Looks messy.
Indeed! And this is where you come into picture. You will help me to untangle it. Move pieces around, so strings stop crossing over cards.
Hmm, I guess I can do that. Anything else?
Also, in the end, all cards should be on the board. But you can temporarily move them to the sides. That's it.
OK, I think I can do it.
Note to player - with the Space key you can skip all the talks at once, or restart whole dialog anew.
=160
You was a great help last time.
I have just moved some paper around.
And did it splendidly! Now I have another task for you.
Let me guess...
Yes! Another tangled board to untangle.
Will it teach me how to solve cases?
It will teach you to untangle strings!
Sigh... OK.
=26560
Aaaand... another board!
At least this time I actually have helped to add some pieces to it.
Yes! Pieces that have added a lot of new strings to untangle!
Yay, I guess.
=265801
*
So. Many. Strings.
Yes. It's all connected. 
Will it make solving it harder or easier?
We'll see. Will it make placing it easier?
We'll see. I'm not sure it's even possible.
=37070645
Are you sure it's them?
Yes. A little African country in the centre of EVERYTHING.
It will be hard to prove it.
Fitting this all on board will be hard too. Maybe we need a bigger board?
Do not slack. This one is enough.
=100
So, this is it. Sorry, no big final.
You can use numbers 1-5 to jump to level. 
Or press 6 to get here and then input numbers up there \u2196 to enter any number to generate a custom level.
Digits 2-3 set density of cards (in percents)
If the first digit is 2, it uses different generation, that (hopefully) guarantees solvability. 
Also in that case digits 4-5 define density of links
First digit 3 is like 2, but then digits 6-7 are coords of the "hub" cell that will have a lot of connections, if it is a landmark.
That's it! Thanks for playing. 
Please leave feedback. Maybe ideas for beter plots or gameplay variations.
`;

  // src/main.ts
  {
    let allCards = function() {
      return Object.values(cards);
    }, bp = function(card, other) {
      let pointInd = (other.at.x > card.at.x + 10 ? 1 : 0) + (other.at.y > card.at.y + 10 ? 2 : 0);
      return card.point(pointInd);
      ;
    }, splitEmojis = function(t) {
      return t.split(emogiRegEx).filter((a) => a && a != " ");
    }, fract = function(n) {
      return n - ~~n;
    }, splitLandmarks = function(t) {
      let array = t.split(" ");
      let r = [];
      const chunkSize = 3;
      for (let i = 0; i < array.length; i += chunkSize) {
        r.push({ icon: array[i], x: array[i + 1] - 8, y: array[i + 2] - 12 });
      }
      let html = "<div id=WorldIcon>\u{1F5FA}</div>";
      for (let m of r) {
        m.cell = ~~(m.x / 100 * columns) + ~~((m.y + 3) / 100 * rows) * columns;
        landmarkIn[m.cell] = m;
        html += `<div class="lmi" id=${m.icon} style="left:${m.x}%;top:${m.y}%;">${m.icon}</div>`;
      }
      document.getElementById("World").innerHTML = html;
      return r;
    }, randomText = function(len = 0) {
      return len ? [...new Array(len)].map((v) => randomElement(words)).join(" ") : "";
    }, addSlot = function() {
      let slot = document.createElement("div");
      slot.classList.add("slot");
      slot.id = slotn++;
      slots[slot.id] = slot;
      makeDroppable(slot);
      Board.appendChild(slot);
    }, makeDroppable = function(div) {
      div.ondragover = (e) => e.preventDefault();
      div.ondrop = (e) => {
        e.preventDefault();
        if (preventDoubleDrop) {
          preventDoubleDrop = false;
          return;
        }
        let data = e.dataTransfer.getData("text");
        let slotId = div.id == "Table" ? null : div.id;
        if (slotId != null)
          preventDoubleDrop = true;
        let card = cards[data];
        card.move(slotId, e.clientX, e.clientY);
        relink();
      };
    }, connectedTo = function(card) {
      let cc = links.map((l) => l.a == card ? l.b : l.b == card ? l.a : null).filter((c) => c);
      return cc;
    }, connectedLinks = function(card) {
      return links.filter((l) => l.a == card || l.b == card);
    }, highlightNeighbors = function(cardDiv) {
      let card = cards[cardDiv?.id];
      for (let c of allCards())
        if (c.slot)
          slots[c.slot].classList.remove("hl");
      if (card) {
        for (let connected of connectedTo(card))
          if (connected.slot)
            slots[connected.slot].classList.add("hl");
      }
      relink(connectedLinks(card));
    }, relink = function(highlighted = []) {
      for (let c of allCards())
        c.recalculate();
      links.forEach((l) => l.update(bp(l.a, l.b), bp(l.b, l.a)));
      Pins.innerHTML = links.map((l) => [l.ap, l.bp]).flat().map(
        (v) => `<div class="pin" style="left:${v.x - 3}px;top:${v.y - 7}px">\u{1F4CD}</div>`
      ).join(" ");
      let path = links.map((l) => l.toPath());
      win = (level < 5 || seed != "100") && path.every((p) => !p[0]) && allCards().every((c) => c.slot != null);
      StringsPath.setAttribute("d", path.filter((v) => !v[0]).map((v) => v[1]).join(" "));
      StringsWrongPath.setAttribute("d", path.filter((v) => v[0]).map((v) => v[1]).join(" "));
      HighlightPath.setAttribute("d", path.filter((v) => highlighted.includes(v[2])).map((v) => v[1]).join(" "));
      savePosition();
      showLine();
    }, shuffleSlots = function(cards2) {
      for (let card of cards2) {
        if (card.type == "lm")
          continue;
        let other = randomElement(cards2);
        if (other.type == "lm")
          continue;
        let s = other.slot;
        other.slot = card.slot;
        card.slot = s;
      }
      return cards2;
    }, initPosition = function(s) {
      RNG(s);
      let p = new Generator().generate(s.toString());
      loadPosition(p);
    }, divPosition = function(div) {
      return [div.style.left, div.style.top];
    }, savePosition = function() {
      let data = {
        seed,
        leveln,
        line,
        maxLevel,
        cards: allCards().map((c) => ({
          id: c.id,
          type: c.type,
          slot: c.slot,
          at: divPosition(c.div)
        })),
        links: links.map((l) => [l.a.id, l.b.id])
      };
      localStorage.mumamo = JSON.stringify(data);
    }, loadPosition = function(data) {
      for (let c of allCards()) {
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
    }, playLevel = function(n) {
      if (n > FinalLevel)
        return;
      leveln = n;
      level = levels[n];
      line = 1;
      seed = Number(level[0]);
      initPosition(seed);
    }, showLine = function(increment = false) {
      if (increment)
        line++;
      if (level[line] == "*")
        line++;
      Char.innerHTML = line % 2 ? "\u{1F575}\uFE0F" : "\u{1F575}\uFE0F\u200D\u2640\uFE0F";
      CST.innerHTML = win ? "<div class='WD'>Well done!</div>" : level[line];
      Talk.style.display = line >= level.length && !win ? "none" : "flex";
      savePosition();
      Input.style.pointerEvents = leveln == FinalLevel ? "all" : "none";
      Input.style.border = leveln == FinalLevel ? "" : "none";
    }, removeDuplicateLinks = function(links2) {
      let h = {};
      for (let l of links2)
        h[l[0] + l[1]] = l;
      return Object.values(h);
    }, idToCoord = function(id) {
      return { x: id % columns, y: ~~(id / columns) };
    }, slotDistance = function(a, b) {
      return dist(idToCoord(a), idToCoord(b));
    };
    const v2 = (x, y) => ({ x, y });
    const sum = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
    const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
    const dist = (a, b) => length(sub(a, b));
    const length = (a) => (a.x ** 2 + a.y ** 2) ** 0.5;
    let levels = plot.split("=").map((s) => s.trim().split("\n"));
    let seed;
    let level;
    let line = 1;
    let leveln = 0;
    let maxLevel = 0;
    let win = false;
    const FinalLevel = 5;
    const slots = [];
    let cards = {};
    let links = [];
    let board = [];
    let slotn = 0;
    const columns = 12, rows = 6, totalSlots = columns * rows;
    class Link {
      constructor(aId, bId) {
        this.a = cards[aId];
        this.b = cards[bId];
        links.push(this);
      }
      update(ap, bp2) {
        this.ap = ap;
        this.bp = bp2;
        this.length = this.a.slot != null && this.b.slot != null ? dist(idToCoord(this.a.slot), idToCoord(this.b.slot)) : 0;
        this.cp = v2(ap.x / 2 + bp2.x / 2, ap.y / 2 + bp2.y / 2 + Math.min(100, Math.abs(ap.x - bp2.x) * 0.3));
      }
      curve(t) {
        let { ap, bp: bp2, cp } = this;
        let v = (1 - t) ** 2, w = t ** 2;
        return v2(cp.x + v * (ap.x - cp.x) + w * (bp2.x - cp.x), cp.y + v * (ap.y - cp.y) + w * (bp2.y - cp.y));
      }
      toPath() {
        let { ap, bp: bp2, cp } = this;
        let covered = this.overlapping();
        return [covered, `M${ap.x} ${ap.y} Q${cp.x} ${cp.y} ${bp2.x} ${bp2.y}`, this];
      }
      overlapping() {
        if (slotDistance(this.a.slot, this.b.slot) < 2)
          return null;
        let steps = this.length * 2;
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
      constructor() {
        this.shuffled = shuffle(photos, rng);
        this.shuffledEvidence = shuffle(evidence, rng);
      }
      nextCard(slot, type) {
        let id;
        if (slot != null && landmarkIn[slot] && rng(3) == 0 || type == "lm") {
          id = landmarkIn[slot].icon;
          type = "lm";
        } else {
          type = type || randomElement(["ev", "po", "np", "nt", "st"]);
          id = (type == "ev" ? this.shuffledEvidence : this.shuffled).pop();
        }
        return { type, id };
      }
      simpleCards(chance, guaranteed) {
        let cards2 = [];
        let slots2 = shuffle([...new Array(totalSlots)].map((_, i) => i), rng);
        slots2 = slots2.slice(0, ~~(totalSlots * chance));
        if (guaranteed && !slots2.includes(guaranteed))
          slots2.push(guaranteed);
        slots2 = slots2.sort();
        for (let slot of slots2) {
          let { type, id } = this.nextCard(slot, slot == guaranteed && landmarkIn[slot] && "lm");
          if (id)
            cards2.push({ id, type, slot });
        }
        return cards2;
      }
      neighborLinks(cards2, linkChance, hub) {
        let b = [];
        let links2 = [];
        for (let c of cards2)
          b[c.slot] = c.id;
        for (let slot = 0; slot < totalSlots - columns; slot++) {
          if (!b[slot])
            continue;
          if ((slot + 1) % columns == 0)
            continue;
          for (let other of [1, columns, 1 + columns]) {
            if (b[slot] && b[slot + other] && other && (hub == slot || hub == slot + other))
              links2.push([b[slot], b[slot + other]]);
          }
          if (rng() < linkChance && b[slot + 1])
            links2.push([b[slot], b[slot + 1]]);
          if (rng() < linkChance && b[slot + columns])
            links2.push([b[slot], b[slot + columns]]);
          if (rng() < linkChance && b[slot + columns + 1])
            links2.push([b[slot], b[slot + columns + 1]]);
          if (slot % columns > 0 && rng() < linkChance && b[slot + columns - 1])
            links2.push([b[slot], b[slot + columns - 1]]);
        }
        return links2;
      }
      randomLinks(cards2) {
        let links2 = [];
        for (let c1 of cards2.map((c) => c.id)) {
          let c2 = randomElement(cards2).id;
          if (c1 != c2 && !links2.find((l) => l[0] == c1 && l[1] == c2 || l[1] == c1 && l[0] == c2)) {
            links2.push([c1, c2]);
          }
        }
        return links2;
      }
      generate(lseed) {
        RNG(Number(lseed));
        console.log({ seed: lseed });
        let density = Number(lseed.substring(1, 3)) / 100 || 0;
        let density2 = Number(lseed.substring(3, 5)) / 100;
        let landmark = Number(lseed[5]) - 1 + (Number(lseed[6]) - 1) * columns;
        let cards2, links2;
        switch (lseed[0]) {
          case "2":
            cards2 = this.simpleCards(density);
            links2 = this.neighborLinks(cards2, density2);
            cards2 = shuffleSlots(cards2);
            break;
          case "3":
            cards2 = this.simpleCards(density, landmark);
            links2 = this.neighborLinks(cards2, density2, landmark);
            cards2 = shuffleSlots(cards2);
            break;
          default:
            cards2 = this.simpleCards(density);
            links2 = this.randomLinks(cards2);
            break;
        }
        return { cards: cards2, links: links2, seed: lseed };
      }
    }
    class Card {
      constructor({ id, type, slot, at }) {
        this.points = [];
        let div;
        type = type || "po";
        this.type = type;
        this.id = id;
        div = document.createElement("div");
        if (type == "lm") {
          let m = landmarks.find((lm) => lm.icon == id);
          div.style.marginLeft = `calc(-2rem + ${fract(m.x / 100 * columns) * 100}%)`;
          div.style.marginTop = `calc(-1.5rem + ${fract(m.y / 100 * rows) * 100}%)`;
          div.innerHTML = "O";
          div.style.fontSize = `${rng(4) + 3}rem;`;
          div.classList.add("lm", type);
        } else {
          div.classList.add("card", type);
          if (!rng(4))
            div.classList.add("warp");
          let rot = rng() * 6 - 3;
          div.style.transform = `translate(${rng() * 10 - 5}px, ${rng() * 10 - 5}px) rotate(${rot}deg)`;
          div.style.width = type == "nt" ? `${rng() * 0.5 + 1}em` : "";
          div.draggable = true;
          div.ondragstart = (e) => e.dataTransfer.setData("text", id);
          let words2 = { po: 3, np: 150, nt: 3 }[type] || 0;
          let title = { np: 1, st: 3 }[type] || 0;
          let columns2 = { np: rng(2) + 1 }[type];
          let float = type == "np" && randomElement(["left", "right", "center"]);
          let paper = type != "ev" && type != "do";
          let style = `background:hsla(${rng(360)}, 50%, 10%, ${paper ? 100 : 0}%); 
        float: ${float}; ${float == "center" ? "width:100%;" : ""};`;
          if (type == "ev") {
            let evInd = evidence.indexOf(id);
            style += `transform: rotateZ(${evInd < 4 ? -45 : evInd < 7 ? 45 : 0}deg);`;
          }
          let mark = paper && rng(8) == 0;
          div.innerHTML = `
        <div class="note" style="columns: ${columns2};">
          ${title > 0 ? `<h1>${randomText(rng(title) + title)}</h1>` : ""}
          <div class="${type == "nt" && ["invert", "green", "gray"][rng(10)]} photo" style="${style}">
            ${id}
          </div>
          <span style="transform:rotate(${-rot + rng() * 3 - 1.5}deg)">${randomText(rng(~~(words2 / 3)) + words2)}</span>
        </div>
        <div class="overlay">${mark ? "\u2718\u2718!?"[rng(4)] : type == "do" ? "" : ""}</div>`;
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
          let p;
          if (this.type == "lm") {
            p = v2(r.width / 2, r.height / 2);
          } else {
            p = v2(
              i % 2 == 1 ? r.width - margin : margin,
              i < 2 ? margin : r.height - (this.type == "nt" ? 0 : margin)
            );
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
      move(slot, x, y) {
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
      addToSlot(slot) {
        (slot == null ? Table : slots[slot]).appendChild(this.div);
        if (this.slot != null && board[this.slot] == this)
          delete board[this.slot];
        this.slot = slot;
        if (slot != null)
          board[slot] = this;
      }
      point(ind) {
        return sum(this.points[ind], this.at);
      }
      contains(p) {
        return this.at.x <= p.x && this.at.y <= p.y && this.at.x + this.r.width >= p.x && this.at.y + this.r.height >= p.y;
      }
    }
    let update = (t) => {
      window.requestAnimationFrame(update);
    };
    update(0);
    window.onmousemove = (e) => {
    };
    window.onwheel = (e) => {
    };
    for (let i = 0; i < columns * rows; i++) {
      addSlot();
    }
    const photos = splitEmojis("\u{1F935}\u{1F470}\u{1F931}\u{1F468}\u200D\u2695\uFE0F\u{1F469}\u200D\u2695\uFE0F\u{1F468}\u200D\u{1F393}\u{1F469}\u200D\u{1F393}\u{1F468}\u200D\u2696\uFE0F\u{1F469}\u200D\u2696\uFE0F\u{1F468}\u200D\u{1F33E}\u{1F469}\u200D\u{1F33E}\u{1F468}\u200D\u{1F373}\u{1F469}\u200D\u{1F373}\u{1F468}\u200D\u{1F527}\u{1F469}\u200D\u{1F527}\u{1F468}\u200D\u{1F3ED}\u{1F469}\u200D\u{1F3ED}\u{1F468}\u200D\u{1F4BC}\u{1F469}\u200D\u{1F4BC}\u{1F468}\u200D\u{1F52C}\u{1F469}\u200D\u{1F52C}\u{1F468}\u200D\u{1F4BB}\u{1F469}\u200D\u{1F4BB}\u{1F468}\u200D\u{1F3A4}\u{1F469}\u200D\u{1F3A4}\u{1F468}\u200D\u{1F3A8}\u{1F469}\u200D\u{1F3A8}\u{1F468}\u200D\u2708\uFE0F\u{1F469}\u200D\u2708\uFE0F\u{1F468}\u200D\u{1F680}\u{1F469}\u200D\u{1F680}\u{1F468}\u200D\u{1F692}\u{1F469}\u200D\u{1F692}\u{1F46E}\u200D\u2642\uFE0F\u{1F46E}\u200D\u2640\uFE0F\u{1F575}\uFE0F\u200D\u2642\uFE0F\u{1F575}\uFE0F\u200D\u2640\uFE0F\u{1F482}\u200D\u2642\uFE0F\u{1F482}\u200D\u2640\uFE0F\u{1F477}\u200D\u2642\uFE0F\u{1F477}\u200D\u2640\uFE0F\u{1F9D9}\u200D\u2640\uFE0F\u{1F9D9}\u200D\u2642\uFE0F\u{1F9DA}\u200D\u2640\uFE0F\u{1F9DA}\u200D\u2642\uFE0F\u{1F9DB}\u200D\u2640\uFE0F\u{1F9DB}\u200D\u2642\uFE0F\u{1F9DC}\u200D\u2640\uFE0F\u{1F9DC}\u200D\u2642\uFE0F\u{1F9DD}\u200D\u2640\uFE0F\u{1F9DD}\u200D\u2642\uFE0F\u{1F9DE}\u200D\u2640\uFE0F\u{1F9DE}\u200D\u2642\uFE0F\u{1F9DF}\u200D\u2640\uFE0F\u{1F9DF}\u200D\u2642\uFE0F");
    const evidence = splitEmojis("\u{1F52A}\u{1F5E1}\uFE0F\u{1F511}\u{1F5DD}\uFE0F\u{1F527}\u270F\uFE0F\u{1F58B}\uFE0F\u{1F380}\u{1F4FF}\u{1F4F1}\u{1F4BE}\u{1F4C0}\u{1F4FC}\u{1F4D3}\u{1F4D2}\u{1F4B5}\u2702\uFE0F\u2699\uFE0F\u{1FA92}\u{1F4F0}\u2709\uFE0F\u{1F5C2}\uFE0F\u{1F9E7}");
    const landmarkIn = {};
    const landmarks = splitLandmarks("\u{1F5FD} 38 52 \u{1F30B} 79 74 \u{1F3EF} 86 54 \u{1F54B} 63 58 \u{1F6D5} 71 65 \u{1F301} 61 40 \u{1F54C} 68 51 \u26EA 43 85 \u{1F54D} 80 52 \u{1F6A2} 96 70 \u{1F309} 27 52 \u26F2 54 66 \u{1F98F} 60 85 \u{1F998} 87 86 \u{1F9CA} 45 23");
    const words = Object.keys(window).filter((w) => w.length < 10);
    let preventDoubleDrop = false;
    window.onresize = () => relink();
    window.onkeydown = (e) => {
      if (e.target == Input) {
        if (leveln != FinalLevel) {
          e.preventDefault();
          return;
        }
        setTimeout(() => {
          Input.value = Input.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
          if (Input.value.length >= 3) {
            initPosition(Number(Input.value));
          }
        }, 1);
      } else {
        if (e.code.substring(0, 5) == "Digit") {
          playLevel(Number(e.key) - 1);
        }
        if (e.key == " ") {
          line = line == level.length ? 1 : level.length;
          showLine();
        }
      }
    };
    Talk.onclick = () => {
      if (win && leveln < levels.length - 1)
        playLevel(leveln + 1);
      else
        showLine(true);
    };
    makeDroppable(Table);
    if (localStorage.mumamo) {
      loadPosition(JSON.parse(localStorage.mumamo));
      showLine();
    } else {
      playLevel(0);
    }
  }
})();
//# sourceMappingURL=bundle.js.map
