"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const advantages = [
  {
    id: "01",
    title: "adv01_title",
    description: "adv01_description",
    highlight: "adv01_highlight",
  },
  {
    id: "02",
    title: "adv02_title",
    description: "adv02_description",
    highlight: "adv02_highlight",
  },
  {
    id: "03",
    title: "adv03_title",
    description: "adv03_description",
    highlight: "adv03_highlight",
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Advantages: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="aboutUs"
      className="flex justify-center px-14 py-28 text-white"
    >
      <div className="grid w-full gap-10">
        {advantages.map((adv, index) => (
          <motion.div
            key={adv.id}
            className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInVariants}
          >
            <div className="flex max-w-lg items-start space-x-4">
              <div className="text-9xl font-bold text-gray-700">{adv.id}</div>
              <div>
                <h3 className="text-4xl font-semibold">
                  {t(`Advantages.${adv.title}`)}
                </h3>
                <p className="mt-2 text-2xl text-gray-300">
                  {t(`Advantages.${adv.description}`).includes(
                    t(`Advantages.${adv.highlight}`),
                  )
                    ? t(`Advantages.${adv.description}`)
                        .split(t(`Advantages.${adv.highlight}`))
                        .map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i !==
                              t(`Advantages.${adv.description}`).split(
                                t(`Advantages.${adv.highlight}`),
                              ).length -
                                1 && (
                              <span className="text-2xl font-medium text-blue-400">
                                {t(`Advantages.${adv.highlight}`)}
                              </span>
                            )}
                          </React.Fragment>
                        ))
                    : t(`Advantages.${adv.description}`)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
