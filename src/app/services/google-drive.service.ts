import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private readonly API_KEY = 'AIzaSyDojzM3V0ip-FBEcD-IO9jugGUJyCRFjpM';

  constructor(private readonly http: HttpClient) { }

  public getData(): Observable<any> {
    const spreadsheetId = '1eNmhmXQAMbe6q9mtpTpW0vFH1TdJXxf';
    const range = 'sample';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${this.API_KEY}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, { headers })
      .pipe(
        map((res: any) => {
          const data = res.values;

          const returnArray: Array<any> = [];
          if (data && data.length > 1) {
            const headers = data[0];
            for (let i = 1; i < data.length; i++) {
              const obj = {};
              const currentRow = data[i];
              for (let j = 0; j < currentRow.length; j++) {
                obj[headers[j]] = currentRow[j];
              }
              returnArray.push(obj);
            }
          }
          return returnArray;
        })
      );
  }
}