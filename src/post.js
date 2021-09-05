
export class Post {
 constructor(title ) {
     this.title = title;
     this.date = new Date();
    

     function toString() {
         JSON.stringify({
             title: this.title,
             date: this.date.toJSON() 
         })
     }
 }
}