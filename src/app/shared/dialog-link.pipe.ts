import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dialogLink',
  pure: true
})
export class DialogLinkPipe implements PipeTransform {

  transform(name: string): any {
    return ['', { outlets: { dialog: name } }];
  }

}
