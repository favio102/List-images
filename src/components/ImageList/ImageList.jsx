import { ImageListItem } from "../ImageListItem/ImageListItem";
import "./styles.css";

export function ImageList({ ImageList }) {
  return ImageList.map((img) => {
    return (
      <div key={img.id} className="card_item">
        <ImageListItem img={img} />
      </div>
    );
  });
}
