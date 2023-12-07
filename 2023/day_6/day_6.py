from math import sqrt, floor, ceil
import re

def eval_race(time, dist, holding_time):
    return holding_time * (time - holding_time) > dist

with open("input.txt", "r") as f:
    lines = f.readlines()

times = map(int, re.findall("\d+", lines[0]))
distances = map(int, re.findall("\d+", lines[1]))

margin = 1
for time, dist in zip(times, distances):
    ways_to_win = 0
    for holding_time in range(time):
        win = eval_race(time, dist, holding_time)
        if win:
            ways_to_win +=1
    margin *= ways_to_win

print(f"Part 1 | Margin: {margin}")


time = int("".join(re.findall("\d+", lines[0])))
dist = int("".join(re.findall("\d+", lines[1])))

# Not the fastest... but it works
ways_to_win = 0
for holding_time in range(time):
    win = eval_race(time, dist, holding_time)
    if win:
        ways_to_win +=1

print(f"Part 2 | Ways to win: {ways_to_win}")
