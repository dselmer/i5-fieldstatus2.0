import { Component, NgModule } from '@angular/core';
import {WebcamModule,WebcamImage} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
// import { Router } from '@angular/router';


@NgModule({
  imports: [
    WebcamModule
  ],
  
})
export class AppModule { }

@Component({
  selector: 'app-formpage',
  templateUrl: './formpage.component.html',
  styleUrls: ['./formpage.component.css']
})
export class FormpageComponent {
  stream:any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  savedImages:string[] = [];  
  btnLabel: string = 'Take a Pic' 
  status!: string;
  camIsShowing:boolean=false;
  camIsStreaming: boolean=false;
  displayCamera: boolean= false;
  displayDescription: boolean= false;
  formContainer: boolean= false;
  imageBox: boolean=true;
  imageBoxVisible: boolean =true;
  formInitialized: boolean=true;
  reopenCameraBtn: boolean=false;
  isFlash: boolean=false;
  




  

get $trigger(): Observable<void> {
    return this.trigger.asObservable(); 
}

snapshot(event: WebcamImage) { 
  this.previewImage = event.imageAsDataUrl;



  const imageFromEvent = event.imageAsDataUrl;
  this.savedImages.push(imageFromEvent);
}

toggleReopenCam() {
  this.reopenCameraBtn=!this.reopenCameraBtn;
}


  removeImage(image:string) {
    const indexOfImage = this.savedImages.indexOf(image);

    if(indexOfImage != -1) {
      this.savedImages.splice(indexOfImage,1);
    }
  }

  getPermission() {
    navigator.mediaDevices.getUserMedia({
      video:{
        width: 500,
        height: 500
      }
    }).then((res) => {
      this.stream = res;
      this.status = 'My camera is being accessed';
      this.btnLabel = 'Take a Pic';
      if (!this.camIsShowing) {
        this.camIsShowing=true;
      }
    }).catch(err =>{
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving webcam access';
      } else {
          this.status = 'You may not have a webcam connected to your system. Please try again....';
        }
    })
  }

  captureImage(){
    console.log("cat palace")

    this.isFlash=true;

    setTimeout(() => {
      console.log("dawg castle");
      this.isFlash=false;

    }, 200);
    

     this.trigger.next();   
     if (this.formInitialized==true){
      this.formInitialized=false;
     }
  }

sumbit(){
  console.log(this.previewImage);
}

cameraOff() {
  this.imageBoxVisible=false;
  this.toggleReopenCam();
}

reopenCam() {
    this.imageBoxVisible=true;
      this.camIsShowing= true;
    this.toggleReopenCam();
}

// constructor(private router: Router) { }
// constructor() { }

// goToARDemo() {
//   this.router.navigate(['/ardemo']);
// }

}





