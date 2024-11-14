"use client";
import Apresentation from "@/components/login/Apresentation";
import LoginForm from "@/components/login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  return (
    <>
      <div className="container-login">
        <img
          src="/assets/gradient.png"
          alt="Background"
          className="background-image"
        />
        <div
          className="container-fluid vh-100 d-flex align-items-center justify-content-between bg-cover container-login"
          style={{
            backgroundImage: "url('/assets/gradient.png')",
            background: "linear-gradient(180deg, #0faba7 0%, #056e75 100%)",
          }}
        >
          <div className="row w-100">
            <div className="col-md-6 left-side text-center d-flex flex-column justify-content-center align-items-center pt-5">
              <Apresentation />
            </div>
            <div className="col-md-6 right-side d-flex justify-content-center align-items-center pt-5">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
