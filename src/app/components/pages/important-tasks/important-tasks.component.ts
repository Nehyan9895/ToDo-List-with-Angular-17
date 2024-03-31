import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss'
})
export class ImportantTasksComponent {
  newTask ="";
  taskList:any[]=[]
  httpService = inject(HttpService);

  
  
  ngOnInit(){
    this.getAllTask();
  }
  addTask(){
    console.log('addTaskk',this.newTask);
    this.httpService.addTask(this.newTask).subscribe(()=>{
      this.newTask="";
      
    })
  }
  getAllTask(){
    this.httpService.getAllTask().subscribe((result:any)=>{
      this.taskList=result.filter((x:any)=>x.important==true);
      
    })
  }
  onComplete(task:any){
    task.completed = true;
    console.log('Complete',task);
    this.httpService.updateTask(task).subscribe(()=>{

    })
  }
  onImportant(task:any){
    task.important = true;
    console.log('important',task);
    this.httpService.updateTask(task).subscribe(()=>{
      
    })
  }
}
