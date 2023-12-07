from collections import Counter
from functools import cmp_to_key

lines = []

with open("input.txt", "r") as f:
    for line in f:
        hand, bid = line.strip().split(" ")
        lines.append((hand, int(bid)))

def card_value(card):
    letter_values = {'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10}
    if card.isdigit():
        return int(card)
    return letter_values[card]

def compare_hands(line_1, line_2):
    h1, _ = line_1
    h2, _ = line_2
    c1, c2 = Counter(h1), Counter(h2)

    delta = c2.most_common(1)[0][1] - c1.most_common(1)[0][1]
    if delta == 0:
        delta = len(c1) - len(c2)
        if delta == 0:
            for card1, card2 in zip(list(h1), (h2)):
                delta = card_value(card2) - card_value(card1)
                if delta != 0:
                    return delta
        return delta
    return delta

sorted_lines = sorted(lines, key=cmp_to_key(compare_hands), reverse=True)
total_winnings = sum([bid*rank for rank, (_, bid) in enumerate(sorted_lines, 1)])

print(f"Part 1 | Total winnings: {total_winnings}")

# --- Part 2 ---

def alter_joker_hand(hand):
    if not hand.count("J") == 5 and "J" in hand:
        most_common = Counter(hand).most_common()
        replacement = most_common[0][0] if most_common[0][0] != "J" else most_common[1][0]
        hand = hand.replace("J", replacement)
    return hand

def card_value_2(card):
    letter_values = {'A': 14, 'K': 13, 'Q': 12, 'J': 1, 'T': 10}
    if card.isdigit():
        return int(card)
    return letter_values[card]

def compare_hands_2(line_1, line_2):
    h1_orig, _ = line_1
    h2_orig, _ = line_2
    h1, h2 = alter_joker_hand(h1_orig), alter_joker_hand(h2_orig)
    c1, c2 = Counter(h1), Counter(h2)

    delta = c2.most_common(1)[0][1] - c1.most_common(1)[0][1]
    if delta == 0:
        delta = len(c1) - len(c2)
        if delta == 0:
            for card1, card2 in zip(list(h1_orig), (h2_orig)):
                delta = card_value_2(card2) - card_value_2(card1)
                if delta != 0:
                    return delta
        return delta
    return delta

sorted_lines = sorted(lines, key=cmp_to_key(compare_hands_2), reverse=True)
total_winnings = sum([bid*rank for rank, (_, bid) in enumerate(sorted_lines, 1)])

print(f"Part 2 | Total winnings: {total_winnings}")