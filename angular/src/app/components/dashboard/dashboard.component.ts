import {Component} from '@angular/core';
import { ZillowService } from '../../services/zillow/zillow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  zillowData: Array<any>;

  constructor(
    private ZillowService: ZillowService
  ) {

    this.ZillowService.GetDeepSearchResults('West+44th+St', '10001', true).subscribe(data => {
      this.zillowData = data;
    });


  }

}








