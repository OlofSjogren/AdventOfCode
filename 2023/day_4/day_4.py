import re

lines = []
with open("input.txt", "r") as f:
    for line in f:
        nrs, win_nrs = line.split(":")[1].split(" | ")
        nrs = re.findall('\d+', nrs)
        win_nrs = re.findall('\d+', win_nrs)
        lines.append((nrs, win_nrs))

points = 0
cards = [1] * len(lines)
for i, (nrs, win_nrs) in enumerate(lines):
    win_nrs = set(win_nrs)
    matches = sum([1 for x in nrs if x in win_nrs])
    if matches != 0:
        points += 2**(matches-1)
        for w in range(1, matches + 1):
            if w + i >= len(lines): break
            cards[i + w] += cards[i]

total_cards = sum(cards)

print(f"Part 1 | Total points: {points}")
print(f"Part 2 | Total cards: {total_cards}")