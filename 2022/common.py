import inspect
import time
import functools
import os


def read_data(part, test=False):
    try:
        if part not in [1, 2]:
            raise Exception(f"Invalid part: {part}")

        caller_path = inspect.stack()[1].filename
        data_end = f"_part_{part}_{'test_data' if test else 'data'}"
        data_path = caller_path.replace(".py", data_end)
        file = open(data_path, "r")
        data = file.read()
        file.close()
        return data

    except FileNotFoundError:
        print("\n====================================")
        print(f"Failed to find data file: {data_path}")
        print("====================================")
        exit()


def display_result(part, result):
    res_str = f"#  Part {part} result: {result}  #"
    border = "#" * len(res_str)
    print(border)
    print(res_str)
    print(border)
    return result


def print_matrix(matrix):
    for row in matrix:
        for val in row:
            print(val, end=" ")
        print()
    print()


def time_day(func):
    caller_path = inspect.stack()[1].filename
    day_number = os.path.basename(caller_path)

    @functools.wraps(func)
    def timer_wrapper():
        start_time = time.time()
        func()
        end_time = time.time()
        time_string = f"| Finished {day_number} in: {(end_time - start_time) * 1000 :.4f} ms |"
        border_string = "-" * len(time_string)
        print(border_string)
        print(time_string)
        print(border_string)

    return timer_wrapper
