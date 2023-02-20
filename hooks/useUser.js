import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetchAPI from 'lib/fetchAPI';

export default function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  const { push } = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    fetchAPI('/api/user/session', 'POST')
      .then((data) => setUser({ ...data }))
      .catch((e) => {
        console.log(e.message);
        setUser({ id: null });
      });
  }, []);

  useEffect(() => {
    if (!redirectTo || !user) return;

    if ((redirectTo && !redirectIfFound && !user?.id) || (redirectIfFound && user?.id))
      push(redirectTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, redirectTo, redirectIfFound]);

  return !redirectIfFound && user;
}
