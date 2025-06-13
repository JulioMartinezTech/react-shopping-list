import "./c-list-item.css";

//assets
import DeleteIcon from "../../assets/img/delete-icon.png";

//interface
interface CListItemProps {
  id: number;
  name: string;
  quantity: number;
  removeItem: (id: number) => void;
}

const CListItem = ({ id, name, quantity, removeItem }: CListItemProps) => {
  return (
    <div className="c-list-item">
      <div className="c-list-item__quantity">{quantity}</div>
      <div className="c-list-item__name">{name}</div>
      <div
        className="c-list-item__remove-button"
        onClick={() => removeItem(id)}
      >
        <img
          src={DeleteIcon}
          alt="Delete icon"
          className="c-list-item__remove-button__icon"
        />
      </div>
    </div>
  );
};

export default CListItem;
