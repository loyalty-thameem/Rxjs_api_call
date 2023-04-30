import React, { useEffect, useState } from "react";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";
const App = ({ userId }) => {
  const [data, setData] = useState(null);
  // const userId = 1;

  useEffect(() => {
    const interval$ = interval(2000).pipe(
      switchMap(() => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
          });
      })
    );

    const subscription = interval$.subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]); 
console.log('Hello');
  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
