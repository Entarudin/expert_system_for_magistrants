import json
from datetime import datetime
from time import time
from hashlib import md5
import os.path

from flask import Flask, g, jsonify, request, make_response
from flask_cors import CORS
from app.db import FDataBase
from app.lesson_start_table import LessonByDBTable
import sqlite3
from matplotlib import font_manager
import matplotlib.pyplot as plt

font_dirs = ['./app/font/']
font_files = font_manager.findSystemFonts(fontpaths=font_dirs)

for font_file in font_files:
    font_manager.fontManager.addfont(font_file)

plt.rcParams['font.size'] = 16
plt.rcParams['text.color'] = 'white'
plt.rcParams['font.family'] = 'Montserrat'

# config
DATABASE = "./expert.db"
DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)
app.config.update(dict(DATABASE=os.path.join(app.root_path, 'expert.db')))
CORS(app)
dbase: FDataBase = None


@app.before_request
def before_request() -> None:
    """ Установление соединения с БД перед выполнением запроса """
    global dbase
    db = get_db()
    dbase = FDataBase(db)


def connect_db() -> sqlite3.Connection:
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn


def get_db() -> sqlite3.Connection:
    """ Соединение с БД, если оно еще не установлено """
    if not hasattr(g, 'link_db'):
        g.link_db = connect_db()
        return g.link_db


@app.route('/api/get_start_questions', methods=["GET"])
def get_start_questions():
    return jsonify(dbase.get_start_questions())


@app.route('/api/get_img_by_id', methods=["GET"])
def get_img_by_id():
    answers = dict(request.args)
    img = dbase.get_img_by_id(answers['img_id'])
    if not img:
        return jsonify({'type': 'ERROR',
                        'msg': 'Image not found'})
    h = make_response(img)
    h.headers['Content-Type'] = 'image/png'
    return h


def create_graph(top_3: list) -> tuple:
    img_id = md5(str('maximus' + str(time())).encode()).hexdigest()
    filename = f'./app/images/{img_id}.png'
    fig = plt.figure(figsize=(7, 7))
    ax = fig.add_subplot()
    vals = [item['sum'] for item in top_3 if item['sum'] > 0]
    colors = ['#004281', '#006ca3', '#0098bc']
    res = ax.pie(vals, autopct='%.2f%%', colors=colors)
    per_cen_beta = [item.get_text() for item in res[-1]]
    for index, item in enumerate(top_3):
        item['per_cent'] = per_cen_beta[index]
    plt.savefig(filename)
    return img_id, filename


@app.route('/api/result_and_img_id', methods=['GET'])
def get_result_and_imgid():
    answers = dict(request.args)
    print(dict(answers))
    uniq_lesson_ides_and_types = dbase.get_uniq_id_and_lesson_type()
    debug_print(f'before {uniq_lesson_ides_and_types}')
    calculate_sum_for_each_lesson(answers, uniq_lesson_ides_and_types, is_start=False)
    uniq_lesson_ides_and_types.sort(key=lambda x: -x['sum'])
    debug_print(f'after {uniq_lesson_ides_and_types}')
    top_3 = uniq_lesson_ides_and_types[:3]
    img_id, filename = create_graph(top_3)
    dbase.add_img(img_id, filename)
    result = json.dumps([{'img_id': img_id}] + top_3)
    return result


@app.route('/')
@app.route('/api/categories_by_answers', methods=['GET'])
def categories_by_answers():
    answers = dict(request.args)
    print(dict(answers))
    COUNT_OF_REQUIRED_QUESTIONS = int(answers.get('required_count_of_questions'))
    uniq_lesson_ides_and_types = dbase.get_uniq_id_and_lesson_type(is_start=True)
    debug_print(f'before {uniq_lesson_ides_and_types}')
    calculate_sum_for_each_lesson(answers, uniq_lesson_ides_and_types, is_start=True)
    uniq_lesson_ides_and_types.sort(key=lambda x: -x['sum'])
    debug_print(f'after {uniq_lesson_ides_and_types}')

    return generate_questions(COUNT_OF_REQUIRED_QUESTIONS, uniq_lesson_ides_and_types[:3])


def generate_questions(count_of_required_questions: int, themas: list, MINIMUM_NUMBER_OF_THEMAS=3,
                       MAXIMUM_NUMBER_OF_QUESTIONS=8):
    if MINIMUM_NUMBER_OF_THEMAS == 0:
        MINIMUM_NUMBER_OF_THEMAS = 1
    if count_of_required_questions < MINIMUM_NUMBER_OF_THEMAS:
        return jsonify({'type': 'ERROR',
                        'msg': 'Error. Minimal count of required questions is 3.'})

    random_themas_proportion = count_of_required_questions % MINIMUM_NUMBER_OF_THEMAS
    one_top_theme_proportion = (count_of_required_questions - random_themas_proportion) // MINIMUM_NUMBER_OF_THEMAS
    result = dbase.get_questions_for_second_step([item['lesson_id'] for item in themas], one_top_theme_proportion,
                                                 random_themas_proportion)
    return jsonify(result)


def get_top3(uniq_lesson_ides_and_types: list):
    result = []
    for item in uniq_lesson_ides_and_types[:3]:
        result.append(f'<p>{item["lesson_type"]}: {item["sum"]}</p>')
    return '\n'.join(result)


def debug_print(msg: str):
    print(f'[{datetime.fromtimestamp(int(time()))}] - {msg}\n')


def calculate_sum_for_each_lesson(answers, uniq_lesson_ides_and_types: list, is_start=False):
    for lesson_dict in uniq_lesson_ides_and_types:
        lesson_dict['sum'] = 0
        info: list = dbase.get_full_info_about_lessons_using_lesson_id(lesson_dict.get('lesson_id'), is_start=is_start)
        lesson_class: LessonByDBTable
        for lesson_class in info:
            if lesson_class.q_id in answers.keys():
                lesson_dict['sum'] += lesson_class.get_ball_using_string_answer(answers[lesson_class.q_id])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=6969)
