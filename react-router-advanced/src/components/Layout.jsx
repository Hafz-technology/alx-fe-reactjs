import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile">Profile (Protected)</Link></li>
          <li><Link to="/post/react-router-v6">Post Example</Link></li>
          {/* Example dynamic link */}
        </ul>
      </nav>
      <hr />
      <div className="content">
        {/* The Outlet renders the current child route element */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

