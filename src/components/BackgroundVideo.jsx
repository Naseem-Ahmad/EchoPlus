export default function BackgroundVideo({ videoId }) {
  if (!videoId) return null;

  return (
    <div style={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
        style={styles.iframe}
        allow="autoplay"
        frameBorder="0"
      />
      <div style={styles.overlay} />
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: -1,
  },
  iframe: {
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)", // darken video for readability
  },
};
