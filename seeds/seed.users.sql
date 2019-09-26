INSERT INTO hydrate_users (username, password, phone, glasses, dayStart, dayEnd)
VALUES
    ('demoUser', 'demoPassword', '(925) 922-2554', '8', '0700', '2200');

    -- psql -U zachgw -d hydrate -f ./seeds/seed.users.sql
