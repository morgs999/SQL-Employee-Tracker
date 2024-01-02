INSERT INTO department (name) VALUES
    ("Science/R&D"),
    ("Piloting"),
    ("Delivery Personnel"),
    ("Accounting"),
    ("Medical(?)"),
    ("Janitorial"),
    ("Assistants");

INSERT INTO role(title, salary, department_id) VALUES
    -- Science/R&D -1
    ("Founder, Professor, Lead Scientist", 1000000.00, 1),
    ("Lab Assistant", 60000.00, 1),
    ("Clone Assistant", 1.00, 1),
    -- Piloting -2
    ("Current Pilot", 200000.00, 2),
    ("Former Pilot", 20.00, 2),
    ("First Mate", 50000.00, 2),
    -- Delivery Personnel -3
    ("Delivery Boy", 36000.00, 3),
    ("Delivery Girl", 40000.00, 3),
    ("Delivery Robot", 0.00, 3),
    -- Accounting -4
    ("Head Accountant", 150000.00, 4),
    ("Accounting Assistant", 48000.00, 4),
    -- Medical(?) -5
    ("Doctor", 100.00, 5)
    -- Janitorial -6
    ("Executive Janitor", 36001.00, 6),
    ("Assistant Janitor", 35999.00, 6),
    -- Assistants -7
    ("Assistant Robot", 0.00, 7),
    ("Delivery Assistant", 100.00, 7),
    ("Fuel Assistant", 0.00, 7)
;

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
    ("Hubert", "Farnsworth", 1, NULL),
    ("Hermes", "Conrad", 10, NULL),
    ("Turanga", "Leela", 4, NULL),
    ("Cubert", "Farnsworth", 3, 1),
    ("Phillip", "Fry", 7, 3),
    ("Bender", "Rodriguez", 9, 3),
    ("Amy", "Wong", 2, 1),
    ("John", "Zoidberg", 12, 1),
    ("Scruffy", NULL, 13, 2),
    ("Lord Nibbler", NULL, 17, 3),
    ("Robot 1-X", NULL, 15, 6),
    ("Wash", "Bucket", 14, 9),
    ("Labarbara", "Conrad", 11, 2),
    ("Dwight", "Conrad", 11, 2),
    ("Lando", "Tucker", 5, 3),
    ("Candy", "Female", 8, 3),
    ("Lifter", "Robot", 9, 3),
    ("Zapp", "Brannigan", 16, 5),
    ("Kif", "Kroker", 6, 3),
    ("Flexo", NULL, 9, 3)
;