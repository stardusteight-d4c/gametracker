import { Navbar } from "@/app/shared/organisms/Navbar"

export default function Login() {
  return (
    <main className="w-screen min-h-screen">
      <div className="flex flex-col h-screen items-center justify-center">
        <Navbar search={false} signIn={false} back={true} />
        <div className="flex flex-col border border-dark-mid/10 rounded shadow-md shadow-dark-str/10 p-7">
          <div className="flex cursor-pointer items-center gap-x-1 mb-6">
            <img src="/assets/logo.svg" alt="" className="h-[24px]" />
            <span className="text-lg">Trackx</span>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm text-dark-low cursor-pointer"
              >
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username/email"
                autoComplete="off"
                className="w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm text-dark-low cursor-pointer"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="off"
                className="w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
              />
            </div>
            <button className="flex items-center justify-center h-[29px] p-5 gap-x-1 hover:scale-105 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
