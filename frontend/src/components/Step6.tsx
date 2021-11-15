import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CurrentAddressContext, TokenContext } from "../hardhat/SymfoniContext";
import {
  abi as tokenAbi,
  address as tokenAddress,
} from "../hardhat/deployments/localhost/Token.json";
import { VicsClaim } from "./VicsClaim";

interface Props {
  provider: any;
}

const Step6: React.FC<Props> = ({ provider }) => {
  const [vicsWallet, setVicsWallet] = useState<any>();
  const [userAddress] = useContext(CurrentAddressContext);
  const token = useContext<any>(TokenContext);

  useEffect(() => {
    (async () => {
      setVicsWallet(
        ethers.Wallet.fromMnemonic(
          "test test test test test test test test test test test junk"
        ).connect(provider)
      );
    })();
  }, []);

  const allowVic = async () => {
    await token?.instance?.approve(
      vicsWallet?.address,
      ethers.constants.MaxUint256
    );
  };

  return (
    <li>
      <p>Approve token transfers out of your account</p>

      <p style={{ fontSize: "14px" }}>
        <strong>Hey,... VIC IS MAD!!! </strong> She wants some of her TST back.
        That's fine - it's not worth much anyway. Give her permission to take as
        much as she wants from your account ( best we give her access to the
        highest possible amount: ethers.constants.MaxUint256 ).
      </p>
      <button onClick={() => allowVic()}>Allow Vic to take TST</button>
      <p style={{ fontSize: "14px" }}>
        HINT: The only help I can give you here is to checkout the ERC20 token
        spec.
      </p>

      <VicsClaim />
    </li>
  );
};

export default Step6;
