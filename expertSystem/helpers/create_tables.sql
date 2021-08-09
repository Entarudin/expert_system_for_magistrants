CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT)


create table IF NOT EXISTS lesson_theme
(
    id          INTEGER
        primary key autoincrement,
    yes         INTEGER,
    maybe_yes   INTEGER,
    maybe_no    INTEGER,
    nope        INTEGER,
    lesson_type TEXT,
    lesson_id   INTEGER,
    q_id        INTEGER not null
        references questions
);


create table IF NOT EXISTS start_questions
(
    id          INTEGER
        primary key autoincrement,
    yes         INTEGER,
    maybe_yes   INTEGER,
    maybe_no    INTEGER,
    nope        INTEGER,
    lesson_type TEXT,
    lesson_id   INTEGER,
    q_id        INTEGER not null
        references questions
);

CREATE TABLE IF NOT EXISTS images
    (
        api_id INTEGER,
        path TEXT
);

