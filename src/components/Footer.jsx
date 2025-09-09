import InstaIcon from "../assets/images/icon-instagram.svg";
import tiktokIcon from "../assets/images/icon-tiktok.svg";
import blueSkyIcon from "../assets/images/icon-bluesky.svg";

export default function Footer({ className }) {
  return (
    <footer className={`${className} grid grid-cols-1 place-items-center gap-4 md:grid-cols-2`}>
      <div className="flex gap-4 md:order-2 md:justify-self-end">
        <img src={InstaIcon} className="size-5" alt="" />
        <img src={blueSkyIcon} className="size-5" alt="" />
        <img src={tiktokIcon} className="size-5" alt="" />
      </div>
      <p className="text-9 text-neutral-900 md:justify-self-start">Made with ❤️ and 🥑</p>
    </footer>
  );
}
