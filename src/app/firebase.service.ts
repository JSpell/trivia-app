import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth} from 'angularfire2';

@Injectable()
export class FirebaseService {

  public itemsList: FirebaseListObservable<any[]>;
  public itemsObject: FirebaseObjectObservable<any[]>;

  constructor(public af: AngularFire) {}

  connectToNode(node) {
    this.itemsList = this.af.database.list('/' + node);
    this.itemsObject = this.af.database.object('/' + node);
  }

  getAuth() {
    var auth: FirebaseAuth;
    console.log(auth);
    return(auth);
  }

  addListItem(entry) {
    if(entry != undefined && entry.trim() != "") {
      this.itemsList.push(entry.trim());
      return true;
    }
    else{
      return false;
    }
  }

  addObjectItem(key:any, value:any) {
    if(key != undefined && key.trim() != "" && value != undefined && value.trim() != "") {
      var newObject = {};
      newObject[key] = value;
      this.itemsObject.update(newObject);
      return true;
    }
    else{
      return false;
    }
  }
}