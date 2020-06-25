module.exports = (args, configStore) => {
  console.log(args);
  if (args.clear || args.c) {
    configStore.clear();
    console.log("config store cleared!");
  }
  console.log("current config store");
  console.log(configStore.all);
};
