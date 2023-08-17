import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = true;


  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: any) {
    // Sprawdzamy, czy kliknięty element znajduje się wewnątrz elementu, do którego jest przypisana dyrektywa.
    // Jeśli nie, to zamykamy element.
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) { }


}
