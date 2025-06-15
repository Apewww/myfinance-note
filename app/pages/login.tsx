import { useState, useEffect } from "react";
import loginImg from "../assets/img/login.png";
import { login } from "../services/authService";

export function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token); 
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-5">
        <div className="w-full max-w-md md:block hidden">
          <img src={loginImg} alt="Login Illustration" className="rounded-lg shadow-lg" />
        </div>

        <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              

              <div className="text-right mb-4">
                <a href="#" className="link link-hover text-sm">
                  Forgot password?
                </a>
              </div>

              {error && (
                <div className="fixed top-4 right-4 z-50" onClick={() => setError(null)}>
                  <div role="alert" className="alert alert-error alert-soft p-4 shadow-lg cursor-pointer">
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-neutral w-full">
                Login
              </button>
            </form>

            <div className="text-center mt-1">
              <span className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/register" className="link link-hover">
                  Register
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
