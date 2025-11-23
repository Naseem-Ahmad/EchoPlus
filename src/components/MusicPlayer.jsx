export default function MusicPlayer({ videoId }) {
  if (!videoId) return null;

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
      <iframe
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube music player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
}
