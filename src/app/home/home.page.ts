import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Component({  selector: 'app-home',  templateUrl: 'home.page.html',  styleUrls: ['home.page.scss'],
})
export class HomePage {  lightValue: number | undefined;

  constructor(    private dataService: DataService,    private localNotifications: LocalNotifications
  ) {    this.dataService.getLightData().subscribe(data => {      this.lightValue = data;
      this.checkLightStatus();    });  }

      checkLightStatus() {
        // Verificar que lightValue no es undefined antes de comparar
        if (this.lightValue !== undefined && this.lightValue < 300) {
          // Umbral de luz para "noche"
          this.localNotifications.schedule({
            text: "Ha anochecido",
            trigger: { at: new Date(new Date().getTime() + 1000) },
            led: 'FF0000',
            // sonido no se especifica si no se quiere uno
          });
        } else if (this.lightValue !== undefined) {
          // Asumiendo que si lightValue está definido y es >= 300, es de día
          this.localNotifications.schedule({
            text: "Es de día",
            trigger: { at: new Date(new Date().getTime() + 1000) },
            led: 'FF0000',
            // sonido no se especifica si no se quiere uno
          });
        }
      }
      
    }
