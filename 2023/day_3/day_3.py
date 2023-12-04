matrix = []
with open("input.txt", "r") as f:
    for line in f:
        matrix.append(list(line.strip()))

# Part 1
def get_nr_len(row, col, matrix):
    length = []
    while row < len(matrix) and col < len(matrix[0]) and matrix[row][col].isdigit():
        length.append((row, col))
        col += 1
    return length

def valid_cell(row,col,matrix):
    return 0 <= row < len(matrix) and 0 <= col < len(matrix[0])

def has_neighbours(number_indices, matrix):
    left_corner_delta = [(-1, -1), (0, -1), (1, -1)]
    right_corner_delta = [(-1, 1), (0, 1), (1, 1)]
    up_down_delta = [(1,0), (-1,0)]
    for i, (digit_r, digit_c) in enumerate(number_indices):
        if i == 0:
            for dr, dc in left_corner_delta:
                if valid_cell(digit_r + dr, digit_c + dc, matrix) and not matrix[digit_r + dr][digit_c + dc] == ".":
                    return True
        if i == len(number_indices) - 1:
            for dr, dc in right_corner_delta:
                if valid_cell(digit_r + dr, digit_c + dc, matrix) and not matrix[digit_r + dr][digit_c + dc] == ".":
                    return True
        for dr, dc in up_down_delta:
            if valid_cell(digit_r + dr, digit_c + dc, matrix) and matrix[digit_r + dr][digit_c + dc] != ".":
                return True
    return False

nr_without_neighbours = []
y = -1
while (y := y+1) < len(matrix):
    x = -1
    while (x := x+1) < len(matrix):
        if matrix[y][x].isdigit():
            nr_arr = get_nr_len(y, x, matrix)
            if has_neighbours(nr_arr, matrix):
                nr = ""
                for (r,c) in nr_arr:
                    nr += matrix[r][c]
                nr_without_neighbours.append(nr)
            x += len(nr_arr)

total_sum = sum([int(nr) for nr in nr_without_neighbours])
print(f"Part 1 | Sum of numbers: {total_sum}")

# Part 2
def extract_number(y, x, matrix):
    x_start = x
    nr = "" + matrix[y][x]
    matrix[y][x] = '.'
    while (x := x-1) >= 0 and matrix[y][x].isdigit():
        nr = matrix[y][x] + nr
        matrix[y][x] = '.'
    x = x_start
    while (x := x+1) < len(matrix[0]) and matrix[y][x].isdigit():
        nr += matrix[y][x]
        matrix[y][x] = '.'
    return nr

gear_sum = 0
y = -1
while (y := y+1) < len(matrix):
    x = -1
    while (x := x+1) < len(matrix):
        if matrix[y][x] == '*':
            adjacent_nrs = []
            for dy in range(-1,2):
                for dx in range(-1,2):
                    if valid_cell(y + dy, x + dx, matrix) and matrix[y + dy][x + dx].isdigit():
                        number = extract_number(y + dy, x + dx, matrix)
                        adjacent_nrs.append(number)
            if len(adjacent_nrs) == 2:
                gear_sum += int(adjacent_nrs[0]) * int(adjacent_nrs[1])

print(f"Part 2 | Gear sum: {gear_sum}")

