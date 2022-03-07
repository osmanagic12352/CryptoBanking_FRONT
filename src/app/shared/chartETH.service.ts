import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class ChartServiceETH {

    private baseUrl = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=3&interval=hourly';
    private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    constructor(private http: HttpClient) { }

    coinsHistory(){
        const url = `${this.proxyUrl}${this.baseUrl}`;
        return this.http.get(url).toPromise().then((data) => {
            return data
        })
    }
}