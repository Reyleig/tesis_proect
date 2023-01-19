import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Point } from 'chart.js/dist/helpers/helpers.canvas';
import { GraphicsService } from 'src/app/services/stats/graphics.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;

  constructor(
    private graphicsService: GraphicsService,
  ) { }

  stats: any;
  y: any;
  x: any;

  ngOnInit() {


  }
  ngAfterViewInit() {
    this.graphicsService.findTimesStats().subscribe((res: any) => {
      this.stats = res.payload;
      this.y = this.stats.map((item: any) => item.time_milisecons);
      this.x = this.stats.map((item: any) => item.name);
      console.log(this.y);
      console.log(this.x);
      //obtener valor de x en la posicion 0 
       console.log(this.x[0]);
      this.lineChartMethod();  

    }
    );
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.x,
        datasets: [
          {
            label: 'Tiempos',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [], 
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.y,
            spanGaps: false,
            
          }
        ]
      },
      options: {
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Milisegundos'
            }
          }
        },


        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                //obtener valor de x con el index
                
                let data = parseInt((context.dataset.data[context.dataIndex]).toString());
                let minutes = Math.floor(data / 6000);
                let seconds = Math.floor((data % 6000) / 100);
                let milliseconds = Math.floor(data % 100);
                let stringminutes = String('0' + Math.floor(minutes)).slice(-2);
                let stringseconds = String('0' + Math.floor(seconds)).slice(-2);
                let stringmilliseconds = String('0' + milliseconds).slice(-2);
                const actualTime = `${stringminutes}:${stringseconds}:${stringmilliseconds}`;
                var label = actualTime || '';
                return label;
            }
            }
          }
        }
      }


        
    });
  }


}




