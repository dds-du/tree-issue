import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/shared/services/http.service';

const options: any = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '1%',
        left: '2%',
        right: '7%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['实际故障', '统计故障', '风险等级']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [1049, 1317, 3302],
            itemStyle: {
                emphasis: {
                    barBorderRadius: [0, 6, 6, 0]
                },
  
                normal: {
                    barBorderRadius: [0, 6, 6, 0]
                }
            }
        },
        {
          name: '2012年',
          type: 'bar',
          data: [1215, 1341, 3818],
          itemStyle: {
            emphasis: {
              barBorderRadius: [0, 6, 6, 0]
            },
  
            normal: {
              barBorderRadius: [0, 6, 6, 0]
            }
          }
        }
    ],
    color: ['#268AFF', '#50E3C2']
  };

@Component({
    templateUrl: './index.component.html',
    styleUrls: [ './index.component.less' ]
})

export class IndexComponent implements OnInit {
    options: any;
    constructor(
        private httpService: HttpService
    ){

    }

    ngOnInit(){
        this.options = options
    }
}