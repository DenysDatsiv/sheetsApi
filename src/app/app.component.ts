import { GoogleDriveService } from './services/google-drive.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(private googleDriveService: GoogleDriveService) {}

  ngOnInit(): void {
    this.googleDriveService.getData().subscribe((res) => {
      this.data = res;
    });
  }
}