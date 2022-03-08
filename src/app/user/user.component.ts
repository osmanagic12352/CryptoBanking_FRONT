import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Valuta', 'Cijena', 'Promjena 24h', 'Kupovni', 'Prodajni'];
  searchText: string = '';
  filteredCoins: Coin[] = [];

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.http.get<Coin[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoins = this.coins;
      },
      (err) => console.error(err)
    );
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
