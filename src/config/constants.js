module.exports = {
    ROLES : { USER : "user" , ADMIN : "admin"},
    RECENTLY_PLAYED_LIMIT : 20 ,
    DEFAULT_PAGE_SIZE : 20,
    MAX_PAGE_SIZE : 100,
    COOKIES_OPTIONS: {
        httpOnly : true,
        secure : process.env.NODE_ENV == "production",
        sameSite : "strict",
    },
    
};