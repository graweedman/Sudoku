const electron = require('electron')
const chance = require("chance")

//Board Init
const Board = document.getElementById("Board")

//Board Size
const Width = 9
const Height = 9


let cursor = 0 //Cursor position


///TODO: Make a solution Generator
let Solution = [
    3, 9, 8, 7, 1, 5, 4, 6, 2,
    5, 2, 6, 4, 8, 9, 3, 7, 1,
    1, 7, 4, 2, 6, 3, 9, 5, 8,
    8, 1, 3, 9, 5, 2, 6, 4, 7,
    7, 5, 9, 6, 4, 8, 2, 1, 3,
    4, 6, 2, 3, 7, 1, 8, 9, 5,
    2, 3, 7, 5, 9, 4, 1, 8, 6,
    9, 8, 5, 1, 2, 6, 7, 3, 4,
    6, 4, 1, 8, 3, 7, 5, 2, 9
]

//const Solution1 = Solution

///TODO: Fix Solution bug
let userSolution = [
    3, 9, 8, 7, 1, 5, 4, 6, 2,
    5, 2, 6, 4, 8, 9, 3, 7, 1,
    1, 7, 4, 2, 6, 3, 9, 5, 8,
    8, 1, 3, 9, 5, 2, 6, 4, 7,
    7, 5, 9, 6, 4, 8, 2, 1, 3,
    4, 6, 2, 3, 7, 1, 8, 9, 5,
    2, 3, 7, 5, 9, 4, 1, 8, 6,
    9, 8, 5, 1, 2, 6, 7, 3, 4,
    6, 4, 1, 8, 3, 7, 5, 2, 9
]

//Memory access for Unlocked tiles
let Unlocked = []



//Takes the original Solution and alters it to Hide the tiles Based on difficulty
const hideSolution = (diff) => {
    const hiddenTiles = diff * 20
    let chance = new Chance()
    for (let i = 0; i < hiddenTiles; i++) {
        let index = chance.integer({ min: 0, max: 80 })
        //console.log(index)
        document.getElementById(`${index}`).textContent = " "
        userSolution[index] = 0
        Unlocked.push(index)
    }
}


//Generates the Board GUI
const generateBoard = () => {
    for (let i = 0; i < Height; i++) {
        for (let j = 0; j < Width; j++) {
            var box = document.createElement('button')
            index = (i * Width + j)
            box.textContent = Solution[index]
            box.className = "grid-item-locked"
            box.id = index

            box.onclick = function () {
                //console.log("Pressed")
                updateCursor(this.id)
            }
            //console.log(box.onclick)
            Board.appendChild(box)
        }
    }
}

//Main

generateBoard()
hideSolution(1)

//-----


//Updates Cursor position where the number will be edited
const updateCursor = (pos) => {
    //console.log(pos, Unlocked)
    if (Unlocked.includes(parseInt(pos))) {
        document.getElementById(cursor).className = "grid-item"
        cursor = parseInt(pos)
        document.getElementById(pos).className = "grid-item-selected"
    }
}


//On keypress event edits the key in userSolution and in GUI
document.onkeypress = (e) => {
    if (isNaN(e.key)) return
    else {
        if (Unlocked.includes(cursor)) {
            console.log(Solution)
            //console.log(Unlocked)
            document.getElementById(cursor).textContent = e.key
            userSolution[cursor] = parseInt(e.key)
            if (!checkLine(cursor)) {
                document.getElementById(cursor).style.color = "red"
            }
            else
            {
                document.getElementById(cursor).style.color = "black"
            }
        }
    }
}

//Checks if the input number is valid with Solution
const checkLine = (pos) => {
    let row = pos % 9
    let column = Math.floor(pos / 9)
    console.log({ user: userSolution, Solution: Solution1 })
    return userSolution[pos] === Solution1[pos]
}


//TODO: Add Quality of life changes, Highlight of same number and highlight of the lines.
const outline = () => {

}