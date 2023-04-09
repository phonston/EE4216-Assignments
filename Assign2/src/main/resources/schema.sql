/* --------------------- Table structure for table Tasks -------------------- */
CREATE TABLE tasks (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    completed boolean DEFAULT FALSE,
    timer int DEFAULT 0,
    PRIMARY KEY (id)
);