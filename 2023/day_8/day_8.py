import re
from math import gcd
from functools import reduce

paths = {}
with open("input.txt", "r") as f:
    instructions, map = f.read().split("\n\n")

    for line in map.split("\n"):
        key, val1, val2 = re.findall(r"[A-Z\d]{3}", line)
        paths[key] = (val1, val2)

steps_taken = 0
current = "AAA"
reached_end = False
while not reached_end:
    for step in instructions:
        steps_taken += 1
        left, right = paths[current]
        current = left if step == "L" else right
        if current == "ZZZ":
            reached_end = True
            break
        
print(f"Part 1 | Steps: {steps_taken}")

current_nodes = [line[:3] for line in map.split("\n") if line[2] == "A"]
cycle_steps = []

for current in current_nodes:
    steps_taken = 0
    reached_end = False
    while not reached_end:
        for step in instructions:
            steps_taken += 1
            left, right = paths[current]
            current = left if step == "L" else right
            if current[2] == "Z":
                reached_end = True
                break
    cycle_steps.append(steps_taken)

def lcm(a, b):
    return abs(a*b) // gcd(a, b)

least_common_multiple = reduce(lcm, cycle_steps)
print(f"Part 2 | Steps before all ending with Z: {least_common_multiple}")