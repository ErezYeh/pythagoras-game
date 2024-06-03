let board;
let cards = [];
let revealedCards = [];
let matches = 0;
const totalMatches = 5;

window.addEventListener("load", () => {
   board = document.getElementById("game-board");
   setupBoard();
});

function generateTrianglesC(n) {
    let triangles = [];
    for (let i = 0; i < n; i++) {
        let a = Math.floor(Math.random() * 20) + 1;
        let b = Math.floor(Math.random() * 20) + 1;
        let c = Math.round(Math.sqrt(a**2 + b**2) * 100) / 100;
        let valToShow = "c";
        triangles.push({a, b, c, valToShow});
    }
    return triangles;
}

function generateTrianglesAB(trianglesArr) {
    let newTriangles = [];
    for (let i = 0; i < trianglesArr.length; i++) {
        let a = trianglesArr[i].a;
        let b = trianglesArr[i].b;
        let c = trianglesArr[i].c;
        let valToShow = "ab";
        newTriangles.push({a, b, c, valToShow});
    }
    return newTriangles;
}

function setupBoard() {
    let trianglesC = generateTrianglesC(totalMatches);
    let trianglesAB = generateTrianglesAB(trianglesC);
    cards = [...trianglesC, ...trianglesAB];
    cards = cards.sort(() => Math.random() - 0.5);
    cards.forEach((triangle, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.addEventListener('click', () => revealCard(card));
        board.appendChild(card);
    });
}

function revealCard(card) {
    if (revealedCards.length < 2 && !card.classList.contains('revealed')) {
        let index = card.dataset.index;
        if (cards[index].valToShow === "c") {
            card.textContent = cards[index].c;
        } else {
            card.textContent = `${cards[index].a} , ${cards[index].b}`;
        }
        card.classList.add('revealed');
        revealedCards.push(card);

        if (revealedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    let [card1, card2] = revealedCards;
    let index1 = card1.dataset.index;
    let index2 = card2.dataset.index;

    if (cards[index1].c === cards[index2].c) {
        matches++;
        if (matches === totalMatches) {
            setTimeout(() => alert('Congratulations! You found all the matches!'), 500);
        }
        revealedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('revealed');
            card2.classList.remove('revealed');
            card1.textContent = '';
            card2.textContent = '';
            revealedCards = [];
        }, 1000);
    }
}

// document.addEventListener('DOMContentLoaded', setupBoard);
