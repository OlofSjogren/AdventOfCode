const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_17_data.txt").toString()
const [areaMinX, areaMaxX, areaMinY, areaMaxY] = content
    .slice(content.indexOf(":") + 1)
    .trim()
    .split(", ")
    .map(part => part.slice(2).split("..").flat())
    .flat()
    .map(x => +x)

// ##################### Part 1 #####################
// Basic physics: when y = 0 at step = k, then dy = -dyStart (same speed as at start but downwards)
// Take one more step and end up att bottom of the  target area for the highest speed we can have, i.e.
// y = areaMinY, at step = k + 1 (dy = -areaMinY - 1)
// Highest point is the culumative sum of 1 to areaMinY (sum up all the velocity) 1+2+..+areaMinY
// Use gauss (1+2+3+...+n = n*(n+1)/2): areaMinY * (areaMinY + 1) / 2

const highestY = areaMinY * (areaMinY + 1) / 2

// Answer part 1
console.log({ highestY });

// ##################### Part 2 #####################
function inArea(px, py) {
    return (px >= areaMinX && px <= areaMaxX &&
        py >= areaMinY && py <= areaMaxY)
}

function passedTarget(px, py) {
    return (px > areaMaxX || py < areaMinY)
}

function fire(dx, dy) {
    let x = 0, y = 0
    while (!passedTarget(x, y)) {
        x += dx
        y += dy
        dy -= 1;
        (dx > 0 && dx--) || (dx < 0 && dx++)
        if (inArea(x, y)) return true;
    }
    return false
}

let numberOfHits = 0
for (let dx = 1; dx <= areaMaxX; dx++) {
    for (let dy = areaMinY; dy < -areaMinY; dy++) {
        const hitArea = fire(dx, dy)
        hitArea && numberOfHits++
    }
}

console.log({numberOfHits});