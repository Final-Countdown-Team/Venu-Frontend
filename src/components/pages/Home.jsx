import Heading from "../heading/Heading";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100vh" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <Heading />
    </motion.div>
  );
}

export default Home;
