import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TokenProvider } from '../../providers/token/token';

import config from '../../config'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username = "";
  name = "";
  score = 0;
  bio = "";
  attended_events = [];

  token = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events, private http:HttpClient, private tokenProvider:TokenProvider) {
    this.token = tokenProvider.token;
    events.subscribe('token-update', (token) => {
      this.token = token;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.http.get(config.ACCOUNTS_URL + '/user/token/' + this.token, {
      //headers : new HttpHeaders().set('Authorization', 'Basic ' + btoa(config.CLIENT_ID + ':' + config.CLIENT_SECRET))
    }).subscribe((data: any) => {
      this.username = data.user.username;
      this.name = data.user.name;
      this.score = data.user.score || 0;
      this.bio = data.user.bio;
      var user_events = JSON.parse(data.user.events);
      for(var i = 0; i < user_events.length; i++){
        this.http.get(config.EVENTS_URL + "/event/" + user_events[i]).subscribe((data:any) => {
          this.attended_events.push(data.event);
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

}
