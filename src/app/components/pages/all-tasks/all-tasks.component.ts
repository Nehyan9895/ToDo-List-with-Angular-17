import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule,PageTitleComponent,TaskListComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})
export class AllTasksComponent {
  newTask ="";
  taskList:any[]=[]
  httpService = inject(HttpService);
  stateService = inject(StateService)
  
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      if(value){
        this.taskList = this.taskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()))
      }
      
    })
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
      this.taskList=result;
      
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
  search(searchTerm:any){
    console.log(searchTerm);
    
  }
}
