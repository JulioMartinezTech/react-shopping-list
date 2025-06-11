import { useState } from "react";

import "./c-item-card.css";

//import images
import RemoveIcon from "../../assets/img/remove-icon.png";

interface CItemCardProps {
  img: string;
  text?: string;
}

const CItemCard = ({ img }: CItemCardProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const addItem = () => {
    setQuantity(quantity + 1);
  };
  const removeItem = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div className="c-item-card">
      {quantity > 0 && (
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
