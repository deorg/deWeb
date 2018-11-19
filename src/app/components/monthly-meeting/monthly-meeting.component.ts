import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
declare const App;
declare const $;
@Component({
  selector: 'app-monthly-meeting',
  templateUrl: './monthly-meeting.component.html',
  styleUrls: ['./monthly-meeting.component.css']
})
export class MonthlyMeetingComponent implements OnInit {
  private tarAmt: string;
  private saleAmt: string;
  private diffTarAmt: string;
  private payAmt: string;
  private accTarAmt: string;
  private accSaleAmt: string;
  private losPdoAmt: string;
  private pdoAmt: string;
  private summary: string;
  private mgrsName: string;
  private numDiffTarAmt: number;
  private numSummary: number;
  private oCustPDOAMT: string;
  private nCustPDOAMT: string;
  private pdoAmtPercent: string;
  private branches = [];
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
    this.initialLoadChart();
    $("input[type='number']").inputSpinner();
  }
  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  private initialLoadChart() {
    this.resAPI.getMonthlyMeeting().subscribe(result => {
      this.branches = result.data;
      this.mgrsName = result.data[0].MGRS_NAME;
      this.tarAmt = this.devideMillion(result.data[0].TAR_AMT);
      this.saleAmt = this.devideMillion(result.data[0].SALE_AMT);
      // this.diffTarAmt = devideMillion(result.data[0].DIF_TAR_AMT);
      this.diffTarAmt = this.devideMillion(result.data[0].SALE_AMT - result.data[0].TAR_AMT);
      this.numDiffTarAmt = result.data[0].SALE_AMT - result.data[0].TAR_AMT;
      this.payAmt = this.devideMillion(result.data[0].PAY_AMT);
      this.accTarAmt = this.devideMillion(result.data[0].ACC_TAR_AMT);
      this.accSaleAmt = this.devideMillion(result.data[0].ACC_SALE_AMT);
      this.summary = this.devideMillion(result.data[0].ACC_SALE_AMT - result.data[0].ACC_TAR_AMT);
      this.numSummary = result.data[0].ACC_SALE_AMT - result.data[0].ACC_TAR_AMT;
      this.losPdoAmt = this.devideMillion(result.data[0].LOS_PDO_AMT);
      this.pdoAmt = this.devideMillion(result.data[0].PDO_AMT);
      this.oCustPDOAMT = this.devideMillion(result.data[0].OCUST_PDO_AMT);
      this.nCustPDOAMT = this.devideMillion(result.data[0].NCUST_PDO_AMT);
      this.pdoAmtPercent = ((result.data[0].PDO_AMT/result.data[0].FREMAIN_AMT)*100).toFixed(2);
    })
  }
  private newRenderChart(brh) {
    let branch = this.branches.filter(element => element.BRH_ID == brh)[0];
    console.log(branch);
    this.mgrsName = branch.MGRS_NAME;
    this.tarAmt = this.devideMillion(branch.TAR_AMT);
    this.saleAmt = this.devideMillion(branch.SALE_AMT);
    // this.diffTarAmt = devideMillion(result.data[0].DIF_TAR_AMT);
    this.diffTarAmt = this.devideMillion(branch.SALE_AMT - branch.TAR_AMT);
    this.numDiffTarAmt = branch.SALE_AMT - branch.TAR_AMT;
    this.payAmt = this.devideMillion(branch.PAY_AMT);
    this.accTarAmt = this.devideMillion(branch.ACC_TAR_AMT);
    this.accSaleAmt = this.devideMillion(branch.ACC_SALE_AMT);
    this.summary = this.devideMillion(branch.ACC_SALE_AMT - branch.ACC_TAR_AMT);
    this.numSummary = branch.ACC_SALE_AMT - branch.ACC_TAR_AMT;
    this.losPdoAmt = this.devideMillion(branch.LOS_PDO_AMT);
    this.pdoAmt = this.devideMillion(branch.PDO_AMT);
    this.oCustPDOAMT = this.devideMillion(branch.OCUST_PDO_AMT);
    this.nCustPDOAMT = this.devideMillion(branch.NCUST_PDO_AMT);
    this.pdoAmtPercent = ((branch.PDO_AMT/branch.FREMAIN_AMT)*100).toFixed(2);
  }
  onChange(deviceValue) {
    this.newRenderChart(deviceValue);
  }
}