import { shortenAddress } from "@/utils/string";
import Link from "next/link";

export default function Card({image, name, description, contractAddress}: any) {
  return (
    (image && name && description && contractAddress) ?
      <Link href={`/claim/${contractAddress}`}>
        <div className="card bg-base-100 shadow-xl cursor-pointer">
          <figure>
              <img
                src={image}
                alt="nft images" />
          </figure>
          <div className="card-body">
            <div className="flex gap-2 items-center">
              <h2 className="card-title">{name}</h2>
              <div className="badge badge-primary">{description}</div>
            </div>
            <p>{shortenAddress(contractAddress)}</p>
          </div>
        </div>
      </Link>
      :
      <div className="card skeleton h-32 bg-base-100 shadow-xl cursor-pointer"/>
  )
}
