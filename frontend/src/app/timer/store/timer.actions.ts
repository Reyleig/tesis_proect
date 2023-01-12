export class AddTimer {
    static readonly type = '[Timer] Add Timer';
    constructor(public banderas: any, public time: any, public id_deportista: any, public id_estilo: any,public milisegundos:any) {}
  }