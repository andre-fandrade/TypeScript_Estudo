import {View} from "./View";
import {Negociacoes} from "../models/Negociacoes";

export class NegociacoesView extends View<Negociacoes> {

    template(modelo: Negociacoes): string {

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${modelo.getArray().map(n =>
                        `
                            <tr>
                                <td>${n.data.getDay()}/${n.data.getMonth() +1}/${n.data.getFullYear()}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>
                        `                        
                    ).join('')}
                </tbody>
                
                <tfoot>
                </tfoot>
            </table>
        `;
    }

}
