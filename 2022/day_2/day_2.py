from common import read_data, display_result

# A for Rock, B for Paper, and C for Scissors <- they pick
# X for Rock, Y for Paper, and Z for Scissors <- we pick
point_dict_part_1 = {
    "A X": 1 + 3,
    "A Y": 2 + 6,
    "A Z": 3 + 0,
    "B X": 1 + 0,
    "B Y": 2 + 3,
    "B Z": 3 + 6,
    "C X": 1 + 6,
    "C Y": 2 + 0,
    "C Z": 3 + 3
}

# A for Rock, B for Paper, and C for Scissors <- they pick
# X we Lose, Y we Draw, and Z we Win <- we pick
point_dict_part_2 = {
    "A X": 3 + 0,
    "A Y": 1 + 3,
    "A Z": 2 + 6,
    "B X": 1 + 0,
    "B Y": 2 + 3,
    "B Z": 3 + 6,
    "C X": 2 + 0,
    "C Y": 3 + 3,
    "C Z": 1 + 6
}


def run():
    data = read_data(1, test=False)
    strats = [line for line in data.split("\n")]

    # ----------- PART 1 ----------- #
    points = [point_dict_part_1[strat] for strat in strats]
    total_score = sum(points)

    display_result(1, total_score)

    # ----------- PART 2 ----------- #
    points_fixed_result = [point_dict_part_2[strat] for strat in strats]
    total_score_fixed_result = sum(points_fixed_result)

    display_result(2, total_score_fixed_result)


if __name__ == '__main__':
    run()
