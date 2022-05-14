import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MessagesService} from 'src/app/services/messages.service';
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  buttonText: string = 'Edit';

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
  
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data
    })
  }

  async editHandler(momentData:Moment) {
    const id = this.moment.id
    const formData = new FormData()

    formData.append('title',momentData.title)
    formData.append('description',momentData.description)
    
    if(momentData.image) {
      formData.append('image',momentData.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe()

    this.messageService.add(`Moment "${momentData.title}" edited successfully!`)
    
    new Promise((res) => {
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 1000);
    })
  }
}
