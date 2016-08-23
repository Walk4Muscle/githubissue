module.exports = {
    database: "githubdb",
    protocol: "mysql",
    host: "127.0.0.1",
    port: 3306, // optional, defaults to database default
    user: "root",
    password: "root",
    query: {
        pool: true // optional, false by defauls
    },
    // debug: true,
    connectionLimit : 1000,
}