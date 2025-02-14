import bg from "~/assets/bg-faculty.png";

const IkntFaculty: React.FC = () => {
  return (
    <section
      className="flex gap-36 bg-cover bg-center px-20 py-8 text-center text-white sm:py-12"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="flex flex-col justify-start gap-4">
        <h3 className="text-left text-xl font-bold sm:text-2xl">
          Вам интересна разработка программного
          <br />
          обеспечения или кибербезопасность?
        </h3>
        <button className="w-1/2 rounded-lg bg-white px-4 py-2 text-black">
          Поступить!
        </button>
      </div>
      <div className="flex flex-col justify-start gap-4">
        <h3 className="text-left text-xl font-bold sm:text-2xl">
          А может ИИ, DevOps, GameDev или <br /> Беспилотники?
        </h3>
        <button className="w-1/2 rounded-lg bg-white px-4 py-2 text-black">
          Поступить!
        </button>
      </div>
    </section>
  );
};

export default IkntFaculty;
