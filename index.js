splashtext = [
    "unblocked games and more!",
    "hidden from google search :)",
    "not just games, unblocked games!"
]

async function sortgames(category) {
    let gamesgrid = document.querySelector('#grid')
    let games = document.querySelectorAll('.game')

    document.querySelectorAll(`ul li a.active`).forEach(function (element, i) {
        element.classList.remove('active');
    });
    document.querySelector(`#${category} a`).classList.add('active')

    gamesgrid.classList.add('fade')

    setTimeout(function() {
        for (g in games) {
            let game = games[g]
            if (typeof(game.classList) != "undefined") {
                if (!game.classList.contains(category) && category !== 'allgames') {
                    if (!game.classList.contains('invisible')) {
                        game.classList.add('invisible')
                    }
                }
                else if (category == 'allgames' || game.classList.contains(category)) {
                    if (game.classList.contains('invisible')) {
                        game.classList.remove('invisible')
                    }
                }
            }
        }
    }, 200);

    setTimeout(function() {
        if (gamesgrid.classList.contains('invisible')) {
            gamesgrid.classList.remove('invisible')
        }
        gamesgrid.classList.remove('fade')
    }, 300);

}

function cardGameHtml(name, desc, img, type) {
    return `<div id="${name}" class="game ${type} invisible">
        <img src="${img}">
        <span class="title">${name}</span>
        <span class="desc">${desc}</span>
    </div>`
}

async function loadfromjson(json) {
    let gamesgrid = document.querySelector('#grid')
    console.log(json)
    let games = JSON.parse(json);
    for (g in games) {
        let game = games[g]
        if (game.hidden) {
            continue
        } 
        else {
            let img = game.image 
            if (!game.image) {
                img = `assets/games/${g.replaceAll(' ', '')}/icon.png`
            }
            
            let html = cardGameHtml(g, game['card-desc'], img, game.type)
            gamesgrid.innerHTML += html
        }
    }
}

window.addEventListener('load', async function () {
    let gamesgrid = document.querySelector('#grid')
    let params = (new URL(document.location)).searchParams;
    let activecategory = params.get("category");
    if (!activecategory) {
        activecategory = "allgames"
    }

    let data = await fetch("assets/games/games.json")
        .then((res) => {
        return res.text();
    })

    await loadfromjson(data)

    let games = this.document.querySelectorAll('.game')
    games.forEach(function(game, i) {
        game.addEventListener('click', function(){
            window.location.href = `play.html?game=${game.id}`
        })
    })

    await sortgames(activecategory)

    let sorters = this.document.querySelectorAll('.selection li')
    for (i in sorters) {
        let sorter = sorters[i]
        if (typeof(sorter.id) != "undefined") {
            let link = sorter.querySelector('a')
            link.addEventListener("click", function(){
                sortgames(sorter.id)
            }, false);
        }
    }

    const text = splashtext[Math.floor(Math.random() * splashtext.length)];
    this.document.querySelector('#splashtext').innerText = text

    const random = Math.floor(Math.random() * 25)
    if ((random == 10)) {
        this.document.querySelector('.logo h2').innerText = 'github.io.unblockedgamin'
    }
})