from common import read_data, display_result


def print_crt_line(cycle, reg_x, line):
    if (cycle % 40) == 0:
        print(line[0])
        line[0] = ""
    if reg_x - 1 <= (cycle % 40) <= reg_x + 1:
        line[0] += "#"
    else:
        line[0] += "."


def run():
    data = read_data(1, test=False)
    instructions = data.split("\n")

    # ----------- PART 2 & 1 ----------- #
    reg_x = 1
    cycle = 0
    cycle_values = []
    every_other = False
    line = [""]

    display_result(2, "See below!")

    for ins in instructions:
        match ins.split(" "):
            case ["addx", amount]:
                for c in range(0, 2):
                    print_crt_line(cycle, reg_x, line)
                    cycle += 1
                    if cycle % 20 == 0:
                        every_other = not every_other
                        if every_other:
                            cycle_values.append(reg_x)
                reg_x += int(amount)

            case ["noop"]:
                print_crt_line(cycle, reg_x, line)
                cycle += 1
                if cycle % 20 == 0:
                    every_other = not every_other
                    if every_other:
                        cycle_values.append(reg_x)
    print_crt_line(cycle, reg_x, line)
    print()

    sum_signal_strengths = sum([x * (20 + 40 * i) for i, x in enumerate(cycle_values)])
    display_result(1, sum_signal_strengths)


if __name__ == '__main__':
    run()
