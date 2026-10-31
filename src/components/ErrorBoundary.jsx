import { Component } from "react";

// Stürzt das Bundle ab, bleibt sonst die Seite leer. Derselbe Hinweis wie der Inline-Handler in index.html.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <main className="crash" role="alert">
        <p><strong>Die App konnte nicht geladen werden.</strong></p>
        <p>Dein Fortschritt ist davon nicht betroffen. Bitte nicht neu installieren, das kann ihn löschen.</p>
        <button type="button" className="btn" onClick={() => window.location.reload()}>Neu laden</button>
        <p className="small muted crash-detail">{String(error?.message || error)}</p>
      </main>
    );
  }
}
