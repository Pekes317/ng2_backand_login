import {Http, Headers} from 'angular2/http';
import{Injectable} from 'angular2/core';
import 'rxjs/Rx';

@Injectable()
export class Backand {
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};
  api_url:string = "https://api.backand.com";
  app_name:string = "ebc2";
  auth_type:string = "N/A";
  auth_status:string = "";
  is_auth_error:boolean = false;

  constructor(public http:Http){

  }

  get tokenUrl(){
    return this.api_url + '/token';
  }

  public signIn(user:string, pass:string){
    this.auth_type = 'Token';
    let http = Http;
    let creds = `username=${user}` +
      `&password=${pass}` +
      `&appName=${this.app_name}` +
      `&grant_type=password`;    
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.tokenUrl, creds, {
      headers: header
    })
    .map(res => this.getToken(res))
  }

  public extractErrorMessage (err) {
    return JSON.parse(err._body).error_description;
  }

  public setTokenHeader(jwt) {
    if (jwt) {
      this.auth_token.header_name = "Authorization";
      this.auth_token.header_value = "Bearer " + jwt;
    }
  }

  private getToken(res) {
    console.log(res);
    return res.json().access_token;
  }

  private get authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
    return authHeader;
  }

  logError(err) {
    console.error('Error: ' + err);
  }
}
