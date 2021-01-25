import jwtDecode from 'jsonwebtoken';
import config from '../config';
import { CurrentUserData } from '../models/userData';
import { getCookie, setCoreCookie } from './cookies';

export default function userAvatar(name: string) {
  return name
    .match(/(\b\S)?/g)
    ?.join('')
    .match(/(^\S|\S$)?/g)
    ?.join('')
    .toUpperCase();
}

// Logs out the user and unsets the jwt token
export function logout() {
  setCoreCookie('core-token', '', 1);
}

// Returns the jwt token
export function getCoreToken(): string {
  const jwtToken = getCookie('core-token');

  if (jwtToken !== '' && jwtToken !== null && jwtToken !== undefined)
    return jwtToken;

  // Logout user if jwt is expired
  logout();
  window.location.replace(window.location.host);
  return '';
}

// Returns the details of a user from api endpoint
export async function getUserDetails(uid: string): Promise<CurrentUserData> {
  const userData: CurrentUserData = await fetch(
    `${config.auth.url}/v1/user/uid/${uid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCoreToken()}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if ('error' in data) {
        console.error(data.error_description);
      }
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
  return userData;
}

// Returns the details of a user from jwt token
export function getUserDetailsFromJwt(jwtToken: string) {
  const userDetails: any = jwtDecode.decode(jwtToken);
  return userDetails;
}
