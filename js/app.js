class Hero {
    constructor() {
        this.step = 102;
        this.jump = 83;
        this.x = this.step * 2;
        this.y = Math.floor(this.jump * 4.7);
        this.sprite = 'images/char-pink-girl.png';
        this.win = false;
    }
//render image
    render() {
        ctx.drawImage(Resources.get(this.sprite) ,this.x, this.y);
    }
// input for keypad
    handleInput(input) {
        switch (input) {
            case 'right':
                if (this.x < 408) {
                    this.x += this.step;
                } 
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump;
                } break;
            case 'down':
                if (this.y < 332) {
                    this.y += this.jump;
                }

        }
    }
// collision detection
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (this.x < enemy.x + 52 && this.x + 52 > enemy.x )) { 
                this.reset();
            }
            else if (this.y === -25) {
                this.win = true;
            }
        }
    }
// if collision happens reset
    reset() {
        this.x = this.step * 2;
        this.y = Math.floor(this.jump * 4.7);
    }
}



// Enemies our player must avoid
let Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = Math.floor(y + 56);
    this.step = 102;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // enemy movement
    if (this.x < 408) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
        this.speed = randomInt(90, 168);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//replay button
function replay() {
    const modal = document.querySelector(".modal-bg");
    modal.classList.toggle('hide');
    player.reset();
    player.victory = false;
    location.reload();
}
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const player = new Hero();
const enemy1 = new Enemy(randomInt(90, 168),randomInt(90, 168), 2);
const enemy2 = new Enemy(randomInt(90, 168),randomInt(20, 80), 85);
const enemy3 = new Enemy(randomInt(90, 168), 10, 168);
const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);