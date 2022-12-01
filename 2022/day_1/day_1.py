from common import read_data, display_result


def run():
    # ----------- PART 1 ----------- #
    data = read_data(1, test=False)
    calorie_arr = data.split("\n\n")
    calories = [sum(map(int, x.split())) for x in calorie_arr]
    most_calories = max(calories)

    # Answer part 1
    display_result(1, most_calories)

    # ----------- PART 2 ----------- #
    calories.sort(reverse=True)
    top_three = sum(calories[0:3])

    # Answer part 2
    display_result(2, top_three)


if __name__ == '__main__':
    run()
