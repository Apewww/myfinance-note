
export function RegisterContent() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">

        <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

            <form>
              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input input-bordered"
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
                  required
                />
              </div>

              <button type="submit" className="btn btn-neutral w-full">
                Submit
              </button>
            </form>

            <div className="text-center mt-1">
              <span className="text-sm text-gray-500">
                Already have a account?{" "}
                <a href="/" className="link link-hover">
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
