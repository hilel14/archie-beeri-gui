import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArchieDoc } from "../_model/archie-doc";
import { Remarks } from "../_model/remarks";


@Component({
  selector: 'app-remarks-dialog',
  templateUrl: './remarks-dialog.component.html',
  styleUrls: ['./remarks-dialog.component.css']
})
export class RemarksDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemarksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Remarks
  ) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


