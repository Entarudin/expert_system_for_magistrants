import sqlite3 as sq
from db_worker import check_id

APPLIED_MATHEMATICS = "Прикладная математика для высокопроизводительных вычислительных систем"
MATHEMATICAL_MODELING = "Математическое моделирование в инженерных науках"
HIGH_PERFORMANCE_COMPUTING_SYSTEMS = "Высокопроизводительные вычислительные системы"
INTELLIGENT_SYSTEMS = "Интеллектуальные системы"
INFORMATION_AND_SOFTWARE_SUPPORT = "Информационное и программное обеспечение автоматизированных систем"
SYSTEM_INTEGRATION_AND_BUSINESS = "Системная интеграция и управление бизнес-процессами"
MACHINE_LEARNING_AND_BIG_DATA = "Машинное обучение и технологии больших данных"
ERGODESIGN_OF_THE_USER_INTERFACE = "Эргодизайн пользовательского интерфейса"
AUTOMATED_INFORMATION_SYSTEMS = "Автоматизированные информационные системы"
SYSTEM_ANALYSIS_AND_MANAGEMENT = "Системный анализ и управление"
START_TABLE = 'Начальные вопросы'

ID_START_TABLE = 0
ID_APPLIED_MATHEMATICS = 1
ID_MATHEMATICAL_MODELING = 2
ID_HIGH_PERFORMANCE_COMPUTING_SYSTEMS = 3
ID_INTELLIGENT_SYSTEMS = 4
ID_INFORMATION_AND_SOFTWARE_SUPPORT = 5
ID_SYSTEM_INTEGRATION_AND_BUSINESS = 6
ID_MACHINE_LEARNING_AND_BIG_DATA = 7
ID_ERGODESIGN_OF_THE_USER_INTERFACE = 8
ID_AUTOMATED_INFORMATION_SYSTEMS = 9
ID_SYSTEM_ANALYSIS_AND_MANAGEMENT = 10


class Item:
    def __init__(self, db_id: int, yes: int):
        self.db_id = db_id
        self.yes = yes
        self.mb_yes = None
        self.mb_no = None
        self.no = None
        self.__get_yes_no(yes)

    def print_about(self):
        print(f'id = {self.db_id}\n'
              f'yes = {self.yes}\n'
              f'mb_yes = {self.mb_yes}\n'
              f'mb_no = {self.mb_no}\n'
              f'no = {self.no}\n'
              f'text = {check_id(self.db_id)}\n')

    def __get_yes_no(self, yes: int):
        if yes == 15:
            self.mb_yes = 7
            self.mb_no = -7
            self.no = -15
        elif yes == 10:
            self.mb_yes = 5
            self.mb_no = -5
            self.no = -10

        elif yes == 5:
            self.mb_yes = 2
            self.mb_no = 0
            self.no = -2

        elif yes == -2:
            self.mb_yes = 0
            self.mb_no = 2
            self.no = 5

        elif yes == -10:
            self.mb_yes = -5
            self.mb_no = 5
            self.no = 10

        elif yes == -15:
            self.mb_yes = -7
            self.mb_no = 7
            self.no = 15


class LessonTable:
    def __init__(self, lesson_name: str, lesson_id: int):
        self.lesson_name = lesson_name
        self.lesson_id = lesson_id
        self.items = []

    @property
    def number_of_items(self):
        return len(self.items)

    def add_item(self, item: Item) -> None:
        self.items.append(item)

    def print_items(self) -> None:
        for item in self.items:
            item.print_about()


class StartItem(Item):
    def __init__(self, db_id: int, yes: int, lesson_type: str, lesson_id: int):
        super().__init__(db_id, yes)
        self.lesson_name = lesson_type
        self.lesson_id = lesson_id


def insert_info_to_lesson_theme_table(les_tab: LessonTable):
    con = sq.connect("../expert.db")
    cur = con.cursor()
    for item in les_tab.items:
        cur.execute(f"""
                INSERT INTO lesson_theme(yes, maybe_yes, maybe_no, nope, lesson_type, lesson_id, q_id) 
                VALUES(?, ?, ?, ?, ?, ?, ?)
            """, (item.yes,
                  item.mb_yes,
                  item.mb_no,
                  item.no,
                  les_tab.lesson_name,
                  les_tab.lesson_id,
                  item.db_id))
    con.commit()
    con.close()


