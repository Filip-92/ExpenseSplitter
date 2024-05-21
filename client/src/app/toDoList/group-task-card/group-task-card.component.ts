import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-task-card',
  templateUrl: './group-task-card.component.html',
  styleUrls: ['./group-task-card.component.css']
})
export class GroupTaskCardComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       console.log(params) //log the entire params object
       console.log(params['id']) //log the value of id
     });
   }

}
