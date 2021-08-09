import sqlite3


class LessonByDBTable:
    def __init__(self, sql_response: sqlite3.Row):
        self.__id: int = sql_response['id']
        self.__yes: int = sql_response['yes']
        self.__mb_yes: int = sql_response['maybe_yes']
        self.__mb_no: int = sql_response['maybe_no']
        self.__nope: int = sql_response['nope']
        self.__lesson_type: str = sql_response['lesson_type']
        self.__lesson_id: int = sql_response['lesson_id']
        self.__q_id: int = sql_response['q_id']

    def get_ball_using_string_answer(self, ans: str) -> int:
        if ans == 'yes':
            return self.__yes
        elif ans == 'mb_yes':
            return self.__mb_yes
        elif ans == 'mb_nope':
            return self.__mb_no
        elif ans == 'nope':
            return self.__nope
        else:
            return 0

    @property
    def lesson_type(self) -> str:
        return self.__lesson_type

    @property
    def lesson_id(self) -> int:
        return self.__lesson_id

    @property
    def q_id(self) -> str:
        return str(self.__q_id)
