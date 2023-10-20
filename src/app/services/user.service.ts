import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RoleWrapper } from '../model/RoleWrapped.model';
import { Role } from '../model/Role.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string= 'http://localhost:8081/users/api';
  apiURLRole: string = 'http://localhost:8081/users/role';

  users: User[] =[];
  
  constructor(private http:HttpClient,
    private authService:AuthService) { 

    }

    listeUser(): Observable<User[]>{
      let jwt =this.authService.getToken();
      jwt="Bearer "+jwt;
      let httpHeaders=new HttpHeaders({"Authorization":jwt})
      return this.http.get<User[]>(this.apiURL+"/all");
    }

    listeRole(id:number): Observable<Role[]>{
      const url = `${this.apiURL}/${id}/roles`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.get<Role[]>(url,{headers:httpHeaders});
    }

    
    listeRoles():Observable<RoleWrapper>{
      // return this.http.get<AeroportWrapper>(this.apiURLAir);
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<RoleWrapper>(this.apiURLRole,{headers:httpHeaders});
    }
}
