export const containerVariantX = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
  },
};

export const containerVariantY = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: "100vh",
  },
};

export const containerVariantPosAbs = {
  hidden: {
    opacity: 0,
    y: "-100vh",
    x: "-50%",
  },
  visible: {
    opacity: 1,
    y: "-50%",
    x: "-50%",
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: "100vh",
    x: "-50%",
  },
};

export const pathVariant = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
    },
  },
};
