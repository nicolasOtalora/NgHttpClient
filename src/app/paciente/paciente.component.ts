import { Component, OnInit, Output } from '@angular/core';
import { RestService } from '../rest.service';
import {Paciente} from './Paciente'
@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers: [RestService]
})
export class PacienteComponent implements OnInit {

  pacientes : {};
  paciente : {};
  constructor(public rest:RestService) {
    this.pacientes = [];
    //this.paciente= {};
    this.paciente = {};
    this.paciente[0] = '';
  }

  ngOnInit() {
    this.getPacientes();
  }

  getPacientes() {
    let paciente = new Paciente();
    this.rest.getAllPacientes().subscribe((data: {}) => {
      console.log(data);
      this.pacientes = data;

    });
  }

  buscarPaciente(id){
    this.rest.getPaciente(id).subscribe((data: {}) => {
      console.log(data);
      this.paciente = data;
    });
  }

  deletePaciente (id){
    this.rest.deletePaciente(id)
      .subscribe(res => {
          this.getPacientes();
        }, (err) => {
          console.log(err);
        }
      );
  }
  addPaciente(fName:string,sName:string) {
    let pacient = {
      "fName" : fName,
      "sName" : sName
    }
    this.rest.addPaciente(pacient).subscribe((result) => {
      this.getPacientes();
    }, (err) => {
      console.log(err);
    });
  }
  updatePaciente(id: string, fName:string,sName:string) {
    let pacient = {
      "fName" : fName,
      "sName" : sName
    }
    this.rest.updatePaciente(id,pacient).subscribe((result) => {
      this.getPacientes();
    }, (err) => {
      console.log(err);
    });
  }

}
