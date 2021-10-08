import sqlite3
from time import time
from datetime import datetime
from colorama import Fore
from random import shuffle
from .lesson_start_table import LessonByDBTable


class FDataBase:
    def __init__(self, db: sqlite3.Connection):
        self.__db = db
        self.__cur = db.cursor()

    @staticmethod
    def __print_error_msg(msg: str) -> None:
        print(f"{Fore.RED}[{datetime.fromtimestamp(int(time()))}] - {msg}{Fore.RESET}")

    @property
    def count_of_lesson_type(self) -> int:
        try:
            self.__cur.execute('''
            SELECT COUNT(DISTINCT lesson_type) FROM lesson_theme''')
            result = int(self.__cur.fetchone())
            return result
        except Exception as err:
            self.__print_error_msg('function count_of_lesson_type error')

    def get_img_by_id(self, img_id: str):
        try:
            self.__cur.execute('''
            SELECT path FROM images WHERE api_id=?''', (img_id,))
            img_path = self.__cur.fetchone()['path']
            with open(img_path, 'rb') as file:
                img = file.read()
            return img
        except Exception as err:
            self.__print_error_msg(str(err))
            return False

    def get_start_questions(self, id_only=False) -> list:
        try:
            if id_only:
                self.__cur.execute('''
                                    SELECT id FROM questions
                                    WHERE id in 
                                    (SELECT DISTINCT start_questions.q_id FROM start_questions);''')
            else:
                self.__cur.execute('''
                        SELECT id, text FROM questions
                        WHERE id in 
                        (SELECT DISTINCT start_questions.q_id FROM start_questions);''')
            id_list = [dict(item) for item in self.__cur.fetchall()]

            shuffle(id_list)
            return id_list

        except Exception as err:
            self.__print_error_msg('function get_start_id_questions error')

    def get_uniq_lesson_ides_from_start_questions(self) -> list:
        try:
            self.__cur.execute('''SELECT DISTINCT (lesson_id) FROM start_questions''')
            result = [item['lesson_id'] for item in self.__cur.fetchall()]
            return result
        except Exception as err:
            self.__print_error_msg(str(err))

    def get_uniq_id_and_lesson_type(self, is_start=False) -> list:
        try:
            if is_start:
                self.__cur.execute('''
                SELECT DISTINCT (lesson_type), lesson_id FROM start_questions''')
            else:
                self.__cur.execute('''
                                SELECT DISTINCT (lesson_type), lesson_id FROM lesson_theme''')
            result = [dict(item) for item in self.__cur.fetchall()]
            return result
        except Exception as err:
            self.__print_error_msg(str(err))

    def get_by_lesson_id_start_questions_id(self, lesson_id: int) -> list:
        try:
            self.__cur.execute('''SELECT q_id FROM start_questions WHERE lesson_id=?''', (lesson_id,))
            result = [item['q_id'] for item in self.__cur.fetchall()]
            return result
        except Exception as err:
            self.__print_error_msg(str(err))

    def get_full_info_about_lessons_using_lesson_id(self, lesson_id: int, is_start=False) -> list:
        try:
            if is_start:
                self.__cur.execute('''SELECT * FROM start_questions WHERE lesson_id=?''', (lesson_id,))
            else:
                self.__cur.execute('''SELECT * FROM lesson_theme WHERE lesson_id=?''', (lesson_id,))
            result = [LessonByDBTable(item) for item in self.__cur.fetchall()]
            return result
        except Exception as err:
            self.__print_error_msg(str(err))

    def get_questions_for_second_step(self, lesson_ides: list, number_top_q: int, number_sub_q: int):
        if number_sub_q < 1:
            number_sub_q = 3
        result = []
        top_ides = []
        start_flag = True
        for l_id in lesson_ides:
            if start_flag:
                q_ides = self.get_required_random_q_id_by_theme(l_id, number_top_q)
                start_flag = False
            else:
                q_ides = self.get_required_random_q_id_by_theme(l_id, number_top_q, top_ides)
            request = f'SELECT id, text FROM questions WHERE id in ({",".join(["?"] * len(q_ides))})'
            self.__cur.execute(request, tuple(q_ides))
            result += [dict(item) for item in self.__cur.fetchall()]
            top_ides += q_ides
        request = f'SELECT id, text  FROM questions WHERE id NOT in ({",".join(["?"] * len(top_ides))}) ' \
                  f'AND id<25 LIMIT ?'
        self.__cur.execute(request, tuple(top_ides + [number_sub_q]))
        result += [dict(item) for item in self.__cur.fetchall()]
        return result

    def get_required_random_q_id_by_theme(self, lesson_id: int, number_q_id: int, used_id: list = []):
        try:
            if len(used_id) == 0:
                request = f'SELECT q_id FROM lesson_theme WHERE lesson_id=? AND q_id < 25 order by RANDOM() LIMIT ?'

            else:
                request = f'SELECT q_id FROM lesson_theme WHERE lesson_id=? AND q_id < 25 AND q_id NOT IN ' \
                          f'({",".join("?" * len(used_id))})  order by RANDOM() LIMIT ?'

            self.__cur.execute(request, tuple([lesson_id] + used_id + [number_q_id]))
            result = [item['q_id'] for item in self.__cur.fetchall()]
            return result
        except Exception as err:
            self.__print_error_msg(str(err))

    def add_img(self, api_id: int, filename: str):
        try:
            self.__cur.execute('''INSERT INTO images VALUES (?, ?)''', (api_id, filename))
            self.__db.commit()
        except Exception as err:
            self.__print_error_msg(str(err))


if __name__ == '__main__':
    conn = sqlite3.connect('../expert.db')
    conn.row_factory = sqlite3.Row
    FDB = FDataBase(conn)
