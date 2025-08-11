const People = () => (
  <main>
    <header className="mb-4">
      <h1 className="text-2xl font-semibold">People</h1>
      <p className="text-sm text-muted-foreground">Profiles and shared items.</p>
    </header>
    <section className="rounded-lg border p-6 text-muted-foreground mb-6">Coming soon.</section>
    <section id="torrents" aria-labelledby="torrents-title" className="rounded-lg border p-6">
      <h2 id="torrents-title" className="text-lg font-semibold">Torrents</h2>
      <p className="text-sm text-muted-foreground">Manage torrent-type bookmarks and shared magnet links.</p>
      <div className="mt-4 rounded-md border border-dashed p-4 text-sm text-muted-foreground">No torrents yet. Add one to get started.</div>
    </section>
  </main>
);

export default People;
