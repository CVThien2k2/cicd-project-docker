module.exports = {
    MGDB_IP: process.env.MGDB_IP || "mongo",
    MGDB_PORT: process.env.MGDB_PORT || 27017,
    MGDB_USERNAME: process.env.MGDB_USERNAME,
    MGDB_PASSWORD: process.env.MGDB_PASSWORD,
}