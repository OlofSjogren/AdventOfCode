from common import read_data, display_result


def run():
    data = read_data(1, test=False)
    content = data.split("\n")

    # ----------- PART 1 & 2 ----------- #
    pairs_1 = 0
    pairs_2 = 0

    for line in content:
        [f, s] = line.split(",")
        [f_l, f_h] = map(int, f.split("-"))
        [s_l, s_h] = map(int, s.split("-"))
        l_diff = f_l - s_l
        h_diff = f_h - s_h

        # Part 1
        if (l_diff <= 0 and h_diff >= 0) or (l_diff >= 0 and h_diff <= 0):
            pairs_1 += 1

        # Part 2
        if not ((f_h < s_l) or (s_h < f_l)):
            pairs_2 += 1

    display_result(1, pairs_1)
    display_result(2, pairs_2)


if __name__ == '__main__':
    run()
