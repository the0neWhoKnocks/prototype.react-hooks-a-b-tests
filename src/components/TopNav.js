import React from 'react';

export const ROOT_CLASS = 'top-nav';

export default function TopNav() {
  return (
    <nav className={`${ROOT_CLASS}`}>
      { Array(10).fill().map((v, ndx) => <button key={`btn_${ndx}`}>Button {ndx+1}</button>) }
    </nav>
  );
}