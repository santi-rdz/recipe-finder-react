export default function MetaData({ children, icon, data, time = true }) {
  return (
    <li className="flex gap-1.5">
      <img src={icon} alt="" />{" "}
      <p className="shrink-0">
        {children}: <span>{data}</span> {time ? "mins" : ""}
      </p>
    </li>
  );
}
