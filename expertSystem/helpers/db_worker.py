import sqlite3 as sq


def get_all_questions(path='../static/quest.txt') -> list:
    with open(path, 'r') as file:
        content = file.read()
    return content.split('\n')


def create_table_questions(cur) -> None:
    """
    Данная функция создает таблицу вопросов в базе данных
    :param cur: объект курсора БД
    :return:
    """
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT)
        """)


def insert_questions_in_table(cur) -> None:
    """
    Данная функция добавляет в таблицу questions все вопросы из файла quest
    :param cur:
    :return:
    """
    questions = get_all_questions()
    for q in questions:
        cur.execute(f"""
        INSERT INTO questions(text) VALUES(?)
    """, (q,))


def check_id(id: int, cur=None) -> str:
    """
    Данная функция возвращает значение из таблицы questions по переданному id
    :param id:
    :param cur:
    :return:
    """
    con = sq.connect("../expert.db")
    cur = con.cursor()
    cur.execute(f'''
    SELECT * FROM questions WHERE id = ?''', (id,))
    result = cur.fetchone()
    return result


if __name__ == '__main__':
    con = sq.connect("../expert.db")
    cur = con.cursor()
    create_table_questions(cur)
    insert_questions_in_table(cur)
    con.commit()
    con.close()
