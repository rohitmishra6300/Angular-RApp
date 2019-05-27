import { Component, OnInit } from '@angular/core';
import {  FormGroup ,Validators,FormBuilder} from '@angular/forms';
import { User ,IUser} from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import {ActivatedRoute,Router} from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {

  userForm:FormGroup;
  user:User;
  title:string;
  id:string;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  constructor(
    private fb:FormBuilder,
    private service:UserService,
    private router:Router,
    private route:ActivatedRoute,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastrService:ToastrService

  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    //const id='';
    if(this.id){
      this.title="Edit User";
      this.setUserValue(this.id);
    }else{
      this.title="Create User";
    }

    this.userForm=this.fb.group({
      Email: ['',[Validators.email,Validators.required]],
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Address :['',Validators.required]
    });

    setTimeout(() => this.staticAlertClosed = true, 10000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);


  }
  onSubmit():void{
    if(this.userForm.valid){
      this.createAndUpdate();
    }else{
      this.userForm.reset();
      this.toastrService.error("Invalid data , please try again !");
    }
  }
  
  setUserValue(id:string){
    this.service.getUser(id).subscribe(res=>{
      this.userForm.patchValue({
        Email: res.Email,
        FirstName:res.FirstName,
        LastName:res.LastName,
        Address :res.Address
      });
    })
  }
  createUser(user:User):void{
    this.service.createUser(user).subscribe(x=>this.afterCreate());
  }
  afterCreate():void{
    this.userForm.reset();
    this.changeSuccessMessage("User Successfully Created !");
  }
  check(){
    this.service.checkDuplicateUser(this.userForm.value).subscribe(x=>console.log(x));
  }
  updateUser(id:string,user:User):void{
    user.Id=parseInt(id);
    this.service.updateUser(id,user).subscribe(x=>this.changeSuccessMessage("User Successfully Updated !"));
  }
  createAndUpdate():void{
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.updateUser(id,this.userForm.value);
    }else{
      this.createUser(this.userForm.value);
    }
  }
  deleteUser(id:string){
    this.service.deleteUser(id).subscribe(x=>this.changeSuccessMessage("User Successfully Deleted !"));
  }
  openModal(content) {
    this.modalService.open(content);
  }
  confirmForDelete(){
    this.deleteUser(this.id);
    this.modalService.dismissAll();
  }
  public changeSuccessMessage(msg) {
    this._success.next(msg);
  }
}
