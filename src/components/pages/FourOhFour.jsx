import React from 'react';
import ErrorPage from '../../img/404.gif';
import "./_FourOhFour.scss";



export const FourOhFour = () => {
  return (
    <div className="page-error">
      <img class="error" src={ErrorPage} alt="404 error" />
    </div>
  );
}
