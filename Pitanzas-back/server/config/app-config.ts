const config = require('./app-config.json');
const messages = require('./app-messages.json');

export class AppConfig  {
  
  private static _config = config; 
  private static _messages  = messages; 
  
  public static key (name:string) : string {
        return this._config[name];
    } 
   public static msg (name:string) : string {
        return this._messages [name];
    }    
}
