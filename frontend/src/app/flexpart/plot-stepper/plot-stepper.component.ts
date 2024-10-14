import { FlexpartService } from 'src/app/flexpart/flexpart.service';
import { SliceResponseType } from './../flexpart-plot-data';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MapPlotsService } from 'src/app/core/services/map-plots.service';

@Component({
  selector: 'app-plot-stepper',
  templateUrl: './plot-stepper.component.html',
  styleUrls: ['./plot-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotStepperComponent implements OnInit {

  selectedRunId: string
  selectedOutputId: string
  selectedLayer: string

  sliceTypes = Object.values(SliceResponseType);

  constructor(
    private flexpartService: FlexpartService,
    private mapPlotsService: MapPlotsService,
  ) {
  }

  ngOnInit(): void {
  }

  selectType(val: SliceResponseType) {
    console.log(val)
    this.flexpartService.selectedSliceType = val;
  }
  get selectedSliceType() {
    return this.flexpartService.selectedSliceType;
  }

  showLayer():void {
    console.log("Selected layer : " + this.selectedLayer)
  }

  selectionChanged(e: any) { }

  onLayerSelected(){
    this.mapPlotsService.setSelectedLayer(this.selectedLayer);
  }

}
