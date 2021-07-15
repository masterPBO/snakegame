let casUpdate=0; 
let hitrostKace=7;
const teloKace = [{x:10, y:10}];
let moc = nakljucnaPozicijaMoci();
let steviloJabolk = 0;
const plosca = document.getElementById("plosca");
let premikPozicije = {x:0, y:0};
let spremembaDolzine = 1;
let orginalnaDolzina = 0;
let konec_igre = false;
let upostevajTelo = true;
let naPol = false;
let tocke = 0;
var seconds = 11;
const leva= document.getElementById("ArrowLeft2");
if (highscore == 0){
    var highscore = 0;
} else {
    var highscore = localStorage.getItem("najvišji")
}
document.getElementById("displayscore").innerHTML = "Najboljši rezultat je:"+"\n" + localStorage.getItem("najvišji");
function incrementSeconds() {
    seconds += 1;
}
var cancel = setInterval(incrementSeconds, 1000);
    window.addEventListener('keydown', function(e){
            switch(e.key){
            case "ArrowUp":
                if(premikPozicije.y !== 0) break
                premikPozicije = {x:0, y:-1};
                break;
            case "ArrowDown":
                if(premikPozicije.y !== 0) break
                premikPozicije = {x:0, y:1};
                break;
            case "ArrowLeft":
                if(premikPozicije.x !== 0) break
                premikPozicije = {x:-1, y:0};
                break;
            case "ArrowRight":
                if(premikPozicije.x !== 0) break
                premikPozicije = {x:1, y:0};
                break;
        } 
    })
    window.addEventListener('click',function(){
        console.log("wow");
    });
    window.addEventListener('click',function(){
        console.log("wow");
    });
    window.addEventListener('click',function(){
        console.log("wow");
    });
    window.addEventListener('click',function(){
        console.log("wow");
    });

function main(cas){
    if(konec_igre){
        addigralec();
        if (confirm("Igre je konec. Klikni OK za ponovno igro.")){
            location.reload();
        }
        return
    }
    window.requestAnimationFrame(main);
    const sekundedozadnjegaupdata= (cas - casUpdate) / 1000;
    if(sekundedozadnjegaupdata < 1 / hitrostKace){
    return;
    }
    else{
        casUpdate=cas;
    }  
    posodobiKaco();
    risiKaco();
    risiMoc();
    posodobiMoc();
    konecIgre();
    if(upostevajTelo == false){
        var elements = document.getElementsByClassName('snake');
	    for(var i = 0; i < elements.length; i++){
            elements[i].style.borderColor = "rgb(0, 100, 0)";
        }
    }
}

window.requestAnimationFrame(main);

function posodobiKaco(){
    if(seconds>10){
        hitrostKace=hitrostKace+0.01;
    }

    razsiriKaco();

    const premikKace = pridobiPremik();
    for(let i=teloKace.length-2; i>=0; i--){
        teloKace[i+1] =  { ...teloKace[i] };
    }

    teloKace[0].x += premikKace.x;
    teloKace[0].y += premikKace.y;
}

function risiKaco(){
    plosca.innerHTML = '';
    teloKace.forEach(segment => {
        const kacaElement = document.createElement("div");
        kacaElement.style.gridRowStart = segment.y;
        kacaElement.style.gridColumnStart = segment.x;
        kacaElement.classList.add("snake");
        plosca.appendChild(kacaElement);
    })
}

function pridobiPremik(){ 
    return premikPozicije;
}

function posodobiMoc(){
    if(jeNaKaci(moc)){
        razsiri(spremembaDolzine);    
        moc = nakljucnaPozicijaMoci();
        steviloJabolk++;
        tocke = tocke +1;
    }
}

function risiMoc(){
    const mocElement = document.createElement("div");
    mocElement.style.gridRowStart = moc.y;
    mocElement.style.gridColumnStart = moc.x;
    mocElement.classList.add("moc");
    plosca.appendChild(mocElement);
}

function razsiri(dolzina){
    orginalnaDolzina =+ dolzina;
}

function razsiriKaco(){
    for(let i=0; i<orginalnaDolzina; i++){
        teloKace[teloKace.length] = { ...teloKace[teloKace.length-1]}
    }
    orginalnaDolzina = 0;
}


function jeNaKaci(pozicija, {brezGlave = false} = {}){
    return teloKace.some(function(segment, index) {
        if(brezGlave && index == 0){
            return false;
        }
        return equalPositions(segment, pozicija)
    })
}

function equalPositions(pos1, pos2){
    return pos1.x == pos2.x && pos1.y == pos2.y
}

function nakljucnaPozicijaMoci(){
    let pozicijaMoci;
    while(pozicijaMoci == null || jeNaKaci(pozicijaMoci)){
        pozicijaMoci = {
            x: Math.floor(Math.random() * 20 ) + 1,
            y: Math.floor(Math.random() * 20 ) + 1,
        }
    }
    return pozicijaMoci;
}

function konecIgre(){
    if(upostevajTelo){
        konec_igre = dotikRoba(teloKace[0]) || dotikTelesa();
    }
    else{
        konec_igre = dotikRoba(teloKace[0]);
    }
}

function dotikRoba(pozicijaGlave){
    if(pozicijaGlave.x < 1 || pozicijaGlave.x > 20){
        return true;
    }
    else if(pozicijaGlave.y < 1 || pozicijaGlave.y > 20){
        return true;
    }
    else{
        return false;
    }
}

function dotikTelesa(){
    return jeNaKaci(teloKace[0], {brezGlave: true})
}
function addigralec(){
    if (tocke > highscore) {
        alert("Čestitke! To je vaš najboljši rezultat, ki znaša " + tocke + " točk!")
        console.log(highscore)
        highscore = tocke;
        console.log(highscore)
        document.getElementById("displayscore").innerHTML = "Najboljši rezultat je: " + highscore;
    } else {
        alert("Konec igre. Vaš rezultat je: " + tocke);
    }
    localStorage.setItem("najvišji", highscore);
    console.log(localStorage.getItem("najvišji"));

}

