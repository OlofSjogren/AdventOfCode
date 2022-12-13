import math
import queue
from common import read_data, display_result, time_day, print_matrix
from string import ascii_lowercase
from collections import defaultdict


def backtrace(prevs, x, y):
    p = prevs[(x, y)]
    path = [p]
    while p is not None:
        p = prevs[p]
        path.append(p)
    return path


def get_neighbours(x, y, matrix):
    neighs = []
    directions = [(0, 1), (0, -1), (-1, 0), (1, 0)]
    for dx, dy in directions:
        nx = x + dx
        ny = y + dy
        if 0 <= nx < len(matrix[0]) and 0 <= ny < len(matrix):
            neighs.append((nx, ny))
    return neighs


@time_day
def run():
    data = read_data(1, test=False)
    matrix = [list(row) for row in data.split("\n")]

    # ----------- PART 1 ----------- #
    start = sum([[(x, y) for x, v in enumerate(row) if v == 'S'] for y, row in enumerate(matrix)], [])[0]
    height_values = dict(zip(ascii_lowercase, range(0, len(ascii_lowercase))))
    height_values['E'] = len(ascii_lowercase) - 1
    height_values['S'] = 0

    distances = defaultdict(lambda: math.inf)
    distances[start] = 0

    prevs = {start: None}

    frontier = queue.PriorityQueue()
    frontier.put((0, start))
    shortest_path = []

    while frontier.qsize() != 0:
        (_, curr) = frontier.get()
        (x, y) = curr
        curr_char = matrix[y][x]
        if curr_char == 'E':
            shortest_path = backtrace(prevs, x, y)
            break
        curr_dist = distances[curr]
        neighbours = get_neighbours(x, y, matrix)
        for neigh in neighbours:
            neigh_dist = distances[neigh]
            neigh_char = matrix[neigh[1]][neigh[0]]
            delta = height_values[neigh_char] - height_values[curr_char]
            new_dist = curr_dist + 1
            if (new_dist < neigh_dist) and (delta <= 1):
                prevs[neigh] = curr
                distances[neigh] = new_dist
                frontier.put((new_dist, neigh))

    shortest_path_length = len(shortest_path) - 1
    display_result(1, shortest_path_length)

    # ----------- PART 2 ----------- #
    chars_in_path = [matrix[y][x] for (x, y) in shortest_path[:-1]]
    first = chars_in_path.index('a')
    fewest_steps = len(shortest_path) - (shortest_path_length - first)

    display_result(2, fewest_steps)


if __name__ == '__main__':
    run()
