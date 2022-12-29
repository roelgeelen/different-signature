import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private http: HttpClient) {
  }

  uploadSignature(dealID: string | null, configID: string | null, name: string, file: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    // @ts-ignore
    formdata.append('dealid', dealID);
    // @ts-ignore
    formdata.append('quoteId', configID);
    formdata.append('name', name);

    const req = new HttpRequest('POST', `${environment.apiUrl}quote/sign`, formdata, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders({
        Authorization: 'Basic RERfR1JBTkRfQUNDRVNTOmNUI2ZjRzNTSDdNIW82MipwcWZBWSRwbTQjcnhWcg=='
      })
    });
    return this.http.request(req);
  }

  getImage(id: string | null) {
    return this.http.get<any>('https://25493451.fs1.hubspotusercontent-eu1.net/hubfs/25493451/Signatures/handtekening-' + id + '.png?timeStamp=' + Date.now());
  }
}
