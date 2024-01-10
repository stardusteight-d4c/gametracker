interface SignUpProps {
  onTypeChange: (value: "sign-in" | "sign-up") => void
}

export const SignUp = ({ onTypeChange }: SignUpProps) => {
  return (
    <div className="flex flex-col border border-dark-mid/10 mt-[61px] rounded shadow-md shadow-dark-str/10 p-7">
      <div className="flex cursor-pointer items-center gap-x-1 mb-6 w-fit">
        <img src="/assets/logo.svg" alt="" className="h-[24px]" />
        <span className="text-lg">Trackx</span>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-sm text-dark-low cursor-pointer"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Choose your username"
            autoComplete="off"
            className="w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm text-dark-low cursor-pointer"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
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
            placeholder="Choose your password"
            autoComplete="off"
            className="w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
          />
        </div>
        <button className="flex font-semibold items-center justify-center h-[29px] p-5 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
          Sign Up
        </button>
        <div className="relative">
          <div className="w-full h-0 border-t border-t-dark-mid/10 my-2 " />
          <span className="bg-white px-2 absolute text-dark-low -top-[5px] left-1/2 -translate-x-1/2 ">
            or
          </span>
        </div>
        <button
          onClick={() => onTypeChange("sign-in")}
          className="flex font-semibold items-center justify-center h-[29px] p-5 gap-x-1 active:scale-95 transition-all text-dark-str border border-[#FF003F] rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}
