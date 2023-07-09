import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';


class Livro{
  nome: string;
  autor: string;
  data_publicacao: string;

  constructor(nome: string, autor: string, data_publicacao: string) {
    this.nome = nome;
    this.autor = autor;
    this.data_publicacao = data_publicacao
  }
}



@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})

export class BookFormComponent {
  constructor(private http: HttpClient) {}
  nome!: any;
  autor!: any;
  data_publicacao!: any;

  enviarFormulario() {
    const dataPublicacaoFormatted = format(new Date(this.data_publicacao), 'dd/MM/yyyy');
    const livro = new Livro(this.nome, this.autor, dataPublicacaoFormatted);

    this.http.post('http://localhost:8080/livros', livro)
      .subscribe(
        response => {
          console.log('Livro enviado com sucesso!', response);
        },
        error => {
          console.error('Erro ao enviar o livro:', error);
        }
      );
  }

}
