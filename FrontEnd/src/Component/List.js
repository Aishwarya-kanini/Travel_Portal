import "../../src/Component/List.css";
import Navbar from "../../src/Component/Navbar";
import Header from "../../src/Component/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../src/Component/SearchItem";

const List = () => {
  const location = useLocation();
  const stateData = location.state;

  // Check if location.state exists and contains the date object
  const [destination, setDestination] = useState(stateData?.destination || '');
  const [date, setDate] = useState(stateData?.date || [{ startDate: new Date(), endDate: new Date() }]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(stateData?.options || {});
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="ls-title">Search</h1>
            <div className="ls-item">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="ls-item">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="ls-item">
              <label>Options</label>
              <div className="ls-options">
                <div className="ls-option-item">
                  <span className="ls-option-text">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="ls-option-input" />
                </div>
                <div className="ls-option-item">
                  <span className="ls-option-text">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="ls-option-input" />
                </div>
                <div className="ls-option-item">
                  <span className="ls-option-text">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="ls-option-input"
                    placeholder={options.adult}
                  />
                </div>
                <div className="ls-option-item">
                  <span className="ls-option-text">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="ls-option-input"
                    placeholder={options.children}
                  />
                </div>
                <div className="ls-option-item">
                  <span className="ls-option-text">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="ls-option-input"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="list-result">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;