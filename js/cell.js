function Cell(x, y, alive, automaton) {
  this.x = x;
  this.y = y;
  this.alive = alive;
  this.automaton = automaton;
  this.flaggedForDeath = false;
  this.flaggedForRevive = false;
  this.age = 0;
}
// life cycle colors
Cell.lifeColors = {
  // neglected
  0: [200,   0,   0],
  1: [200,   0,   0],
  // alive alive  
  2: [  3,   3,   3], 
  // living                    
  3: [  3,   3,   3],  
  // pressed                  
  4: [200,   0,   0],
  5: [280,   0,   0],
  // crushed
  6: [200,   0,   0],
  7: [200,   0,   0], 
  // dead
  8: [200,   0,   0]                     
}

Cell.prototype = {
  flagYourselfForDeathMaybe: function(grid) {
    let num = this.numLiveNeighbors();

    if (this.alive) {
      // 1. Living cells with less than 2 adjacent cells, dies.
      if (num < 2) this.flaggedForDeath = true;
      // 2. Living cells with more than 3 adjacent cells, dies.
      else if (num > 3) this.flaggedForDeath = true;
    } else {
      // 3. Dead cells with 3 adjacent cells, animates.
      let r = 3;
      //if (cell.age) r = rand(3) < 3 ? 3 : 2;
      if (num == r) this.flaggedForRevive = true;
    }
  },
  //track oldest cell.
  update: function() {
    if (this.alive) this.age++;
    return this;
  },
  numLiveNeighbors: function() {
    let liveNeighborsCount = 0;

    for (let i = 0; i < 8; i++) {
      let targetX = this.x + Automaton.adjust[Automaton.wheres[i]]['x'],
          targetY = this.y + Automaton.adjust[Automaton.wheres[i]]['y'],
          alive = false;

      if (this.automaton.grid[targetX] && this.automaton.grid[targetX][targetY])
        alive = this.automaton.grid[targetX][targetY].alive;
      if (alive) liveNeighborsCount++;
    }

    return liveNeighborsCount;
  },
  notIn: function(array) {
    for (let i = 0, len = array.length; i < len; i++) {
      let cell = array[i];
      if (this.x == cell.x && this.y == cell.y) return false;
    }
    return true;
  },
  lifeColor: function() { return Cell.lifeColors[this.numLiveNeighbors()]; },
  toggle:    function() { this.alive = !this.alive; return this; },
  revive:    function() { this.alive = true; return this; },
  kill:      function() { this.alive = false; this.age = 0; return this; }
}