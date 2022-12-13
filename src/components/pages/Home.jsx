import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { motion } from "framer-motion";
import { containerVariantY } from "../animations/containerVariants";
import Heading from "../heading/Heading";

function Home() {
  const context = useContext(MainContext);

  context.setUserType(null);

  return (
    <motion.div
      variants={containerVariantY}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Heading />
    </motion.div>
  );
}

export default Home;
