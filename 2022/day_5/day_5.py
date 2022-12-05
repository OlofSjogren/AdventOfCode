from common import read_data, display_result
import re


def move_stacks(stacks, numbered_instructions, all_at_once):
    for amount, from_stack, to_stack in numbered_instructions:
        move = stacks[from_stack][-amount:]
        if not all_at_once:
            move.reverse()
        move.reverse()
        stacks[from_stack] = stacks[from_stack][:-amount]
        stacks[to_stack] = stacks[to_stack] + move
    return stacks


def run():
    data = read_data(1, test=False)
    instructions = data.split("\n\n")[1].split("\n")
    stacks_1 = {
        1: ['G', 'F', 'V', 'H', 'P', 'S'],
        2: ['G', 'J', 'F', 'B', 'V', 'D', 'Z', 'M'],
        3: ['G', 'M', 'L', 'J', 'N'],
        4: ['N', 'G', 'Z', 'V', 'D', 'W', 'P'],
        5: ['V', 'R', 'C', 'B', ],
        6: ['V', 'R', 'S', 'M', 'P', 'W', 'L', 'Z'],
        7: ['T', 'H', 'P'],
        8: ['Q', 'R', 'S', 'N', 'C', 'H', 'Z', 'V'],
        9: ['F', 'L', 'G', 'P', 'V', 'Q', 'J']
    }
    stacks_2 = stacks_1.copy()

    # ----------- PART 1 ----------- #
    part_1_instructions = list(map(lambda s: map(int, re.findall(r"\d+", s)), instructions))
    part_1_move = move_stacks(stacks_1, part_1_instructions, True)
    final_string_1 = "".join([stack[-1] for _, stack in part_1_move.items()])

    display_result(1, final_string_1)

    # ----------- PART 2 ----------- #
    part_2_instructions = list(map(lambda s: map(int, re.findall(r"\d+", s)), instructions))
    part_2_move = move_stacks(stacks_2, part_2_instructions, False)
    final_string_2 = "".join([stack[-1] for _, stack in part_2_move.items()])

    display_result(2, final_string_2)


if __name__ == '__main__':
    run()
