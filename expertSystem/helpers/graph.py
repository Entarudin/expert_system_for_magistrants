from matplotlib import font_manager
import matplotlib.pyplot as plt

font_dirs = ['../app/font/']
font_files = font_manager.findSystemFonts(fontpaths=font_dirs)

for font_file in font_files:
    font_manager.fontManager.addfont(font_file)

plt.rcParams['font.size'] = 18
plt.rcParams['text.color'] = 'white'
plt.rcParams['font.family'] = 'Montserrat'
fig = plt.figure(figsize=(7, 7))
ax = fig.add_subplot()
vals = [32, 18, 6]
colors = ['#004281', '#006ca3', '#0098bc']
res = ax.pie(vals, autopct='%.2f%%', colors=colors)
per_cen_beta = [item.get_text() for item in res[-1]]
print(per_cen_beta)

plt.savefig('../m.svg')
plt.show()
