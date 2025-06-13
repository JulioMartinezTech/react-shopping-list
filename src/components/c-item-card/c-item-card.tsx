import { useState } from "react";

import "./c-item-card.css";

//import images
import RemoveIcon from "../../assets/img/remove-icon.png";

interface CItemCardProps {
  id: number;
  img: string;
  text?: string;
  addItemToList: (payload: { id: number; quantity: number }) => void;
  onList?: boolean;
  itemQuantity?: number;
}

const CItemCard = ({
  img,
  id,
  addItemToList,
  onList,
  itemQuantity,
}: CItemCardProps) => {
  const [quantity, setQuantity] = useState<number>(
    itemQuantity ? itemQuantity : 0
  );

  const addItem = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addItemToList({ id: id, quantity: newQuantity });
  };
  const removeItem = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    addItemToList({ id: id, quantity: newQuantity });
  };

  return (
    <div className="c-item-card">
      {!onList && quantity > 0 && (
        <div className="c-item-card__remove-bottom" onClick={removeItem}>
          <img src={RemoveIcon} alt="" />
        </div>
      )}
      <img src={img} alt="" className="c-item-card__image" onClick={addItem} />
      {/* <div className="c-item-card__text-container">
        <p className="c-item-card__text">{text}</p>
      </div> */}
      {quantity > 0 && (
        <div className="c-item-card__quantity-indicator">
          <p className="c-item-card__text">{quantity}</p>
        </div>
      )}
    </div>
  );
};

export default CItemCard;
