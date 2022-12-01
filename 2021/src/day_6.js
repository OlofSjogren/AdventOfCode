
// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_6_data.txt").toString()
const contentArr = content.split(",").map(x => parseInt(x))

// Simulates the population {pop} for the provided number of days {days}
function simulatePopulation(days, pop) {
    const population = Array(9).fill(0)
    pop.forEach(day => {
        population[day]++
    });
    for (let i = 0; i < days; i++) {
        let newFish = 0
        for (let day = 0; day < population.length; day++) {
            switch (day) {
                case 0:
                    newFish = population[0]
                    population[0] = 0
                    break;
                default:
                    population[day - 1] = population[day]
                    population[day] = 0
                    break;
            }
        }
        population[6] += newFish
        population[8] += newFish
    }
    return population
}

// 80 days => 359344 fishies
const numberOfFish80Days = simulatePopulation(80, contentArr).reduce((a, b) => a + b, 0)
console.log({ numberOfFish80Days });

// ##################### Part 2 #####################

// 256 days => 1629570219571 fishies
const numberOfFish256Days = simulatePopulation(256, contentArr).reduce((a, b) => a + b, 0)
console.log({ numberOfFish256Days });
