import {logarTempoDeExecucao} from "../helpers/decorators/logarTempoDeExecucao";

export abstract class View<T> {

    private _element: JQuery;
    private _escapar: boolean;

    // tornando  o parâmetro opcional com (?)!
    constructor(seletor: string, escapar: boolean = false) {

        this._element = $(seletor);
        this._escapar = escapar;
    }

    @logarTempoDeExecucao()
    update(param: T): void {

        // Escapando problemas como ameaças de códigos maliciosos emm <script>
        let template = this.template(param)
        if(this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this._element.html(template);
    }

    abstract template(param: T): string;

}
