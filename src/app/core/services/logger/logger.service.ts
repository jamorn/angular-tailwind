import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly enableLogging = !environment.production;
  private readonly logPrefix = {
    init: '🚀',
    menu: '📋',
    auth: '👤',
    api: '🌐',
    error: '❌',
    warning: '⚠️',
    success: '✅',
    info: 'ℹ️'
  };

  log(type: keyof typeof this.logPrefix, message: string, ...args: any[]): void {
    if (this.enableLogging) {
      const prefix = this.logPrefix[type];
      console.log(`${prefix} [${type.toUpperCase()}]: ${message}`, ...args);
    }
  }

  error(message: string, error?: any): void {
    console.error(`${this.logPrefix.error} [ERROR]: ${message}`, error);
  }

  warn(message: string, ...args: any[]): void {
    if (this.enableLogging) {
      console.warn(`${this.logPrefix.warning} [WARN]: ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.enableLogging) {
      console.info(`${this.logPrefix.info} [INFO]: ${message}`, ...args);
    }
  }
}
