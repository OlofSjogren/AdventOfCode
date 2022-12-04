from common import read_data, display_result
from string import ascii_letters


def run():
    data = read_data(1, test=False)
    content = data.split("\n")

    # ----------- PART 1 ----------- #
    priority_values = range(1, 53)
    priorities = dict(zip(ascii_letters, priority_values))

    priority_sum_1 = 0
    for rucksack in content:
        unique_in_compartment_1 = set(rucksack[:int(len(rucksack) / 2)])
        unique_in_compartment_2 = set(rucksack[int(len(rucksack) / 2):])

        in_both = unique_in_compartment_1.intersection(unique_in_compartment_2)
        item = list(in_both)[0]
        priority_sum_1 += priorities[item]

    display_result(1, priority_sum_1)

    # ----------- PART 2 ----------- #
    priority_sum_2 = 0
    r = len(content)
    for i in range(0, r, 3):
        a = set(content[i])
        b = set(content[i + 1])
        c = set(content[i + 2])

        in_all = a.intersection(b.intersection(c))
        item = list(in_all)[0]
        priority_sum_2 += priorities[item]

    display_result(2, priority_sum_2)


if __name__ == '__main__':
    run()
