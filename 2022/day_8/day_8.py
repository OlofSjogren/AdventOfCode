from common import read_data, display_result, print_matrix
import numpy


def transpose_matrix(matrix):
    return [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]


def explore_tree(row, col, matrix):
    [current_height, _] = matrix[row][col]
    visions = []
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    for dr, dc in directions:
        vis = 0
        while True:
            if (0 > col + dc) or (col + dc > len(matrix[0]) - 1) or (0 > row + dr) or (row + dr > len(matrix) - 1):
                break

            [neighbour_height, _] = matrix[row + dr][col + dc]
            vis += 1

            if neighbour_height >= current_height:
                break
            else:
                if dr != 0: dr += 1 * numpy.sign(dr)
                if dc != 0: dc += 1 * numpy.sign(dc)
        visions.append(vis)

    return numpy.prod(visions)


def scan_row(data, row_index):
    row = data[row_index]
    tallest_left, tallest_right = -1, -1
    for col_index_left in range(0, len(row)):
        col_index_right = len(row) - col_index_left - 1
        [height_left, _] = row[col_index_left]
        [height_right, _] = row[col_index_right]

        if height_left > tallest_left:
            data[row_index][col_index_left] = (height_left, True)
            tallest_left = height_left

        if height_right > tallest_right:
            data[row_index][col_index_right] = (height_right, True)
            tallest_right = height_right


def run():
    data = read_data(1, test=False)
    matrix = [[(int(y), False) for y in x] for x in data.split("\n")]

    # ----------- PART 1 ----------- #
    for row_index in range(0, len(matrix)):
        scan_row(matrix, row_index)

    matrix = transpose_matrix(matrix)

    for row_index in range(0, len(matrix)):
        scan_row(matrix, row_index)

    total_seen = sum([sum([1 for (_, seen) in row if seen]) for row in matrix])

    display_result(1, total_seen)

    # ----------- PART 2 ----------- #
    result = 0
    for r in range(1, len(matrix) - 1):
        for c in range(1, len(matrix[0]) - 1):
            vision = explore_tree(r, c, matrix)
            result = max(vision, result)

    display_result(2, result)


if __name__ == '__main__':
    run()
