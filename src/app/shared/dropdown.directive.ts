import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    /**
     * HostBindig conecta uma propriedade do elemento ao qual a diretiva está inserida com um atribudo criado aqui. 
     * Ex.: @HostBinding('style.backgroundColor') bgColor: string = 'transparent';
     */
    @HostBinding('class.open') isOpen = false;

    // Dessa meneira o dropdown só fecha apenas com o click na mesma seta de abertura
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    // Já dessa forma o dropdown fecha também quando clicado fora da área
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    
    constructor(private elRef: ElementRef) {}
}