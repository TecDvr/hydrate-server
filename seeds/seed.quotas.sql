INSERT INTO hydrate_quotas (user_id, date, amount)
VALUES
    ('1', '2019-09-25', '4');

    -- psql -U zachgw -d hydrate -f ./seeds/seed.quotas.sql