const cfonts = require("cfonts");
const prompt = require("prompt-sync")({ sigint: true });

class Field {
  constructor(theField) {
    this._end = false;
    this._steps = 0;
    this._winningPosition = [0, 0]; // [2, 1]
    this._theMap = [0, 0]; // [3, 3] // [h, v]
    this._startingPoint = [0, 0];
    this._theField = theField;
  }
  get print() {
    let str = "";
    for (let i = 0; i < this._theField.length; i++) {
      str += this._theField[i].join("");
      str += "\n";
      if (this._winningPosition[0] == 0 && this._winningPosition[1] == 0) {
        for (let j = 0; j < this._theField[i].length; j++) {
          if (this._theField[0][i] == "^") {
            //* THE HAT LOCATION WILL BE IN [2, 1]
            this._winningPosition[0] = j;
            this._winningPosition[1] = i;
            break;
          }
        }
      }
    }
    if (this._theMap[0] === 0 && this._theMap[1] === 0) {
      this._theMap[0] = this._theField[0].length;
      this._theMap[1] = this._theField.length;
    }
    return str;
  }

  get theGame() {
    return this._end;
  }
  set finishTheGame(value) {
    this._end = value;
  }

  checkMove(theMove) {
    if (
      theMove == "l" ||
      theMove == "r" ||
      theMove == "left" ||
      theMove == "right"
    ) {
      switch (theMove) {
        case "r":
        case "right":
          this._startingPoint[1]++;
          this._steps++;
          let changePlace =
            this._theField[this._startingPoint[0]][this._startingPoint[1]];
          if (changePlace == "░")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "*";
          else if (changePlace == "^") {
            cfonts.say(
              `You found the hat, ${
                this._steps > 10
                  ? `Not bad but can do better, you have ${this._steps} steps`
                  : `Wow!! you are amazing, you finished the game with ${this._steps}`
              } steps`
            );
            this._end = true;
            break;
          } else if (changePlace == "*" || changePlace == "#")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "#";
          else {
            console.log("You crossed the box");
            this._end = true;
            break;
          }
          break;
        case "left":
        case "l":
          this._startingPoint[1]--;
          this._steps++;
          let changePlace2 =
            this._theField[this._startingPoint[0]][this._startingPoint[1]];
          if (changePlace2 == "*" || changePlace2 == "#")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "#";
          else if (changePlace2 == "░")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "*";
          else if (changePlace2 == "^") {
            cfonts.say(
              `You found the hat, ${
                this._steps > 10
                  ? `Not bad but can do better, you have ${this._steps} steps`
                  : `Wow!! you are amazing, you finished the game with ${this._steps} steps`
              }`
            );
            this._end = true;
            break;
          } else {
            console.log("You crossed the box");
            this._end = true;
            break;
          }
          break;
      }
    } else {
      // top & bottom
      switch (theMove) {
        case "b":
        case "bottom":
          this._startingPoint[0]++;
          this._steps++;
          if (this._startingPoint[0] > this._theMap[1] - 1) {
            console.log("You crossed the box");
            this._end = true;
            break;
          }
          let changePlace =
            this._theField[this._startingPoint[0]][this._startingPoint[1]];
          if (changePlace == "░")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "*";
          else if (changePlace == "^") {
            cfonts.say(
              `You found the hat, ${
                this._steps > 10
                  ? `Not bad but can do better, you have ${this._steps} steps`
                  : `Wow!! you are amazing, you finished the game with ${this._steps} steps`
              } `
            );
            this._end = true;
            break;
          } else if (changePlace == "*" || changePlace == "#")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "#";
          else {
            console.log("You crossed the box");
            this._end = true;
            break;
          }
          break;
        case "t":
        case "top":
          this._startingPoint[0]--;
          this._steps++;
          if (this._startingPoint[0] < 0) {
            console.log("You crossed the box");
            this._end = true;
            break;
          }
          let changePlace2 =
            this._theField[this._startingPoint[0]][this._startingPoint[1]];
          if (changePlace2 == "*" || changePlace2 == "#")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "#";
          else if (changePlace2 == "░")
            this._theField[this._startingPoint[0]][this._startingPoint[1]] =
              "*";
          else if (changePlace2 == "^") {
            cfonts.say(
              `You found the hat, ${
                this._steps > 10
                  ? `Not bad but can do better, you have ${this._steps} steps`
                  : `Wow!! you are amazing, you finished the game with ${this._steps} steps`
              }`
            );
            this._end = true;
          } else {
            console.log("You crossed the box");
            this._end = true;
            break;
          }
          break;
      }
    }
  }
}



console.log(
  "\n\n <----------------Hello and welcome to 'find-your-hat' game!!----------------> \n\n"
);
let level;
do {
  level = prompt("Enter a level [1, 2, 3, 4, 5] (FROM EASY TO HARD)");
} while (level < 1 || level > 5);

let hi = {
  1: [
    ["*", "░", "░"],
    ["░", "O", "░"],
    ["░", "░", "^"],
  ],
  2: [
    ["*", "░", "░", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "O"],
    ["░", "░", "░", "O", "░", "░"],
    ["░", "░", "░", "░", "░", "░"],
    ["O", "░", "O", "░", "░", "O"],
    ["░", "^", "░", "░", "░", "░"],
  ],
  3: [
    ["*", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "░", "░", "O"],
    ["░", "░", "░", "O", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "O", "░"],
    ["O", "░", "O", "░", "░", "O", "░", "░"],
    ["░", "^", "░", "░", "░", "░", "░", "░"],
    ["O", "░", "░", "░", "░", "░", "O", "░"],
    ["░", "░", "O", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "O", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "░", "░", "░"],
  ],
  4: [
    ["*", "░", "░", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "░", "░", "O", "░", "O"],
    ["░", "░", "░", "O", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "O", "░", "░", "░"],
    ["O", "░", "O", "░", "░", "O", "░", "░", "O", "░"],
    ["░", "^", "░", "░", "░", "░", "░", "░", "░", "░"],
    ["O", "░", "░", "░", "░", "░", "O", "░", "░", "O"],
    ["░", "░", "O", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "O", "░", "░", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "░", "O", "░", "O"],
    ["O", "░", "░", "O", "░", "░", "░", "░", "░", "░"],
  ],
  5: [
    ["*", "░", "░", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "░", "░", "O", "░", "O"],
    ["░", "░", "░", "O", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "O", "░", "░", "░"],
    ["O", "░", "O", "░", "░", "O", "░", "░", "O", "░"],
    ["░", "^", "░", "░", "░", "░", "░", "░", "░", "░"],
    ["O", "░", "░", "░", "░", "░", "O", "░", "░", "O"],
    ["░", "░", "O", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "O", "░", "░", "░", "░", "░"],
    ["░", "O", "░", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "░", "O", "░", "O"],
    ["O", "░", "░", "O", "░", "░", "░", "░", "░", "░"],
  ],
};

const myField = new Field(hi[level]);

let moves = ["t", "top", "l", "left", "r", "right", "b", "bottom"];

while (!myField.theGame) {
  console.log(myField.print);
  let move = prompt("Choose a direction to move = [l, r, t, b] ");
  if (!moves.includes(move.toLocaleLowerCase())) {
    console.log(`'${move}' is not a direction`);
    myField.finishTheGame = true;
  }
  myField.checkMove(move);
}
