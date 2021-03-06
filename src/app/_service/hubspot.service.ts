import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private http: HttpClient) {
  }

  getDealByID(dealID: string | null) {
    return this.http.get<any>(`${environment.apiUrl}deal/${dealID}`)
  }

  uploadSignature(dealID: string | null, name: string, file: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    // @ts-ignore
    formdata.append('dealid', dealID);
    formdata.append('name', name);
    const req = new HttpRequest('POST', `${environment.apiUrl}upload/sign`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
