(()=>{var e;function v(E){E==null&&(E=Math.random()),0<E&&E<1&&(E=~~(E*2147483648));let l=n=>(E=E*16807%2147483647)%n;return e=n=>n==-1?E:n==null?l(2147483648)/2147483648:l(n),e}function r(E,l=e){if(!E)return null;let n=l(E.length);return E[n]}function x(E,l){let n=E.length;for(let o=1;o<n;o++){let A=l(n);A!=o&&([E[o],E[A]]=[E[A],E[o]])}return console.log(E),E}var $=/([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;{let n=function(D){return D.split($).filter(Boolean)},m=function(D=0){return D?[...new Array(D)].map(F=>r(b)).join(" "):""},L=function(D,F=Board){let u=document.createElement("div");u.classList.add("slot"),u.id=y++,f(u),F.appendChild(u),D&&(w(u,D),d.push(D))},f=function(D){D.ondragover=F=>F.preventDefault(),D.ondrop=F=>{if(F.preventDefault(),a){a=!1;return}let u=F.dataTransfer.getData("text");console.log("drop",D.id,u),D.id!="Table"&&(a=!0);let C=document.getElementById(u);M(C,D,F.screenX,F.screenY)}},M=function(D,F,u,C){if(F.id!="Table"&&F.childNodes.length>0){let t=F.childNodes[0];D.parentElement.appendChild(t),t.style.left=D.style.left,t.style.top=D.style.top}F.appendChild(D),D.style.left=`${u-D.getBoundingClientRect().width/2}px`,D.style.top=`${C-D.getBoundingClientRect().height}px`,g()},w=function(D,{photo:F,type:u}){u=u||"po";let C=document.createElement("div");D.appendChild(C),B.push(C),C.classList.add("card",u),C.style.transform=`translate(${e()*10-5}px, ${e()*10-5}px) rotate(${e()*6-3}deg)`,C.style.width=u=="np"?`${e()*2+4}em`:u=="nt"?`${e()*3+3}em`:"",C.draggable=!0,C.id=F,C.ondragstart=S=>S.dataTransfer.setData("text",F),C.onmouseenter=()=>c(C),C.onmouseleave=()=>c(null);let t={po:3,np:150,nt:3}[u]||0,i={np:1}[u]||0,R={np:e(2)+1}[u],p=u=="np"&&r(["left","right","center"]),k=`"
      background:hsl(${e(360)}, 50%, 10%); 
      float: ${p}; ${p=="center"&&"width:100%;"}
    "`;C.innerHTML=`<div class="note" style="columns: ${R};">
      <h1>${m(e(i)+i)}</h1>
      <div class="photo" style=${k}>
      ${F}
      </div>
      <span>${m(e(~~(t/3))+t)}</span>
    </div>`,C.style.background=`hsl(${e(360)}, 20%, 95%)`,d[D.id]=C.id},c=function(D){for(let F of B)F.classList.remove("hl");if(D)for(let F of s){let u=F[0]==D?F[1]:F[1]==D?F[0]:null;u&&u.classList.add("hl")}},H=function(D,F=0){return D.map(([u,C])=>{u=[u[0],u[1]+F],C=[C[0],C[1]+F];let t=[u[0]/2+C[0]/2,u[1]/2+C[1]/2+Math.min(100,Math.abs(u[0]-C[0])*.3)];return`M${u[0]} ${u[1]} Q${t[0]} ${t[1]} ${C[0]} ${C[1]}`})},g=function(){let D=s.map(([F,u])=>[h(F,u),h(u,F)]);Pins.innerHTML=D.flat(1).map(([F,u])=>`<div class="pin" style="left:${F-3}px;top:${u-7}px">\u{1F4CD}</div>`).join(" "),StringsPath.setAttribute("d",H(D).join(" "))},h=function(D,F){let u=10,C=D.getBoundingClientRect(),t=F.getBoundingClientRect();return[t.left>C.left+10?C.right-u:C.left+u,t.top>C.top+10?C.bottom-u:C.top+u]},G=function(D,F,u,C){let t=(1-C)**2,i=C**2;return[u.x+t*(D.x-u.x)+i*(F.x-u.x),u.y+t*(D.y-u.y)+i*(F.y-u.y)]},q=function(D){let F=D.getBoundingClientRect();return`${~~F.left+10} ${~~F.top+10}`};v();let E=6,l=D=>{window.requestAnimationFrame(l)};l(0),window.onmousemove=D=>{},window.onwheel=D=>{};let o=n("\u{1F935}\u{1F470}\u{1F931}\u{1F468}\u200D\u2695\uFE0F\u{1F469}\u200D\u2695\uFE0F\u{1F468}\u200D\u{1F393}\u{1F469}\u200D\u{1F393}\u{1F468}\u200D\u2696\uFE0F\u{1F469}\u200D\u2696\uFE0F\u{1F468}\u200D\u{1F33E}\u{1F469}\u200D\u{1F33E}\u{1F468}\u200D\u{1F373}\u{1F469}\u200D\u{1F373}\u{1F468}\u200D\u{1F527}\u{1F469}\u200D\u{1F527}\u{1F468}\u200D\u{1F3ED}\u{1F469}\u200D\u{1F3ED}\u{1F468}\u200D\u{1F4BC}\u{1F469}\u200D\u{1F4BC}\u{1F468}\u200D\u{1F52C}\u{1F469}\u200D\u{1F52C}\u{1F468}\u200D\u{1F4BB}\u{1F469}\u200D\u{1F4BB}\u{1F468}\u200D\u{1F3A4}\u{1F469}\u200D\u{1F3A4}\u{1F468}\u200D\u{1F3A8}\u{1F469}\u200D\u{1F3A8}\u{1F468}\u200D\u2708\uFE0F\u{1F469}\u200D\u2708\uFE0F\u{1F468}\u200D\u{1F680}\u{1F469}\u200D\u{1F680}\u{1F468}\u200D\u{1F692}\u{1F469}\u200D\u{1F692}\u{1F46E}\u200D\u2642\uFE0F\u{1F46E}\u200D\u2640\uFE0F\u{1F575}\uFE0F\u200D\u2642\uFE0F\u{1F575}\uFE0F\u200D\u2640\uFE0F\u{1F482}\u200D\u2642\uFE0F\u{1F482}\u200D\u2640\uFE0F\u{1F477}\u200D\u2642\uFE0F\u{1F477}\u200D\u2640\uFE0F\u{1F9D9}\u200D\u2640\uFE0F\u{1F9D9}\u200D\u2642\uFE0F\u{1F9DA}\u200D\u2640\uFE0F\u{1F9DA}\u200D\u2642\uFE0F\u{1F9DB}\u200D\u2640\uFE0F\u{1F9DB}\u200D\u2642\uFE0F\u{1F9DC}\u200D\u2640\uFE0F\u{1F9DC}\u200D\u2642\uFE0F\u{1F9DD}\u200D\u2640\uFE0F\u{1F9DD}\u200D\u2642\uFE0F\u{1F9DE}\u200D\u2640\uFE0F\u{1F9DE}\u200D\u2642\uFE0F\u{1F9DF}\u200D\u2640\uFE0F\u{1F9DF}\u200D\u2642\uFE0F"),A=n("\u{1F5FF}\u{1F5FD}\u{1F5FC}\u{1F3F0}\u{1F3EF}\u{1F3A1}\u{1F3A2}\u{1F3A0}\u{1F30B}\u{1F307}\u{1F306}\u{1F303}"),j=n("\u{1FA93}\u{1F52A}\u{1F38E}\u{1F380}\u{1F9FF}\u{1F9F8}\u{1F9F5}\u{1F4FF}\u{1F48E}\u{1F4F1}\u{1F4BE}\u{1F4C0}\u{1F4FC}\u{1F526}\u{1F4D3}\u{1F4D2}\u{1F4B5}\u270F\uFE0F\u{1F58B}\uFE0F\u{1F58C}\uFE0F\u{1F5C2}\uFE0F\u2702\uFE0F\u{1F513}\u{1F5E1}\uFE0F\u{1F511}\u{1F5DD}\uFE0F\u{1F527}\u2699\uFE0F\u{1F489}\u{1FA92}\u{1F6AC}"),P="\u{1F9E7}\u{1F4F0}\u{1F4C3}\u2709\uFE0F\u{1F9FE}",T=o,b=Object.keys(window).filter(D=>D.length<10),B=[],y=0,d=[],V=[],a=!1;f(Table);let N=x(T,e);for(let D of N.slice(0,72))L(e(2)?{photo:D,type:r(["po","np","nt"])}:null);let s=[];for(let D=0;D<B.length;D++){let F=B[D],u=r(B);F!=u&&!s.find(C=>C[0]==F&&C[1]==u)&&s.push([F,u])}g()}})();
//# sourceMappingURL=bundle.js.map
