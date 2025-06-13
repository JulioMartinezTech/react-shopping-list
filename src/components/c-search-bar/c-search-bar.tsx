import "./c-search-bar.css";

import ListIcon from "../../assets/img/list-icon.png";

//interface

interface SearchBarProps {
  showList: () => void;
}

const CSearchBar = ({ showList }: SearchBarProps) => {
  return (
    <div className="c-search-bar">
      <form className="c-search-bar__form">
        <input
          type="text"
          className="c-search-bar__form__input"
          placeholder="Busca un artículo"
        />
      </form>
      <div className="c-search-bar__list-icon-button" onClick={showList}>
        <img
          src={ListIcon}
          alt="List Icon"
          className="c-search-bar__list-icon"
        />
      </div>
    </div>
  );
};

export default CSearchBar;
