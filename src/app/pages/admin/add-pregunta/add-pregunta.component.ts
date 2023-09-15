import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css'],
})
export class AddPreguntaComponent implements OnInit {
  examenId: any;
  titulo: any;
  pregunta: any = {
    examen: {},
    contenido: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta: '',
  };

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private chatgptService: ChatgptService
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.pregunta.examen['examenId'] = this.examenId;
  }

  formSubmit() {
    if (
      this.pregunta.contenido.trim() == '' ||
      this.pregunta.contenido == null
    ) {
      return;
    }
    if (this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null) {
      return;
    }
    if (this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null) {
      return;
    }
    if (this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null) {
      return;
    }
    if (this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null) {
      return;
    }
    if (
      this.pregunta.respuesta.trim() == '' ||
      this.pregunta.respuesta == null
    ) {
      return;
    }

    this.preguntaService.guardarPregunta(this.pregunta).subscribe(
      (data) => {
        Swal.fire(
          'Pregunta guardada',
          'La pregunta ha sido agregada con éxito',
          'success'
        );
        this.pregunta.contenido = '';
        this.pregunta.opcion1 = '';
        this.pregunta.opcion2 = '';
        this.pregunta.opcion3 = '';
        this.pregunta.opcion4 = '';
        this.pregunta.respuesta = '';
      },
      (error) => {
        Swal.fire(
          'Error',
          'Error al guardar la pregunta en la base de datos',
          'error'
        );
        console.log(error);
      }
    );
  }

  generarPregunta(): void {
    this.chatgptService
      .generateQuestion(
        `Hazme una pregunta con 4 opciones pero con texto no muy largos mas la respuesta que diga: 
    Respuesta: sobre el tema de ${this.titulo} `
      )
      .subscribe(
        (response) => {
          if (response && response.choices && response.choices.length > 0) {
            const content = response.choices[0].message.content;
            const splitContent = content
              .split('\n')
              .filter((line: string) => line.trim() !== '');
            if (splitContent.length >= 6) {
              this.pregunta.contenido = splitContent[0]
                .replace('Pregunta: ', '')
                .trim();
              this.pregunta.opcion1 = this.extractOptionText(splitContent[1]);
              this.pregunta.opcion2 = this.extractOptionText(splitContent[2]);
              this.pregunta.opcion3 = this.extractOptionText(splitContent[3]);
              this.pregunta.opcion4 = this.extractOptionText(splitContent[4]);

              let correctAnswer = splitContent[5]
                .replace('Respuesta: ', '')
                .trim();
              const answerLetter = correctAnswer.charAt(0).toUpperCase();

              switch (answerLetter) {
                case 'A':
                  this.pregunta.respuesta = this.pregunta.opcion1;
                  break;
                case 'B':
                  this.pregunta.respuesta = this.pregunta.opcion2;
                  break;
                case 'C':
                  this.pregunta.respuesta = this.pregunta.opcion3;
                  break;
                case 'D':
                  this.pregunta.respuesta = this.pregunta.opcion4;
                  break;
                default:
                  this.pregunta.respuesta = '';
                  break;
              }

              console.log('Respuesta OpenAI:', content);
              console.log(
                'Respuesta correcta asignada:',
                this.pregunta.respuesta
              );
            } else {
              Swal.fire(
                'Error',
                'La respuesta generada no tiene el formato esperado.',
                'error'
              );
            }
          } else {
            Swal.fire(
              'Error',
              'La respuesta no tiene el formato esperado.',
              'error'
            );
          }
        },
        (error) => {
          console.error('Error detalle de la :', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al obtener la pregunta: ' + error.message,
            'error'
          );
        }
      );
  }

  private extractOptionText(option: string): string {
    const idx = option.indexOf(')');
    if (idx !== -1 && idx + 2 <= option.length) {
      return option.substring(idx + 2).trim();
    }
    return option;
  }
}
