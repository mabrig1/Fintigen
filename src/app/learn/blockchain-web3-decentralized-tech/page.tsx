import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import {
  courseMeta,
  courseModules,
} from "@/lib/courses/blockchain-web3-decentralized-tech";

export const metadata: Metadata = {
  title: "Blockchain, Web3 & Decentralized Tech — Interactive Course",
  description:
    "Solidity smart contracts, Foundry/Hardhat testing, security auditing, dApp frontends with Wagmi/Viem, IPFS storage, Chainlink oracles, and Zero-Knowledge Proofs with Circom. A 9-module interactive course culminating in an end-to-end decentralized app capstone.",
};

export default function BlockchainWeb3DecentralizedTechCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-blockchain-web3-decentralized-tech"
      certificateId="FTG-WEB3-001"
    />
  );
}
