import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
  
    searchText = searchText.toLowerCase();
  
    return items.filter(item => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.Acreedor.toLowerCase().includes(searchText) ||
        item.total.toString().includes(searchText) ||
        item.Intereses.toString().includes(searchText) ||
        item.Cuotas.toString().includes(searchText)
      );
    });
  }
}
