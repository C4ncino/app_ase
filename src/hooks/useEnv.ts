const useEnv = () => {
  const environs = process.env.environs;
  console.log("🚀 ~ useEnv ~ environs:", environs);

  return {
    environs,
  };
};

export default useEnv;
