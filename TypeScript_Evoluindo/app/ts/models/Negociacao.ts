export class Negociacao {

    //Propriedades
    //private _data: Date;
    //private _quantidade: number;
    //private _valor: number;

    constructor(
        //private _data: Date,
        //private _quantidade: number,
        //private _valor: number
        readonly data: Date,
        readonly quantidade: number,
        readonly valor: number
    ) {
        // _ é uma convenção onde se espera uma varável private
        // que não pode ser acessada.
        //this._data = data;
        //this._quantidade = quantidade;
        //this._valor = valor;
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    /*get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }*/
}
