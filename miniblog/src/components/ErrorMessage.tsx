export default function ErrorMessage({ message }: { message: string }) {
  return <p className="error-box">⚠️ {message}</p>;
}