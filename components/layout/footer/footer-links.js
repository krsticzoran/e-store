import Link from "next/link";

export default function FooterLinks({ title, data, addMargin }) {
  return (
    <div className={addMargin ? "mr-20" : ""}>
      <h3 className="font-bold uppercase text-white">{title}</h3>
      <ul>
        {data.map((el, i) => (
          <li
            key={i}
            className="mt-4 font-medium capitalize transition-colors duration-1000 hover:text-secondary"
          >
            <Link href={el[1]}>{el[0]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
