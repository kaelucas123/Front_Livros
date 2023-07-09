import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BookTableComponent} from "./components/book-table/book-table.component";
import {BookFormComponent} from "./components/book-form/book-form.component";

const routes: Routes =[
  {path: '', component: BookTableComponent},
  {path: 'create', component: BookFormComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
