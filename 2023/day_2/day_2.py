
with open("input.txt", "r") as f:
    lines = f.readlines()

# Part 1
def parse_game(line):
    game, hands = line.split(": ")
    game_id = int(game.split(" ")[1])
    hands = hands.split("; ")
    hands = [hand.split(", ") for hand in hands]
    return game_id, hands

def check_hands(hands):
    limits = { "red": 12, "green": 13, "blue": 14 }

    for hand in hands:
        for draw in hand:
            nr, color = draw.split(" ")
            if int(nr) > limits[color]:
                return False
    
    return True

id_sum = 0
for line in lines:
    game_id, hands = parse_game(line.strip())
    valid = check_hands(hands)
    if valid:
        id_sum += game_id

print(f"Part 1 | Sum of valid game ids: {id_sum}")

# Part 2

def find_min_hand_power(hands):
    limits = {"red": 0, "green": 0, "blue": 0}
    for hand in hands:
        for draw in hand:
            nr, color = draw.split(" ")
            if int(nr) > limits[color]:
                limits[color] = int(nr)
    return limits["red"] * limits["green"] * limits["blue"]

power_sum = 0
for line in lines:
    game_id, hands = parse_game(line.strip())
    min_hand_power = find_min_hand_power(hands)
    power_sum += min_hand_power

print(f"Part 2 | Sum on mininmum set power: {power_sum}")