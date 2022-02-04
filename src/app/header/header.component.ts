import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub:Subscription;
  isAuthenticated=false;
  @Output() featureSelected= new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user; 
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }

  onSaveData(){
    this.dataStorageService.saveRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  Logout(){
    this.authService.logout();
  }
}
