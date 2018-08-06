import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';





/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  items; 
  name; 
 value:string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.value= this.name.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }
  update(key){
     
    var database = firebase.database();
    database.ref('/cuisine/'+key).set({name:this.name});

  }
  

}
