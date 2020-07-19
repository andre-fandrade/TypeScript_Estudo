import {Negociacao, NegociacaoParcial} from "../models/index";

export class NegociacaoService {

    obterNegociacoes(handler: ResponseHandler): Promise<Negociacao[]> {

        return fetch('http://localhost:5000/api/negocios')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => console.log(err));

    }
}

export interface ResponseHandler {

    (res: Response): Response
}
