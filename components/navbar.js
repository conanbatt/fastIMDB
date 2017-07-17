import Link from 'next/link';

export default ()=> (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container">
      <Link prefetch href="/"><a className="navbar-brand">
        Fast IMDB
      </a></Link>
      <ul className="nav navbar-nav">
      </ul>
      <ul className="nav navbar-nav navbar-right">
      </ul>
    </div>
  </nav>
)