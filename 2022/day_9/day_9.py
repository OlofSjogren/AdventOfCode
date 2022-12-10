from common import read_data, display_result, print_matrix
import numpy
from collections import defaultdict

max_dist_between = numpy.sqrt(2)


def find_closest(p1, p2):
    (x1, y1) = p1
    (x2, y2) = p2
    options = [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)]
    distances = [0.0] * len(options)
    for i, (dx, dy) in enumerate(options):
        x = x1 + dx
        y = y1 + dy
        dist_between = abs(numpy.linalg.norm((x2 - x, y2 - y)))
        distances[i] = dist_between

    min_dist_index = min(range(len(distances)), key=distances.__getitem__)
    return options[min_dist_index]


def take_steps(body, diff, steps, visited):
    (front_dx, front_dy) = diff

    for _ in range(0, steps):
        body[0][0] += front_dx
        body[0][1] += front_dy

        for part_index in range(1, len(body)):
            front_x = body[part_index - 1][0]
            front_y = body[part_index - 1][1]
            part_x = body[part_index][0]
            part_y = body[part_index][1]

            dist_between = numpy.linalg.norm((front_x - part_x, front_y - part_y))
            if dist_between > max_dist_between:
                [part_dx, part_dy] = find_closest((part_x, part_y), (front_x, front_y))
                body[part_index][0] += part_dx
                body[part_index][1] += part_dy
                visited[f"{body[-1][0]},{body[-1][1]}"] = 1


def run():
    data = read_data(1, test=False)
    moves = [line.split() for line in data.split("\n")]
    directions = {  # [x,y]
        "U": (0, 1),
        "D": (0, -1),
        "R": (1, 0),
        "L": (-1, 0)
    }

    # ----------- PART 1 ----------- #
    body_2 = [[0, 0], [0, 0]]
    visited_2 = {"0,0": 1}

    for d, steps in moves:
        diff = directions[d]
        take_steps(body_2, diff, int(steps), visited_2)

    visited_amount_2 = sum(visited_2.values())

    display_result(1, visited_amount_2)

    # ----------- PART 2 ----------- #
    body_10 = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    visited_10 = {"0,0": 1}

    for d, steps in moves:
        diff = directions[d]
        take_steps(body_10, diff, int(steps), visited_10)

    visited_amount_10 = sum(visited_10.values())

    display_result(2, visited_amount_10)


if __name__ == '__main__':
    run()
