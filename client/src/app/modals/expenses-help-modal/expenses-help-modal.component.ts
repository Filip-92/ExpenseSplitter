import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expenses-help-modal',
  templateUrl: './expenses-help-modal.component.html',
  styleUrls: ['./expenses-help-modal.component.css']
})
export class ExpensesHelpModalComponent {
  @Input() modalRef: any;

  options = ['Dodanie kategorii', 'Dodanie do grupy', 'Dodanie wydatku', 'Podziel wydatki', 'Podsumowanie', 'Oznaczanie kategorii jako rozliczoną'];
  description = [
    'Po utworzeniu konta można dodać nazwę kategorii (np. wyjazd ze znajomymi), a także określić walutę, w jakiej będziecie się rozliczać. Nazwę i walutę można edytować później, jeśli zajdzie taka potrzeba.', 
    'Do kategorii (grupy) można dodawać innych użytkowników, w tym siebie. Aby dodany użytkownik miał wgląd do kategorii, musi utworzyć konto z tym samym adresem email, który został podany przy dodawaniu użytkownika (lub odwrotnie, jeśli posiada już konto, wystarczy podać powiązany z jego kontem adres e-mail). Nazwę użytkownika można edytować później.', 
    'Podczas dodawania wydatku, należy podać jego nazwę (np. obiad w restauracji), jak również całkowitą kwotę wydatku. Na końcu trzeba wybrać, kto zapłacił.', 
    'Wydatek można następnie podzielić pomiędzy wszystkie osoby dodane do grupy (lub wybrać określone osoby z dostępnych użytkowników). Wydatek można podzielić na równo, lub jeśli każdy wydał inną kwotę, rachunek można również podzielić niestandardowo. Podsumowanie będzie dostępne dopiero po rozliczeniu wszystkich wydatków.', 
    'Podsumowanie składa się z całkowitej kwoty wydanej przez wszystkich, jak również z zestawienia kto ile powinien zapłacić, a także komu ile musi oddać. Kwotę można przekonwertować na złotówki, Euro, Dolary amerykańskie oraz funty brytyjskie.', 
    'Jeśli wszystkie wydatki zostały rozliczone i każdy otrzymał określoną należność, kategorię można oznaczyć jako rozliczoną - wtedy przestanie będzie dostępna w zakładce <strong>Aktywne</strong>, a zacznie być dostępna w zakładce Rozliczone.'];
  chosen: boolean[] = [];

  choiceToggle(i) {
    for (let n = 0; n < this.options.length; n++) {
    if (i !== n && this.chosen[n]) {
      this.chosen[n] = false;
    }
  }
  this.chosen[i] = !this.chosen[i]
}

close() {
  this.modalRef.close();
}

}
