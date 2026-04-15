export function AppFooter() {
  return (
    <footer className="app-footer">
      <p className="app-version">Version {__APP_VERSION__}</p>
      <p>
        Created by <a href="https://johnmartinez.dev/">John Martinez</a>.
      </p>
      <p>
        <a href="https://www.flaticon.com/free-icons/geek" title="geek icons">
          Geek icons created by Pixel perfect - Flaticon
        </a>
        .
      </p>
      <p>
        Table content adapted from <cite>Star Trek Adventures 2e</cite>, pages
        266-267.
      </p>
      <p>
        Star Trek and all related marks, logos, and characters are solely owned
        by CBS Studios Inc. This is an unofficial, non-commercial fan-made tool
        intended for recreational use. It is not endorsed by, sponsored by, or
        affiliated with CBS Studios Inc., Paramount Pictures, or any Star Trek
        franchise.
      </p>
    </footer>
  );
}
