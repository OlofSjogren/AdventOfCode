import re
from itertools import combinations

lines = []
with open("input.txt", "r") as f:
    for line in f:
        lines.append(line.strip())

def manhattan(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2)

def transpose(l):
    return list(zip(*l))

row_length = len(lines)
col_length = len(lines[0])

row_paddings = [0] * row_length
for x, row in enumerate(lines):
    if row.count(".") == row_length:
        for i in range(x, len(row_paddings)):
            row_paddings[i] += 1

col_paddings = [0] * col_length
for y, col in enumerate(transpose(lines)):
    if col.count(".")==col_length:
        for i in range(y, len(col_paddings)):
            col_paddings[i] += 1

coordinates = [(x + col_paddings[x],y + row_paddings[y]) for y,lst in enumerate(lines) for x,_ in enumerate(lst) if lines[y][x] == "#"]
tot = sum([manhattan(ax, ay, bx, by) for (ax, ay), (bx, by) in combinations(coordinates, 2)])
print(f"Part 1 | Sum: {tot}")

# ------------------------------- PART 2 -------------------------------
row_paddings = [0] * row_length
for x, row in enumerate(lines):
    if row.count(".") == row_length:
        for i in range(x, len(row_paddings)):
            row_paddings[i] += 999_999

col_paddings = [0] * col_length
for y, col in enumerate(transpose(lines)):
    if col.count(".")==col_length:
        for i in range(y, len(col_paddings)):
            col_paddings[i] += 999_999


coordinates = [(x + col_paddings[x],y + row_paddings[y]) for y,lst in enumerate(lines) for x,_ in enumerate(lst) if lines[y][x] == "#"]
tot = sum([manhattan(ax, ay, bx, by) for (ax, ay), (bx, by) in combinations(coordinates, 2)])
print(f"Part 2 | Sum: {tot}")