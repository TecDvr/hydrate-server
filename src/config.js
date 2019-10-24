module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://zachgw@localhost/hydrate',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://zachgw@localhost/hydrate-test",
    TWILIO_KEY: process.env.TWILIO_KEY,
    TWILIO_SID: process.env.TWILIO_SID
};