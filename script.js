let imgDiv = document.querySelectorAll("div.im");
let imgNo = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

let newImg = imgNo;
let imgNewNo = [];
//losowanie par obrazków
// console.log(imgDiv[0]);
const startTime = new Date().getTime();

function drawImg() {
    for (let i = 0; i < 18; i++) {
        let draw = Math.floor(Math.random() * newImg.length);
        imgNewNo.push(newImg[draw])
        newImg.splice(draw, 1)
    }
    for (let i = 0; i < imgNewNo.length; i++) {
        imgDiv[i].style.backgroundImage = `url(./img/i${imgNewNo[i]}.jpg)`
    }
    setTimeout(() => {
        for (let i = 0; i < 18; i++) {
            imgDiv[i].innerHTML = '<div class="zak"></div>';
        }
    }, 1000)
    let count = 0;
    let compareImg = []
    let wins = 0;
    //reakcja na klikanie
    imgDiv.forEach(a => a.addEventListener('click', function () {
        if (a.classList.contains('won')) return //blokowanie odkrytych par
        if (count === 2) return //blokowanie klikania powyżej 2x
        a.innerHTML = "";
        count++
        a.classList.add(`open`)
        compareImg.push(a.style.backgroundImage)
        //dwa te same usuwanie
        setTimeout(function () {
            if (count === 2 && (compareImg[0] === compareImg[1])) {
                imgDiv.forEach(img => {
                    if (img.classList.contains('open')) {
                        img.style.backgroundImage = ""
                        img.classList.remove('open')
                        img.classList.add('won')
                    }
                })
                compareImg = []
                wins++
            }
            //zasłanianie pozostałych obrazków
            if (count === 2) {
                console.log(count);
                count = 0;
                compareImg = []
                imgDiv.forEach(img => {
                    if (!img.classList.contains('won')) img.innerHTML = '<div class="zak"></div>'
                    img.classList.remove('open')
                })
            }
            //jak wygrana
            if (wins === 9) {
                const endTime = new Date().getTime();
                const gameTime = ((endTime - startTime) / 1000).toFixed()
                document.body.innerHTML = `<div class="winner" onclick="location.reload()"><h1>wygrałeś!</h1><br>twój czas to ${gameTime} sekund</div>`;
            }
        }, 1500)
    }))
}
drawImg()