TRUNCATE
    hydrate_users
    RESTART IDENTITY CASCADE;

INSERT INTO hydrate_users (username, password, glasses)
VALUES
    ('demoUser', 'demoPassword', '8'),
    ('zachgw', '$2a$12$L59IYFiwgWLYm/jByOAGWufMXNGkdUWxkuV6j4lBhJf937cYs8FLu', '4'),
    ('meggw', '$2a$12$WXYeeSiqbjysqGCTkYNA2OCvtCl.mKZ5d5stgNNjafBKy2IY277Re', '6'),
    ('lauragw', '$2a$12$c31./SZ/Z3C8yTVTH.v9v.nq8ALIBgSGHI0TH9vfdOUe6cuv/hfdq', '8')

    -- psql -U zachgw -d hydrate -f ./seeds/seed.users.sql
