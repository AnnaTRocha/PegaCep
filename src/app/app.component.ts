import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pegacep';

  constructor( private http: HttpClient) { }

  // variaveis do form
  cep: string = '';

  // variaveis do retorno
  endereco: any;
  retorno = {
    rua: '',
    cidade: '',
    estado: ''
  }

  // logradouro = rua, localidade = cidade, uf = estado
  pesquisado = false;
  espera = false;

  pesquisa() {
    this.espera = true;
    this.cep = this.cep.replace(/\D/g, '');
    
    const url = 'http://viacep.com.br/ws/'+this.cep+'/json/';
    this.http.get(url).subscribe((result) => {
      this.endereco = result;
      this.retorno.rua = this.endereco.logradouro;
      this.retorno.cidade = this.endereco.localidade;
      this.retorno.estado = this.endereco.uf;
    });
    this.pesquisado = true;
    this.espera = false;

  }

  limpa(){
    this.pesquisado = false;
    this.espera = false;
    this.cep = "";
    this.endereco = "";
    this.retorno.rua = "";
    this.retorno.cidade = "";
    this.retorno.estado = "";
  }

}
