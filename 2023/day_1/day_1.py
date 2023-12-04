import regex as re

with open("input.txt", "r") as f:
    lines = f.readlines()

# Part 1
def get_numbers_in_line(line):
    r = re.findall("\d", line)
    return r[0] + r[-1]

total = 0
for line in lines:
    nr = get_numbers_in_line(line)
    total += int(nr)

print(f"Part 1 | Sum of all calibration values: {total}")

# Part 2
def get_numbers_and_text_numberse_in_line(line):
    values = {"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9}
    pattern = "\d|one|two|three|four|five|six|seven|eight|nine"
    r = re.findall(pattern, line, overlapped=True)
    return str(values[r[0]]) + str(values[r[-1]])

total = 0
for line in lines:
    nr = get_numbers_and_text_numberse_in_line(line.strip())
    total += int(nr)

print(f"Part 2 | Sum of all calibration values: {total}")

