// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // We get the contract to deploy.
  const SendETH = await hre.ethers.getContractFactory("SendETH");
  const sendETH = await SendETH.deploy();

  await sendETH.deployed();

  console.log("SendETH deployed to:", sendETH.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  //https://eth-goerli.g.alchemy.com/v2/Eo_3ejyNS3BznBvx9EFOpEQNLvWsDsqV

