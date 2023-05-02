import Logo from "./Logo";

const Brand = () => (
  <div className="group  flex items-center flex-shrink-0 text-white mr-6 cursor-pointer py-2 px-4 rounded-lg">
    <Logo
      className="fill-white transition-all delay-300 group-hover:fill-green-400"
      width="50px"
    />
    <span className="font-semibold text-2xl tracking-tight ml-4">
      Most Played
    </span>
  </div>
);

export default Brand;
