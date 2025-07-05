import { Search, TrendingUp } from "lucide-react";

export default function Home() {
  const categories = [
    {
      id: 1,
      title: "Designer",
    },

    {
      id: 2,
      title: "Developer",
    },

    {
      id: 3,
      title: "Wordpress",
    },
  ];

  return (
    <div>
      {/* hero section */}

      <div
        className="md:flex justify-between px-[6.25vw] bg-[#134848]  bg-[rgba(19,72,72,0.0)]]"
        // style={{
        //   backgroundImage: `linear-gradient(to bottom,rgba(0,0,0, .7),
        //         rgba(0,0,0, .7)), url(${"/background-pattern.png"})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}

        // style={{
        //   backgroundImage: `url(${"/background-pattern.png"})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundBlendMode: "lighten",
        // }}
      >
        {/* left */}
        <div className="w-[80vw] md:w-[36.459vw]">
          <h1 className="text-[15vw] md:text-[5.555vw] font-[700] font-[poppins] uppercase">
            workIQ
          </h1>
          <h3 className="text-[7vw] md:text-[2.778vw] font-[500] font-[poppins] uppercase my-[3vw] md:my-[2.084vw]">
            FREELANCING MADE EASY !
          </h3>

          <h6 className="font-[poppins] text-[5vw] md:text-[1.852vw] font-[500] capitalize">
            Hire an Expert or Be an Expert .
          </h6>

          <p className="font-[poppins] text-[3vw] md:text-[0.926vw] capitalize mt-[5vw] md:mt-[1.818vw]">
            In the ever-evolving landscape of skills and knowledge, the choice
            between hiring an expert or becoming one yourself is a pivotal
            decision.
          </p>

          <div className="w-[76vw] md:w-[34.144vw] py-[5vw]  md:py-[1.797vw] pl-[6vw] md:pl-[2.199vw] my-[6.1vw] md:my-[2.301vw] bg-[#D9D9D9] flex items-center rounded-[4vw] md:rounded-[1.62vw] h-[12.5px] md:h-[4.341vw] gap-[5.5vw] md:gap-x-[2.891vw]">
            <input
              className="placeholder:text-[3vw] md:placeholder:text-[1.157vw] placeholder:font-[poppins] placeholder:text-[#000] w-[55vw] md:w-[26.406vw] shrink-0 outline-none border-none text-black"
              type="text"
              placeholder='Search to "Find Freelancers, Jobs, or Services"'
            />
            <div className="w-[13vw] md:w-[4.977vw] h-[13vw] md:h-[4.977vw] rounded-full bg-[#2E90EB] ml-[0] shrink-0 grid place-items-center cursor-pointer">
              <Search
                className="w-[6vw] h-[6vw] md:w-[1.484vw] md:h-[1.484vw]"
                color="white"
              />
            </div>
          </div>

          <h4 className="uppercase font-[poppins] font-[500] text-[3.2vw] md:text-[1.094vw]">
            Trendign services
          </h4>

          <div className="text-[2.9vw] md:text-[0.938vw] font-[500] font-[poppins] uppercase flex items-center justify-between mt-[3vw] md:mt-[1.641vw] tracking-[2%]">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between px-[3.2vw] md:px-[1.094vw] py-[3.3] md:py-[1.25vw] rounded-[8vw] md:rounded-[2.969vw] bg-[rgba(255,255,255,.04)] border-white border-[.1vw] md:border-[0.058vw] backdrop-blur-[2.1vw] md:backdrop-blur-[0.703vw] w-[31.5vw] md:w-[10.625vw]  cursor-pointer"
              >
                <span>{cat.title}</span>
                <div className="w-[4vw] md:w-[1.328vw] h-[4vw] md:h-[1.328vw] bg-white rounded-[0.991vw] md:rounded-[0.391vw] grid place-items-center">
                  <TrendingUp
                    className="w-[2.1vw] md:w-[0.781vw] h-[2.1vw] md:h-[0.781vw]"
                    color="black"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right side */}

        <div className="w-[37.344vw] relative hidden md:block">
          <div className="w-[16.719vw] h-[17.813vw] rounded-tr-[5.313vw] rounded-bl-[5.156vw] rounded-br-[4.219vw] border-[0.625vw] border-white ml-[7.188vw] bg-red-600 overflow-hidden ">
            <img
              className="w-full h-full object-center object-cover"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="banner-3"
            />
          </div>

          <div className="flex flex-wrap w-[8.203vw] h-[6.328vw] gap-[0.556vw] absolute -left-[0.156vw] top-[7.813vw] z-[10]">
            {[...Array(81)].map((_item, index) => (
              <span
                key={index}
                className="w-[0.342vw] h-[0.342vw] rounded-full bg-[#D9D9D9]/35"
              />
            ))}
          </div>

          <div className="flex items-centerr gap-x-[2.188vw] mt-[2.813vw]">
            <div className="w-[18.906vw] h-[19.375vw] rounded-tl-[2.813vw] rounded-tr-[4.141vw]  rounded-br-[6.406vw] border-[0.625vw] border-white bg-yellow-600/35 overflow-hidden">
              <img
                className="w-full h-full object-center object-cover"
                src="https://images.unsplash.com/photo-1543269866-487350d6fa5e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="banner-3"
              />
            </div>

            <div className="w-[13.516vw] h-[20.625vw] rounded-tl-[4.688vw] rounded-bl-[5.391vw]  rounded-br-[4.688vw] border-[0.625vw] border-white -mt-[3.906vw] bg-green-600/35 overflow-hidden">
              <img
                className="w-full h-full object-center object-cover"
                src="https://plus.unsplash.com/premium_photo-1675425206468-dc196f6decdc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="banner-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
