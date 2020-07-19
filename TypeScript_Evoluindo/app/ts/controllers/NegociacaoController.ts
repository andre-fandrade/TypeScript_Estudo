import {NegociacoesView, MensagemView} from "../views/index";
import {Negociacao, Negociacoes} from "../models/index";
import {logarTempoDeExecucao, throttle, domInject} from "../helpers/decorators/index";
import {NegociacaoService} from "../services/index";

export class NegociacaoController {

    @domInject("#data")
    private _inputData: JQuery;
    @domInject("#quantidade")
    private _inputQuantidade: JQuery;
    @domInject("#valor")
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#NegociacoesView');
    private _mensagemView = new MensagemView('#MensagemView');
    private _service = new NegociacaoService();

    //Element é um tipo genérico e HTMLInputElement é um tipo especifico.
    // Por isso no meu construtor eu tenho que fazer um Casting <HTMLInputElement>

    constructor() {

        this._negociacoesView.update(this._negociacoes);
    }

    @throttle(1000)
    adiciona(event: Event) : void {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            return this._mensagemView.update('Negociação somente em dias de semana.');
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação criada com sucesso!');

        /*this._negociacoes.getArray().forEach(negociacao => {

            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });*/

    }

    @logarTempoDeExecucao()
    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() != diaDaSemana.Domingo || data.getDay() != diaDaSemana.Sabado;
    }

    @throttle(1000)
    importaDados() {


        this._service
            .obterNegociacoes(res => {
                if(res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            });
    }
}

enum diaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
