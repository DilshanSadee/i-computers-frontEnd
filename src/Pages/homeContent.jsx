import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <div
        className="w-full h-[70vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            SN TEC Mobile Accessories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-200 mt-4 max-w-md"
          >
            Premium mobile accessories. Trusted quality. Best prices in Sri Lanka.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <Link
              to="/products"
              className="bg-white text-black px-6 py-3 rounded-2xl font-semibold shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slogans Section */}
      <div className="w-full px-4 py-10 grid grid-cols-1 gap-6">
        {[
          "Fast & Reliable Accessories",
          "Power Up Your Lifestyle",
          "Designed for Every Device",
        ].map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <h3 className="text-lg font-semibold">{text}</h3>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black text-white rounded-3xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold">Upgrade Your Phone Today</h2>
          <p className="text-gray-300 mt-2">
            Chargers, cases, cables, earbuds & more
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Explore Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
