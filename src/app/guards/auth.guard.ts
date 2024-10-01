import { CanActivateFn, CanMatch } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
