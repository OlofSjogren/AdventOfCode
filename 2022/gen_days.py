import os
from pathlib import Path


def main():
    current = os.getcwd()
    for i in range(1, 25):
        current_day_dir = f"{current}/day_{i}"
        Path(current_day_dir).mkdir(exist_ok=True)

        current_day_script = f"{current}/day_{i}/day_{i}.py"
        Path(current_day_script).touch(exist_ok=True)

        current_day_data = f"{current}/day_{i}/day_{i}_part_1_data"
        Path(current_day_data).touch(exist_ok=True)


if __name__ == '__main__':
    main()
