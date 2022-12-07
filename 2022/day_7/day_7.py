from common import read_data, display_result
from collections import defaultdict


def scan_log(commands):
    all_dirs = defaultdict(lambda: 0)
    current_dirs = []

    for line in commands:
        cmd = line.split(" ")
        match cmd:
            case ["$", "ls"]:
                continue
            case ["dir", name]:
                continue
            case ["$", "cd", ".."]:
                current_dirs.pop()
            case ["$", "cd", name]:
                if not name == "/":
                    name = current_dirs[-1] + name + "/"
                current_dirs.append(name)
            case [size, file]:
                for dirs in current_dirs:
                    all_dirs[dirs] += int(size)

    return all_dirs


def run():
    data = read_data(1, test=False)
    commands = data.split("\n")

    # ----------- PART 1 ----------- #
    all_dirs = scan_log(commands)
    sum_dirs_under_threshold = sum([x for x in all_dirs.values() if x <= 100_000])

    display_result(1, sum_dirs_under_threshold)

    # ----------- PART 2 ----------- #
    total_used_space = all_dirs["/"]
    amount_to_be_freed = 30_000_000 - (70_000_000 - total_used_space)
    dirs_with_enough_space = [x for x in all_dirs.values() if x >= amount_to_be_freed]
    smallest_size_with_enough_space = min(dirs_with_enough_space)

    display_result(2, smallest_size_with_enough_space)


if __name__ == '__main__':
    run()