def insert_info_to_start_questions_table(les_tab: LessonTable):
    con = sq.connect("../expert.db")
    cur = con.cursor()
    for item in les_tab.items:
        cur.execute(f"""
                    INSERT INTO start_questions(yes, maybe_yes, maybe_no, nope, lesson_type, lesson_id, q_id) 
                    VALUES(?, ?, ?, ?, ?, ?, ?)
                """, (item.yes,
                      item.mb_yes,
                      item.mb_no,
                      item.no,
                      item.lesson_name,
                      item.lesson_id,
                      item.db_id))
    con.commit()
    con.close()


def dump_info_from_tables_into_base(start=False, *args) -> None:
    for struct in args:
        insert_info_to_start_questions_table(struct) if start else insert_info_to_lesson_theme_table(struct)


if __name__ == '__main__':
    first_table_app_math = LessonTable(APPLIED_MATHEMATICS, ID_APPLIED_MATHEMATICS)
    first_table_app_math.add_item(Item(26, -10))
    first_table_app_math.add_item(Item(7, 5))
    first_table_app_math.add_item(Item(1, 10))
    first_table_app_math.add_item(Item(4, 10))
    first_table_app_math.add_item(Item(25, 10))
    first_table_app_math.add_item(Item(8, 10))
    first_table_app_math.add_item(Item(9, 10))
    first_table_app_math.add_item(Item(10, 10))
    # first_table_app_math.print_items()

    second_table_math_model = LessonTable(MATHEMATICAL_MODELING, ID_MATHEMATICAL_MODELING)
    second_table_math_model.add_item((Item(26, -10)))
    second_table_math_model.add_item((Item(8, 5)))
    second_table_math_model.add_item((Item(25, 5)))
    second_table_math_model.add_item((Item(2, 5)))
    second_table_math_model.add_item((Item(7, 10)))
    second_table_math_model.add_item((Item(14, 10)))
    second_table_math_model.add_item((Item(1, 15)))
    # second_table_math_model.print_items()

    third_table_high_perf = LessonTable(HIGH_PERFORMANCE_COMPUTING_SYSTEMS, ID_HIGH_PERFORMANCE_COMPUTING_SYSTEMS)
    third_table_high_perf.add_item(Item(26, -10))
    third_table_high_perf.add_item(Item(25, 5))
    third_table_high_perf.add_item(Item(14, 5))
    third_table_high_perf.add_item(Item(10, 5))
    third_table_high_perf.add_item(Item(4, 10))
    third_table_high_perf.add_item(Item(9, 10))
    third_table_high_perf.add_item(Item(15, 10))
    third_table_high_perf.add_item(Item(16, 10))
    third_table_high_perf.add_item(Item(17, 10))
    third_table_high_perf.add_item(Item(18, 10))
    # third_table_high_perf.print_items()

    fourth_table_intel_systems = LessonTable(INTELLIGENT_SYSTEMS, ID_INTELLIGENT_SYSTEMS)
    fourth_table_intel_systems.add_item(Item(21, 5))
    fourth_table_intel_systems.add_item(Item(24, 5))
    fourth_table_intel_systems.add_item(Item(26, 10))
    fourth_table_intel_systems.add_item(Item(14, 10))
    fourth_table_intel_systems.add_item(Item(18, 10))
    fourth_table_intel_systems.add_item(Item(6, 10))
    fourth_table_intel_systems.add_item(Item(19, 10))
    fourth_table_intel_systems.add_item(Item(20, 10))
    fourth_table_intel_systems.add_item(Item(23, 10))
    fourth_table_intel_systems.add_item(Item(30, 10))
    # fourth_table_intel_systems.print_items()
    # print(fourth_table_intel_systems.number_of_items)

    fifth_table_inf_and_prog = LessonTable(INFORMATION_AND_SOFTWARE_SUPPORT, ID_INFORMATION_AND_SOFTWARE_SUPPORT)
    fifth_table_inf_and_prog.add_item(Item(18, 5))
    fifth_table_inf_and_prog.add_item(Item(4, 5))
    fifth_table_inf_and_prog.add_item(Item(16, 5))
    fifth_table_inf_and_prog.add_item(Item(22, 5))
    fifth_table_inf_and_prog.add_item(Item(26, 10))
    fifth_table_inf_and_prog.add_item(Item(14, 10))
    fifth_table_inf_and_prog.add_item(Item(23, 10))
    fifth_table_inf_and_prog.add_item(Item(17, 10))
    fifth_table_inf_and_prog.add_item(Item(27, 10))
    # fifth_table_inf_and_prog.print_items()
    # print(fifth_table_inf_and_prog.number_of_items)

    sixth_table_system_integration = LessonTable(SYSTEM_INTEGRATION_AND_BUSINESS, ID_SYSTEM_INTEGRATION_AND_BUSINESS)
    sixth_table_system_integration.add_item(Item(18, 5))
    sixth_table_system_integration.add_item(Item(14, 5))
    sixth_table_system_integration.add_item(Item(1, 5))
    sixth_table_system_integration.add_item(Item(3, 5))
    sixth_table_system_integration.add_item(Item(24, 10))
    sixth_table_system_integration.add_item(Item(2, 10))
    sixth_table_system_integration.add_item(Item(5, 10))
    sixth_table_system_integration.add_item(Item(11, 10))
    sixth_table_system_integration.add_item(Item(12, 10))
    sixth_table_system_integration.add_item(Item(28, 10))
    sixth_table_system_integration.add_item(Item(29, -10))
    # sixth_table_system_integration.print_items()
    # print(sixth_table_system_integration.number_of_items)

    seventh_table_machine_learning = LessonTable(MACHINE_LEARNING_AND_BIG_DATA, ID_MACHINE_LEARNING_AND_BIG_DATA)
    seventh_table_machine_learning.add_item(Item(26, -10))
    seventh_table_machine_learning.add_item(Item(1, 5))
    seventh_table_machine_learning.add_item(Item(20, 5))
    seventh_table_machine_learning.add_item(Item(10, 5))
    seventh_table_machine_learning.add_item(Item(18, 10))
    seventh_table_machine_learning.add_item(Item(12, 10))
    seventh_table_machine_learning.add_item(Item(22, 10))
    seventh_table_machine_learning.add_item(Item(19, 10))
    seventh_table_machine_learning.add_item(Item(31, 10))
    # seventh_table_machine_learning.print_items()
    # print(seventh_table_machine_learning.number_of_items)

    eighth_table_ergodesign = LessonTable(ERGODESIGN_OF_THE_USER_INTERFACE, ID_ERGODESIGN_OF_THE_USER_INTERFACE)
    eighth_table_ergodesign.add_item(Item(12, 5))
    eighth_table_ergodesign.add_item(Item(22, 5))
    eighth_table_ergodesign.add_item(Item(14, 5))
    eighth_table_ergodesign.add_item(Item(6, 5))
    eighth_table_ergodesign.add_item(Item(3, 10))
    eighth_table_ergodesign.add_item(Item(24, 10))
    eighth_table_ergodesign.add_item(Item(21, 10))
    eighth_table_ergodesign.add_item(Item(13, 10))
    eighth_table_ergodesign.add_item(Item(28, 10))
    eighth_table_ergodesign.add_item(Item(29, -10))
    # eighth_table_ergodesign.print_items()
    # print(eighth_table_ergodesign.number_of_items)

    ninth_table_auto_info_sys = LessonTable(AUTOMATED_INFORMATION_SYSTEMS, ID_AUTOMATED_INFORMATION_SYSTEMS)
    ninth_table_auto_info_sys.add_item(Item(10, 5))
    ninth_table_auto_info_sys.add_item(Item(16, 5))
    ninth_table_auto_info_sys.add_item(Item(17, 10))
    ninth_table_auto_info_sys.add_item(Item(18, 5))
    ninth_table_auto_info_sys.add_item(Item(22, 15))
    ninth_table_auto_info_sys.add_item(Item(23, 10))
    ninth_table_auto_info_sys.add_item(Item(25, 10))
    ninth_table_auto_info_sys.add_item(Item(26, -10))
    # ninth_table_auto_info_sys.print_items()
    # print(ninth_table_auto_info_sys.number_of_items)

    tenth_table_sys_analysis = LessonTable(SYSTEM_ANALYSIS_AND_MANAGEMENT, ID_SYSTEM_ANALYSIS_AND_MANAGEMENT)
    tenth_table_sys_analysis.add_item(Item(5, 15))
    tenth_table_sys_analysis.add_item(Item(20, 5))
    tenth_table_sys_analysis.add_item(Item(23, 15))
    tenth_table_sys_analysis.add_item(Item(25, 5))
    tenth_table_sys_analysis.add_item(Item(28, 10))
    tenth_table_sys_analysis.add_item(Item(29, -2))
    # tenth_table_sys_analysis.print_items()
    # print(tenth_table_sys_analysis.number_of_items)

    start_table = LessonTable(START_TABLE, ID_START_TABLE)
    start_table.add_item(StartItem(25, 10, APPLIED_MATHEMATICS, ID_APPLIED_MATHEMATICS))
    start_table.add_item(StartItem(26, -10, APPLIED_MATHEMATICS, ID_APPLIED_MATHEMATICS))

    start_table.add_item(StartItem(25, 5, MATHEMATICAL_MODELING, ID_MATHEMATICAL_MODELING))
    start_table.add_item(StartItem(26, -10, MATHEMATICAL_MODELING, ID_MATHEMATICAL_MODELING))
    start_table.add_item(StartItem(28, 5, MATHEMATICAL_MODELING, ID_MATHEMATICAL_MODELING))

    start_table.add_item(StartItem(25, 5, HIGH_PERFORMANCE_COMPUTING_SYSTEMS, ID_HIGH_PERFORMANCE_COMPUTING_SYSTEMS))
    start_table.add_item(StartItem(26, -10, HIGH_PERFORMANCE_COMPUTING_SYSTEMS, ID_HIGH_PERFORMANCE_COMPUTING_SYSTEMS))
    start_table.add_item(StartItem(27, 5, HIGH_PERFORMANCE_COMPUTING_SYSTEMS, ID_HIGH_PERFORMANCE_COMPUTING_SYSTEMS))

    start_table.add_item(StartItem(26, 10, INTELLIGENT_SYSTEMS, ID_INTELLIGENT_SYSTEMS))
    start_table.add_item(StartItem(30, 10, INTELLIGENT_SYSTEMS, ID_INTELLIGENT_SYSTEMS))

    start_table.add_item(StartItem(26, 10, INFORMATION_AND_SOFTWARE_SUPPORT, ID_INFORMATION_AND_SOFTWARE_SUPPORT))
    start_table.add_item(StartItem(27, 10, INFORMATION_AND_SOFTWARE_SUPPORT, ID_INFORMATION_AND_SOFTWARE_SUPPORT))

    start_table.add_item(StartItem(28, 10, SYSTEM_INTEGRATION_AND_BUSINESS, ID_SYSTEM_INTEGRATION_AND_BUSINESS))
    start_table.add_item(StartItem(29, -10, SYSTEM_INTEGRATION_AND_BUSINESS, ID_SYSTEM_INTEGRATION_AND_BUSINESS))

    start_table.add_item(StartItem(26, -10, MACHINE_LEARNING_AND_BIG_DATA, ID_MACHINE_LEARNING_AND_BIG_DATA))
    start_table.add_item(StartItem(31, 10, MACHINE_LEARNING_AND_BIG_DATA, ID_MACHINE_LEARNING_AND_BIG_DATA))

    start_table.add_item(StartItem(28, 10, ERGODESIGN_OF_THE_USER_INTERFACE, ID_ERGODESIGN_OF_THE_USER_INTERFACE))
    start_table.add_item(StartItem(29, -10, ERGODESIGN_OF_THE_USER_INTERFACE, ID_ERGODESIGN_OF_THE_USER_INTERFACE))

    start_table.add_item(StartItem(25, 10, AUTOMATED_INFORMATION_SYSTEMS, ID_AUTOMATED_INFORMATION_SYSTEMS))
    start_table.add_item(StartItem(26, -10, AUTOMATED_INFORMATION_SYSTEMS, ID_AUTOMATED_INFORMATION_SYSTEMS))

    start_table.add_item(StartItem(25, 5, SYSTEM_ANALYSIS_AND_MANAGEMENT, ID_SYSTEM_ANALYSIS_AND_MANAGEMENT))
    start_table.add_item(StartItem(28, 10, SYSTEM_ANALYSIS_AND_MANAGEMENT, ID_SYSTEM_ANALYSIS_AND_MANAGEMENT))
    start_table.add_item(StartItem(29, -2, SYSTEM_ANALYSIS_AND_MANAGEMENT, ID_SYSTEM_ANALYSIS_AND_MANAGEMENT))

    # insert_info_to_lesson_theme_table(les_tab=)
    dump_info_from_tables_into_base(False,  first_table_app_math, second_table_math_model,
                                    third_table_high_perf, fourth_table_intel_systems, fifth_table_inf_and_prog,
                                    sixth_table_system_integration, seventh_table_machine_learning,
                                    eighth_table_ergodesign, ninth_table_auto_info_sys, tenth_table_sys_analysis)

    dump_info_from_tables_into_base(True, start_table)
