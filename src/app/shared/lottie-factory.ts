import { Injectable } from '@angular/core';
import player from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

export function playerFactory() {
  return player;
}

@Injectable({
  providedIn: 'root'
})
export class LottieFactory {
  private readonly basePath = 'assets/images/lotties/';
 
  // Exemple d'animations disponibles
  readonly loading: AnimationOptions = {
    path: 'assets/images/lotties/loading.json',
    autoplay: true,
    loop: true
  };

  readonly success: AnimationOptions = {
    path: this.basePath + 'success.json',
    autoplay: true,
    loop: false
  };

  readonly error: AnimationOptions = {
    path: this.basePath + 'error.json',
    autoplay: true,
    loop: false
  };
}
