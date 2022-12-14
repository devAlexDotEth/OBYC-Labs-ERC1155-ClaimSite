import {
  useContractMetadata,
  useActiveClaimCondition,
  useNFT,
  Web3Button,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";

// Put Your Edition Drop Contract address from the dashboard here
const myEditionDropContractAddress =
  "0x86bb4912EA47E07953C527d9CCC40f905ead1931";

// Put your token ID here
const tokenId = 2;
const tokenId2 = 3;
const tokenId3 = 4;
const url2 = "https://obyclabs.com/"


const Home: NextPage = () => {
  const { contract: editionDrop } = useContract(myEditionDropContractAddress);

  // The amount the user claims, updates when they type a value into the input field.
  const [quantity, setQuantity] = useState<number>(1); // default to 1

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(editionDrop);

  // Load the NFT metadata
  const { data: nftMetadata } = useNFT(editionDrop, tokenId);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(tokenId)
  );

  // Loading state while we fetch the metadata
  if (!editionDrop || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
          <h1>{contractMetadata?.name}</h1>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>{contractMetadata?.description}</p>
        </div>

        <div className={styles.imageSide}>
          {/* Image Preview of NFTs */}
          <img
            className={styles.image}
            src={"logo.png"}
            alt={`${"logo.png"} preview image`}
          />

          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              {activeClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {" / "}
                  {activeClaimCondition.maxQuantity}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          <>
            <p>Quantity</p>
            <div className={styles.quantityContainer}>
              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>

              <h4>{quantity}</h4>

              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity + 1)}
                disabled={
                  quantity >=
                  parseInt(
                    activeClaimCondition?.quantityLimitPerTransaction || "0"
                  )
                }
              >
                +
              </button>

              
            </div>
            <div className={styles.mintContainer}>
              <Web3Button
                contractAddress={myEditionDropContractAddress}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#060606"
                colorMode="dark"
                className="botonMint"
              >
                Mint Toxic Salmon Barrel |
               Qty: {quantity}{quantity > 1 ? "s" : ""}
              </Web3Button>


              <Web3Button
                contractAddress={myEditionDropContractAddress}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId2, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#060606"
                colorMode="dark"
                className="botonMint"
              >
                Mint Stage 2 Nanobot |
               Qty: {quantity}{quantity > 1 ? "s" : ""}
              </Web3Button>

              <Web3Button
                contractAddress={myEditionDropContractAddress}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId3, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#060606"
                colorMode="dark"
                className="botonMint"
              >
               Bid Bio-Infused Honey |
             Qty: {quantity}{quantity > 1 ? "s" : ""}
              </Web3Button>


            </div>
          </>
        </div>
      </div>
      {/* Powered by OBYC Labs */}{" "}
      <img
        src={`/obyclabs.png`}
        alt="OBYC Logo"
        width={125}
        className={styles.buttonGapTop}
        onClick={() => window.open(url2, "_blank")}
      />
    </div>
  );
};

export default Home;
