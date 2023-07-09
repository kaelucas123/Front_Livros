import {Component, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';

var estado = false;
const livrosSelectionados: number[] = [];
@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})

export class BookTableComponent {
  livros: any[] = [];
  constructor(private http: HttpClient) {
    this.carregarLivros();
  }
  reloadPage(){
    this.http.get('http://localhost:8080/livros').subscribe((data: any) => {
      this.livros = data as any[];
    });
  }
  ngOnInit() {
    this.reloadPage();
  }
  hasLivrosSelecionados(): boolean {
    return livrosSelectionados.length > 0;
  }
  deletar() {
    const elements = document.getElementsByClassName("selectDelete");
    livrosSelectionados.forEach((id) => {
      this.http.delete(`http://localhost:8080/livros/${id}`).subscribe(
        () => {
          console.log(`Livro com ID ${id} removido com sucesso.`);
          const indice = livrosSelectionados.indexOf(id);
          livrosSelectionados.splice(indice)
          this.reloadPage()
        },
        (error) => {
          console.error(`Erro ao remover o Livro com ID ${id}:`, error);
        }
      );
    });
  }

  carregarLivros() {
    this.http.get<any[]>('http://localhost:8080/livros').subscribe(data => {
      this.livros = data;
    });
  }

  selecionarLivros(id: number) {
    if(!livrosSelectionados.includes(id)){
      livrosSelectionados.push(id)
      console.log("carro " + id + " adicionado.")
    }
    else{
      const indice = livrosSelectionados.indexOf(id);
      livrosSelectionados.splice(indice)
      console.log('Carro ' + id + " removido.");
    }

  }

}
