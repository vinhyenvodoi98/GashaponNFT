import Link from "next/link";

export default function Card({image, name, description}: any) {
  return (
    (image && name && description) ?
      <Link href="/claim/abc">
        <div className="card bg-base-100 shadow-xl cursor-pointer">
          <figure>
              <img
                src={image}
                alt="nft images" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
          </div>
        </div>
      </Link>
      :
      <div className="card skeleton h-32 bg-base-100 shadow-xl cursor-pointer"/>
  )
}
