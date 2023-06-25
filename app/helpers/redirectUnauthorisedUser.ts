import userIsAdmin from "./userIsAdmin";
import { notFound } from 'next/navigation';

const redirectUnauthorisedUser = (id: string) => {
  const emailInStorage = window.localStorage.getItem('USER_EMAIL');
  const IDInStorage = window.localStorage.getItem('USER_ID');
  const userIsNotAdmin = !userIsAdmin({ user: { email : emailInStorage as string}});
  const accessNotAuthorised = userIsNotAdmin && window.localStorage.getItem('USER_ID') !== id;
  
  if (!IDInStorage || accessNotAuthorised) {
      notFound();
    }
}

export default redirectUnauthorisedUser;