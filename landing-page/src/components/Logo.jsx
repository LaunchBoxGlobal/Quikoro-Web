import { Infinity, User } from "lucide-react";

const Logo = () => (
  <div className={`relative flex items-center justify-center w-10 h-10`}>
    <Infinity className="w-full h-full text-brand-500 stroke-[2.5]" />
    <div className="absolute -top-1 left-1 w-3 h-3 bg-brand-500 rounded-full border-2 border-white flex items-center justify-center">
      <User className="w-1.5 h-1.5 text-white fill-current" />
    </div>
    <div className="absolute -bottom-1 right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white flex items-center justify-center">
      <User className="w-1.5 h-1.5 text-white fill-current" />
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-400 rounded-full border-2 border-white flex items-center justify-center">
      <User className="w-1.5 h-1.5 text-white fill-current" />
    </div>
  </div>
);

export default Logo;
