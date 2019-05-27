import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IUser ,User, IUserList} from '../models/user.model';

import { catchError } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseUrl: string;
   User:User;
   constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:51618/api/"
   }

   //int PageNumber = 0, int PageSize = 5, string Filter = "", int SortBy = 1,string SortByFilter=""
  getUsers(page: string,filter:string,sortBy:number,sortByFilter:string,pazeSize=10): Observable<IUser[]> {
    try {
      let url: string = this.baseUrl + "Users?PageNumber=" + page+"&Filter="+filter+"&SortByFilter="+sortByFilter+"&SortBy="+sortBy+"&SortBy="+pazeSize;
      return this.http.get<IUser[]>(url);
    }
    catch (Exception) {
      throw Exception;
    }
  }

  getUser(id: string) {
    try {
      let url: string = this.baseUrl + "users/" + id;
      return this.http.get<User>(url);
    } catch (excepion) {
      throw excepion;
    }
  }

  createUser(user: User) {
    try {
      let url: string = this.baseUrl + "Users";
      return this.http.post<User>(url,user,{
        headers:new HttpHeaders({
          'Content-Type': 'application/json', 
        })
      }).pipe(catchError(this.handleError));
    }  catch (Exception) {
      
      throw Exception;
    }
  }
  updateUser(id:string,user: User) {
    try {
      let url: string = this.baseUrl + "Users/"+id;
      return this.http.put<any>(url,user).pipe(catchError(this.handleError));
    }  catch (Exception) {
      throw Exception;
    }
  }
  deleteUser(id:string) {
    try {
      let url: string = this.baseUrl + "Users/"+id;
      return this.http.delete<any>(url).pipe(catchError(this.handleError));
    }  catch (Exception) {
      throw Exception;
    }
  }
  checkDuplicateUser(email:string){
    let url: string = this.baseUrl + "Users/CheckDuplicate";
    return this.http.put<any>(url,email).pipe(catchError(this.handleError));
  }
  
  create_Array_Of_Number_ByLength(length: number): number[] {
    let array: number[];
    for (var i = 1; i <= length; i++) {
      array.push(i);
    }
    return array;
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    
    return throwError(errorMessage);
  }
 
}
