import { ServiceAppService } from './../../service-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public statusLoader: boolean = false;
  public statusSearch: boolean = false;
  public repoItens: [] = [];
  public avatar: string = './assets/avatar.png';
  public userNameGIT: string = '';
  public location: string = '';
  public public_repos: number = 0;
  public userUrl: string;
  public statusBtSearch = false;

  constructor(public serviceApp: ServiceAppService) { }

  onPressEnterKey(userName: string) {
    // Se o usuário não inserir nenhum nome o sistema não executar a prox. ação :)
    if (!userName) {  this.serviceApp.showMessage('Iforme o nome do usuário do GitHub', 'Entendi'); return; }

    this.statusLoader = true;
    this.statusBtSearch = true;
    this.serviceApp.getUser(userName).subscribe(response => {
      // console.log('response', response);
      this.userUrl = 'https://github.com/';
      this.userUrl += userName;
      this.avatar = response.avatar_url;
      this.userNameGIT = response.name;
      this.location = response.location;
      this.public_repos = response.public_repos;
      this.getRepoOnSuccessUser(userName);
    }, (error) => {
      this.statusLoader = false;
      this.statusBtSearch = false;
      this.serviceApp.showMessage('Nenhum usuário encontrado com esse nick!', 'Ok');
    });
  }

  onClickItemRepo(item: any) {
    this.repoItens.forEach((element: any) => {
      element.selected = false;
    });
    item.selected = true;

  }

  getRepoOnSuccessUser(us: string) {
    this.serviceApp.getRepoUser(us).subscribe(response => {
      console.log('response', response)

      this.statusLoader = false;
      this.statusSearch = true;
      this.repoItens = response
    });
  }

  onClickBack() {
    this.statusSearch = false;
    this.statusBtSearch = false;
  }

  ngOnInit(): void {
   // this.onPressEnterKey('iagogaldino');
  }

}
