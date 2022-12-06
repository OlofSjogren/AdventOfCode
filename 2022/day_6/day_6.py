from common import read_data, display_result


def find_n_first_uniques(n_uniques, data):
    index = -1
    upper_search_limit = len(data) - n_uniques + 1
    for i in range(0, upper_search_limit):
        potential_packet = data[i:i + n_uniques]
        uniques_in_packet = set(potential_packet)
        if len(uniques_in_packet) == n_uniques:
            index = i + n_uniques
            break

    return index


def run():
    data = read_data(1, test=False)

    # ----------- PART 1 ----------- #
    index_packet = find_n_first_uniques(4, data)
    display_result(1, index_packet)

    # ----------- PART 2 ----------- #
    index_message = find_n_first_uniques(14, data)
    display_result(2, index_message)


if __name__ == '__main__':
    run()
