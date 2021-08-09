with open('../static/quest.txt', 'r') as file:
    content = file.read().split('\n')

content = [c + '?' for c in content if c[-1] != '?']

with open('../static/quest.txt', 'w') as file:
    file.write('\n'.join(content))