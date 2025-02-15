import React from "react";

const advantages = [
  {
    id: "01",
    title: "Институт Компьютерных Наук и Технологий",
    description:
      "Готовит высококвалифицированных специалистов для IT-индустрии Пермского края и Российской Федерации в области IT-разработки и Информационной безопасности.",
    highlight: "высококвалифицированных специалистов",
  },
  {
    id: "02",
    title: "Мы поддерживаем",
    description:
      "Карьерный рост студентов и содействуем развитию их практических навыков с помощью стажировок в партнёрских компаниях.",
    highlight: "Карьерный рост",
  },
  {
    id: "03",
    title: "ИКНТ создан в 2022",
    description:
      "Мы один из крупнейших IT-институтов на Урале, у нас обучается более 1000 студентов.",
    highlight: "более 1000 студентов",
  },
];

const Advantages: React.FC = () => {
  return (
    <section
      id="aboutUs"
      className="flex justify-center px-14 py-28 text-white"
    >
      <div className="grid w-full gap-10">
        {advantages.map((adv, index) => (
          <div
            key={adv.id}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex max-w-lg items-start space-x-4">
              <div className="text-9xl font-bold text-gray-700">{adv.id}</div>
              <div>
                <h3 className="text-4xl font-semibold">{adv.title}</h3>
                <p className="mt-2 text-2xl text-gray-300">
                  {adv.description.includes(adv.highlight)
                    ? adv.description.split(adv.highlight).map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i !==
                            adv.description.split(adv.highlight).length - 1 && (
                            <span className="text-2xl font-medium text-blue-400">
                              {adv.highlight}
                            </span>
                          )}
                        </React.Fragment>
                      ))
                    : adv.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
