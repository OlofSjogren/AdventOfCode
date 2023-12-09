import re
import math
import datetime
import multiprocessing
import os
import time


with open("input.txt", "r") as f:
    text = f.read()

def parse_section(s):
    lines = s.split("\n")[1:]
    return [list(map(int, vals)) for vals in map(lambda s: re.findall("\d+", s),lines)]

def map_section_line(input, mapping):
    dest, src, rng = mapping
    if src <= input < src + rng:
        return dest + input - src
    return input

sections = text.split("\n\n")
seeds = list(map(int, re.findall("\d+", sections[0])))
sections = list(map(parse_section, sections[1:]))

location_numbers = []
for seed in seeds:
    for section in sections:
        for mapping in section:
            new_seed = map_section_line(seed, mapping)
            if new_seed != seed:
                seed = new_seed
                break

    location_numbers.append(seed)

print(f"Part 1 | Minimum location number: {min(location_numbers)}")

# Brute force method, not proud of it but it works

def process_seed_range(args):
    index, seed_info = args
    seed_start, seed_range = seed_info
    print(f"START: Process for index {index} with seed range ({seed_start}, {seed_start + seed_range}) is starting")

    start_time = time.time()

    min_mapping = math.inf
    for seed in range(seed_start, seed_start + seed_range):
        for i, section in enumerate(sections):
            for mapping in section:
                new_seed = map_section_line(seed, mapping)
                if new_seed != seed:
                    seed = new_seed
                    break
            if i == len(sections) - 1:
                if seed < min_mapping:
                    min_mapping = seed

    end_time = time.time()
    time_taken = end_time - start_time
    minutes, seconds = divmod(time_taken, 60)

    print(f"DONE: Process for index {index} with {seed_range:,} number of seeds is done. Time taken: {int(minutes)} minutes and {seconds:.2f} seconds")
    return min_mapping

every_two_seeds = [seeds[i:i+2] for i in range(0, len(seeds), 2)]

print(f"Start time: {datetime.datetime.now()}")
with multiprocessing.Pool(10) as pool:
    indexed_every_two_seeds = list(enumerate(every_two_seeds))
    min_locations = pool.map(process_seed_range, indexed_every_two_seeds)
print(f"End time: {datetime.datetime.now()}")

print(min_locations)
print(f"Part 2 | Minimum location number: {min(min_locations)}")