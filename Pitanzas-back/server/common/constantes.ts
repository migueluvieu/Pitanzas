export class Constantes {   
    public static get CONFIG_LOG_FILE():string { return "./config/log4js.json"; }
    public static get MONGO_URL():string { return "MONGO_URL"; }
    public static get ENTORNO_DEV():string { return "DEV"; }
    public static get ENTORNO_PROD():string { return "PROD"; }
    public static get PORT():string { return "port"; }
    /***** Errores usuario ****/
    public static get ERR_USER_EXIST():string { return "user.err.existe"; }
    public static get ERR_USER_NO_EXIST():string { return "user.err.noExiste"; }
    public static get ERR_USER_FORMAT_ID():string { return "user.err.format.id"; }
    public static get ERR_USER_REQ_NOMBRE():string { return "user.err.req.name"; }
    public static get ERR_USER_REQ_EMAIL():string { return "user.err.req.email"; }
    public static get ERR_USER_REQ_ID():string { return "user.err.req.id"; }
    public static get ERR_USER_FORMAT_EMAIL():string { return "user.err.format.email"; }
    public static get ERR_USER_REQ_AGE():string { return "user.err.req.age"; }
    public static get ERR_USER_FORMAT_AGE():string { return "user.err.format.age"; }
    public static get ERR_USER_INSTANCIA():string { return "user.err.instancia"; }

}

