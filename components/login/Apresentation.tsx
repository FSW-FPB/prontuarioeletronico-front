import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Apresentation() {
  return (
    <>
      <h1 className="h1-login">
        <Image
          src="/assets/Mask.png"
          alt="Logo"
          className="me-2"
          width={36}
          height={32}
        />
        MedTrack
      </h1>
      <p className="titulo h2 text-white mb-2">Entre na sua conta</p>
      <p className="subtitulo text-white">Seja bem-vindo(a)!</p>
    </>
  );
}
