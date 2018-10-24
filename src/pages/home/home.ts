import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Refresher } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name;
  quantity:number;
  items=[];  
  shopping={
    key:'',
    name:''
  }
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl : AlertController) {
    this.getDatabase();
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  getDatabase(){
    this.items=[];

    firebase.database().ref('/shopping/').on("value", (snapshot) => {
     snapshot.forEach((snap) => {
      

       console.log(snap.val());
       //append To Item List
       this.items.push({name:snap.val().name,key:snap.key});
       this.items.push({quantity:snap.val().quantity,key:snap.key})
       console.log('key '+ snap.key);
       return false;
     });
   });
  }
  //write to database
  addItem(){
    
    this.items=[];

    // this.afDB.list('cuisine').push(this.name);
    console.log(this.name,this.quantity);
    
    this.shopping.name = this.name;
    
    var databese = firebase.database();
    databese.ref('/shopping/').push(this.shopping);
  }
  update(key){
    // this.name = this.navParams.get('name');
  
    // this.navCtrl.push("UpdatePage")
    // var database = firebase.database();
    // database.ref('/cuisine/'+key).set(this.name)
    // this.getDatabase();
    const alert =this.alertCtrl.create({
      title: 'Update',
      message: 'Update',
      inputs:[
        {
          name: 'text',
        }
      ],
      buttons: [
        {
          text: 'update',
          handler: name=>{
    //           var database = firebase.database();
    //  database.ref('/shopping/'+key).set({name:name.input})
    
    var database = firebase.database();
    database.ref('/shopping/'+key).set({name: name.text});
     this.getDatabase();
          }
        }
      ]
    });
    alert.present();
    

  }
  delete(key){
    
    var database = firebase.database();
    database.ref('/shopping/'+key).remove();
    console.log(this.name);
    
  }



}
