import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User,IUser, IUserList } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';
import {  FormGroup ,Validators,FormBuilder,FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filterForm:FormGroup;
  results: IUser[];
  TotalCount:number;
  page:number=1;
  pageSize:number=10;
  term:string;
  title:string="Users"
  constructor(
    private service: UserService,
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder
    ){
      
    }


  ngOnInit() {

    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getUsers(id,"",1,"",this.pageSize).subscribe(res=>this.results=res);

    }else{
      this.service.getUsers('1',"",1,"",this.pageSize).subscribe(res=>this.results=res);
    }
    this.service.getUsers('1',"",1,"",1).subscribe(res=>this.TotalCount=res[0].TotalCount);
    // this.filterForm=this.fb.group({
    //   Filter: '',
    //   SortBy:'1',
    // });
  }

  // onSubmit(){
  //   let Filter= this.filterForm.get('Filter').value;
  //   let SortBy=this.filterForm.get('SortBy').value;
  //   this.service.getUsers('1',Filter,SortBy,"",this.pageSize).subscribe(res=>this.results=res);
  // }
}