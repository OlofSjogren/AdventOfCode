import re

lines = []
with open("input.txt", "r") as f:
    for line in f:
        nrs = re.findall('-?\d+', line)
        lines.append([int(n) for n in nrs])

extrapolated_sum_last = 0
extrapolated_sum_first = 0
for history in lines:
    last_in_history = [history[-1]]
    first_in_history = [history[0]]
    all_zeros = False

    while not all_zeros:
        next_history = [b-a for a,b in zip(history[:-1], history[1:])]
        last_in_history.append(next_history[-1])
        first_in_history.append(next_history[0])
        all_zeros = next_history.count(0) == len(next_history)
        history = next_history

    extrapolated_last = 0
    for val in last_in_history:
        extrapolated_last += val
    extrapolated_sum_last += extrapolated_last

    extrapolated_first = 0
    for val in reversed(first_in_history):
        extrapolated_first = val - extrapolated_first
    extrapolated_sum_first += extrapolated_first

print(f"Part 1 | Sum of LAST extrapolated numbers: {extrapolated_sum_last}")
print(f"Part 1 | Sum of FIRST extrapolated numbers: {extrapolated_sum_first}")