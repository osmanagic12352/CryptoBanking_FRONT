import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChartServiceBTC } from '../shared/chartBTC.service';
import { LoginService } from '../shared/login.service';
import { Chart, registerables } from 'chart.js';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChartServiceETH } from '../shared/chartETH.service';
import { ChartServiceBNB } from '../shared/chartBNB.service';
import { ChartServiceCAR } from '../shared/chartCAR.service';




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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  userDetails: any;
  showNavigationArrows = true;
  showNavigationIndicators = true;

  result: any;

  coinPrice: any;
  chartBTC: any = [];
  chartETH: any = [];
  chartBNB: any = [];
  chartCAR: any = [];

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Valuta', 'Cijena', 'Promjena 24h', 'Kupovni', 'Prodajni'];
  searchText: string = '';
  filteredCoins: Coin[] = [];

  constructor(
    private router: Router, 
    private service: LoginService, 
    private helper: JwtHelperService, 
    private http: HttpClient, 
    private ChartS: ChartServiceBTC,
    private config: NgbCarouselConfig,
    private ChartE: ChartServiceETH,
    private ChartB: ChartServiceBNB,
    private ChartC: ChartServiceCAR) 
    {

    config.interval = 7000;  
    config.wrap = true;  
    config.keyboard = true;  
    config.pauseOnHover = false;
    config.showNavigationArrows = true; 
    config.showNavigationIndicators = true;

    Chart.register(...registerables);
  }

  ngOnInit() {

    this.service.GetUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      (err: any) => {
        console.log(err);
      },
    );

    this.http.get<Coin[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoins = this.coins;
      },
      (err) => console.error(err)
    );

    this.ChartS.coinsHistory().then((res) => {
      this.result = res;

      this.coinPrice = this.result.prices;

      console.log(this.coinPrice);

      this.chartBTC = new Chart('canvasBTC', {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

          datasets: [
            {
              label: 'Bitcoin',
              borderColor: "rgba(230,126,34,1)",
              backgroundColor: "rgba(252,214,112,0.5)",
              fill: true,
              data: this.coinPrice,
              borderWidth: 3,
            }]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    });

    this.ChartE.coinsHistory().then((res) => {
      this.result = res;

      this.coinPrice = this.result.prices;

      console.log(this.coinPrice);

      this.chartETH = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

          datasets: [
            {
              label: 'Ethereum',
              borderColor: "rgba(37,41,88,1)",
              backgroundColor: "rgba(50,50,120,0.5)",
              fill: true,
              data: this.coinPrice,
              borderWidth: 3,
            }]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    });

    this.ChartB.coinsHistory().then((res) => {
      this.result = res;

      this.coinPrice = this.result.prices;

      console.log(this.coinPrice);

      this.chartBNB = new Chart('canvasBNB', {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

          datasets: [
            {
              label: 'Binance Coin',
              borderColor: "rgba(254,241,96,1)",
              backgroundColor: "rgba(240,255,0,0.5)",
              fill: true,
              data: this.coinPrice,
              borderWidth: 3,
            }]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    });

    this.ChartC.coinsHistory().then((res) => {
      this.result = res;

      this.coinPrice = this.result.prices;

      console.log(this.coinPrice);

      this.chartCAR = new Chart('canvasCAR', {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

          datasets: [
            {
              label: 'Cardano',
              borderColor: "rgba(149,165,166,1)",
              backgroundColor: "rgba(210,215,211,1)",
              fill: true,
              data: this.coinPrice,
              borderWidth: 3,
            }]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    });

  }

  UserAuth() {
    const Token = localStorage.getItem("token");
    if (Token && !this.helper.isTokenExpired(Token)) {
      return true;
    }
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
