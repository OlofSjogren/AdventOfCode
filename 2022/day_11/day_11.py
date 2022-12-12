from collections import defaultdict
from common import read_data, display_result, time_day
import re
import math


def parse_monkey(monkey_string):
    lines = monkey_string.split("\n")
    current = re.findall('[0-9]+', lines[0])[0]
    start_items = re.findall('[0-9]+', lines[1])
    op, nr = lines[2].split(" ")[-2:]
    test_nr = re.findall('[0-9]+', lines[3])[0]
    to_true = re.findall('[0-9]+', lines[4])[0]
    to_false = re.findall('[0-9]+', lines[5])[0]
    return int(current), [int(x) for x in start_items], op, nr, int(test_nr), int(to_true), int(to_false)


def monkey_rounds(instructions, nr_of_rounds, monkey_inventories, monkey_inspections, total_mod, divide_by_3):
    for r in range(1, nr_of_rounds + 1):
        for ins in instructions:
            current, _, op, nr, test_nr, to_true, to_false = parse_monkey(ins)

            for worry_level in monkey_inventories[current]:
                monkey_inspections[current] += 1
                op_nr = (worry_level if nr == "old" else int(nr))
                new = (worry_level * op_nr if op == "*" else worry_level + op_nr)

                if divide_by_3:
                    new = math.floor(new / 3)
                new = new % total_mod

                if new % test_nr == 0:
                    monkey_inventories[to_true].append(new)
                else:
                    monkey_inventories[to_false].append(new)

            monkey_inventories[current] = []

    inspections = list(monkey_inspections.values())
    inspections.sort(reverse=True)
    most_active_2 = inspections[0] * inspections[1]
    return most_active_2


@time_day
def run():
    data = read_data(1, test=False)
    instructions = data.split("\n\n")

    monkey_inventories_1 = defaultdict(lambda: [])
    monkey_inspections_1 = defaultdict(lambda: 0)

    monkey_inventories_2 = defaultdict(lambda: [])
    monkey_inspections_2 = defaultdict(lambda: 0)

    total_mod = 1
    for ins in instructions:
        current, start_items, op, nr, test_nr, to_true, to_false = parse_monkey(ins)
        monkey_inventories_1[current] += start_items
        monkey_inventories_2[current] += start_items
        total_mod *= test_nr

    # ----------- PART 1 ----------- #
    part_1 = monkey_rounds(instructions, 20, monkey_inventories_1, monkey_inspections_1, total_mod, True)
    display_result(1, part_1)

    # ----------- PART 2 ----------- #
    part_2 = monkey_rounds(instructions, 10_000, monkey_inventories_2, monkey_inspections_2, total_mod, False)
    display_result(1, part_2)


if __name__ == '__main__':
    run()
